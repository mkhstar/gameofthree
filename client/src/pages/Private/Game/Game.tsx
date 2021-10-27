import { Stack, Card, CardContent } from "@mui/material";
import React, { FC } from "react";
import { useSocketContext } from "../../../hooks/useSocketContext";
import { AppPrivateRouteProps } from "../../../types/AppPrivateRouteProps";
import ConnectionLoader from "./ConnectionLoader";
import GameAction from "./GameAction";
import GameFlow from "./GameFlow";
import GameInitializeNumber from "./GameInitializeNumber";
import GameOver from "./GameOver";
import GameRoomInfo from "./GameRoomInfo";
import JoinGameRoom from "./JoinGameRoom";
import WelcomeTitle from "./WelcomeTitle";

const Game: FC<AppPrivateRouteProps> = ({ fullName }) => {
  const {
    socketState: { connecting },
  } = useSocketContext();

  if (connecting) return <ConnectionLoader />;
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Card variant="outlined" sx={{ width: 400 }}>
        <WelcomeTitle fullName={fullName} />
        <CardContent>
          <GameRoomInfo />
          <JoinGameRoom />
          <GameInitializeNumber />
          <GameFlow />
          <GameOver />
        </CardContent>
        <GameAction />
      </Card>
    </Stack>
  );
};

export default Game;
