import { ApiService } from 'lib/api/apiService';
import { DemoStore } from 'lib/stores/DemoStore';
import { AuthStore } from 'lib/stores/AuthStore';
import { BugSnagService } from 'lib/bugSnagService';
import Config from 'lib/config';
class Dependencies {
  stores: {
    demoStore: DemoStore;
    authStore: AuthStore;
  };
  config: typeof Config;
  services: {
    bugSnagService: BugSnagService;
    apiService: ApiService;
  };
  didFinishSetup: boolean;

  constructor() {
    const bugSnagService = new BugSnagService(Config);
    const authStore = new AuthStore();
    this.stores = {
      demoStore: new DemoStore(),
      authStore: authStore,
    };
    this.services = {
      bugSnagService: bugSnagService,
      apiService: new ApiService(bugSnagService, Config, authStore),
    };
    this.didFinishSetup = false;
    this.config = Config;
  }

  extraSetup = async () => {
    //Run all asynchronous actions to populate the dependency class

    //When done setting up...
    this.didFinishSetup = true;
  };
}

export { Dependencies };
