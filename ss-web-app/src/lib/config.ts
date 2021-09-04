// This pulls in values defined in /.deploy/.env.XXX, set by the build scripts. See README.md for details
// Everything is pulled in via string, you must convert to bool/number as needed here
const config = {
  ENV: process.env.REACT_APP_ENV,
  LOCAL_STORAGE_AUTH_KEY: process.env.REACT_APP_LOCAL_STORAGE_AUTH_KEY,
  API_URL: process.env.REACT_APP_API_URL,
  BUGSNAG_KEY: process.env.REACT_APP_BUGSNAG_KEY,
  ALARM_FETCH_RESPONSE_MAX_TIME_MS:
    process.env.REACT_APP_ALARM_FETCH_RESPONSE_MAX_TIME_MS,
};

export { config };
