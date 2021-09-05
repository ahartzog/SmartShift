import { DependencyContext } from "DependencyContext";
import { QueryKeys } from "lib/api/queryKeys";
import { Employee } from "lib/types";
import React, { useContext } from "react";
import { useQuery } from "react-query";

//Need to go find the EMPLOYEE type from the server
const useEmployees = () => {
  const dependencies = useContext(DependencyContext);

  const getEmployees = async () => {
    const result = await dependencies.services.apiService.axiosFetch<Employee>({
      url: "employee/getAllEmployees",
      method: "GET",
    });

    // const allEmployees = result.data;

    // console.log('retval?', allEmployees);

    return result.data;
  };

  return useQuery(QueryKeys.ALL_EMPLOYEES, getEmployees);
};

export { useEmployees };
