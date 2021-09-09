import { observable, action, makeObservable } from "mobx";
import type { ApiService } from "lib/api/apiService";
import Config from "lib/config";
import { autorun } from "mobx";

class AuthStore {
  #apiService: ApiService;
  #config: typeof Config;
  #jwtKey: string;

  constructor(apiService: ApiService, config: typeof Config) {
    makeObservable(this, {
      isLoggedIn: observable,
      setIsLoggedIn: action,
    });
    this.#apiService = apiService;
    this.#config = config;
    this.#jwtKey = `${this.#config.LOCAL_STORAGE_AUTH_KEY}-jwt-key`;
    console.log("Constructor is setting...");
    this.setIsLoggedIn(window.localStorage.getItem(this.#jwtKey) !== null);
  }

  isLoggedIn = false;

  setIsLoggedIn = (isLoggedIn: boolean) => {
    this.isLoggedIn = isLoggedIn;
    this.#apiService.refreshAxiosFetch();
    console.log("Set is logged in:", isLoggedIn);
    if (isLoggedIn === false) {
      window.localStorage.removeItem(this.#jwtKey);
    }
  };
}

export { AuthStore };
