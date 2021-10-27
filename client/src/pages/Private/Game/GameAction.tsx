import { Button, CardActions } from "@mui/material";
import React from "react";
import { socket } from "../../../helpers/socket";
import { useSocketContext } from "../../../hooks/useSocketContext";

const GameAction = () => {
  const {
    socketState: { roomId, joinRoom, connected },
    socketAction: { setJoinRoom, setGameOver, removeGameWonBy },
  } = useSocketContext();

  const createNewGame = () => {
    setGameOver(false);
    removeGameWonBy();
    socket.emit("game-setup", { type: "CREATE_NEW_GAME" });
  };

  const onJoinRoom = () => {
    setGameOver(false);
    removeGameWonBy();
    setJoinRoom(true);
  };

  if (!connected) return null;

  return (
    <CardActions>
      {!roomId && !joinRoom
        ? [
            <Button key="create" size="small" onClick={createNewGame}>
              Create Game
            </Button>,
            <Button key="join" size="small" onClick={onJoinRoom}>
              Join Game
            </Button>,
          ]
        : null}
    </CardActions>
  );
};

export default GameAction;
