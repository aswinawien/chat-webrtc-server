import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway')


  afterInit(server: Server): void {
    this.logger.log('Initialized')
  }


  handleConnection(client: Socket, args: any[]): void {
    this.logger.log(`Client Connected : ${client.id}`)
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Cliend Disconnected : ${client.id}`)
  }

  @SubscribeMessage('messageServer')
  handleMessage(client: Socket, room: string, payload: { sender: string, message: string }): void {
    this.wss.to(room).emit('messageClient', payload)
    // return client.emit('message', payload)
    // return { event: 'messageClient', data: payload };
  }

  @SubscribeMessage('joinRoom')
  handleJoin(client: Socket, room: string) {
    client.join(room)
    client.emit('joinedRoom', room)
  }

  @SubscribeMessage('leaveRoom')
  handleLeave(client: Socket, room: string) {
    client.leave(room)
    client.emit('leftRoom', room)
  }

}
