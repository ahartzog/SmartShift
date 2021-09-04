import { observable, action, makeObservable } from 'mobx';

class AuthStore {
  constructor() {
    makeObservable(this, {
      isLoggedIn: observable,
      setIsLoggedIn: action,
    });
  }

  isLoggedIn = false;

  setIsLoggedIn = (isLoggedIn: boolean) => {
    this.isLoggedIn = isLoggedIn;
  };
}

export { AuthStore };
