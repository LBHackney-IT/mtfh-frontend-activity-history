import { mockPersonV1 } from "@hackney/mtfh-test-utils";
import { rest } from "msw";

import { config } from "../services";
import { mockActivities } from "./data";

export const handlers = [
  rest.get(`${config.personApiUrl}/persons/:id`, (request, response, context) => {
    return response(context.status(200), context.json(mockPersonV1));
  }),

  rest.get(`${config.activitiesApiUrl}/activityhistory`, (request, response, context) => {
    return response(context.status(200), context.json(mockActivities));
  }),
];
