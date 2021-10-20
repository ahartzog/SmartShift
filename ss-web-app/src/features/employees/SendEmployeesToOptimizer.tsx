import { AimOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import React from 'react';

import { useEmployees } from './employeeQueries';

const SendEmployeesToOptimizer = () => {
  const { data: employeesData, isFetching } = useEmployees();

  if (!employeesData || isFetching) {
    return <div>Employee data not found</div>;
  }

  const test = [] as any[];

  const no = test.map((k) => {
    return 'hi';
  });

  return (
    <div>
      <h4>Sending employees to optimizer with the following parameters...</h4>
      <ul>
        {/* <li>Count: {employeesData.length}</li> */}
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
