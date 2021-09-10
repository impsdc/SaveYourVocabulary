import { LogoutUser } from "../_redux/actions/UserActions";
import store from "../_redux/store";
import { SET_AUTHENTICATED } from "../_redux/types";
import { useHistory } from "react-router-dom";

interface User {
  DicoAccessToken?:string,
  email?:string,
  username?:string,
  id?:string,
}

export const CheckAuthentication = () => {
  const localUser:string = window.localStorage.getItem("user") as string ;
  const user:User = JSON.parse(localUser)
  const history = useHistory();

  if (user?.DicoAccessToken) {
    store.dispatch({ type: SET_AUTHENTICATED });
  } else {
    LogoutUser(history);
  }
};
