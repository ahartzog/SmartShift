import { DependencyContext } from "DependencyContext";
import { QueryKeys } from "lib/api/queryKeys";
import { Employee } from "lib/types";

import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

//Need to go find the EMPLOYEE type from the server
const useEmployees = () => {
  const dependencies = useContext(DependencyContext);

  const getEmployees = async () => {
    const result = await dependencies.services.apiService.axiosFetch<Employee>({
      url: "employee/",
      method: "GET",
    });

    // const allEmployees = result.data;

    // console.log('retval?', allEmployees);

    return result.data;
  };

  //What's the right structure here to be able to get whatever hook we want?
  return useQuery(QueryKeys.ALL_EMPLOYEES, getEmployees);
};

const useAddEmployee = () => {
  const dependencies = useContext(DependencyContext);
  const queryClient = useQueryClient();
  const addEmployee = async (employee: Employee) => {
    const result = await dependencies.services.apiService.axiosFetch<Employee>({
      url: `employees/${employee._id}`,
      method: "POST",
      data: employee,
    });

    console.log("Add employ ee result?", result);

    return result.data;
  };

  //How to use query keys effectively
  //https://tkdodo.eu/blog/effective-react-query-keys

  //Update from mutation responses
  //https://react-query.tanstack.com/guides/updates-from-mutation-responses
  return useMutation(addEmployee, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        [QueryKeys.ALL_EMPLOYEES, { _id: variables._id }],
        data
      );

      //The inelegant way...invalidate these queries
      //queryClient.invalidateQueries(QueryKeys.ALL_EMPLOYEES);
    },
  }).mutate;
};

export { useEmployees, useAddEmployee };
