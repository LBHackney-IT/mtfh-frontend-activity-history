import { config } from "../config";
import { Tenure } from "./tenure.types";

import { AxiosSWRResponse, useAxiosSWR } from "@mtfh/common";

export const useTenure = (id: string): AxiosSWRResponse<Tenure | any> => {
  return useAxiosSWR<Tenure>(`${config.tenureApiUrl}/tenures/${id}`);
};
