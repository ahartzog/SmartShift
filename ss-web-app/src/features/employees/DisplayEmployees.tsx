import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DependencyContext } from 'DependencyContext';
import React, { useContext } from 'react';

import { Employee } from 'lib/types';

type Props = {
  numberOfClients?: number | null;
};

const DisplayEmployees = ({ numberOfClients = null, ...props }: Props) => {
  const dependencies = useContext(DependencyContext);

  const { data: employeesData } =
    dependencies.services.apiService.useEmployees();

  if (!employeesData) {
    return <div>Employee data not found</div>;
  }

  // const { data: employeesData } = useEmployees();

  const columns: ColumnsType<Employee> = [
    {
      key: '_id',
      title: 'Id',
      dataIndex: '_id',
    },
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
    </div>
  );
};

export default DisplayEmployees;
