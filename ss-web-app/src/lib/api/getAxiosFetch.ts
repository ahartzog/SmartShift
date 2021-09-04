import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'lib/config';
import { BugSnagService } from 'lib/bugSnagService';

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
      const result = await axios({
        ...fetchConfig,
        url: config.API_URL + fetchConfig.url,
      });

      return result;
    } catch (e) {
      console.error('Error in axios fetch:', e);

      throw e;
    }
  };

  return axiosFetch;
};

export { getAxiosFetch };
