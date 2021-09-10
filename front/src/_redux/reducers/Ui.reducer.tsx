import { SET_ERRORS, CLEAR_ERRORS } from "../types";

const initialState = {
  loading: false,
  errors: {
    status: false,
    message: null,
  },
};
export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {
          status: true,
          message: action.message,
        },
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {
          status: false,
          message: null,
        },
      };
    default:
      return state;
  }
}
