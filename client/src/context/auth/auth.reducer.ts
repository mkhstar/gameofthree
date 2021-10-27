import { SET_IS_AUTHENTICATED } from "./auth.constant";
import { AuthDispatch, AuthState } from "./auth.type";

export const initialState: AuthState = {
  isAuthenticated: false,
};

const socketReducer = (
  state: AuthState = initialState,
  action: AuthDispatch
): AuthState => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      throw Error("Action not implemented in reducer");
  }
};

export default socketReducer;
