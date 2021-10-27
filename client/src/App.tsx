import { Alert, Snackbar } from "@mui/material";
import React, { FC, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { randomInteger } from "./helpers/random";
import { socket } from "./helpers/socket";
import { useAuth } from "./hooks/useAuth";
import { useSocketContext } from "./hooks/useSocketContext";
import Game from "./pages/Private/Game/Game";
import Login from "./pages/Public/Login";

const App: FC = () => {
  const {
    socketAction: {
      setConnected,
      setConnecting,
      setRoomId,
      setJoinRoom,
      setWaitingForOtherUserInput,
      setSettingInitialNumber,
      setShouldInitializeNumber,
      setOtherPlayer,
      setGameOver,
      setGameWonBy,
      setRandomResponse,
      removeRoomId,
      removeOtherPlayer,
      removeSnackbar,
      setSnackbar,
      removeGameWonBy,
    },
    socketState: { roomId, snackbar, autoplay },
  } = useSocketContext();

  const {
    authState: { isAuthenticated },
  } = useAuth();

  const onConnect = () => {
    setConnected(true);
    setConnecting(false);
  };
  const onJoinGameRoom = (fullName: string, id: string, roomId: string) => {
    setJoinRoom(false);
    if (id === socket.id) {
      setWaitingForOtherUserInput(true);
      setRoomId(roomId);
      return setSettingInitialNumber(true);
    }
    if (autoplay) {
      const num = randomInteger(1, 100);
      const timerId = setTimeout(() => {
        socket.emit("game-flow", {
          type: "INITIALIZE_GAME",
          roomId,
          initialNumber: num,
        });
        setShouldInitializeNumber(false);
      }, 5000);
      setRandomResponse(timerId, num);
    }
    setShouldInitializeNumber(true);
    setOtherPlayer({
      id,
      fullName,
    });
  };
  const onGameInitialized = (fullName: string, id: string) => {
    setSettingInitialNumber(false);
    setGameOver(false);
    removeGameWonBy();
    if (id === socket.id) return setWaitingForOtherUserInput(true);
    if (autoplay) {
      const num = randomInteger(-1, 1);
      const timerId = setTimeout(() => {
        socket.emit("game-flow", {
          type: "GAME_OPERATION",
          roomId,
          selectedNumber: num,
        });
      }, 5000);
      setRandomResponse(timerId, num);
    }
    setWaitingForOtherUserInput(false);
    setOtherPlayer({
      fullName,
      id,
    });
  };
  const onGameFlow = (id: string) => {
    if (id === socket.id) return setWaitingForOtherUserInput(true);
    if (autoplay) {
      const num = randomInteger(-1, 1);
      const timerId = setTimeout(() => {
        socket.emit("game-flow", {
          type: "GAME_OPERATION",
          roomId,
          selectedNumber: num,
        });
      }, 5000);
      setRandomResponse(timerId, num);
    }
    setWaitingForOtherUserInput(false);
  };
  const onGameOver = (id: string, fullName: string) => {
    socket.emit("LEAVE_GAME_ROOM", { roomId });
    setGameOver(true);
    setGameWonBy({ id, fullName });
    setShouldInitializeNumber(false);
    setSettingInitialNumber(false);
    removeRoomId();
    removeOtherPlayer();
    setJoinRoom(false);
  };
  useEffect(() => {
    setConnecting(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (socket.disconnected) {
        socket.auth = { fullName: localStorage.getItem("fullName") };
        socket.connect();
      }
      socket.on("connect", onConnect);

      socket.on("NEW_GAME_ROOM_CREATED", setRoomId);
      socket.on("JOINED_GAME_ROOM", onJoinGameRoom);
      socket.on("GAME_INITIALIZED", onGameInitialized);
      socket.on("GAME_FLOW", onGameFlow);
      socket.on("GAME_OVER", onGameOver);

      socket.on("exception", ({ message }) => {
        setSnackbar({
          type: "error",
          message,
        });
      });
    }
    return () => {
      socket.removeAllListeners();
    };
  }, [isAuthenticated, autoplay, roomId]);

  return (
    <BrowserRouter>
      <Snackbar
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={removeSnackbar}
      >
        <Alert
          onClose={removeSnackbar}
          severity={snackbar?.type}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>

      <Switch>
        <PublicRoute path="/" exact component={Login} />
        <PrivateRoute path="/game" exact component={Game} />
        <Route path="*" component={() => <h1>404</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
