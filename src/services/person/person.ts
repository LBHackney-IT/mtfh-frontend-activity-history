import { config } from "../config";
import { Person } from "./person.types";

import { AxiosSWRResponse, useAxiosSWR } from "@mtfh/common";

export const usePerson = (id: string): AxiosSWRResponse<Person> => {
  return useAxiosSWR<Person>(`${config.personApiUrl}/persons/${id}`);
};
