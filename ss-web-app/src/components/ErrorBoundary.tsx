import { Button } from "antd";
import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "react-query";

type Props = {
  children: React.ReactChild | React.ReactChild[];
  errorText: string;
};

const ErrorBoundary = (props: Props) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ReactErrorBoundary
      onReset={reset}
      onError={(e) => {
        console.log("Error boundary caught: ", e);
      }}
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
