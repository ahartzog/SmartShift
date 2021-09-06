import { DependencyContext } from "DependencyContext";
import { QueryKeys } from "lib/api/queryKeys";
import { Employee } from "lib/types";
import React, { useContext } from "react";
import { useQuery } from "react-query";

//Need to go find the EMPLOYEE type from the server
const useEmployees = () => {
  const dependencies = useContext(DependencyContext);

  const addEmployee = async (employee: Employee) => {
    const result = await dependencies.services.apiService.axiosFetch<Employee>({
      url: `employees/${employee._id}`,
      method: "POST",
      data: employee,
    });

    console.log("Add employ ee result?", result);

    return result.data;
  };

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

export { useEmployees };
