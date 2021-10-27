import React, { createContext, useReducer } from "react";
import socketReducer, { initialState } from "./socket.reducer";
import socketAction from "./socket.action";
import { AppSocketType } from "./socket.type";

export const SocketContext = createContext<AppSocketType>({} as AppSocketType);

const SocketProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(socketReducer, initialState);
  const action = socketAction(dispatch);

  return (
    <SocketContext.Provider
      value={{
        socketState: state,
        socketDispatch: dispatch,
        socketAction: action,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
