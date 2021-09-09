import { getAxiosFetch } from "lib/api/getAxiosFetch";
import { BugSnagService } from "lib/bugSnagService";
import type Config from "lib/config";

export class ApiService {
  axiosFetch: ReturnType<typeof getAxiosFetch>;
  #config: typeof Config;
  #bugSnagService: BugSnagService;

  constructor(bugSnagService: BugSnagService, config: typeof Config) {
    this.axiosFetch = getAxiosFetch(config, bugSnagService);
    this.#config = config;
    this.#bugSnagService = bugSnagService;
  }

  refreshAxiosFetch = () => {
    this.axiosFetch = getAxiosFetch(this.#config, this.#bugSnagService);
  };
}
