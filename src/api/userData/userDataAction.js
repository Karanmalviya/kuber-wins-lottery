import * as actionTypes from "./userDataActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = process.env.REACT_APP_API_URL || "https://kuberwins.com/api";

export const fetchuser = (data) => {
  return (dispatch) => {
    dispatch(fetchuserInit());
    axios
      .get(`${baseUrl}/user`)
      .then((response) => {
        dispatch(fetchuserSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchuserFailure());
      });
  };
};

export const fetchuserInit = () => ({
  type: actionTypes.FETCH_USER,
});
export const fetchuserFailure = (data) => ({
  type: actionTypes.FETCH_USER_FAILURE,
});
export const fetchuserSuccess = (data) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  payload: { data },
});

export const fetchuserTransction = (data) => {
  return (dispatch) => {
    dispatch(fetchuserTransctionInit());
    axios
      .get(`${baseUrl}/transaction`)
      .then((response) => {
        dispatch(fetchuserTransctionSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchuserTransctionFailure());
      });
  };
};

export const fetchuserTransctionInit = () => ({
  type: actionTypes.FETCH_USER_TRANSACTION,
});
export const fetchuserTransctionFailure = (data) => ({
  type: actionTypes.FETCH_USER_FAILURE_TRANSACTION,
});
export const fetchuserTransctionSuccess = (data) => ({
  type: actionTypes.FETCH_USER_SUCCESS_TRANSACTION,
  payload: { data },
});

export const fetchuserTransctionById = (id) => {
  return (dispatch) => {
    dispatch(fetchuserTransctionByIdInit());
    axios
      .get(`${baseUrl}/user/transaction/${id}`)
      .then((response) => {
        dispatch(fetchuserTransctionByIdSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchuserTransctionByIdFailure());
      });
  };
};

export const fetchuserTransctionByIdInit = () => ({
  type: actionTypes.FETCH_USER_TRANSACTION_BY_ID,
});
export const fetchuserTransctionByIdFailure = (data) => ({
  type: actionTypes.FETCH_USER_FAILURE_TRANSACTION_BY_ID,
});
export const fetchuserTransctionByIdSuccess = (data) => ({
  type: actionTypes.FETCH_USER_SUCCESS_TRANSACTION_BY_ID,
  payload: { data },
});

export const fetchwithdrawal = (data) => {
  return (dispatch) => {
    dispatch(fetchwithdrawalInit());
    axios
      .get(`${baseUrl}/withdrawals`)
      .then((response) => {
        dispatch(fetchwithdrawalSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchwithdrawalFailure());
      });
  };
};

export const fetchwithdrawalInit = () => ({
  type: actionTypes.FETCH_WITHDRAWAL,
});
export const fetchwithdrawalFailure = (data) => ({
  type: actionTypes.FETCH_WITHDRAWAL_SUCCESS,
});
export const fetchwithdrawalSuccess = (data) => ({
  type: actionTypes.FETCH_WITHDRAWAL_FAILURE,
  payload: { data },
});

export const fetchuserReferal = (id) => {
  return (dispatch) => {
    dispatch(fetchwithdrawalInit());
    axios
      .get(`${baseUrl}/user/refer/${id}`)
      .then((response) => {
        dispatch(fetchuserReferalSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchuserReferalFailure());
      });
  };
};

export const fetchuserReferalInit = () => ({
  type: actionTypes.FETCH_USER_REFERAL,
});
export const fetchuserReferalFailure = (data) => ({
  type: actionTypes.FETCH_USER_REFERAL_FAILURE,
});
export const fetchuserReferalSuccess = (data) => ({
  type: actionTypes.FETCH_USER_REFERAL_SUCCESS,
  payload: { data },
});

export const fetchUserDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchUserDetailsInit());
    axios
      .get(`${baseUrl}/user/count-user/${id}`)
      .then((response) => {
        dispatch(fetchUserDetailsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(fetchUserDetailsFailure());
      });
  };
};

export const fetchUserDetailsInit = () => ({
  type: actionTypes.FETCH_USER_DETAILS,
});
export const fetchUserDetailsFailure = (data) => ({
  type: actionTypes.FETCH_USER_DETAILS_FAILURE,
});
export const fetchUserDetailsSuccess = (data) => ({
  type: actionTypes.FETCH_USER_DETAILS_SUCCESS,
  payload: { data },
});

export const fetchDeposits = (data) => {
  return (dispatch) => {
    dispatch(fetchDepositsInit());
    axios
      .get(
        `${baseUrl}/user_deposit?page=${data?.page}&pageSize=${data?.pageSize}&orderType=DESC&orderBy=updatedAt`
      )
      .then((response) => {
        dispatch(fetchDepositsSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchDepositsFailure());
      });
  };
};

export const fetchDepositsInit = () => ({
  type: actionTypes.FETCH_DEPOSITS,
});
export const fetchDepositsFailure = (data) => ({
  type: actionTypes.FETCH_DEPOSITS_FAILURE,
});
export const fetchDepositsSuccess = (data) => ({
  type: actionTypes.FETCH_DEPOSITS_SUCCESS,
  payload: { data },
});

export const fetchDepositsById = (id) => {
  return (dispatch) => {
    dispatch(fetchDepositsByIdInit());
    axios
      .get(`${baseUrl}/user_deposit/${id}`)
      .then((response) => {
        dispatch(fetchDepositsByIdSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchDepositsByIdFailure());
      });
  };
};

export const fetchDepositsByIdInit = () => ({
  type: actionTypes.FETCH_DEPOSITS_BY_ID,
});
export const fetchDepositsByIdFailure = (data) => ({
  type: actionTypes.FETCH_DEPOSITS_BY_ID_FAILURE,
});
export const fetchDepositsByIdSuccess = (data) => ({
  type: actionTypes.FETCH_DEPOSITS_BY_ID_SUCCESS,
  payload: { data },
});

export const updateDeposit = (body) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(updateDepositInit());
    axios
      .post(
        `${baseUrl}/user_deposit/AdminDeposit/${body?.userId}`,
        body,
        headers
      )
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
        dispatch(updateDepositSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(updateDepositFailure());
      });
  };
};

export const updateDepositInit = () => ({
  type: actionTypes.UPDATE_DEPOSIT,
});
export const updateDepositFailure = (data) => ({
  type: actionTypes.UPDATE_DEPOSIT_FAILURE,
});
export const updateDepositSuccess = (data) => ({
  type: actionTypes.UPDATE_DEPOSIT_SUCCESS,
  payload: { data },
});
