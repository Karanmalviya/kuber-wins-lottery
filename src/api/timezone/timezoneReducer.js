// import { NullKind } from "@sinclair/typebox";
import * as actionTypes from "./timezoneActionType";

const initialState = {
    isLoading: false,
    isError: false,
    timezones: [],
    isSaved: false,
    isDeleted : false,
    count : 0
}

export const timezoneReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TIMEZONE:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSaved: false,
                isDeleted : false
            };
        case actionTypes.CREATE_TIMEZONE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.CREATE_TIMEZONE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSaved: true,
                isDeleted : false
            };
        case actionTypes.UPDATE_TIMEZONE:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSaved: false,
                isDeleted : false
            };
        case actionTypes.UPDATE_TIMEZONE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.UPDATE_TIMEZONE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSaved: true,
                isDeleted : false
            };
        case actionTypes.DELETE_TIMEZONE:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSaved: false,
                isDeleted : false
            };
        case actionTypes.DELETE_TIMEZONE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.DELETE_TIMEZONE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSaved: false,
                isDeleted : true
            };
        case actionTypes.FETCH_TIMEZONE:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case actionTypes.FETCH_TIMEZONE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.FETCH_TIMEZONE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                timezones: action.payload.data ? action.payload.data.rows : [],
                count: action.payload.data ? action.payload.data.count : 0
            };
        default: 
            return state
    }
}