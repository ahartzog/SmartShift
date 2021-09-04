import { useEmployees } from 'features/employees/employeeQueries';
import { getAxiosFetch } from 'lib/api/getAxiosFetch';
import type { BugSnagService } from 'lib/bugSnagService';
import Config from 'lib/config';

export class ApiService {
  axiosFetch: ReturnType<typeof getAxiosFetch>;
  hooks: {
    useEmployees: typeof useEmployees;
  };

  constructor(bugSnagService: BugSnagService, config: typeof Config) {
    this.axiosFetch = getAxiosFetch(config, bugSnagService);
    this.hooks = {
      useEmployees: useEmployees,
    };
  }
}
