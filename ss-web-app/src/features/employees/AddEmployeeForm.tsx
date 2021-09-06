import { Button } from "antd";
import { Employee } from "lib/types";
import React, { useContext } from "react";
import { ObjectID } from "typeorm";
import { useAddEmployee } from "./employeeQueries";

const AddEmployeeForm = () => {
  const addEmployee = useAddEmployee();

  const add = () => {
    const demo: Employee = {
      _id: new ObjectID(),
      firstName: "Alek " + Math.floor(Math.random()) * 9999,
      lastName: "Hartdog",
      emailAddress: "The same...",
    };
    addEmployee(demo);
  };

  return (
    <div>
      <h4>Add Employee</h4>
      <Button onClick={add}>Add One More</Button>
    </div>
  );
};

export { AddEmployeeForm };
