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

  // @SubscribeMessage('')
  // listenForMessages(@MessageBody() data: string) {
  //   this.server.sockets.emit('receive_message', data);
  // }

  onRecieved() {
    this.server.on('connection', (ws) => {
      ws.send('Hi!');
    });
  }

  @SubscribeMessage('employee')
  onEvent(@MessageBody() data: string): WsResponse<unknown> {
    console.log('client?', data);

    return { event: 'employee', data: 'noooo' };

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
