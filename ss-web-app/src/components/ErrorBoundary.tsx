import { Button } from 'antd';
import React, { lazy, Suspense } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

type Props = {
  children: React.ReactChild | React.ReactChild[];
  errorText: string;
};

const ErrorBoundary = (props: Props) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ReactErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          {props.errorText}
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      {props.children}
    </ReactErrorBoundary>
  );
};

export { ErrorBoundary };
