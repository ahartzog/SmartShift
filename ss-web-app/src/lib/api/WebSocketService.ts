import type Config from 'lib/config';

// export enum WebSocketMessageTypes {
//   NOTIFY,
//   INVALIDATE_CACHE,
// }
type PayloadTypes = string | InvalidateQueryCacheKeyPayload;

//https://tkdodo.eu/blog/using-web-sockets-with-react-query
interface InvalidateQueryCacheKeyPayload {
  data: Record<string, unknown>;
}

// const isPayloadObject = (
//   payload: PayloadTypes
// ): string | InvalidateQueryCacheKeyPayload => {
//   if (typeof payload === 'string') {
//     return payload as string;
//   }

//   return payload as InvalidateQueryCacheKeyPayload;
// };

export type WebsocketAction =
  | { type: 'NOTIFY'; payload: string }
  | { type: 'INVALIDATE_CACHE'; payload: InvalidateQueryCacheKeyPayload };

class WebSocketService {
  #config: typeof Config;

  #socket: WebSocket;
  constructor(config: typeof Config) {
    this.#config = config;
    //Connect to the socket

    //= new WebSocket('ws://localhost:8080');

    this.#socket = new WebSocket('ws://localhost:8080');

    console.log('socket??', this.#socket);
    this.#socket.onopen = this.onOpen;

    this.#socket.onmessage = this.onMessage;
    this.#socket.onclose = this.onClose;
    this.#socket.onerror = this.onError;
  }

  get readyState() {
    return this.#socket.readyState;
  }

  messageReceivedHandler = (e: WebsocketAction) => {
    if (e.type === 'NOTIFY') {
      //Do whatever I need to do with the payload
    }
    if (e.type === 'INVALIDATE_CACHE') {
      const payload = e.payload;
      //Perform invalidation action
    }
  };

  send = (message: string) => {
    console.log('Attempting to send...', message);
    console.log('ready state?', this.readyState);

    this.#socket.send(
      JSON.stringify({
        event: 'employee',
        message: 'hello',
      })
    );
  };

  onMessage = (message: any) => {
    console.log('message recieved', message);
  };

  onOpen = () => {
    console.log('Websocket opened');
    this.#socket.send('Hello!');
  };

  onClose = () => {
    console.log('Websocket closed');
  };

  onError = (ev: any) => {
    console.log('Error event:', ev);
  };
}

export { WebSocketService };
