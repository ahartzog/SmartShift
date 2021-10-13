import React from 'react';
import { DependencyContext } from './DependencyContext';
import { Dependencies } from './Dependencies';
const createTestEnv = () => {
  //
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
