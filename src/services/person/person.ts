import { AxiosSWRResponse, useAxiosSWR } from '@mtfh/common';
import { Person } from './person.types';
import { config } from '../config';

export const getPersonById = (id: string): AxiosSWRResponse<Person> => {
    return useAxiosSWR<Person>(`${config.personApiUrl}/persons/${id}`);
};
