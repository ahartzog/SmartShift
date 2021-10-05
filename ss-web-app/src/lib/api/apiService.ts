import { getAxiosFetch } from 'lib/api/getAxiosFetch';
import { BugSnagService } from 'lib/bugSnagService';
import type Config from 'lib/config';

export class ApiService {
  axiosFetch: ReturnType<typeof getAxiosFetch>;
  #config: typeof Config;
  #bugSnagService: BugSnagService;

  constructor(bugSnagService: BugSnagService, config: typeof Config) {
    this.axiosFetch = getAxiosFetch(config, bugSnagService);
    this.#config = config;
    this.#bugSnagService = bugSnagService;
  }

  //This is used to ensure our axios service has the JWT token once it's set by the login flow
  refreshAxiosFetch = () => {
    this.axiosFetch = getAxiosFetch(this.#config, this.#bugSnagService);
  };
}
