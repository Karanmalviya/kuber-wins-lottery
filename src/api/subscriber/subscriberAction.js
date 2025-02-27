import * as actionTypes from "./subscriberActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = process.env.REACT_APP_API_URL || " https://kuberwins.com/api";

export const fetchsubscribe = (data) => {
  return (dispatch) => {
    dispatch(fetchsubscribeInit());
    axios
      .get(`${baseUrl}/subscribe`)
      .then((response) => {
        dispatch(fetchsubscribeSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchsubscribeFailure());
      });
  };
};

export const fetchsubscribeInit = () => ({
  type: actionTypes.SUBSCRIBER_MAIL,
});
export const fetchsubscribeFailure = (data) => ({
  type: actionTypes.SUBSCRIBER_MAIL_FAILURE,
});
export const fetchsubscribeSuccess = (data) => ({
  type: actionTypes.SUBSCRIBER_MAIL_SUCCESS,
  payload: { data },
});

// post api ----------------

export const createsubscribe = (data) => {
  return (dispatch) => {
    dispatch(createsubscribeInit());
    axios
      .post(`${baseUrl}/notification/send`, data)
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
          dispatch(createsubscribeSuccess(response.data.data, true));
        }, 3000);
        const success = true;
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
          dispatch(createsubscribeFailure());
        }, 3000);
      });
  };
};

export const createsubscribeInit = () => ({
  type: actionTypes.CREATE_SUBSCRIBE,
});
export const createsubscribeFailure = (data) => ({
  type: actionTypes.CREATE_SUBSCRIBE_FAILURE,
});
export const createsubscribeSuccess = (data) => ({
  type: actionTypes.CREATE_SUBSCRIBE_SUCCESS,
  payload: { data },
});

export const CreateSendAllMail = (data) => {
  return (dispatch) => {
    dispatch(CreateSendAllMailInit());
    return axios
      .post(`${baseUrl}/notification/send/all`, data)
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
          dispatch(CreateSendAllMailSuccess(response.data.data, true));
        }, 3000);
        return response.data;
        // const success = true;
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
          dispatch(CreateSendAllMailFailure());
        }, 3000);
      });
  };
};

export const CreateSendAllMailInit = () => ({
  type: actionTypes.CREATE_SEND_ALL_MAIL,
});
export const CreateSendAllMailFailure = (data) => ({
  type: actionTypes.CREATE_SEND_ALL_MAIL_FAILURE,
});
export const CreateSendAllMailSuccess = (data) => ({
  type: actionTypes.CREATE_SEND_ALL_MAIL_SUCCESS,
  payload: { data },
});
