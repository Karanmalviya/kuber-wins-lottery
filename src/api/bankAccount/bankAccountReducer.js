// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./bankAccountType";

const initialState = {
  isLoading: false,
  isError: false,
  bankAccounts: [],
  bankAccount: {},
  isSaved: false,
  count: 0,
};

export const bankAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_BANK_ACCOUNT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.UPDATE_BANK_ACCOUNT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    // case actionTypes.FETCH_BANK_ACCOUNT:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     isError: false,
    //     isSaved: false,
    //   };
    // case actionTypes.FETCH_BANK_ACCOUNT_FAILURE:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isError: true,
    //   };
    // case actionTypes.FETCH_BANK_ACCOUNT_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isError: false,
    //     isSaved: true,
    //   };
    case actionTypes.FETCH_BANK_ACCOUNT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        bankAccounts: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    case actionTypes.FETCH_BANK_ACCOUNT_BY_ID:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_BANK_ACCOUNT_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_BANK_ACCOUNT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        bankAccount: action.payload.data ? action.payload.data : {},
        count: action.payload.data ? action.payload.data.count : 0,
      };

    default:
      return state;
  }
};
