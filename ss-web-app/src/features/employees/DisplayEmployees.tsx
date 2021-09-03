import React from 'react';
import { useEmployees } from 'features/employees/employeeQueries';
type Props = {
  numberOfClients?: number | null;
};

const DisplayEmployees = ({ numberOfClients = null, ...props }: Props) => {
  const {
    status: employeesStatus,
    data: employeesData,
    error: employeesError,
    isFetching: employeesIsFetching,
  } = useEmployees();

  if (employeesIsFetching) {
    return <div>Loading...</div>;
  }

  if (!employeesData) {
    return <div>Error loading employees data</div>;
  }

  return (
    <div className='top-display-employees'>
      <h1>Display Employees</h1>
      <div>We are displaying: {numberOfClients}</div>

      {employeesData.map((e) => {
        return (
          <ul key={e._id.toString()}>
            <li>FirstName: {e.firstName}</li>
            <li>LastName: {e.lastName}</li>
            <li>Email: {e.emailAddress}</li>
          </ul>
        );
      })}
    </div>
  );
};

export { DisplayEmployees };
