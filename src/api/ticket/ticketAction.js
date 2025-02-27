import * as actionTypes from "./ticketActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = process.env.REACT_APP_API_URL || "https://kuberwins.com/api";

export const fetchTicket = () => {
  return (dispatch) => {
    dispatch(fetchTicketInit());
    axios
      .get(`${baseUrl}/tickets`)
      .then((response) => {
        dispatch(fetchTicketSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchTicketFailure());
      });
  };
};

export const fetchTicketInit = () => ({
  type: actionTypes.FETCH_TICKET,
});
export const fetchTicketFailure = (data) => ({
  type: actionTypes.FETCH_TICKET_FAILURE,
});
export const fetchTicketSuccess = (data) => ({
  type: actionTypes.FETCH_TICKET_SUCCESS,
  payload: { data },
});

export const fetchTicketEdit = (data) => {
  return (dispatch) => {
    dispatch(fetchTicketEditInit());
    axios
      .get(`${baseUrl}/tickets/${data.id}`)
      .then((response) => {
        dispatch(fetchTicketEditSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchTicketEditFailure());
      });
  };
};

export const fetchTicketEditInit = () => ({
  type: actionTypes.FETCH_TICKET_EDIT,
});
export const fetchTicketEditFailure = (data) => ({
  type: actionTypes.FETCH_TICKET_EDIT_FAILURE,
});
export const fetchTicketEditSuccess = (data) => ({
  type: actionTypes.FETCH_TICKET_EDIT_SUCCESS,
  payload: { data },
});
