// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./2faActionType";

const initialState = {
  isLoading: false,
  isError: false,
  isSaved: false,
};

export const TwofaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_2FA:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.REGISTER_2FA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.REGISTER_2FA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.VERIFY_2FA:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.VERIFY_2FA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.VERIFY_2FA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.UPDATE_2FA_STATUS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_2FA_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_2FA_STATUS_SUCCESS:
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
