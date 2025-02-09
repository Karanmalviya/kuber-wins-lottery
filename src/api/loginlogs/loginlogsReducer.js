// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./loginlogsActionType";

const initialState = {
  isLoading: false,
  isError: false,
  loginLogs: [],
  users: [],
  count: 0,
};

export const loginLogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_LOGS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLoggedIn: false,
      };
    case actionTypes.USER_LOGIN_LOGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
        data: {},
      };
    case actionTypes.USER_LOGIN_LOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLoggedIn: true,
        users: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    case actionTypes.ALL_USER_LOGIN_LOGS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLoggedIn: false,
      };
    case actionTypes.ALL_USER_LOGIN_LOGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
        data: {},
      };
    case actionTypes.ALL_USER_LOGIN_LOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLoggedIn: true,
        loginLogs: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    default:
      return state;
  }
};
