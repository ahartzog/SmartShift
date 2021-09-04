import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'lib/config';
import type { BugSnagService } from 'lib/bugSnagService';

interface AxiosRequestConfigWithUrlRequired extends AxiosRequestConfig {
  url: string;
}

const getAxiosFetch = (
  config: typeof Config,
  bugSnagService: BugSnagService
) => {
  //Ok wait I should be getting Config from dependancy?
  const axiosFetch = async (
    fetchConfig: AxiosRequestConfigWithUrlRequired
  ): Promise<AxiosResponse<any>> => {
    try {
      bugSnagService.leaveBreadcrumb('Beginning axios fetch for URL', {
        url: fetchConfig.url,
      });
      const result = await axios({
        ...fetchConfig,
        url: config.API_URL + fetchConfig.url,
      });

      return result;
    } catch (e: any) {
      console.error('Error in axios fetch:', e);
      bugSnagService.notify(e);
      throw e;
    }
  };

  return axiosFetch;
};

export { getAxiosFetch };
