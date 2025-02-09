// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./currencyActionType";

const initialState = {
    isLoading: false,
    isError: false,
    currencies: [],
    count: 0,
    isSaved: false,
    isDeleted : false
}

export const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_CURRENCY:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSaved: false,
                isDeleted : false
            };
        case actionTypes.CREATE_CURRENCY_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.CREATE_CURRENCY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSaved: true,
                isDeleted : false
            };
        case actionTypes.UPDATE_CURRENCY:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSaved: false,
                isDeleted : false
            };
        case actionTypes.UPDATE_CURRENCY_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.UPDATE_CURRENCY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSaved: true,
                isDeleted : false
            };
        case actionTypes.DELETE_CURRENCY:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSaved: false,
                isDeleted : false
            };
        case actionTypes.DELETE_CURRENCY_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.DELETE_CURRENCY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSaved: false,
                isDeleted : true
            };
        case actionTypes.FETCH_CURRENCY:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case actionTypes.FETCH_CURRENCY_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.FETCH_CURRENCY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                currencies: action.payload.data ? action.payload.data.rows : [],
                count: action.payload.data ? action.payload.data.count : 0
            };
        default: 
            return state
    }
}