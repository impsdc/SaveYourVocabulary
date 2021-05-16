import { logoutUser, getUserData } from "../_redux/actions/UserActions";
import store from "../_redux/store";
import { SET_AUTHENTICATED } from "../_redux/types";
import { useHistory } from "react-router-dom";

export const CheckAuthentication = () => {
  const token = window.localStorage.getItem("DicoAccessToken");
  const history = useHistory();

  if (token) {
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch(getUserData());
  } else {
    logoutUser(history);
  }
};
