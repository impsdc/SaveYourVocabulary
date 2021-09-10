import {
    SET_USER,
    SET_ERRORS,
    SET_UNAUTHENTICATED,
  } from "../types";

import req from "../../_helpers/axios";

interface Word{
    partOfSpeech:String;
    definitions?:[];
}
  
export const UploadingWord = (userData: Word, history: any) => (dispatch: any) => {
    req.post(
        `${process.env.REACT_APP_API_URL}/create`,

        )
        .then((res) => {

        })
        .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            message: err.response.data,
        }); 
    });
};
