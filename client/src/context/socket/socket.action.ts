import React from "react";
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
import { SocketAction, SocketDispatch } from "./socket.type";

export default function socketAction(
  dispatch: React.Dispatch<SocketDispatch>
): SocketAction {
  return {
    setSnackbar(info) {
      dispatch({ type: SET_SNACKBAR, payload: info });
    },
    setAutoPlay(value) {
      dispatch({ type: SET_AUTO_PLAY, payload: value });
    },
    setRandomResponse(timerId, value) {
      dispatch({ type: SET_RANDOM_RESPONSE, payload: { timerId, value } });
    },
    removeRandomResponse() {
      dispatch({ type: REMOVE_RANDOM_RESPONSE });
    },
    resetSocketState() {
      dispatch({ type: RESET_SOCKET_STATE });
    },
    removeSnackbar() {
      dispatch({ type: REMOVE_SNACKBAR });
    },
    setConnecting(value: boolean) {
      dispatch({ type: SET_SOCKET_CONNECTING, payload: value });
    },
    setConnected(value: boolean) {
      dispatch({ type: SET_SOCKET_CONNECTED, payload: value });
    },
    setRoomId(roomId: string) {
      dispatch({ type: SET_ROOM_ID, payload: roomId });
    },
    setGameOver(value) {
      dispatch({ type: SET_GAME_OVER, payload: value });
    },
    setGameWonBy(player) {
      dispatch({ type: SET_GAME_WON_BY, payload: player });
    },
    setJoinRoom(value) {
      dispatch({ type: SET_JOIN_ROOM, payload: value });
    },
    setOtherPlayer(value) {
      dispatch({ type: SET_OTHER_PLAYER, payload: value });
    },
    setSettingInitialNumber(value) {
      dispatch({ type: SET_SETTING_INITIAL_NUMBER, payload: value });
    },
    setShouldInitializeNumber(value) {
      dispatch({ type: SET_SHOULD_INITIALIZE_NUMBER, payload: value });
    },
    setWaitingForOtherUserInput(value) {
      dispatch({ type: SET_WAITING_FOR_OTHER_USER_INPUT, payload: value });
    },
    removeRoomId() {
      dispatch({ type: REMOVE_ROOM_ID });
    },
    removeGameWonBy() {
      dispatch({ type: REMOVE_GAME_WON_BY });
    },
    removeOtherPlayer() {
      dispatch({ type: REMOVE_OTHER_PLAYER });
    },
  };
}
