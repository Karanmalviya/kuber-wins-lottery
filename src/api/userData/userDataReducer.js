// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./userDataActionType";

const initialState = {
  isLoading: false,
  isError: false,
  user: [],
  isSaved: false,
  singleData: [],
  count: 0,
  transaction: [],
  withdrawal: [],
  depositCount: [],
  transactionById: [],
  referal: [],
  userdetails: [],
  deposits: [],
  depositsById: {},
};

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        user: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    case actionTypes.FETCH_USER_TRANSACTION:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_USER_FAILURE_TRANSACTION:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_USER_SUCCESS_TRANSACTION:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        transaction: action.payload.data ? action.payload.data.rows : [],
        depositCount: action.payload.data
          ? action.payload.data.depositCount
          : 0,
      };
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
    case actionTypes.FETCH_USER_TRANSACTION_BY_ID:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_USER_FAILURE_TRANSACTION_BY_ID:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_USER_SUCCESS_TRANSACTION_BY_ID:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        transactionById: action.payload.data ? action.payload.data : [],
      };
    case actionTypes.FETCH_USER_REFERAL:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_USER_REFERAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_USER_REFERAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        referal: action.payload.data ? action.payload.data : [],
      };
    case actionTypes.FETCH_USER_DETAILS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        userdetails: action.payload.data ? action.payload.data : [],
      };

    case actionTypes.FETCH_DEPOSITS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_DEPOSITS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_DEPOSITS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        deposits: action.payload.data ? action.payload.data : [],
      };

    case actionTypes.FETCH_DEPOSITS_BY_ID:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_DEPOSITS_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_DEPOSITS_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        depositsById: action.payload.data ? action.payload.data : {},
      };

    case actionTypes.UPDATE_DEPOSIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.UPDATE_DEPOSIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_DEPOSIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    default:
      return state;
  }
};
