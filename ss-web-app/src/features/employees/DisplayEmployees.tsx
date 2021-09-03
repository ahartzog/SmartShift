import React from 'react';
import { useEmployees } from 'features/employees/employeeQueries';
import { Employee } from '../../../../server-container/server/src/employee/employee.entity';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
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

  if (!employeesData || employeesError) {
    return <div>Error loading employees data</div>;
  }

  const columns: ColumnsType<Employee> = [
    {
      key: 'firstName',
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      key: 'lastName',
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      key: 'emailAddress',
      title: 'Email Address',
      dataIndex: 'emailAddress',
    },
  ];

  return (
    <div className='top-display-employees'>
      <h1>Display Employees</h1>
      <div>We are displaying: {numberOfClients}</div>
      <Table<Employee> columns={columns} dataSource={employeesData} />
      {/* {employeesData.map((e) => {
        return (
          <ul key={e._id.toString()}>
            <li>FirstName: {e.firstName}</li>
            <li>LastName: {e.lastName}</li>
            <li>Email: {e.emailAddress}</li>
          </ul>
        );
      })} */}
    </div>
  );
};

export { DisplayEmployees };
