import * as actionTypes from "./sendmailActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = process.env.REACT_APP_API_URL || "https://kuberwins.com/api";

export const sendMail = (params) => {
  return (dispatch) => {
    dispatch(sendMailInit());
    axios
      .post(`${baseUrl}/mail/send`, params)
      .then((response) => {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(sendMailSuccess(response.data.data));
        }, 3000);
      })
      .catch(function (error) {
        toast(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(sendMailFailure());
        }, 3000);
      });
  };
};

export const sendMailInit = () => ({
  type: actionTypes.SEND_MAIL,
});
export const sendMailFailure = (data) => ({
  type: actionTypes.SEND_MAIL_FAILURE,
});
export const sendMailSuccess = (data) => ({
  type: actionTypes.SEND_MAIL_SUCCESS,
  payload: { data },
});

export const sendMailAll = (params) => {
  return (dispatch) => {
    dispatch(sendMailAllInit());
    axios
      .post(`${baseUrl}/mail/send/users`, params)
      .then((response) => {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(sendMailAllSuccess(response.data.data));
        }, 3000);
      })
      .catch(function (error) {
        toast(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(sendMailAllFailure());
        }, 3000);
      });
  };
};

export const sendMailAllInit = () => ({
  type: actionTypes.SEND_MAIL_ALL,
});
export const sendMailAllFailure = (data) => ({
  type: actionTypes.SEND_MAIL_ALL_FAILURE,
});
export const sendMailAllSuccess = (data) => ({
  type: actionTypes.SEND_MAIL_ALL_SUCCESS,
  payload: { data },
});

export const fetchuserEmail = (data) => {
  return (dispatch) => {
    dispatch(fetchuserEmailInit());
    axios
      .get(`${baseUrl}/mail`)
      .then((response) => {
        dispatch(fetchuserEmailSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchuserEmailFailure());
      });
  };
};

export const fetchuserEmailInit = () => ({
  type: actionTypes.FETCH_USER_EMAIL,
});
export const fetchuserEmailFailure = (data) => ({
  type: actionTypes.FETCH_USER_EMAIL_FAILURE,
});
export const fetchuserEmailSuccess = (data) => ({
  type: actionTypes.FETCH_USER_EMAIL_SUCCESS,
  payload: { data },
});
