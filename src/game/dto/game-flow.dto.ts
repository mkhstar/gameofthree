import { BaseDataDto } from './base-data.dto';

interface InitializeGame extends BaseDataDto {
  type: 'INITIALIZE_GAME';
  roomId: string;
  initialNumber: number;
}

interface GameOperation extends BaseDataDto {
  type: 'GAME_OPERATION';
  roomId: string;
  selectedNumber: -1 | 0 | 1;
}

export type GameFlow = InitializeGame | GameOperation;
