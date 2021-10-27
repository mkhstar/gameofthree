import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import { useSocketContext } from "../../../hooks/useSocketContext";

const ConnectionLoader = () => {
  const {
    socketState: { connecting },
  } = useSocketContext();

  if (!connecting) return null;
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </Stack>
  );
};

export default ConnectionLoader;
