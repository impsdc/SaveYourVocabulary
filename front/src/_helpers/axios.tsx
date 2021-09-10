import axios from "axios";
// import jwt from "jsonwebtoken"

const req = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("SaveYourVocabulary");
    config.headers["token"] = token || "_no_user";
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default req