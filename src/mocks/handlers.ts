import { rest } from 'msw';
import { mockPerson, mockActivities } from './data';
import { config } from '../services';

export const handlers = [
    rest.get(
        `${config.personApiUrl}/persons/:id`,
        (request, response, context) => {
            return response(context.status(200), context.json(mockPerson));
        }
    ),

    rest.get(
        `${config.activitiesApiUrl}//activityHistory/:id`,
        (request, response, context) => {
            return response(context.status(200), context.json(mockActivities));
        }
    ),
];
