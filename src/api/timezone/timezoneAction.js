import * as actionTypes from "./timezoneActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { baseUrl } from "./../../config";
const baseUrl =
  process.env.REACT_APP_API_URL || "http://159.223.51.198:5500/api";

export const createTimezone = (data) => {
  return (dispatch) => {
    dispatch(createTimezoneInit());
    axios
      .post(`${baseUrl}/timezone/store`, data)
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
          dispatch(createTimezoneSuccess(response.data.data));
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
          dispatch(createTimezoneFailure());
        }, 3000);
      });
  };
};

export const createTimezoneInit = () => ({
  type: actionTypes.CREATE_TIMEZONE,
});
export const createTimezoneFailure = (data) => ({
  type: actionTypes.CREATE_TIMEZONE_FAILURE,
});
export const createTimezoneSuccess = (data) => ({
  type: actionTypes.CREATE_TIMEZONE_SUCCESS,
  payload: { data },
});

export const updateTimezone = (data) => {
  return (dispatch) => {
    dispatch(updateTimezoneInit());
    axios
      .put(`${baseUrl}/timezone/${data.id}`, data)
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
          dispatch(updateTimezoneSuccess(response.data.data));
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
          dispatch(updateTimezoneFailure());
        }, 3000);
      });
  };
};

export const updateTimezoneInit = () => ({
  type: actionTypes.UPDATE_TIMEZONE,
});
export const updateTimezoneFailure = (data) => ({
  type: actionTypes.UPDATE_TIMEZONE_FAILURE,
});
export const updateTimezoneSuccess = (data) => ({
  type: actionTypes.UPDATE_TIMEZONE_SUCCESS,
  payload: { data },
});

export const deleteTimezone = (data) => {
  return (dispatch) => {
    dispatch(deleteTimezoneInit());
    axios
      .delete(`${baseUrl}/timezone/${data}`, {})
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
          dispatch(deleteTimezoneSuccess(response.data.data));
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
          dispatch(deleteTimezoneFailure());
        }, 3000);
      });
  };
};

export const deleteTimezoneInit = () => ({
  type: actionTypes.DELETE_TIMEZONE,
});
export const deleteTimezoneFailure = (data) => ({
  type: actionTypes.DELETE_TIMEZONE_FAILURE,
});
export const deleteTimezoneSuccess = (data) => ({
  type: actionTypes.DELETE_TIMEZONE_SUCCESS,
  payload: { data },
});

export const fetchTimezone = (data) => {
  return (dispatch) => {
    dispatch(fetchTimezoneInit());
    axios
      .get(`${baseUrl}/timezone`, { params: data })
      .then((response) => {
        dispatch(fetchTimezoneSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchTimezoneFailure());
      });
  };
};

export const fetchTimezoneInit = () => ({
  type: actionTypes.FETCH_TIMEZONE,
});
export const fetchTimezoneFailure = (data) => ({
  type: actionTypes.FETCH_TIMEZONE_FAILURE,
});
export const fetchTimezoneSuccess = (data) => ({
  type: actionTypes.FETCH_TIMEZONE_SUCCESS,
  payload: { data },
});
