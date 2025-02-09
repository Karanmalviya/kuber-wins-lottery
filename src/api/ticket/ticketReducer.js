// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./ticketActionType";

const initialState = {
    isLoading: false,
    isError: false,
    tickets: [],
    singleTicket : {},
    count: 0,
    isSaved: false,
    isDeleted : false
}

export const ticketReducer = (state = initialState, action) => {
   
    switch (action.type) {
        case actionTypes.FETCH_TICKET:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case actionTypes.FETCH_TICKET_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.FETCH_TICKET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                tickets: action.payload.data ? action.payload.data : [],
                count: action.payload.data ? action.payload.data.count : 0
            };

            case actionTypes.FETCH_TICKET_EDIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case actionTypes.FETCH_TICKET_EDIT_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.FETCH_TICKET_EDIT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                singleTicket: action.payload.data ? action.payload.data : [],
                count: action.payload.data ? action.payload.data.count : 0
            };
        default: 
            return state
    }
}