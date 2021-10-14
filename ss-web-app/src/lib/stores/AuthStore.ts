import { observable, action, makeObservable } from 'mobx';
import type { ApiService } from 'lib/api/apiService';
import Config from 'lib/config';
import { autorun } from 'mobx';

class AuthStore {
  #apiService: ApiService;
  #config: typeof Config;
  jwtKey: string;

  constructor(apiService: ApiService, config: typeof Config) {
    makeObservable(this, {
      isLoggedIn: observable,
      setIsLoggedIn: action,
      setJwtIntoStore: action,
    });
    this.#apiService = apiService;
    this.#config = config;
    this.jwtKey = `@SmartShift:webapp-jwt-key`;

    const jwtToken = localStorage.getItem(this.jwtKey);
    if (jwtToken) {
      this.setIsLoggedIn(true);
    }
  }

  isLoggedIn = false;

  setJwtIntoStore = (token: string) => {
    window.localStorage.setItem(this.jwtKey, token);
    this.setIsLoggedIn(true);
  };

  setIsLoggedIn = (isLoggedIn: boolean) => {
    this.isLoggedIn = isLoggedIn;
    this.#apiService.refreshAxiosFetch();
    //console.log('Set is logged in:', isLoggedIn);
    if (isLoggedIn === false) {
      window.localStorage.removeItem(this.jwtKey);
    }
  };
}

export { AuthStore };
