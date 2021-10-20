import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'lib/config';
import type { BugSnagService } from 'lib/bugSnagService';
import { isArray } from 'lodash';
interface AxiosRequestConfigWithUrlRequired extends AxiosRequestConfig {
  url: string;
}

//So this service can only really work if the user is signed in...
const getAxiosFetch = (
  config: typeof Config,
  bugSnagService: BugSnagService
) => {
  const storedToken = window.localStorage.getItem(
    `${config.LOCAL_STORAGE_AUTH_KEY}-jwt-key`
  );

  bugSnagService.leaveBreadcrumb('Get axios fetch fired');

  const axiosFetch = async <T>(
    fetchConfig: AxiosRequestConfigWithUrlRequired
  ): Promise<AxiosResponse<T[]>> => {
    if (!storedToken) {
      throw new Error('No auth token found for axios fetch call itself');
    }
    try {
      bugSnagService.leaveBreadcrumb('Beginning axios fetch for URL', {
        url: fetchConfig.url,
      });
      const existingHeaders = fetchConfig.headers;
      const result = await axios({
        ...fetchConfig,
        headers: {
          ...existingHeaders,
          Authorization: `Bearer ${storedToken}`,
        },
        url: config.API_URL + fetchConfig.url,
      });

      //Make the output of this predicable - always an array
      if (!isArray(result.data)) {
        result.data = [result.data];
      }

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
