import * as actionTypes from "./2faActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl =
  process.env.REACT_APP_API_URL || "http://159.223.51.198:5500/api";

export const register2FA = (data) => {
  return (dispatch) => {
    dispatch(register2FAInit());
    axios
      .post(`${baseUrl}/2fa_admin/register  `, data)
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
          dispatch(register2FASuccess(response.data.data));
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
          dispatch(register2FAFailure());
        }, 3000);
      });
  };
};

export const register2FAInit = () => ({
  type: actionTypes.REGISTER_2FA,
});
export const register2FAFailure = (data) => ({
  type: actionTypes.REGISTER_2FA_FAILURE,
});
export const register2FASuccess = (data) => ({
  type: actionTypes.REGISTER_2FA_SUCCESS,
  payload: { data },
});

export const verify2FA = (data) => {
  return async (dispatch) => {
    dispatch(verify2FAInit());
    try {
      const response = await axios.post(`${baseUrl}/2fa_admin/verify`, data);
      toast(response.data.success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(verify2FASuccess(response.data.data));
      return response.data; // Return the API response data
    } catch (error) {
      toast(error.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(verify2FAFailure());
      throw error.response.data; // Throw the error response data
    }
  };
};

export const verify2FAInit = () => ({
  type: actionTypes.VERIFY_2FA,
});
export const verify2FAFailure = (data) => ({
  type: actionTypes.VERIFY_2FA_FAILURE,
});
export const verify2FASuccess = (data) => ({
  type: actionTypes.VERIFY_2FA_SUCCESS,
  payload: { data },
});

export const update2FAStatus = (data) => {
  return (dispatch) => {
    dispatch(update2FAStatusInit());
    return axios
      .put(`${baseUrl}/admin/${data.id}`, data)
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
          dispatch(update2FAStatusSuccess(response.data.data));
        }, 2000);
        return response.data.data;
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
          dispatch(update2FAStatusFailure());
        }, 2000);
      });
  };
};

export const update2FAStatusInit = () => ({
  type: actionTypes.UPDATE_2FA_STATUS,
});
export const update2FAStatusFailure = (data) => ({
  type: actionTypes.UPDATE_2FA_STATUS_FAILURE,
});
export const update2FAStatusSuccess = (data) => ({
  type: actionTypes.UPDATE_2FA_STATUS_SUCCESS,
  payload: { data },
});
