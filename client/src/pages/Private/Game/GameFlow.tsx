import {
  Alert,
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import BackCounter from "../../../components/BackCounter";
import { stringAvatar } from "../../../helpers/avatar";
import { socket } from "../../../helpers/socket";
import { useSocketContext } from "../../../hooks/useSocketContext";

const GameFlow = () => {
  const {
    socketState: {
      roomId,
      shouldInitializeNumber,
      gameOver,
      otherPlayer,
      randomResponse,
      randomTimerId,
      autoplay,
      waitingForOtherUserInput,
    },
    socketAction: { removeRandomResponse },
  } = useSocketContext();

  const setGameFlow = (selectedNumber: -1 | 1 | 0) => {
    if (randomTimerId) {
      clearTimeout(randomTimerId);
      removeRandomResponse();
    }

    socket.emit("game-flow", {
      type: "GAME_OPERATION",
      roomId,
      selectedNumber,
    });
  };

  if (!(roomId && !shouldInitializeNumber && !gameOver && otherPlayer))
    return null;

  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      sx={{ margin: "10px 0" }}
    >
      <Typography component="div" variant="subtitle1">
        Now playing with{" "}
        <Chip
          label={otherPlayer.fullName}
          color="primary"
          variant="outlined"
          avatar={<Avatar {...stringAvatar(otherPlayer.fullName)} />}
        />
      </Typography>
      <Chip
        color={waitingForOtherUserInput ? "default" : "success"}
        label={
          waitingForOtherUserInput
            ? `${otherPlayer.fullName}'s turn'`
            : "Your turn"
        }
      />
      {autoplay && !waitingForOtherUserInput ? (
        <Alert color="info" icon={false}>
          Sending {randomResponse} in <BackCounter seconds={5} />
        </Alert>
      ) : null}

      <ButtonGroup
        disabled={waitingForOtherUserInput}
        disableElevation
        variant="contained"
      >
        <Button onClick={() => setGameFlow(-1)} color="error">
          -1
        </Button>
        <Button onClick={() => setGameFlow(0)} color="primary">
          0
        </Button>
        <Button onClick={() => setGameFlow(1)} color="secondary">
          1
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default GameFlow;
