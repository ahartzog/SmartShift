import { getAxiosFetch } from 'lib/api/getAxiosFetch';
import { BugSnagService } from 'lib/bugSnagService';
import type Config from 'lib/config';
import type { AuthStore } from 'lib/stores/AuthStore';
import { autorun } from 'mobx';

export class ApiService {
  axiosFetch: ReturnType<typeof getAxiosFetch>;
  #config: typeof Config;
  #bugSnagService: BugSnagService;
  #authStore: AuthStore;

  constructor(
    bugSnagService: BugSnagService,
    config: typeof Config,
    authStore: AuthStore
  ) {
    this.axiosFetch = getAxiosFetch(config, bugSnagService);
    this.#config = config;
    this.#bugSnagService = bugSnagService;
    this.#authStore = authStore;

    autorun(() => {
      console.log('auto run ran...');
      console.log('Is logged in?', this.#authStore.isLoggedIn);
      if (this.#authStore.isLoggedIn) {
        console.log('refresh the axios fetch function');
        this.refreshAxiosFetch();
      }
    });
  }

  refreshAxiosFetch = () => {
    this.axiosFetch = getAxiosFetch(this.#config, this.#bugSnagService);
  };
}
