import * as actionTypes from "./currencyActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl =
  process.env.REACT_APP_API_URL || "http://159.223.51.198:5500/api";

export const createCurrency = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(createCurrencyInit());
    axios
      .post(`${baseUrl}/currency/store`, data, headers)
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
          dispatch(createCurrencySuccess(response.data.data));
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
          dispatch(createCurrencyFailure());
        }, 3000);
      });
  };
};

export const createCurrencyInit = () => ({
  type: actionTypes.CREATE_CURRENCY,
});
export const createCurrencyFailure = (data) => ({
  type: actionTypes.CREATE_CURRENCY_FAILURE,
});
export const createCurrencySuccess = (data) => ({
  type: actionTypes.CREATE_CURRENCY_SUCCESS,
  payload: { data },
});

export const updateCurrency = (data) => {
  return (dispatch) => {
    dispatch(updateCurrencyInit());
    axios
      .put(`${baseUrl}/currency/${data.id}`, data)
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
          dispatch(updateCurrencySuccess(response.data.data));
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
          dispatch(updateCurrencyFailure());
        }, 3000);
      });
  };
};

export const updateCurrencyInit = () => ({
  type: actionTypes.UPDATE_CURRENCY,
});
export const updateCurrencyFailure = (data) => ({
  type: actionTypes.UPDATE_CURRENCY_FAILURE,
});
export const updateCurrencySuccess = (data) => ({
  type: actionTypes.UPDATE_CURRENCY_SUCCESS,
  payload: { data },
});

export const deleteCurrency = (data) => {
  return (dispatch) => {
    dispatch(deleteCurrencyInit());
    axios
      .delete(`${baseUrl}/currency/${data}`, data)
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
          dispatch(deleteCurrencySuccess(response.data.data));
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
          dispatch(deleteCurrencyFailure());
        }, 3000);
      });
  };
};

export const deleteCurrencyInit = () => ({
  type: actionTypes.DELETE_CURRENCY,
});
export const deleteCurrencyFailure = (data) => ({
  type: actionTypes.DELETE_CURRENCY_FAILURE,
});
export const deleteCurrencySuccess = (data) => ({
  type: actionTypes.DELETE_CURRENCY_SUCCESS,
  payload: { data },
});

export const fetchCurrency = (data) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    params: data,
  };
  return (dispatch) => {
    dispatch(fetchCurrencyInit());
    axios
      .get(`${baseUrl}/currency`, headers)
      .then((response) => {
        dispatch(fetchCurrencySuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchCurrencyFailure());
      });
  };
};

export const fetchCurrencyInit = () => ({
  type: actionTypes.FETCH_CURRENCY,
});
export const fetchCurrencyFailure = (data) => ({
  type: actionTypes.FETCH_CURRENCY_FAILURE,
});
export const fetchCurrencySuccess = (data) => ({
  type: actionTypes.FETCH_CURRENCY_SUCCESS,
  payload: { data },
});
