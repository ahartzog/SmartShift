import React, { Suspense } from 'react';
import { useEmployees } from 'features/employees/employeeQueries';
import { AimOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import Spinner from 'react-spinkit';
const SendEmployeesToOptimizer = () => {
  const {
    data: employeesData,

    isFetching: employeesIsFetching,
  } = useEmployees();

  return (
    <div>
      <h4>Sending employees to optimizer with the following parameters...</h4>
      <ul>
        <li>Count: {employeesData?.length}</li>
        <li>Start Date: ...</li>
        <li>End Date: ...</li>
      </ul>
      <Button
        onClick={() =>
          notification.info({
            message: 'Scheduling request sent',
            description:
              'It has been sent. We will disable further requests sending',
          })
        }
        icon
        type='primary'
      >
        <AimOutlined /> Send to Optimizer
      </Button>
    </div>
  );
};

export default SendEmployeesToOptimizer;
