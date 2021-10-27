import React from "react";
import AuthProvider from "./auth/auth.provider";
import SocketProvider from "./socket/socket.provider";

const GlobalProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <SocketProvider>{children}</SocketProvider>
  </AuthProvider>
);

export default GlobalProvider;
