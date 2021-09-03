import { config } from 'lib/config';
import { useContext } from 'react';
import { QueryKeys } from 'lib/api/queryKeys';

//Need to go find the EMPLOYEE type from the server
import { Employee } from '../../../../server-container/server/src/employee/employee.entity';
import axios from 'axios';
import { useQuery } from 'react-query';

const getEmployees = async () => {
  const result = await axios({
    url: config.API_URL + 'employee/getAllEmployees',
    method: 'get',
  });
  // console.log('result?', result);

  const allEmployees: Employee[] = result.data;

  // console.log('retval?', allEmployees);

  return allEmployees;
};

const useEmployees = () => {
  return useQuery(QueryKeys.ALL_EMPLOYEES, getEmployees);
};

export { useEmployees };
