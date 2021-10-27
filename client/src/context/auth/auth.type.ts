export interface AuthState {
  isAuthenticated: boolean;
}

export interface AuthAction {
  setIsAuthenticated(value: boolean): void;
}

export type AuthDispatch = {
  type: "SET_IS_AUTHENTICATED";
  payload: boolean;
};

export interface AuthContextType {
  authState: AuthState;
  authDispatch: React.Dispatch<AuthDispatch>;
  authAction: AuthAction;
}
