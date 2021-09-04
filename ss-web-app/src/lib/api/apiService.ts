import { getAxiosFetch } from 'lib/api/getAxiosFetch';
import { BugSnagService } from 'lib/bugSnagService';
import type Config from 'lib/config';

export class ApiService {
  axiosFetch: ReturnType<typeof getAxiosFetch>;

  constructor(bugSnagService: BugSnagService, config: typeof Config) {
    this.axiosFetch = getAxiosFetch(config, bugSnagService);
  }
}
