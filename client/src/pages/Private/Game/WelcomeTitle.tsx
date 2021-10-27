import {
  CardHeader,
  Avatar,
  IconButton,
  Chip,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
} from "@mui/material";
import React, { FC } from "react";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { stringAvatar } from "../../../helpers/avatar";
import { socket } from "../../../helpers/socket";
import { useSocketContext } from "../../../hooks/useSocketContext";
import { useAuth } from "../../../hooks/useAuth";

interface Props {
  fullName: string;
}

const WelcomeTitle: FC<Props> = ({ fullName }) => {
  const history = useHistory();
  const {
    socketAction: { resetSocketState, setAutoPlay },
    socketState: { autoplay },
  } = useSocketContext();

  const {
    authAction: { setIsAuthenticated },
  } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("fullName");
    socket.removeAllListeners();
    socket.disconnect();
    resetSocketState();
    setIsAuthenticated(false);
    history.replace("/");
  };

  return (
    <>
      <CardHeader
        avatar={
          <Chip
            label={fullName}
            color="secondary"
            variant="outlined"
            avatar={<Avatar {...stringAvatar(fullName)} />}
          />
        }
        action={
          <IconButton aria-label="logout" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        }
      />

      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h5">Game of Three</Typography>
        <FormControlLabel
          control={
            <Switch checked={autoplay} onChange={(_, c) => setAutoPlay(c)} />
          }
          label="Auto Play"
        />
      </Stack>
    </>
  );
};

export default WelcomeTitle;
