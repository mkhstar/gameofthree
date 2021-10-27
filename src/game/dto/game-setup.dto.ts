import { BaseDataDto } from './base-data.dto';

interface CreateNewGame extends BaseDataDto {
  type: 'CREATE_NEW_GAME';
}

interface JoinGameRoom extends BaseDataDto {
  type: 'JOIN_GAME_ROOM';
  roomId: string;
}

interface LeaveGameRoom extends BaseDataDto {
  type: 'LEAVE_GAME_ROOM';
  roomId: string;
}

interface RestartGame extends BaseDataDto {
  type: 'RESTART_GAME';
  roomId: string;
}

export type GameSetup =
  | CreateNewGame
  | JoinGameRoom
  | LeaveGameRoom
  | RestartGame;
