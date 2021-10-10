import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  MessageBody,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway(8080)
export class EmployeeGateway {
  //https://github.com/nestjs/nest/blob/master/sample/16-gateways-ws/src/events/events.gateway.ts
  @WebSocketServer()
  server: Server;
  constructor() {
    //this.interval();
  }
  // @SubscribeMessage('')
  // listenForMessages(@MessageBody() data: string) {
  //   this.server.sockets.emit('receive_message', data);
  // }

  onRecieved() {
    this.server.on('', (ws) => {
      ws.send('Hi!');
    });
  }
  interval() {
    setInterval(() => {
      console.log('interval firing...');
      // this.server.addListener('employee', (ws) => {
      //   ws.send('GO');
      // });
      //this.server.
    }, 5000);
  }

  @SubscribeMessage('employee')
  onEvent(@MessageBody() data: string): WsResponse<unknown> {
    console.log('data in WS?', data);

    return { event: 'employee', data: 'nooooooo' };

    // return from([1, 2, 3]).pipe(
    //   map((item) => ({ event: 'events', data: item })),
    // );
  }

  @SubscribeMessage('connected')
  onConnected(@MessageBody() data: string): WsResponse<unknown> {
    return { event: 'connected', data: 'Server confirms you are connected' };

    // return from([1, 2, 3]).pipe(
    //   map((item) => ({ event: 'events', data: item })),
    // );
  }

  // @SubscribeMessage('employee')
  // onEvent(client: any, data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }

  // @SubscribeMessage('events')
  // onEventEvent(client: any, data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }
}
