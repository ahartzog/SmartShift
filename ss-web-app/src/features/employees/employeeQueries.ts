import { config } from 'lib/config';
import axios from 'axios';

const getEmployees = async () => {
  const retval = await axios({
    url: config.API_URL + '/',
    method: 'get',
    data: {
      foo: 'bar',
    },
  });
};
