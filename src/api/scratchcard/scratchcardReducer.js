// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./scratchcardActionType";

const initialState = {
  isLoading: false,
  isError: false,
  scratchcard: [],
  isSaved: false,
  soldscratch: [],
  scratchwinner: [],
  scratchGameReport: [],
  scratchcardId: {},
};

export const scratchcardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SCRATCH_CARD:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_SCRATCH_CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_SCRATCH_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };

    case actionTypes.UPDATE_SCRATCH_CARD:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_SCRATCH_CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_SCRATCH_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.DELETE_SCRATCH_CARD:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.DELETE_SCRATCH_CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.DELETE_SCRATCH_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.FETCH_SCRATCH_CARD:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SCRATCH_CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SCRATCH_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        scratchcard: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    case actionTypes.FETCH_SCRATCH_CARD_ID:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SCRATCH_CARD_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SCRATCH_CARD_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        scratchcardId: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    case actionTypes.CREATE_SCRATCH_CARD_TABLE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_SCRATCH_CARD_FAILURE_TABLE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_SCRATCH_CARD_SUCCESS_TABLE:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };

    case actionTypes.UPDATE_SCRATCH_CARD_TABLE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_SCRATCH_CARD_FAILURE_TABLE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_SCRATCH_CARD_SUCCESS_TABLE:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };

    case actionTypes.DELETE_SCRATCH_CARD_TABLE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.DELETE_SCRATCH_CARD_TABLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.DELETE_SCRATCH_CARD_TABLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.DELETE_SCRATCH_CARD_TABLE_RANDOM:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.DELETE_SCRATCH_CARD_TABLE_RANDOM_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.DELETE_SCRATCH_CARD_TABLE_RANDOM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.FETCH_SCRATCH_CARD_SOLD:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SCRATCH_CARD_SOLD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SCRATCH_CARD_SOLD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        soldscratch: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    case actionTypes.FETCH_SCRATCH_CARD_WINNER:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SCRATCH_CARD_WINNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SCRATCH_CARD_WINNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        scratchwinner: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    case actionTypes.FETCH_SCRATCH_GAME_REPORT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SCRATCH_GAME_REPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SCRATCH_GAME_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        scratchGameReport: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    default:
      return state;
  }
};
