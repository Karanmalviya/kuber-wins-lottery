import * as actionTypes from "./supportTicketActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl =
  process.env.REACT_APP_API_URL || "http://159.223.51.198:5500/api";

export const fetchsupportticket = () => {
  return (dispatch) => {
    dispatch(fetchsupportticketInit());
    axios
      .get(`${baseUrl}/support-tickets`)
      .then((response) => {
        dispatch(fetchsupportticketSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchsupportticketFailure());
      });
  };
};

export const fetchsupportticketInit = () => ({
  type: actionTypes.FETCH_SUPPORT_TICKET,
});
export const fetchsupportticketFailure = (data) => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_FAILURE,
});
export const fetchsupportticketSuccess = (data) => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_SUCCESS,
  payload: { data },
});

export const updateStatus = (data, id) => {
  return (dispatch) => {
    dispatch(updateStatusInit());
    axios
      .put(`${baseUrl}/support-tickets/${id}`, data)
      .then((response) => {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 2000,
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
          autoClose: 2000,
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
  type: actionTypes.UPDATE_STATUS,
});
export const updateStatusFailure = (data) => ({
  type: actionTypes.UPDATE_STATUS_FAILURE,
});
export const updateStatusSuccess = (data) => ({
  type: actionTypes.UPDATE_STATUS_SUCCESS,
  payload: { data },
});
