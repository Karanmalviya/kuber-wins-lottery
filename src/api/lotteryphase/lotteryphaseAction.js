import * as actionTypes from "./lotteryphaseActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = process.env.REACT_APP_API_URL || "https://kuberwins.com/api";

export const createlotteryphase = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(createlotteryphaseInit());
    axios
      .post(`${baseUrl}/gamephase/store`, data, headers)
      .then((response) => {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(createlotteryphaseSuccess(response.data.data));
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
          dispatch(createlotteryphaseFailure());
        }, 3000);
      });
  };
};

export const createlotteryphaseInit = () => ({
  type: actionTypes.CREATE_LOTTERY_PHASE,
});
export const createlotteryphaseFailure = (data) => ({
  type: actionTypes.CREATE_LOTTERY_PHASE_FAILURE,
});
export const createlotteryphaseSuccess = (data) => ({
  type: actionTypes.CREATE_LOTTERY_PHASE_SUCCESS,
  payload: { data },
});

export const updatelotteryphase = (data) => {
  // const headers = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }};
  return (dispatch) => {
    dispatch(updatelotteryphaseInit());
    axios
      .put(`${baseUrl}/gamephase/${data.id}`, data)
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
          dispatch(updatelotteryphaseSuccess(response.data.data));
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
          dispatch(updatelotteryphaseFailure());
        }, 3000);
      });
  };
};

export const updatelotteryphaseInit = () => ({
  type: actionTypes.UPDATE_LOTTERY_PHASE,
});
export const updatelotteryphaseFailure = (data) => ({
  type: actionTypes.UPDATE_LOTTERY_PHASE_FAILURE,
});
export const updatelotteryphaseSuccess = (data) => ({
  type: actionTypes.UPDATE_LOTTERY_PHASE_SUCCESS,
  payload: { data },
});

export const deletelotteryphase = (data) => {
  return (dispatch) => {
    dispatch(deletelotteryphaseInit());
    axios
      .delete(`${baseUrl}/gamephase/${data.id}`, data)
      .then((response) => {
        dispatch(deletelotteryphaseSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(deletelotteryphaseFailure());
      });
  };
};

export const deletelotteryphaseInit = () => ({
  type: actionTypes.DELETE_LOTTERY_PHASE,
});
export const deletelotteryphaseFailure = (data) => ({
  type: actionTypes.DELETE_LOTTERY_PHASE_FAILURE,
});
export const deletelotteryphaseSuccess = (data) => ({
  type: actionTypes.DELETE_LOTTERY_PHASE_SUCCESS,
  payload: { data },
});

export const fetchlotteryphase = (data) => {
  return (dispatch) => {
    dispatch(fetchlotteryphaseInit());
    axios
      .get(`${baseUrl}/gamephase`, { params: data })
      .then((response) => {
        dispatch(fetchlotteryphaseSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchlotteryphaseFailure());
      });
  };
};

export const fetchlotteryphaseInit = () => ({
  type: actionTypes.FETCH_LOTTERY_PHASE,
});
export const fetchlotteryphaseFailure = (data) => ({
  type: actionTypes.FETCH_LOTTERY_PHASE_FAILURE,
});
export const fetchlotteryphaseSuccess = (data) => ({
  type: actionTypes.FETCH_LOTTERY_PHASE_SUCCESS,
  payload: { data },
});
