import { rest } from "msw";

import { config } from "../services";
import { mockActivities, mockPerson } from "./data";

export const handlers = [
  rest.get(`${config.personApiUrl}/persons/:id`, (request, response, context) => {
    return response(context.status(200), context.json(mockPerson));
  }),

  rest.get(`${config.activitiesApiUrl}/activityhistory`, (request, response, context) => {
    return response(context.status(200), context.json(mockActivities));
  }),
];
