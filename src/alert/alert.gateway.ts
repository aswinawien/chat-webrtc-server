import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: 'alert' })
export class AlertGateway {
    @WebSocketServer() wss: Server;

    private logger: Logger

    sendToAll(dto: { message: string }): void {
        this.wss.emit('alertClient', dto)
    };
}
