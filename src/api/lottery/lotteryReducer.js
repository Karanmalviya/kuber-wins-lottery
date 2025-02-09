// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./lotteryActionType";

const initialState = {
  isLoading: false,
  isError: false,
  lotteries: [],
  isSaved: false,
  singleData: [],
  gameReport: [],
  count: 0,
  manualDrawUsers: [],
  manualDrawTickets: [],
  manualDrawHistory: [],
};

export const lotteryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LOTTERY:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_LOTTERY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_LOTTERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.UPDATE_LOTTERY:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_LOTTERY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_LOTTERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.DELETE_LOTTERY:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.DELETE_LOTTERY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.DELETE_LOTTERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.FETCH_LOTTERY:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_LOTTERY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_LOTTERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        lotteries: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    case actionTypes.FETCH_LOTTERY_EDIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_LOTTERY_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_LOTTERY_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        singleData: action.data ? action.data : [],
      };

    case actionTypes.FETCH_GAME_REPORT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_GAME_REPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_GAME_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        gameReport: action.payload.data ? action.payload.data : [],
      };

    case actionTypes.FETCH_MANUAL_DRAW_USER:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_MANUAL_DRAW_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_MANUAL_DRAW_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        manualDrawUsers: action.payload.data ? action.payload.data : [],
      };

    case actionTypes.FETCH_MANUAL_DRAW_TICKET:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_MANUAL_DRAW_TICKET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_MANUAL_DRAW_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        manualDrawTickets: action.payload.data ? action.payload.data : [],
      };

    case actionTypes.FETCH_MANUAL_DRAW_HISTORY:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_MANUAL_DRAW_HISTORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        manualDrawHistory: [],
      };
    case actionTypes.FETCH_MANUAL_DRAW_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        manualDrawHistory: action.payload.data ? action.payload.data : [],
      };
    case actionTypes.UPDATE_MANUAL_DRAW:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.UPDATE_MANUAL_DRAW_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_MANUAL_DRAW_SUCCESS:
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
