import { stringify } from "query-string";

import { config } from "../config";
import { Activity } from "./activities.types";

import { AxiosSWRInfiniteResponse, useAxiosSWRInfinite } from "@mtfh/common";

export interface GetActivityHistoryByTargetIdResponse {
  results: Activity[];
  paginationDetails: {
    nextToken: string | null;
  };
}

export interface GetActivityHistoryByIdRequestData {
  targetId: string;
  pageSize?: number;
  paginationToken?: string;
}

export const useActivityHistory = (
  id: string,
  pageSize = 5,
): AxiosSWRInfiniteResponse<GetActivityHistoryByTargetIdResponse> => {
  return useAxiosSWRInfinite<GetActivityHistoryByTargetIdResponse>(
    (page, previous) => {
      if (previous && !previous?.paginationDetails?.nextToken) return null;

      const params: GetActivityHistoryByIdRequestData = {
        targetId: id,
        pageSize,
      };

      if (page !== 0 && previous?.paginationDetails.nextToken) {
        params.paginationToken = previous.paginationDetails.nextToken;
      }

      return `${config.activitiesApiUrl}/activityhistory?${stringify(params)}`;
    },
    {
      onErrorRetry: /* istanbul ignore next: unreachable in test suite */ (
        error,
        key,
        config,
        revalidate,
        { retryCount },
      ) => {
        if (error.response?.status === 404) return;
        if (retryCount >= 3) return;

        const count = Math.min(retryCount, 8);
        const timeout =
          ~~((Math.random() + 0.5) * (1 << count)) * config.errorRetryInterval;
        setTimeout(() => revalidate({ retryCount }), timeout);
      },
    },
  );
};
