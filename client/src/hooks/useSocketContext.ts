import { useContext } from "react";
import { SocketContext } from "../context/socket/socket.provider";
import { SocketAction, SocketState } from "../context/socket/socket.type";

interface UseSocketContext {
  socketAction: SocketAction;
  socketState: SocketState;
}
export const useSocketContext = (): UseSocketContext => {
  const { socketAction, socketState } = useContext(SocketContext);

  return { socketAction, socketState };
};
