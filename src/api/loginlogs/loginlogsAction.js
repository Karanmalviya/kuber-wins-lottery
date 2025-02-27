import * as actionTypes from "./loginlogsActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = process.env.REACT_APP_API_URL || "https://kuberwins.com/api";
export const userLoginLogs = (data) => {
  data.search = data && data.search != undefined ? data.search : "";
  return (dispatch) => {
    dispatch(userLoginLogsInit());
    axios
      .get(
        `${baseUrl}/user-logs/${data.id}?search=${data.search}&offset=${data.offset}&limit=${data.limit}`
      )
      .then((response) => {
        dispatch(userLoginLogsSuccess(response.data.data));
      })
      .catch(function () {
        setTimeout(() => {
          dispatch(userLoginLogsFailure());
        }, 3000);
      });
  };
};

export const userLoginLogsInit = () => ({
  type: actionTypes.USER_LOGIN_LOGS,
});
export const userLoginLogsFailure = (data) => ({
  type: actionTypes.USER_LOGIN_LOGS_FAILURE,
});
export const userLoginLogsSuccess = (data) => ({
  type: actionTypes.USER_LOGIN_LOGS_SUCCESS,
  payload: { data },
});

export const allUserLoginLogs = (data) => {
  return (dispatch) => {
    dispatch(allUserLoginLogsInit());
    axios
      .get(`${baseUrl}/user-logs`)
      .then((response) => {
        dispatch(allUserLoginLogsSuccess(response.data.data));
      })
      .catch(function () {
        setTimeout(() => {
          dispatch(allUserLoginLogsFailure());
        }, 3000);
      });
  };
};

export const allUserLoginLogsInit = () => ({
  type: actionTypes.ALL_USER_LOGIN_LOGS,
});
export const allUserLoginLogsFailure = (data) => ({
  type: actionTypes.ALL_USER_LOGIN_LOGS_FAILURE,
});
export const allUserLoginLogsSuccess = (data) => ({
  type: actionTypes.ALL_USER_LOGIN_LOGS_SUCCESS,
  payload: { data },
});
