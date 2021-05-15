import { SET_USER, SET_ERRORS, LOADING_UI, CLEAR_ERRORS, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

interface User {
    email?:string;
    mdp?:string;
}

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
    dispatch({ type: LOADING_UI })
    console.log(userData)
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    }
    axios.post(`${process.env.REACT_APP_API_URL}/login`, {"email": userData.email, "password": userData.password}, {headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*',}})
    .then((res) => {
        console.log(res)
        if(res.data.status){
            localStorage.setItem('user', JSON.stringify({DicoAccessToken: res.data.user_token, email: res.data.user_email, id:res.data.user_id, username:res.data.username}))
            dispatch({type: SET_USER})
            history.push("/");
        }
        else{
            dispatch({type:SET_ERRORS})
        }
    })
    .catch((err) => {
        console.log(err.response)
        console.log(err.request)
        console.log(err.message)
        dispatch({
        type: SET_ERRORS,
        payload: err.response.data
    });
    });
}

export const getUserData = () => (dispatch: any) => {
    dispatch({ type: LOADING_USER });
    const user = localStorage.getItem("user")
    dispatch(user);
}

export const logoutUser = (history:any) => (dispatch: any) => {
    localStorage.removeItem('user');
    history.push("/login");
    dispatch({
        type: SET_UNAUTHENTICATED
    });
};
