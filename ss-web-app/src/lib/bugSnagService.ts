import Bugsnag, { BreadcrumbType } from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import type Config from 'lib/config';

class BugSnagService {
  config: typeof Config;

  constructor(config: typeof Config) {
    this.config = config;
    Bugsnag.start({
      apiKey: '2af58d5d671c0f374132d82723cd350c',
      plugins: [new BugsnagPluginReact()],
      maxBreadcrumbs: 50,
    });
  }

  notify = Bugsnag.notify;

  leaveBreadcrumb = (
    message: string,
    metadata?: { [key: string]: any },
    type?: BreadcrumbType
  ) => {
    if (this.config.ENV === 'development') {
      console.log('Breadcrumb:', message);
    }

    Bugsnag.leaveBreadcrumb(message, metadata, type);
  };
}

export { BugSnagService };
