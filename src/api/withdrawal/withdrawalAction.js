import * as actionTypes from "./withdrawalActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl =
  process.env.REACT_APP_API_URL || "http://159.223.51.198:5500/api";

export const fetchwithdrawal = (data) => {
  return (dispatch) => {
    dispatch(fetchwithdrawalInit());
    axios
      .get(`${baseUrl}/withdrawals`)
      .then((response) => {
        dispatch(fetchwithdrawalSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchwithdrawalFailure());
      });
  };
};

export const fetchwithdrawalInit = () => ({
  type: actionTypes.FETCH_WITHDRAWAL,
});
export const fetchwithdrawalFailure = (data) => ({
  type: actionTypes.FETCH_WITHDRAWAL_FAILURE,
});
export const fetchwithdrawalSuccess = (data) => ({
  type: actionTypes.FETCH_WITHDRAWAL_SUCCESS,
  payload: { data },
});

export const updateStatus = (data, id) => {
  return (dispatch) => {
    dispatch(updateStatusInit());
    axios
      .put(`${baseUrl}/withdrawals/${Number(id)}`, data)
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
          dispatch(updateStatusSuccess(response.data.data));
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
          dispatch(updateStatusFailure());
        }, 3000);
      });
  };
};

export const updateStatusInit = () => ({
  type: actionTypes.UPDATE_WITHDRAWAL,
});
export const updateStatusFailure = (data) => ({
  type: actionTypes.UPDATE_WITHDRAWAL_FAILURE,
});
export const updateStatusSuccess = (data) => ({
  type: actionTypes.UPDATE_WITHDRAWAL_SUCCESS,
  payload: { data },
});

export const createWithDraw = (data) => {
  return (dispatch) => {
    dispatch(createWithDrawInit());
    return axios
      .post(`${baseUrl}/transaction/api`, data)
      .then((response) => {
        dispatch(createWithDrawSuccess(response.data));
        toast("Approved Successfully", {
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
          dispatch(createWithDrawSuccess(response.data.data));
        }, 3000);
        return response.data;
      })
      .catch((error) => {
        toast("Something went wrong", {
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
          dispatch(createWithDrawFailure());
        }, 3000);
      });
  };
};

export const createWithDrawInit = () => ({
  type: actionTypes.CREATE_WITHDRAWAL,
});
export const createWithDrawFailure = (data) => ({
  type: actionTypes.CREATE_WITHDRAWAL_FAILURE,
});
export const createWithDrawSuccess = (data) => ({
  type: actionTypes.CREATE_WITHDRAWAL_SUCCESS,
  payload: { data },
});

export const fetchUserwithdrawal = (id) => {
  return (dispatch) => {
    dispatch(fetchUserwithdrawalInit());
    axios
      .get(`${baseUrl}/user/withdrawals/${id}`)
      .then((response) => {
        dispatch(fetchUserwithdrawalSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchUserwithdrawalFailure());
      });
  };
};

export const fetchUserwithdrawalInit = () => ({
  type: actionTypes.FETCH_USER_WITHDRAWAL,
});
export const fetchUserwithdrawalFailure = (data) => ({
  type: actionTypes.FETCH_USER_WITHDRAWAL_FAILURE,
});
export const fetchUserwithdrawalSuccess = (data) => ({
  type: actionTypes.FETCH_USER_WITHDRAWAL_SUCCESS,
  payload: { data },
});
