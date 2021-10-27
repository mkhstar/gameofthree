import { Alert, Avatar, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { stringAvatar } from "../../../helpers/avatar";
import { socket } from "../../../helpers/socket";
import { useSocketContext } from "../../../hooks/useSocketContext";

const GameOver = () => {
  const {
    socketState: { gameOver, gameWonBy, roomId, joinRoom },
  } = useSocketContext();

  if (!(gameOver && gameWonBy && !roomId && !joinRoom)) return null;
  return (
    <Stack spacing={2} direction="column">
      <Alert color="error"> Game Over! </Alert>
      {gameWonBy.id === socket.id ? (
        <Chip label="You won!" color="success" />
      ) : (
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
          <Avatar {...stringAvatar(gameWonBy.fullName)} />
          <Typography variant="subtitle1"> {gameWonBy.fullName} won! </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default GameOver;
