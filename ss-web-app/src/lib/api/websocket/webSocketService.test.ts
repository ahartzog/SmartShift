import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTestDeps } from 'dependencies/createTestEnv';
describe('Connects a websocket', () => {
  it('Initialized a websocket connection', async () => {});
});

//This apparently works
//@ts-ignore
setTimeout().__proto__.unref = function () {};
//I want to find a way to move above into a config file ^^
describe('Some tests for the store, idk', () => {
  it('uses a store', () => {
    const { demoStore } = createTestDeps().stores;
    expect(demoStore.daysBack).toEqual(10);
  });
});
