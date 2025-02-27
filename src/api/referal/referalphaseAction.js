import * as actionTypes from "./referalphaseActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = process.env.REACT_APP_API_URL || "https://kuberwins.com/api";

export const createReferalUser = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(createReferalUserInit());
    axios
      .post(`${baseUrl}/user-referral/store`, data, headers)
      .then((response) => {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(createReferalUserSuccess(response.data.data));
        }, 3000);
      })
      .catch(function (error) {
        toast(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(createReferalUserFailure());
        }, 3000);
      });
  };
};

export const updatereferalstatus = (data) => {
  // const headers = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }};
  return (dispatch) => {
    dispatch(updatereferalstatusInit());
    axios
      .put(`${baseUrl}/user-referral/update`, data)
      .then((response) => {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(updatereferalstatusSuccess(response.data.data));
        }, 3000);
      })
      .catch(function (error) {
        toast(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(updatereferalstatusFailure());
        }, 3000);
      });
  };
};

export const updatereferalstatusInit = () => ({
  type: actionTypes.UPDATE_REFERAL_STATUS,
});
export const updatereferalstatusFailure = (data) => ({
  type: actionTypes.UPDATE_REFERAL_STATUS_FAILURE,
});
export const updatereferalstatusSuccess = (data) => ({
  type: actionTypes.UPDATE_REFERAL_STATUS_SUCCESS,
  payload: { data },
});

export const createReferalUserInit = () => ({
  type: actionTypes.CREATE_REFERAL_USER,
});
export const createReferalUserFailure = (data) => ({
  type: actionTypes.CREATE_REFERAL_USER_FAILURE,
});
export const createReferalUserSuccess = (data) => ({
  type: actionTypes.CREATE_REFERAL_USER_SUCCESS,
  payload: { data },
});

export const fetchLevelPercent = (data) => {
  return (dispatch) => {
    dispatch(fetchLevelPercentInit());
    axios
      .get(`${baseUrl}/user-referral`, data)
      .then((response) => {
        dispatch(fetchLevelPercentSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchLevelPercentFailure());
      });
  };
};

export const fetchLevelPercentInit = () => ({
  type: actionTypes.FETCH_LEVEL_PERCENT,
});
export const fetchLevelPercentFailure = (data) => ({
  type: actionTypes.FETCH_LEVEL_PERCENT_FAILURE,
});
export const fetchLevelPercentSuccess = (data) => ({
  type: actionTypes.FETCH_LEVEL_PERCENT_SUCCESS,
  payload: { data },
});

export const fetchCommissionUser = (data) => {
  return (dispatch) => {
    dispatch(fetchCommissionUserInit());
    axios
      .get(`${baseUrl}/commission`, data)
      .then((response) => {
        dispatch(fetchCommissionUserSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchCommissionUserFailure());
      });
  };
};

export const fetchCommissionUserInit = () => ({
  type: actionTypes.FETCH_COMMISSION_USER,
});
export const fetchCommissionUserFailure = (data) => ({
  type: actionTypes.FETCH_COMMISSION_USER_FAILURE,
});
export const fetchCommissionUserSuccess = (data) => ({
  type: actionTypes.FETCH_COMMISSION_USER_SUCCESS,
  payload: { data },
});

export const createLotteryRewards = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(createLotteryRewardsInit());
    axios
      .post(`${baseUrl}/lottery_reward/add`, data, headers)
      .then((response) => {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(createLotteryRewardsSuccess(response.data.data));
        }, 3000);
      })
      .catch(function (error) {
        toast(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(createLotteryRewardsFailure());
        }, 3000);
      });
  };
};

export const createLotteryRewardsInit = () => ({
  type: actionTypes.CREATE_LOTTERY_REWARDS,
});
export const createLotteryRewardsFailure = (data) => ({
  type: actionTypes.CREATE_LOTTERY_REWARDS_FAILURE,
});
export const createLotteryRewardsSuccess = (data) => ({
  type: actionTypes.CREATE_LOTTERY_REWARDS_SUCCESS,
  payload: { data },
});

export const updateLotteryRewards = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(updateLotteryRewardsInit());
    axios
      .put(`${baseUrl}/lottery_reward/update`, data, headers)
      .then((response) => {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(updateLotteryRewardsSuccess(response.data.data));
        }, 3000);
      })
      .catch(function (error) {
        toast(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(updateLotteryRewardsFailure());
        }, 3000);
      });
  };
};

export const updateLotteryRewardsInit = () => ({
  type: actionTypes.UPDATE_LOTTERY_REWARDS,
});
export const updateLotteryRewardsFailure = (data) => ({
  type: actionTypes.UPDATE_LOTTERY_REWARDS_FAILURE,
});
export const updateLotteryRewardsSuccess = (data) => ({
  type: actionTypes.UPDATE_LOTTERY_REWARDS_SUCCESS,
  payload: { data },
});

export const fetchLotteryRewards = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(fetchLotteryRewardsInit());
    axios
      .get(`${baseUrl}/lottery_reward/reward`, data, headers)
      .then((response) => {
        dispatch(fetchLotteryRewardsSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchLotteryRewardsFailure());
      });
  };
};

export const fetchLotteryRewardsInit = () => ({
  type: actionTypes.FETCH_LOTTERY_REWARDS,
});
export const fetchLotteryRewardsFailure = (data) => ({
  type: actionTypes.FETCH_LOTTERY_REWARDS_FAILURE,
});
export const fetchLotteryRewardsSuccess = (data) => ({
  type: actionTypes.FETCH_LOTTERY_REWARDS_SUCCESS,
  payload: { data },
});

export const updateLotteryRewardsStatus = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(updateLotteryRewardsStatusInit());
    axios
      .patch(`${baseUrl}/lottery_reward/toggle-status`, data, headers)
      .then((response) => {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(updateLotteryRewardsStatusSuccess(response.data.data));
        }, 3000);
      })
      .catch(function (error) {
        toast(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          dispatch(updateLotteryRewardsStatusFailure());
        }, 3000);
      });
  };
};

export const updateLotteryRewardsStatusInit = () => ({
  type: actionTypes.UPDATE_LOTTERY_REWARDS,
});
export const updateLotteryRewardsStatusFailure = (data) => ({
  type: actionTypes.UPDATE_LOTTERY_REWARDS_FAILURE,
});
export const updateLotteryRewardsStatusSuccess = (data) => ({
  type: actionTypes.UPDATE_LOTTERY_REWARDS_SUCCESS,
  payload: { data },
});
export const fetchAllLotteryRewards = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(fetchAllLotteryRewardsInit());
    axios
      .get(
        `${baseUrl}/freeLotteryClaims?search=${data.id ?? ""}&page=${
          data.page ?? ""
        }&pageSize=${data.pageSize ?? ""}`,
        data,
        headers
      )
      .then((response) => {
        dispatch(fetchAllLotteryRewardsSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchAllLotteryRewardsFailure());
      });
  };
};

export const fetchAllLotteryRewardsInit = () => ({
  type: actionTypes.FETCH_ALL_LOTTERY_REWARDS,
});
export const fetchAllLotteryRewardsFailure = (data) => ({
  type: actionTypes.FETCH_ALL_LOTTERY_REWARDS_FAILURE,
});
export const fetchAllLotteryRewardsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_LOTTERY_REWARDS_SUCCESS,
  payload: { data },
});
