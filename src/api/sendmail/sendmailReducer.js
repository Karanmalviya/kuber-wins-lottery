// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./sendmailActionType";

const initialState = {
  isLoading: false,
  isError: false,
  isSend: false,
  user: [],
  email: [],
};

export const sendMailReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MAIL:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSend: false,
      };
    case actionTypes.SEND_MAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSend: false,
      };
    case actionTypes.SEND_MAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSend: true,
        user: action.payload.data ? action.payload.data : [],
      };
    case actionTypes.SEND_MAIL_ALL:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSend: false,
      };
    case actionTypes.SEND_MAIL_ALL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSend: false,
      };
    case actionTypes.SEND_MAIL_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSend: true,
        user: action.payload.data ? action.payload.data : [],
      };
    case actionTypes.FETCH_USER_EMAIL:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSend: false,
      };
    case actionTypes.FETCH_USER_EMAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSend: false,
      };
    case actionTypes.FETCH_USER_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSend: true,
        user: action.payload.data ? action.payload.data : [],
        email: action.payload.data ? action.payload.data : [],
      };
    default:
      return state;
  }
};
