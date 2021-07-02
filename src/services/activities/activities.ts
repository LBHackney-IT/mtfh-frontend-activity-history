import { $auth } from '@mtfh/common';
import { Activity, GetActivityHistoryRequestData } from './activities.types';
import { config } from '../config';

const headers = {
    'Content-Type': 'application/json',
    'x-api-key': config.activitiesApiKey,
    'Authorization': `Bearer ${$auth.getValue().token}`,
};

export const getActivityHistory = async ({
    options = {},
    targetId
}: GetActivityHistoryRequestData): Promise<Activity> => {
    const response = await fetch(`${config.activitiesApiUrl}/activities/${targetId}`, {
        method: 'GET',
        ...options,
        headers: {
            ...options.headers,
            ...headers,
        },
    });

    const result = await response.json();
    
    return result;
};
