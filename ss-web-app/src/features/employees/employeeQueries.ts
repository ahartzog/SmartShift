import { config } from 'lib/config';
import { QueryKeys } from 'lib/api/queryKeys';

//Need to go find the EMPLOYEE type from the server
import { Employee } from '../../../../server-container/server/src/employee/employee.entity';
import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const getEmployees = async () => {
  const result = await axios({
    url: config.API_URL + '/employee/getAllEmployees',
    method: 'get',
  });

  const allEmployees: Employee[] = result.data;

  console.log('retval?', allEmployees);

  return allEmployees;
};

const useEmployees = () => {
  return useQuery(QueryKeys.ALL_EMPLOYEES, getEmployees);
};

export { useEmployees };
