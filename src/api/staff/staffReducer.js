// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./staffActionType";

const initialState = {
  isLoading: false,
  isError: false,
  count: 0,
  isSaved: false,
  resetisSaved: false,
  subAdmin: [],
  subAdminById: {},
  changePassData: {},
};

export const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SUBADMIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_SUBADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_SUBADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.UPDATE_SUBADMIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_SUBADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_SUBADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.FETCH_SUBADMIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SUBADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SUBADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        subAdmin: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    case actionTypes.FETCH_SUBADMIN_BY_ID:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SUBADMIN_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SUBADMIN_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        subAdminById: action.payload.data ? action.payload.data : {},
      };

    case actionTypes.CHANGE_SUBADMIN_PASSWORD:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CHANGE_SUBADMIN_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CHANGE_SUBADMIN_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };

    case actionTypes.FORGET_SUBADMIN_PASSWORD:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.FORGET_SUBADMIN_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FORGET_SUBADMIN_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
        changePassData: action.payload.data ? action.payload.data : {},
      };

    case actionTypes.RESET_SUBADMIN_PASSWORD:
      return {
        ...state,
        isLoading: true,
        isError: false,
        resetisSaved: false,
      };
    case actionTypes.RESET_SUBADMIN_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.RESET_SUBADMIN_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        resetisSaved: true,
      };
    default:
      return state;
  }
};
