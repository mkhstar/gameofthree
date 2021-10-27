import React, { createContext, useReducer } from "react";
import authReducer, { initialState } from "./auth.reducer";
import authAction from "./auth.action";
import { AuthContextType } from "./auth.type";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const action = authAction(dispatch);

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        authDispatch: dispatch,
        authAction: action,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
