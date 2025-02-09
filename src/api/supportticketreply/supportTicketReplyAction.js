import * as actionTypes from "./supportTicketReplyActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl =
  process.env.REACT_APP_API_URL || "http://159.223.51.198:5500/api";

export const fetchsupportticketmsgattach = (id) => {
  return (dispatch) => {
    dispatch(fetchsupportticketmsgattachInit());
    axios
      .get(`${baseUrl}/ticket-message`)
      .then((response) => {
        dispatch(fetchsupportticketmsgattachSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchsupportticketmsgattachFailure());
      });
  };
};
export const fetchsupportticketmsgattachInit = () => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH,
});
export const fetchsupportticketmsgattachFailure = (data) => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH_FAILURE,
});
export const fetchsupportticketmsgattachSuccess = (data) => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH_SUCCESS,
  payload: { data },
});

export const fetchsupportticketfirstmsg = (id) => {
  return (dispatch) => {
    dispatch(fetchsupportticketfirstmsgInit());
    axios
      .get(`${baseUrl}/user/support/${id}`)
      .then((response) => {
        dispatch(
          fetchsupportticketfirstmsgSuccess(response.data.data.SupportTickets)
        );
      })
      .catch(function (error) {
        dispatch(fetchsupportticketfirstmsgFailure());
      });
  };
};

export const fetchsupportticketfirstmsgInit = () => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_FIRST_MSG,
});
export const fetchsupportticketfirstmsgFailure = (data) => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_FIRST_MSG_FAILURE,
});
export const fetchsupportticketfirstmsgSuccess = (data) => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_FIRST_MSG_SUCCESS,
  payload: { data },
});

export const CreateSupportTicket = (data) => {
  return (dispatch) => {
    dispatch(CreateSupportTicketInit());
    return axios
      .post(`${baseUrl}/ticket-message/store`, data)
      .then((response) => {
        toast("Replied Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          // theme: "light",
          color: "green",
        });
        setTimeout(() => {
          dispatch(CreateSupportTicketSuccess(response.data.data));
        }, 3000);
        return response.data.data;
      })
      .catch(function (error) {
        toast(error.response.data.message, {
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
          dispatch(CreateSupportTicketFailure());
        }, 3000);
      });
  };
};

export const CreateSupportTicketInit = () => ({
  type: actionTypes.CREATE_SUPPORT_TICKET,
});
export const CreateSupportTicketFailure = (data) => ({
  type: actionTypes.CREATE_SUPPORT_TICKET_FAILURE,
});
export const CreateSupportTicketSuccess = (data) => ({
  type: actionTypes.CREATE_SUPPORT_TICKET_SUCCESS,
  payload: { data },
});

export const CreateSupportTicketAttach = (data) => {
  return (dispatch) => {
    dispatch(CreateSupportTicketAttachInit());
    return axios
      .post(`${baseUrl}/ticket-attachment/store`, data)
      .then((response) => {
        toast("Replied Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          // theme: "light",
          color: "green",
        });
        setTimeout(() => {
          dispatch(CreateSupportTicketAttachSuccess(response.data.data));
        }, 3000);
        return response.data.data;
      })
      .catch(function (error) {
        toast(error.response.data.message, {
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
          dispatch(CreateSupportTicketAttachFailure());
        }, 3000);
      });
  };
};

export const CreateSupportTicketAttachInit = () => ({
  type: actionTypes.CREATE_SUPPORT_TICKET_ATTACH,
});
export const CreateSupportTicketAttachFailure = (data) => ({
  type: actionTypes.CREATE_SUPPORT_TICKET_ATTACH_FAILURE,
});
export const CreateSupportTicketAttachSuccess = (data) => ({
  type: actionTypes.CREATE_SUPPORT_TICKET_ATTACH_SUCCESS,
  payload: { data },
});

export const fetchsupportticketmsgattachreply = (id) => {
  return (dispatch) => {
    dispatch(fetchsupportticketmsgattachreplyInit());
    axios
      .get(`${baseUrl}/ticket-attachment`)
      .then((response) => {
        dispatch(fetchsupportticketmsgattachreplySuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchsupportticketmsgattachreplyFailure());
      });
  };
};

export const fetchsupportticketmsgattachreplyInit = () => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH_REPLY,
});
export const fetchsupportticketmsgattachreplyFailure = (data) => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH_REPLY_FAILURE,
});
export const fetchsupportticketmsgattachreplySuccess = (data) => ({
  type: actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH_REPLY_SUCCESS,
  payload: { data },
});
