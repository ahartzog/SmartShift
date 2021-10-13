import React from 'react';
import type { Dependencies } from './Dependencies';

export const DependencyContext = React.createContext<Dependencies>(
  //@ts-ignore
  null as Dependencies
);
