import * as actionTypes from "./supportTicketReplyActionType";

const initialState = {
  isLoading: false,
  isError: false,
  supportTicketreplymsg: [],
  supportTicketreplymsgattach: [],
  supportTicketUser:[],
  isSaved: false,
  count: 0,
};

export const supportticketreplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SUPPORT_TICKET:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_SUPPORT_TICKET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_SUPPORT_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.CREATE_SUPPORT_TICKET_ATTACH:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_SUPPORT_TICKET_ATTACH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_SUPPORT_TICKET_ATTACH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        supportTicketreplymsg: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    case actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH_REPLY:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH_REPLY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SUPPORT_TICKET_MSG_ATTACH_REPLY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        supportTicketreplymsgattach: action.payload.data
          ? action.payload.data
          : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
      case actionTypes.FETCH_SUPPORT_TICKET_FIRST_MSG:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SUPPORT_TICKET_FIRST_MSG_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SUPPORT_TICKET_FIRST_MSG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        supportTicketUser: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    default:
      return state;
  }
};
