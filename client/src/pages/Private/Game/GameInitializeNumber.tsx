import { Button, Stack, TextField, Alert } from "@mui/material";
import React, { useState } from "react";
import BackCounter from "../../../components/BackCounter";
import { socket } from "../../../helpers/socket";
import { useSocketContext } from "../../../hooks/useSocketContext";

const GameInitializeNumber = () => {
  const {
    socketState: {
      shouldInitializeNumber,
      roomId,
      settingInitialNumber,
      randomTimerId,
      autoplay,
      randomResponse,
    },
    socketAction: { setShouldInitializeNumber, removeRandomResponse },
  } = useSocketContext();
  const [initialNumber, setInitialNumber] = useState("");

  const handleInitialNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInitialNumber(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (randomTimerId) {
      clearTimeout(randomTimerId);
      removeRandomResponse();
    }

    socket.emit("game-flow", {
      type: "INITIALIZE_GAME",
      roomId,
      initialNumber: Number(initialNumber),
    });
    setInitialNumber("");
    setShouldInitializeNumber(false);
  };

  if (settingInitialNumber)
    return (
      <Alert icon={false} color="info" sx={{ margin: "10px 0" }}>
        Number is been initialized...
      </Alert>
    );
  if (!shouldInitializeNumber) return null;
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1} direction="column" sx={{ margin: "10px 0" }}>
        {autoplay ? (
          <Alert color="info" icon={false}>
            Sending {randomResponse} in <BackCounter seconds={5} />
          </Alert>
        ) : null}
        <TextField
          required
          label="Initial Number"
          onChange={handleInitialNumberChange}
        />
        <Stack spacing={2} direction="row">
          <Button type="submit">Set</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default GameInitializeNumber;
