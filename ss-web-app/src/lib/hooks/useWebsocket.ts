import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const useWebsocket = () => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'ws://localhost:8080'
  );

  return { sendMessage, lastMessage, readyState };
};

export { useWebsocket };
