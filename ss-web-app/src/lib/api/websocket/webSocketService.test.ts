import { createTestDeps } from 'dependencies/createTestEnv';
describe('Connects a websocket', () => {
  it('Initialized a websocket connection', async () => {});

  const { websocketService } = createTestDeps().services;
  console.log('service socket?', websocketService.readyState);
});
