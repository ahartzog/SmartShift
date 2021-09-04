import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'components/ErrorBoundary';
import SendEmployeesToOptimizer from '../features/employees/SendEmployeesToOptimizer';
import DisplayEmployees from 'features/employees/DisplayEmployees';
// const SendEmployeesToOptimizer = lazy(
//   () => import('../features/employees/SendEmployeesToOptimizer')
// );

// const DisplayEmployees = lazy(() => import('features/employees/DisplayEmployees').DisplayEmployees);

const EmployeesPage = () => {
  return (
    // <Suspense fallback={<h1>Loading employees...</h1>}>
    <ErrorBoundary errorText='Error loading employees data'>
      <div>
        <SendEmployeesToOptimizer />
        <DisplayEmployees />
      </div>
    </ErrorBoundary>
    // </Suspense>
  );
};
export { EmployeesPage };
