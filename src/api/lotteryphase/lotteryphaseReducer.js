// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./lotteryphaseActionType";

const initialState = {
  isLoading: false,
  isError: false,
  lotteryPhase: [],
  isSaved: false,
  count: 0,
};

export const lotteryPhaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LOTTERY_PHASE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_LOTTERY_PHASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_LOTTERY_PHASE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.UPDATE_LOTTERY_PHASE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_LOTTERY_PHASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_LOTTERY_PHASE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.DELETE_LOTTERY_PHASE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.DELETE_LOTTERY_PHASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.DELETE_LOTTERY_PHASE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.FETCH_LOTTERY_PHASE:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_LOTTERY_PHASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_LOTTERY_PHASE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        lotteryPhase: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    default:
      return state;
  }
};
