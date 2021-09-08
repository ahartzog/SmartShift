import { AimOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import React from "react";

import { useEmployees } from "./employeeQueries";

const SendEmployeesToOptimizer = () => {
  const { data: employeesData } = useEmployees();

  if (!employeesData) {
    return <div>Employee data not found</div>;
  }

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
            message: "Scheduling request sent",
            description:
              "It has been sent. We will disable further requests sending",
          })
        }
        icon
        type="primary"
      >
        <AimOutlined /> Send to Optimizer
      </Button>
    </div>
  );
};

export default SendEmployeesToOptimizer;
