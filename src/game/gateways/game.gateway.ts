import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { nanoid } from 'nanoid';
import { Socket, Server } from 'socket.io';
import { SocketUserService } from 'src/socket-user/socket-user.service';
import { GameFlow } from '../dto/game-flow.dto';
import { GameSetup } from '../dto/game-setup.dto';
import { GameGuard } from '../guards/game.guard';
import { GameService } from '../services/game.service';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer() io: Server;

  private logger: Logger = new Logger('GameGateway');

  constructor(
    private gameService: GameService,
    private socketUserService: SocketUserService,
  ) {}

  @UseGuards(GameGuard)
  @SubscribeMessage('game-setup')
  async handleGameSetup(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: GameSetup,
  ) {
    const { type, fullName } = data;

    if (type === 'CREATE_NEW_GAME') {
      const roomId = nanoid();
      await socket.join(roomId);
      return this.io.to(socket.id).emit('NEW_GAME_ROOM_CREATED', roomId);
    }

    if (type === 'JOIN_GAME_ROOM') {
      const socketIds = this.io.of('/').adapter.rooms.get(data.roomId);
      if (!socketIds) throw new WsException('Game room does not exist');
      if (socketIds.size >= 2) throw new WsException('Game room is full');

      await socket.join(data.roomId);
      return this.io
        .to(data.roomId)
        .emit('JOINED_GAME_ROOM', fullName, socket.id, data.roomId);
    }
    if (type === 'LEAVE_GAME_ROOM') {
      await socket.leave(data.roomId);
      return this.io
        .to(data.roomId)
        .emit('LEFT_GAME_ROOM', fullName, socket.id);
    }
  }

  @UseGuards(GameGuard)
  @SubscribeMessage('game-flow')
  async handleGameFlow(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: GameFlow,
  ) {
    const { type, fullName } = data;

    if (type === 'INITIALIZE_GAME') {
      this.gameService.initializeGame(data.roomId, data.initialNumber);

      return this.io
        .to(data.roomId)
        .emit('GAME_INITIALIZED', fullName, socket.id);
    }

    if (type === 'GAME_OPERATION') {
      const gameState = this.gameService.gameOperation(
        data.roomId,
        data.selectedNumber,
      );

      const gameOver = [1, -1].includes(gameState);

      if (!gameOver)
        return this.io.to(data.roomId).emit('GAME_FLOW', socket.id);

      const socketId =
        gameState === 1
          ? socket.id
          : [...this.io.of('/').adapter.rooms.get(data.roomId)!.values()].find(
              (v) => v !== socket.id,
            );

      return this.io
        .to(data.roomId)
        .emit(
          'GAME_OVER',
          socketId,
          socketId === socket.id
            ? fullName
            : this.socketUserService.getUser(socketId!)?.fullName,
        );
    }
  }

  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(socket: Socket) {
    this.socketUserService.removeUser(socket.id);
    this.logger.log(`socket disconnected: ${socket.id}`);
  }

  handleConnection(socket: Socket) {
    const fullName = socket.handshake.auth.fullName;

    if (fullName) {
      this.socketUserService.setUser(socket.id, fullName);
    }
    this.logger.log(`socket connected: ${socket.id}`);

    socket.on('disconnecting', () => {
      const rooms = this.io.of('/').adapter.socketRooms(socket.id);

      if (rooms && rooms.size > 1) {
        for (const room of rooms) {
          const members = this.io.of('/').adapter.rooms.get(room);

          if (members && members.size > 1) {
            members.forEach((member) => {
              if (socket.id !== member) {
                this.io
                  .to(room)
                  .emit(
                    'GAME_OVER',
                    member,
                    this.socketUserService.getUser(member),
                  );
              }
            });
          }
        }
      }
    });
  }
}
