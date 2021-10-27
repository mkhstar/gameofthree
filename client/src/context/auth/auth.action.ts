import { SET_IS_AUTHENTICATED } from "./auth.constant";
import { AuthAction, AuthDispatch } from "./auth.type";

export default function authAction(
  dispatch: React.Dispatch<AuthDispatch>
): AuthAction {
  return {
    setIsAuthenticated(value) {
      dispatch({
        type: SET_IS_AUTHENTICATED,
        payload: value,
      });
    },
  };
}
