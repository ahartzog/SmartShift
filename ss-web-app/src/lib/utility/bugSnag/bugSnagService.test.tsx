import React from 'react';
import { BugSnagService } from './bugSnagService';
import type Config from 'lib/config';

//Per https://github.com/bugsnag/bugsnag-js/issues/452#issuecomment-449418103
//@ts-ignore
setTimeout().__proto__.unref = function () {};

const demoConfig = {
  ENV: 'development',
} as typeof Config;

const bugSnagService = new BugSnagService(demoConfig);

it('adds 1 + 2 to equal 3', () => {
  const one = 1;
  const two = 2;
  expect(one + two).toBe(3);
});

it('console.logs breadcrumbs since we are in dev mode', () => {
  bugSnagService.leaveBreadcrumb('Hello Breadcrumb World');
  const consoleSpy = jest.spyOn(console, 'log');
  expect(consoleSpy).toHaveBeenCalledWith('Breadcrumb: Hello Breadcrumb World');
  // expect(console.log).toHaveBeenCalledWith('Hello Breadcrumb World');
});
