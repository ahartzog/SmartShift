import { apiService as apiServiceImport } from 'lib/api/apiService';
import { DemoStore } from 'lib/stores/DemoStore';
import { AuthStore } from 'lib/stores/AuthStore';
import { BugSnagService } from 'lib/bugSnagService';

class Dependencies {
  stores: {
    demoStore: DemoStore;
    authStore: AuthStore;
  };
  services: {
    bugSnagService: BugSnagService;
    apiService: typeof apiServiceImport;
  };
  didFinishSetup: boolean;

  constructor() {
    this.stores = {
      demoStore: new DemoStore(),
      authStore: new AuthStore(),
    };
    this.services = {
      bugSnagService: new BugSnagService(),
      apiService: apiServiceImport,
    };
    this.didFinishSetup = false;
  }

  extraSetup = async () => {
    //Run all asynchronous actions to populate the dependency class

    //When done setting up...
    this.didFinishSetup = true;
  };
}

export { Dependencies };
