// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./bannerActionType";

const initialState = {
  isLoading: false,
  isError: false,
  banners: [],
  banner: {},
  isSaved: false,
  count: 0,
};

export const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_BANNER:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_BANNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_BANNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.UPDATE_BANNER:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_BANNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };

    case actionTypes.FETCH_BANNER:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_BANNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_BANNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        banners: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    case actionTypes.FETCH_BANNER_BY_ID:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_BANNER_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_BANNER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        banner: action.payload.data ? action.payload.data : {},
      };

    default:
      return state;
  }
};
