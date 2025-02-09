// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./withdrawalActionType";

const initialState = {
  isLoading: false,
  isError: false,
  withdrawal: [],
  isSaved: false,
  singleData: [],
  userwithdrawal: [],
  count: 0,
};

export const withdrawalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WITHDRAWAL:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_WITHDRAWAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_WITHDRAWAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        withdrawal: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    case actionTypes.UPDATE_WITHDRAWAL:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_WITHDRAWAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_WITHDRAWAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.CREATE_WITHDRAWAL:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_WITHDRAWAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_WITHDRAWAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.FETCH_USER_WITHDRAWAL:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_USER_WITHDRAWAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_USER_WITHDRAWAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        userwithdrawal: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    default:
      return state;
  }
};
