import * as actionTypes from "./bankAccountType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl =
  process.env.REACT_APP_API_URL || "http://159.223.51.198:5500/api";

export const createBankAccount = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  // const params = new FormData();
  // Object.keys(data).forEach((key) => {
  //   const value = data[key];
  //   params.append(key, value);
  // });
  return (dispatch) => {
    dispatch(createBankAccountInit());
    axios
      .post(`${baseUrl}/account/add`, data, headers)
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
        // setTimeout(() => {
        dispatch(createBankAccountSuccess(response.data.data));
        // }, 3000);
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
        // setTimeout(() => {
        dispatch(createBankAccountFailure());
        // }, 3000);
      });
  };
};

export const createBankAccountInit = () => ({
  type: actionTypes.CREATE_BANK_ACCOUNT,
});
export const createBankAccountFailure = (data) => ({
  type: actionTypes.CREATE_BANK_ACCOUNT_FAILURE,
});
export const createBankAccountSuccess = (data) => ({
  type: actionTypes.CREATE_BANK_ACCOUNT_SUCCESS,
  payload: { data },
});

export const updateBankAccount = (data) => {
  if (data) {
    // const params = new FormData();
    // Object.keys(data).forEach((key) => {
    //   const value = data[key];
    //   params.append(key, value);
    // });
    return (dispatch) => {
      dispatch(updateBankAccountInit());
      axios
        .put(`${baseUrl}/account/update/${data.id}`, data)
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
          dispatch(updateBankAccountSuccess(response.data));
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
          // setTimeout(() => {
          dispatch(updateBankAccountFailure());
          // }, 3000);
        });
    };
  } else {
    return toast("Minimum pool prize not found", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const updateBankAccountInit = () => ({
  type: actionTypes.UPDATE_BANK_ACCOUNT,
});
export const updateBankAccountFailure = (data) => ({
  type: actionTypes.UPDATE_BANK_ACCOUNT_FAILURE,
});
export const updateBankAccountSuccess = (data) => ({
  type: actionTypes.UPDATE_BANK_ACCOUNT_SUCCESS,
  payload: { data },
});

export const deleteBankAccount = (data) => {
  return (dispatch) => {
    dispatch(deleteBankAccountInit());
    axios
      .delete(`${baseUrl}/account/${data.id}`, data)
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
          dispatch(deleteBankAccountSuccess(response.data.data));
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
          dispatch(deleteBankAccountFailure());
        }, 3000);
      });
  };
};

export const deleteBankAccountInit = () => ({
  type: actionTypes.DELETE_BANK_ACCOUNT,
});
export const deleteBankAccountFailure = (data) => ({
  type: actionTypes.DELETE_BANK_ACCOUNT_FAILURE,
});
export const deleteBankAccountSuccess = (data) => ({
  type: actionTypes.DELETE_BANK_ACCOUNT_SUCCESS,
  payload: { data },
});

export const fetchBankAccount = (data) => {
  return (dispatch) => {
    dispatch(fetchBankAccountInit());
    axios
      .get(
        `${baseUrl}/account?page=${data.page ?? ""}&pageSize=${
          data.pageSize ?? ""
        }&orderType=${data.orderType ?? ""}&search=${data.search ?? ""}`
        // { params: data }
      )
      .then((response) => {
        dispatch(fetchBankAccountSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchBankAccountFailure());
      });
  };
};

export const fetchBankAccountInit = () => ({
  type: actionTypes.FETCH_BANK_ACCOUNT,
});
export const fetchBankAccountFailure = (data) => ({
  type: actionTypes.FETCH_BANK_ACCOUNT_FAILURE,
});
export const fetchBankAccountSuccess = (data) => ({
  type: actionTypes.FETCH_BANK_ACCOUNT_SUCCESS,
  payload: { data },
});

export const fetchBankAccountById = (data) => {
  return (dispatch) => {
    dispatch(fetchBankAccountByIdInit());
    axios
      .get(`${baseUrl}/account/${data.id}`, { params: data })
      .then((response) => {
        dispatch(fetchBankAccountByIdSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(fetchBankAccountByIdFailure());
      });
  };
};

export const fetchBankAccountByIdInit = () => ({
  type: actionTypes.FETCH_BANK_ACCOUNT_BY_ID,
});
export const fetchBankAccountByIdFailure = (data) => ({
  type: actionTypes.FETCH_BANK_ACCOUNT_BY_ID_FAILURE,
});
export const fetchBankAccountByIdSuccess = (data) => ({
  type: actionTypes.FETCH_BANK_ACCOUNT_BY_ID_SUCCESS,
  payload: { data },
});
