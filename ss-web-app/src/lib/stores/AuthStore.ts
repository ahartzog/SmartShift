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
    autorun(() => {
      console.log("Is logged in changed; autorun");
      if (this.isLoggedIn === true) {
        apiService.refreshAxiosFetch();
      } else {
        window.localStorage.removeItem(this.#jwtKey);
        apiService.refreshAxiosFetch();
      }
    });
    console.log("Is logged in??", window.localStorage.getItem(this.#jwtKey));
    this.setIsLoggedIn(window.localStorage.getItem(this.#jwtKey) !== null);
  }

  isLoggedIn = false;

  setIsLoggedIn = (isLoggedIn: boolean) => {
    this.isLoggedIn = isLoggedIn;
  };
}

export { AuthStore };
