import { Controller, Post, Req, Body, HttpCode } from '@nestjs/common';
import { AlertGateway } from './alert.gateway';

@Controller('alert')
export class AlertController {
    constructor(
        private readonly alertGateway: AlertGateway
    ) {
    }

    @Post()
    @HttpCode(200)
    sendAlert(
        @Body() dto: { message: string }): { message: string } {
        this.alertGateway.sendToAll(dto)
        return dto
    }
}
