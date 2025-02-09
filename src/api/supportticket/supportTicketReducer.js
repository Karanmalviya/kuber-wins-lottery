import * as actionTypes from "./supportTicketActionType";

const initialState = {
  isLoading: false,
  isError: false,
  isSaved: false,
  count: 0,
  supportTicket: [],
};

export const supportTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUPPORT_TICKET:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_SUPPORT_TICKET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_SUPPORT_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        supportTicket: action.payload.data ? action.payload.data.rows : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    case actionTypes.UPDATE_STATUS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_STATUS_SUCCESS:
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
