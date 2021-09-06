import { AxiosSWRResponse, useAxiosSWR } from '@mtfh/common';
import { Tenure } from './tenure.types';
import { config } from '../config';

export const useTenure = (id: string): AxiosSWRResponse<Tenure | any> => {
    return useAxiosSWR<Tenure>(`${config.tenureApiUrl}/tenures/${id}`);
};
