import * as actionTypes from "./buyticketActionType";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = process.env.REACT_APP_API_URL || "https://kuberwins.com/api";

export const fetchBuyTicket = (data, type = "") => {
  data.search = data.search && data.search != undefined ? data.search : "";
  return (dispatch) => {
    dispatch(fetchBuyTicketInit());
    axios
      .get(
        `${baseUrl}/user?search=${data.search}&type=${type}&offset=${data.offset}&limit=${data.limit}`
      )
      .then((response) => {
        dispatch(fetchBuyTicketSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchBuyTicketFailure());
      });
  };
};

export const fetchBuyTicketInit = () => ({
  type: actionTypes.FETCH_BUY_TICKET,
});
export const fetchBuyTicketFailure = () => ({
  type: actionTypes.FETCH_BUY_TICKET_FAILURE,
});
export const fetchBuyTicketSuccess = (data) => ({
  type: actionTypes.FETCH_BUY_TICKET_SUCCESS,
  payload: { data },
});

export const totalCount = () => {
  return (dispatch) => {
    dispatch(totalCountInit());
    axios
      .get(`${baseUrl}/user/count-all`)
      .then((response) => {
        dispatch(totalCountSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(totalCountFailure());
      });
  };
};

export const totalCountInit = () => ({
  type: actionTypes.TOTAL_COUNT,
});
export const totalCountFailure = () => ({
  type: actionTypes.TOTAL_COUNT_FAILURE,
});
export const totalCountSuccess = (data) => ({
  type: actionTypes.TOTAL_COUNT_SUCCESS,
  payload: { data },
});

export const fetchsoldTicket = () => {
  return (dispatch) => {
    dispatch(fetchsoldTicketInit());
    axios
      .get(`${baseUrl}/buytickets`)
      .then((response) => {
        dispatch(fetchsoldTicketSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchsoldTicketFailure());
      });
  };
};

export const fetchsoldTicketInit = () => ({
  type: actionTypes.SOLD_TICKET,
});
export const fetchsoldTicketFailure = () => ({
  type: actionTypes.SOLD_TICKET_FAILURE,
});
export const fetchsoldTicketSuccess = (data) => ({
  type: actionTypes.SOLD_TICKET_SUCCESS,
  payload: { data },
});

export const fetchwinnerTicket = () => {
  return (dispatch) => {
    dispatch(fetchwinnerTicketInit());
    axios
      .get(`${baseUrl}/winner-tickets`)
      .then((response) => {
        dispatch(fetchwinnerTicketSuccess(response.data.data));
      })

      .catch(function (error) {
        dispatch(fetchwinnerTicketFailure());
      });
  };
};

export const fetchwinnerTicketInit = () => ({
  type: actionTypes.WINNER_TICKET,
});
export const fetchwinnerTicketFailure = () => ({
  type: actionTypes.WINNER_TICKET_FAILURE,
});
export const fetchwinnerTicketSuccess = (data) => ({
  type: actionTypes.WINNER_TICKET_SUCCESS,
  payload: { data },
});
