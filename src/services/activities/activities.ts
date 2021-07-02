import { AxiosSWRResponse, useAxiosSWR } from '@mtfh/common';
import { Activity } from './activities.types';
import { config } from '../config';

export const getActivityHistory = (id: string): AxiosSWRResponse<Activity> => {
    return useAxiosSWR<Activity>(`${config.activitiesApiUrl}/activities/${id}`);
};
