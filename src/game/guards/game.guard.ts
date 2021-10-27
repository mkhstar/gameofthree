import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class GameGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const fullName = client.handshake.auth.fullName;

    if (!fullName) throw new WsException('Full Name must be set');

    context.switchToWs().getData().fullName = fullName;
    return true;
  }
}
