// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./buyticketActionType";

const initialState = {
  isLoading: false,
  isError: false,
  tickets: [],
  soldticket: [],
  winners: [],
  count: 0,
  isSaved: false,
  inactiveaccount: 0,
  emailverifycount: 0,
  smscount: 0,
  kycpendingcount: 0,
  kycunverifycount: 0,
  activeaccount: 0,
  balancecount: 0,
  count_all: [],
};

export const buyTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BUY_TICKET:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_BUY_TICKET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_BUY_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        tickets: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    case actionTypes.TOTAL_COUNT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.TOTAL_COUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.TOTAL_COUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        activeaccount: action.payload.data
          ? action.payload.data[0].activeaccount
          : 0,
        inactiveaccount: action.payload.data
          ? action.payload.data[0].inactiveaccount
          : 0,
        emailverifycount: action.payload.data
          ? action.payload.data[0].emailverifycount
          : 0,
        smscount: action.payload.data ? action.payload.data[0].smscount : 0,
        kycpendingcount: action.payload.data
          ? action.payload.data[0].kycpendingcount
          : 0,
        kycunverifycount: action.payload.data
          ? action.payload.data[0].kycunverifycount
          : 0,
        balancecount: action.payload.data
          ? action.payload.data[0].balancecount
          : 0,
        count_all: action.payload.data ? action.payload.data[0] : [],
      };
    case actionTypes.SOLD_TICKET:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.SOLD_TICKET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.SOLD_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        soldticket: action.payload.data ? action.payload.data.rows : [],
      };
    case actionTypes.WINNER_TICKET:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.WINNER_TICKET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.WINNER_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        winners: action.payload.data ? action.payload.data : [],
      };
    default:
      return state;
  }
};
