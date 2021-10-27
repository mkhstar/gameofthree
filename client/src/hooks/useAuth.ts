import { useContext } from "react";
import { AuthContext } from "../context/auth/auth.provider";
import { AuthAction, AuthState } from "../context/auth/auth.type";

interface UseAuth {
  authAction: AuthAction;
  authState: AuthState;
}
export const useAuth = (): UseAuth => {
  const { authAction, authState } = useContext(AuthContext);

  return { authAction, authState };
};
