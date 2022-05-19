import { mockPersonV1 } from "@hackney/mtfh-test-utils";
import { rest } from "msw";

import { config } from "../services";
import { mockActivities } from "./data";

import { config as commonConfig } from "@mtfh/common/lib/config";

export const handlers = [
  rest.get(`${commonConfig.personApiUrlV1}/persons/:id`, (request, response, context) => {
    return response(context.status(200), context.json(mockPersonV1));
  }),

  rest.get(`${config.activitiesApiUrl}/activityhistory`, (request, response, context) => {
    return response(context.status(200), context.json(mockActivities));
  }),

  rest.get(
    `${commonConfig.processApiUrlV1}/process/:processName/:id`,
    (request, response, context) => {
      return response(context.status(200), context.json({}));
    },
  ),
];
