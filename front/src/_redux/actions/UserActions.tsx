import {
  SET_USER,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import axios from "axios";

interface UserLogin {
  email?: string;
  password?: string;
}

interface UserRegister {
  email?: string;
  password?: string;
  username?: string
}

export const LoginUser = (userData: UserLogin, history: any) => (dispatch: any) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/login`,
      { email: userData.email, password: userData.password },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => {
      console.log(res);
      if (res.data.status === true) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            DicoAccessToken: res.data.user_token,
            email: res.data.user_email,
            id: res.data.user_id,
            username: res.data.username,
          })
        );
        dispatch({ type: SET_USER });
        history.push("/");
      } else {
        dispatch({
          type: SET_ERRORS,
          message: "Mauvais email ou mot de passe",
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        message: err.response.data,
      });
    });
};

export const RegisterUser =
  (userData: UserRegister, history: any) => (dispatch: any) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          email: userData.email,
          password: userData.password,
          username: userData.username,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === true) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              DicoAccessToken: res.data.user_token,
              email: res.data.user_email,
              id: res.data.user_id,
              username: res.data.username,
            })
          );
          dispatch({ type: SET_USER });
          history.push("/");
        } else if (res.data.message.includes("email")) {
          dispatch({
            type: SET_ERRORS,
            message: "Email déjà utilisé",
          });
        } else if (res.data.message.includes("password")) {
          dispatch({
            type: SET_ERRORS,
            message: "Le mot de passe doit faire au moins 6 characters",
          });
        } else {
          dispatch({
            type: SET_ERRORS,
            message:
              "Une erreur est survenu lors de la création de votre compte",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SET_ERRORS,
          message: err.response.data,
        });
      });
  };

export const getUserData = () => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  const user = localStorage.getItem("user");
  dispatch(user);
};

export const logoutUser = (history: any) => (dispatch: any) => {
  localStorage.removeItem("user");
  history.push("/login");
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};
