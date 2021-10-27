import { Alert, AlertTitle, Stack } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import React, { FC } from "react";
import { useSocketContext } from "../../../hooks/useSocketContext";

const GameRoomInfo: FC = () => {
  const {
    socketState: { roomId, otherPlayer, settingInitialNumber },
  } = useSocketContext();

  if (!roomId) return null;
  return (
    <Stack spacing={2} direction="column">
      <Alert icon={<InfoIcon />} severity="info">
        <AlertTitle>Room Id</AlertTitle>
        {roomId}
      </Alert>
      {!otherPlayer?.id && !settingInitialNumber ? (
        <Alert sx={{ textAlign: "center" }} icon={false} severity="info">
          Send room id to other player
        </Alert>
      ) : null}
    </Stack>
  );
};

export default GameRoomInfo;
