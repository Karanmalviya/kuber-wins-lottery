import * as actionTypes from "./referalphaseActionType";

const initialState = {
  isLoading: false,
  isError: false,
  // referalUser: [],
  isSaved: false,
  count: 0,
  referals: [],
  commission: [],
  lotteryRewards: {},
  lotteryRewardsAll: [],
};

export const referalUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_REFERAL_USER:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_REFERAL_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_REFERAL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.UPDATE_REFERAL_STATUS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_REFERAL_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_REFERAL_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.FETCH_LEVEL_PERCENT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_LEVEL_PERCENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_LEVEL_PERCENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        referals: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    case actionTypes.FETCH_COMMISSION_USER:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_COMMISSION_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_COMMISSION_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        commission: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };
    case actionTypes.CREATE_LOTTERY_REWARDS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.CREATE_LOTTERY_REWARDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.CREATE_LOTTERY_REWARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };
    case actionTypes.UPDATE_LOTTERY_REWARDS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSaved: false,
      };
    case actionTypes.UPDATE_LOTTERY_REWARDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.UPDATE_LOTTERY_REWARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: true,
      };

    case actionTypes.FETCH_LOTTERY_REWARDS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_LOTTERY_REWARDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_LOTTERY_REWARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        lotteryRewards: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.count : 0,
      };

    case actionTypes.FETCH_ALL_LOTTERY_REWARDS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.FETCH_ALL_LOTTERY_REWARDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.FETCH_ALL_LOTTERY_REWARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSaved: false,
        lotteryRewardsAll: action.payload.data ? action.payload.data : [],
        count: action.payload.data ? action.payload.data.totalRecords : 0,
      };
    default:
      return state;
  }
};
