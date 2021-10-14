import { createTestDeps } from 'dependencies/createTestEnv';

describe('Tests for the authStore', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('Confirms default state of authStore isLoggedIn is false', () => {
    const { authStore } = createTestDeps().stores;
    expect(authStore.isLoggedIn).toEqual(false);
  });

  it('Confirms the user is logged in if the localstorage JWT exists before deps initialization', () => {
    localStorage.setItem(`@SmartShift:webapp-jwt-key`, 'FakeToken');
    const deps = createTestDeps();
    const { authStore } = deps.stores;
    expect(authStore.isLoggedIn).toEqual(true);
  });

  it('Confirms we can log the user in', () => {
    const deps = createTestDeps();
    const { authStore } = deps.stores;
    expect(authStore.isLoggedIn).toEqual(false);
    authStore.setJwtIntoStore('FakeToken');
    expect(authStore.isLoggedIn).toEqual(true);
    expect(window.localStorage.getItem(authStore.jwtKey)).toEqual('FakeToken');
  });

  it('Confirms that we can set login', () => {
    const { authStore } = createTestDeps().stores;
    authStore.setIsLoggedIn(true);
    expect(authStore.isLoggedIn).toEqual(true);
  });
});
