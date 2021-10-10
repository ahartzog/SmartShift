import React from 'react';
import { useDependencies } from 'lib/hooks';

const WebhookTest = () => {
  const dependencies = useDependencies();

  const sendMessage = () => {
    console.log(
      'Ready state?',
      dependencies.services.websocketService.readyState
    );
    dependencies.services.websocketService.send('cats');
  };

  return (
    <div>
      <button onClick={dependencies.services.websocketService.reconnect}>
        Re-connect WS
      </button>

      <button onClick={sendMessage}>Send WS Message</button>
    </div>
  );

  return null;
};

export { WebhookTest };
