import * as actionTypes from "./userActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../../history";

const baseUrl = process.env.REACT_APP_API_URL || "https://kuberwins.com/api";

export const userLogin = (data) => {
  return (dispatch) => {
    dispatch(userLoginInit());
    axios
      .post(`${baseUrl}/admin/authenticate`, data)
      .then((response) => {
        const isVerifed = response.data.data.twofa_verification;
        if (isVerifed) {
          history.navigate(`/two-factor`, {
            state: {
              id: response.data.data.id,
              email: response.data.data.email,
              token: response.data.data.token,
              data: response.data.data,
            },
          });
        } else {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.data));
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
            dispatch(userLoginSuccess(response.data.data));
          }, 3000);
        }
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
          dispatch(userLoginFailure());
        }, 3000);
      });
  };
};

export const userLogout = () => {
  return (dispatch) => {
    dispatch(userLogoutSuccess());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
};

export const userLogoutSuccess = () => ({
  type: actionTypes.USER_LOGOUT,
});
export const userLoginInit = () => ({
  type: actionTypes.USER_LOGIN,
});
export const userLoginFailure = (data) => ({
  type: actionTypes.USER_LOGIN_FAILURE,
});
export const userLoginSuccess = (data) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  payload: { data },
});

export const updateUser = (data) => {
  const params = new FormData();

  if (data.fname) params.append("fname", data.fname);
  if (data.lname) params.append("lname", data.lname);
  if (data.mobileNo) params.append("mobileNo", data.mobileNo);
  if (data.email) params.append("email", data.email);
  if (data.zip) params.append("zip", data.zip);
  if (data.address) params.append("address", data.address);
  if (data.country) params.append("country", data.country);
  if (data.state) params.append("state", data.state);
  if (data.city) params.append("city", data.city);
  // if (data.balance) params.append("balance", data.balance);
  if (data.type) params.append("type", data.type);
  if (data.remark) params.append("remark", data.remark);
  params.append("sms_verify", data.sms_verify);
  params.append("email_verify", data.email_verify);
  params.append("twofa_status", data.twofa_status);
  params.append("twofa_verification", data.twofa_verification);
  params.append("status", data.status);

  return (dispatch) => {
    dispatch(updateUserInit());
    axios
      .put(`${baseUrl}/user/${data.id}`, params)
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
          dispatch(updateUserSuccess(response.data.data));
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
          dispatch(updateUserFailure());
        }, 3000);
      });
  };
};

export const updateUserInit = () => ({
  type: actionTypes.UPDATE_USER,
});
export const updateUserFailure = (data) => ({
  type: actionTypes.UPDATE_USER_FAILURE,
});
export const updateUserSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  payload: { data },
});
export const updateBalance = (data, token) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(updateBalanceInit());
    axios
      .post(`${baseUrl}/transaction/admin/withdraw`, data, headers)
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
          dispatch(updateBalanceSuccess(response.data));
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
          dispatch(updateBalanceFailure());
        }, 3000);
      });
  };
};

export const updateBalanceInit = () => ({
  type: actionTypes.UPDATE_BALANCE,
});
export const updateBalanceFailure = (data) => ({
  type: actionTypes.UPDATE_BALANCE_FAILURE,
});
export const updateBalanceSuccess = (data) => ({
  type: actionTypes.UPDATE_BALANCE_SUCCESS,
  payload: { data },
});

export const addUpdateBalance = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(addBalanceInit());
    axios
      .post(`${baseUrl}/transaction/admin/deposit `, data, headers)
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
          dispatch(addBalanceSuccess(response.data));
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
          dispatch(addBalanceFailure());
        }, 3000);
      });
  };
};

export const addBalanceInit = () => ({
  type: actionTypes.ADD_BALANCE,
});
export const addBalanceFailure = (data) => ({
  type: actionTypes.ADD_BALANCE_FAILURE,
});
export const addBalanceSuccess = (data) => ({
  type: actionTypes.ADD_BALANCE_SUCCESS,
  payload: { data },
});

export const staffLogin = (data) => {
  return (dispatch) => {
    dispatch(staffLoginInit());
    axios
      .post(`${baseUrl}/subAdmin/authenticate`, data)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.data.token);
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
          dispatch(staffLoginSuccess(response.data.data));
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
          dispatch(staffLoginFailure());
        }, 3000);
      });
  };
};

