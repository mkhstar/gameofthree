import {
  REMOVE_GAME_WON_BY,
  REMOVE_OTHER_PLAYER,
  REMOVE_RANDOM_RESPONSE,
  REMOVE_ROOM_ID,
  REMOVE_SNACKBAR,
  RESET_SOCKET_STATE,
  SET_AUTO_PLAY,
  SET_GAME_OVER,
  SET_GAME_WON_BY,
  SET_JOIN_ROOM,
  SET_OTHER_PLAYER,
  SET_RANDOM_RESPONSE,
  SET_ROOM_ID,
  SET_SETTING_INITIAL_NUMBER,
  SET_SHOULD_INITIALIZE_NUMBER,
  SET_SNACKBAR,
  SET_SOCKET_CONNECTED,
  SET_SOCKET_CONNECTING,
  SET_WAITING_FOR_OTHER_USER_INPUT,
} from "./socket.constant";
import { SocketDispatch, SocketState } from "./socket.type";

export const initialState: SocketState = {
  connected: false,
  connecting: false,
  autoplay: false,
  roomId: null,
  randomResponse: null,
  randomTimerId: null,
  joinRoom: false,
  shouldInitializeNumber: false,
  gameOver: false,
  waitingForOtherUserInput: false,
  settingInitialNumber: false,
  otherPlayer: null,
  gameWonBy: null,
  snackbar: null,
};

const socketReducer = (
  state: SocketState = initialState,
  action: SocketDispatch
): SocketState => {
  switch (action.type) {
    case RESET_SOCKET_STATE:
      return initialState;
    case SET_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    case SET_AUTO_PLAY:
      return {
        ...state,
        autoplay: action.payload,
      };
    case SET_RANDOM_RESPONSE:
      return {
        ...state,
        randomResponse: action.payload.value,
        randomTimerId: action.payload.timerId,
      };
    case REMOVE_RANDOM_RESPONSE:
      return {
        ...state,
        randomTimerId: null,
        randomResponse: null,
      };
    case REMOVE_SNACKBAR:
      return {
        ...state,
        snackbar: null,
      };
    case SET_SOCKET_CONNECTING:
      return {
        ...state,
        connecting: action.payload,
      };
    case SET_SOCKET_CONNECTED:
      return {
        ...state,
        connected: action.payload,
      };
    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };
    case SET_GAME_OVER:
      return {
        ...state,
        gameOver: action.payload,
      };
    case SET_GAME_WON_BY:
      return {
        ...state,
        gameWonBy: action.payload,
      };
    case SET_JOIN_ROOM:
      return {
        ...state,
        joinRoom: action.payload,
      };
    case SET_OTHER_PLAYER:
      return {
        ...state,
        otherPlayer: action.payload,
      };
    case SET_SETTING_INITIAL_NUMBER:
      return {
        ...state,
        settingInitialNumber: action.payload,
      };
    case SET_SHOULD_INITIALIZE_NUMBER:
      return {
        ...state,
        shouldInitializeNumber: action.payload,
      };
    case SET_WAITING_FOR_OTHER_USER_INPUT:
      return {
        ...state,
        waitingForOtherUserInput: action.payload,
      };
    case REMOVE_ROOM_ID:
      return {
        ...state,
        roomId: null,
      };
    case REMOVE_GAME_WON_BY:
      return {
        ...state,
        gameWonBy: null,
      };
    case REMOVE_OTHER_PLAYER:
      return {
        ...state,
        otherPlayer: null,
      };

    default:
      throw Error("Action not implemented in reducer");
  }
};

export default socketReducer;
