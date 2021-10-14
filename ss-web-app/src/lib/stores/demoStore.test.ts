import { createTestDeps } from 'dependencies/createTestEnv';

describe('Some tests for the store, idk', () => {
  it('uses a store', () => {
    const { demoStore } = createTestDeps().stores;
    expect(demoStore.daysBack).toEqual(10);
  });
});
