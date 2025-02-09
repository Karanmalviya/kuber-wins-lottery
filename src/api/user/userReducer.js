// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./userActionType";

const initialState = {
  isLoading: false,
  isError: false,
  isLoggedIn: localStorage.getItem("user") !== null ? true : false,
  loggedUser: localStorage.getItem("admin"),
  count: 0,
  adminDataById: {},
  loggedData: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        loggedUser: {},
      };
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLoggedIn: false,
      };
    case actionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
        loggedUser: {},
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLoggedIn: true,
        loggedUser: action.payload ? action.payload.data : {},
      };
    case actionTypes.STAFF_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        loggedUser: {},
      };
    case actionTypes.STAFF_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLoggedIn: false,
      };
    case actionTypes.STAFF_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
        loggedUser: {},
      };
    case actionTypes.STAFF_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLoggedIn: true,
        loggedUser: action.payload ? action.payload.data : {},
      };

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
        isDeleted: false,
      };
    case actionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
        isDeleted: false,
      };
    case actionTypes.UPDATE_BALANCE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
        isDeleted: false,
      };
    case actionTypes.UPDATE_BALANCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_BALANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
        isDeleted: false,
      };
    case actionTypes.ADD_BALANCE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
        isDeleted: false,
      };
    case actionTypes.ADD_BALANCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.ADD_BALANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
        isDeleted: false,
      };
    case actionTypes.FETCH_ADMIN_DATA:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_ADMIN_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_ADMIN_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        adminDataById: action.payload.data ? action.payload.data : {},
        count: action.payload.data ? action.payload.data.count : 0,
      };
    case actionTypes.UPDATE_TERMS_AND_CONDITION:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
        isDeleted: false,
      };
    case actionTypes.UPDATE_TERMS_AND_CONDITION_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_TERMS_AND_CONDITION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
        isDeleted: false,
      };

    case actionTypes.ADMIN_PASSWORD_CHANGE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
        isDeleted: false,
      };
    case actionTypes.ADMIN_PASSWORD_CHANGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.ADMIN_PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
        isDeleted: false,
      };

    case actionTypes.ADMIN_PASSWORD_RESET:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
        isDeleted: false,
      };
    case actionTypes.ADMIN_PASSWORD_RESET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.ADMIN_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
        isDeleted: false,
      };
    case actionTypes.ADMIN_PASSWORD_FORGET:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
        isDeleted: false,
      };
    case actionTypes.ADMIN_PASSWORD_FORGET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.ADMIN_PASSWORD_FORGET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
        isDeleted: false,
      };
    default:
      return state;
  }
};
