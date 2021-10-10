import { useContext } from 'react';
import { DependencyContext } from 'DependencyContext';

const useDependencies = () => {
  const dependencies = useContext(DependencyContext);

  return dependencies;
};

export { useDependencies };
