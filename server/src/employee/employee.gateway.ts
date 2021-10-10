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
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('')
  listenForMessages(@MessageBody() data: string) {
    this.server.sockets.emit('receive_message', data);
  }

  @SubscribeMessage('employee')
  listenForEmployeeMessages(@MessageBody() data: string) {
    this.server.sockets.emit('receive_message', data);
  }

  @SubscribeMessage('employee')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }
}
