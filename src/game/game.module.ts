import { Module } from '@nestjs/common';
import { SocketUserModule } from '../socket-user/socket-user.module';
import { GameGateway } from './gateways/game.gateway';
import { GameService } from './services/game.service';

@Module({ providers: [GameGateway, GameService], imports: [SocketUserModule] })
export class GameModule {}
