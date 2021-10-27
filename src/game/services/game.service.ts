import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

interface GameState {
  currentNumber: number;
}

@Injectable()
export class GameService {
  private roomGameStates: Map<string, GameState> = new Map();

  public getRoomGameState(roomId: string) {
    return this.roomGameStates.get(roomId);
  }

  public initializeGame(roomId: string, num: number) {
    this.roomGameStates.set(roomId, {
      currentNumber: num,
    });

    return this.roomGameStates.get(roomId);
  }

  public removeRoom(roomId: string) {
    return this.roomGameStates.delete(roomId);
  }

  public gameOperation(roomId: string, num: 1 | 0 | -1) {
    const gameState = this.roomGameStates.get(roomId);

    if (!gameState) throw new WsException('Game state not found');

    if (gameState.currentNumber === 1) throw new WsException('Game Over');

    const nextNumber = (gameState.currentNumber + num) / 3;

    if (!Number.isInteger(nextNumber)) return -1;

    this.roomGameStates.set(roomId, {
      ...gameState,
      currentNumber: nextNumber,
    });

    if (nextNumber === 1) return 1;
    return 0;
  }
}
