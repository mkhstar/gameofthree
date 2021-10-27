import { Module } from '@nestjs/common';
import { SocketUserService } from './socket-user.service';

@Module({
  providers: [SocketUserService],
  exports: [SocketUserService],
})
export class SocketUserModule {}
