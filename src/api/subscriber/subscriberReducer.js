// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./subscriberActionType";

const initialState = {
  isLoading: false,
  isError: false,
  subscriber: [],
  isSaved: false,
  singleData: [],
  count: 0,
};

export const subscriberDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SUBSCRIBE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_SUBSCRIBE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.CREATE_SEND_ALL_MAIL:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_SEND_ALL_MAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_SEND_ALL_MAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.SUBSCRIBER_MAIL:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.SUBSCRIBER_MAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.SUBSCRIBER_MAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        subscriber: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    default:
      return state;
  }
};
