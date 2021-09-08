import { observable, action, makeObservable } from "mobx";
import type { ApiService } from "lib/api/apiService";
import Config from "lib/config";
import { autorun } from "mobx";

class AuthStore {
  #apiService: ApiService;
  #config: typeof Config;
  constructor(apiService: ApiService, config: typeof Config) {
    makeObservable(this, {
      isLoggedIn: observable,
      setIsLoggedIn: action,
    });
    this.#apiService = apiService;
    this.#config = config;

    autorun(() => {
      if (this.isLoggedIn === true) {
        apiService.refreshAxiosFetch();
      } else {
        window.localStorage.removeItem(
          `${this.#config.LOCAL_STORAGE_AUTH_KEY}-jwt-key`
        );
        apiService.refreshAxiosFetch();
      }
    });
  }

  isLoggedIn = false;

  setIsLoggedIn = (isLoggedIn: boolean) => {
    this.isLoggedIn = isLoggedIn;
  };
}

export { AuthStore };
