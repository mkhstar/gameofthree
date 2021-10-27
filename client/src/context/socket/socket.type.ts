import {
  SET_SOCKET_CONNECTED,
  SET_JOIN_ROOM,
  SET_SHOULD_INITIALIZE_NUMBER,
  SET_GAME_OVER,
  SET_WAITING_FOR_OTHER_USER_INPUT,
  SET_SETTING_INITIAL_NUMBER,
  SET_OTHER_PLAYER,
  SET_GAME_WON_BY,
  REMOVE_GAME_WON_BY,
  REMOVE_OTHER_PLAYER,
  REMOVE_ROOM_ID,
  SET_ROOM_ID,
  SET_SOCKET_CONNECTING,
  SET_SNACKBAR,
  REMOVE_SNACKBAR,
  RESET_SOCKET_STATE,
  SET_AUTO_PLAY,
  SET_RANDOM_RESPONSE,
  REMOVE_RANDOM_RESPONSE,
} from "./socket.constant";

interface Player {
  id: string;
  fullName: string;
}

interface SnackBarInfo {
  type: "error" | "success";
  message: string;
}
export interface SocketState {
  connected: boolean;
  connecting: boolean;
  autoplay: boolean;
  randomResponse: number | null;
  randomTimerId: NodeJS.Timeout | null;
  roomId: string | null;
  joinRoom: boolean;
  shouldInitializeNumber: boolean;
  gameOver: boolean;
  waitingForOtherUserInput: boolean;
  settingInitialNumber: boolean;
  otherPlayer: Player | null;
  gameWonBy: Player | null;
  snackbar: SnackBarInfo | null;
}

export interface SocketAction {
  setConnecting(value: boolean): void;
  setSnackbar(info: SnackBarInfo): void;
  setConnected(value: boolean): void;
  setAutoPlay(value: boolean): void;
  setRandomResponse(timerId: NodeJS.Timeout, value: number): void;
  setRoomId(roomId: string): void;
  resetSocketState(): void;
  removeRandomResponse(): void;
  removeSnackbar(): void;
  removeRoomId(): void;
  removeGameWonBy(): void;
  removeOtherPlayer(): void;
  setJoinRoom(value: boolean): void;
  setShouldInitializeNumber(value: boolean): void;
  setGameOver(value: boolean): void;
  setWaitingForOtherUserInput(value: boolean): void;
  setSettingInitialNumber(value: boolean): void;
  setOtherPlayer(player: Player): void;
  setGameWonBy(player: Player): void;
}

export type SocketDispatch =
  | {
      type:
        | typeof SET_SOCKET_CONNECTED
        | typeof SET_SOCKET_CONNECTING
        | typeof SET_JOIN_ROOM
        | typeof SET_SHOULD_INITIALIZE_NUMBER
        | typeof SET_GAME_OVER
        | typeof SET_AUTO_PLAY
        | typeof SET_WAITING_FOR_OTHER_USER_INPUT
        | typeof SET_SETTING_INITIAL_NUMBER;
      payload: boolean;
    }
  | {
      type: typeof SET_OTHER_PLAYER | typeof SET_GAME_WON_BY;
      payload: Player;
    }
  | {
      type: typeof SET_ROOM_ID;
      payload: string;
    }
  | {
      type: typeof SET_RANDOM_RESPONSE;
      payload: { timerId: NodeJS.Timeout; value: number };
    }
  | {
      type:
        | typeof REMOVE_GAME_WON_BY
        | typeof REMOVE_RANDOM_RESPONSE
        | typeof RESET_SOCKET_STATE
        | typeof REMOVE_SNACKBAR
        | typeof REMOVE_OTHER_PLAYER
        | typeof REMOVE_ROOM_ID;
    }
  | {
      type: typeof SET_SNACKBAR;
      payload: SnackBarInfo;
    };

export interface AppSocketType {
  socketState: SocketState;
  socketDispatch: React.Dispatch<SocketDispatch>;
  socketAction: SocketAction;
}
