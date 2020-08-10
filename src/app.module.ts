import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [ChatModule, AlertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
