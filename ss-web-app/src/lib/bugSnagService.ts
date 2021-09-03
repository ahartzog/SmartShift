import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

class BugSnagService {
  constructor() {
    Bugsnag.start({
      apiKey: '2af58d5d671c0f374132d82723cd350c',
      plugins: [new BugsnagPluginReact()],
    });
  }

  //Is this the correct way to export these? Is there a more a elegant way?
  Event = Bugsnag.Event;
  Breadcrumb = Bugsnag.Breadcrumb;
  Session = Bugsnag.Session;
}

export { BugSnagService };
