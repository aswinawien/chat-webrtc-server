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
  handleMessage(client: Socket, payload: { sender: string, room: string, message: string }): void {
    this.wss.to(payload.room).emit('messageClient', payload)
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
