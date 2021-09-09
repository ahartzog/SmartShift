import { ApiService } from "lib/api/apiService";
import { DemoStore } from "lib/stores/DemoStore";
import { AuthStore } from "lib/stores/AuthStore";
import { BugSnagService } from "lib/bugSnagService";
import Config from "lib/config";
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

    const apiService = new ApiService(bugSnagService, Config);
    const authStore = new AuthStore(apiService, Config);
    this.stores = {
      demoStore: new DemoStore(),
      authStore: authStore,
    };
    this.services = {
      bugSnagService,
      apiService,
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
