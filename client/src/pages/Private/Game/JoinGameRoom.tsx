import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { socket } from "../../../helpers/socket";
import { useSocketContext } from "../../../hooks/useSocketContext";

const JoinGameRoom = () => {
  const {
    socketState: { roomId, joinRoom, connected },
    socketAction: { setJoinRoom },
  } = useSocketContext();
  const [joinRoomId, setJoinRoomId] = useState("");

  const handleJoinRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinRoomId(e.target.value);
  };

  const handleCancel = () => {
    setJoinRoomId("");
    setJoinRoom(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("game-setup", {
      type: "JOIN_GAME_ROOM",
      roomId: joinRoomId,
    });
  };

  if (!(connected && joinRoom && !roomId)) return null;
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1} direction="column">
        <TextField required label="RoomId" onChange={handleJoinRoomIdChange} />
        <Stack spacing={2} direction="row">
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Join</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default JoinGameRoom;
