import React from 'react';
import { DependencyContext } from './DependencyContext';
import { Dependencies } from './Dependencies';
const createTestDeps = (): Dependencies => {
  const deps = new Dependencies();
  //@ts-ignore
  deps.config = {
    LOCAL_STORAGE_AUTH_KEY: '@SmartShift:webapp',
  };

  return deps;
};

interface TestEnvProps {
  children: React.ReactNode;
  dependencies: Dependencies;
}

const TestEnvProvider = ({ children, dependencies }: TestEnvProps) => {
  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  );
};

export { TestEnvProvider, createTestDeps };
