import React, { lazy, Suspense } from 'react';
// import { DisplayEmployees } from 'features/employees/DisplayEmployees';

const SendEmployeesToOptimizer = lazy(
  () => import('../features/employees/SendEmployeesToOptimizer')
);

const DisplayEmployees = lazy(
  () => import('features/employees/DisplayEmployees')
);

const EmployeesPage = () => {
  return (
    <Suspense fallback={<h1>Loading employees...</h1>}>
      <div>
        <SendEmployeesToOptimizer />
        <DisplayEmployees />
      </div>
    </Suspense>
  );
};
export { EmployeesPage };
