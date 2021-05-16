import { SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from "../types";

export const ClearError = () => (dispatch: any) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const SetError = (message: string) => (dispatch: any) => {
  dispatch({
    type: SET_ERRORS,
    message: message,
  });
};