export const staffLoginLogout = () => {
  return (dispatch) => {
    dispatch(userLogoutSuccess());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
};

export const staffLogoutSuccess = () => ({
  type: actionTypes.USER_LOGOUT,
});
export const staffLoginInit = () => ({
  type: actionTypes.USER_LOGIN,
});
export const staffLoginFailure = (data) => ({
  type: actionTypes.USER_LOGIN_FAILURE,
});
export const staffLoginSuccess = (data) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  payload: { data },
});

export const fetchAdminData = (id) => {
  return (dispatch) => {
    dispatch(fetchAdminDataInit());
    axios
      .get(`${baseUrl}/admin/${id}`)
      .then((response) => {
        dispatch(fetchAdminDataSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchAdminDataFailure());
      });
  };
};

export const fetchAdminDataInit = () => ({
  type: actionTypes.FETCH_ADMIN_DATA,
});
export const fetchAdminDataFailure = (data) => ({
  type: actionTypes.FETCH_ADMIN_DATA_FAILURE,
});
export const fetchAdminDataSuccess = (data) => ({
  type: actionTypes.FETCH_ADMIN_DATA_SUCCESS,
  payload: { data },
});

export const updateTermsAndCondition = () => {
  return (dispatch) => {
    dispatch(updateTermsAndConditionInit());
    axios
      .post(`${baseUrl}/user/term-condition `)
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
          dispatch(updateTermsAndConditionSuccess(response.data));
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
          dispatch(updateTermsAndConditionFailure());
        }, 3000);
      });
  };
};

export const updateTermsAndConditionInit = () => ({
  type: actionTypes.UPDATE_TERMS_AND_CONDITION,
});
export const updateTermsAndConditionFailure = (data) => ({
  type: actionTypes.UPDATE_TERMS_AND_CONDITION_FAILURE,
});
export const updateTermsAndConditionSuccess = (data) => ({
  type: actionTypes.UPDATE_TERMS_AND_CONDITION_SUCCESS,
  payload: { data },
});

export const adminPasswordChange = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(adminPasswordChangeInit());
    axios
      .post(`${baseUrl}/admin/change-password`, data, headers)
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
        localStorage.removeItem("isVerifiedPassword");
        dispatch(adminPasswordChangeSuccess(response.data));
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

        dispatch(adminPasswordChangeFailure());
      });
  };
};

export const adminPasswordChangeInit = () => ({
  type: actionTypes.ADMIN_PASSWORD_CHANGE,
});
export const adminPasswordChangeFailure = (data) => ({
  type: actionTypes.ADMIN_PASSWORD_CHANGE_FAILURE,
});
export const adminPasswordChangeSuccess = (data) => ({
  type: actionTypes.ADMIN_PASSWORD_CHANGE_SUCCESS,
  payload: { data },
});

export const forgetAdminPassword = (data) => {
  return (dispatch) => {
    dispatch(forgetAdminPasswordInit());
    return axios
      .post(`${baseUrl}/admin/forget-password`, data)
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
        dispatch(forgetAdminPasswordSuccess(response.data.data));
        // }, 2000);
        return response.data.data;
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
        dispatch(forgetAdminPasswordFailure());
        // }, 2000);
      });
  };
};

export const forgetAdminPasswordInit = () => ({
  type: actionTypes.ADMIN_PASSWORD_FORGET,
});
export const forgetAdminPasswordFailure = (data) => ({
  type: actionTypes.ADMIN_PASSWORD_FORGET_FAILURE,
});
export const forgetAdminPasswordSuccess = (data) => ({
  type: actionTypes.ADMIN_PASSWORD_FORGET_SUCCESS,
  payload: { data },
});

export const resetAdminPassword = (data) => {
  return (dispatch) => {
    dispatch(resetAdminPasswordInit());
    return axios
      .post(`${baseUrl}/admin/reset-password `, data)
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
        dispatch(resetAdminPasswordSuccess(response.data.data));
        // }, 2000);
        return response.data.data;
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
        dispatch(resetAdminPasswordFailure());
        // }, 2000);
      });
  };
};

export const resetAdminPasswordInit = () => ({
  type: actionTypes.ADMIN_PASSWORD_RESET,
});
export const resetAdminPasswordFailure = (data) => ({
  type: actionTypes.ADMIN_PASSWORD_RESET_FAILURE,
});
export const resetAdminPasswordSuccess = (data) => ({
  type: actionTypes.ADMIN_PASSWORD_RESET_SUCCESS,
  payload: { data },
});
