import * as actionTypes from "./staffActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl =
  process.env.REACT_APP_API_URL || "http://159.223.51.198:5500/api";

export const createSubAdmin = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  // const params = new FormData();
  // Object.keys(data).forEach((key) => {
  //   const value = data[key];
  //   params.append(key, value);
  // });
  return (dispatch) => {
    dispatch(createSubAdminInit());
    axios
      .post(`${baseUrl}/subAdmin/register `, data, headers)
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
          dispatch(createSubAdminSuccess(response.data.data));
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
          dispatch(createSubAdminFailure());
        }, 3000);
      });
  };
};

export const createSubAdminInit = () => ({
  type: actionTypes.CREATE_SUBADMIN,
});
export const createSubAdminFailure = (data) => ({
  type: actionTypes.CREATE_SUBADMIN_FAILURE,
});
export const createSubAdminSuccess = (data) => ({
  type: actionTypes.CREATE_SUBADMIN_SUCCESS,
  payload: { data },
});

export const updateSubAdmin = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  return (dispatch) => {
    dispatch(updateSubAdminInit());
    return axios
      .put(`${baseUrl}/subAdmin/update/${data.id}`, data, headers)
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
          dispatch(updateSubAdminSuccess(response.data.data));
        }, 2000);
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
        setTimeout(() => {
          dispatch(updateSubAdminFailure());
        }, 2000);
      });
  };
};

export const updateSubAdminInit = () => ({
  type: actionTypes.CREATE_SUBADMIN,
});
export const updateSubAdminFailure = (data) => ({
  type: actionTypes.CREATE_SUBADMIN_FAILURE,
});
export const updateSubAdminSuccess = (data) => ({
  type: actionTypes.CREATE_SUBADMIN_SUCCESS,
  payload: { data },
});

export const fetchSubAdmin = (id) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(fetchSubAdminInit());
    axios
      .get(`${baseUrl}/subAdmin/all`, headers)
      .then((response) => {
        dispatch(fetchSubAdminSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchSubAdminFailure());
      });
  };
};

export const fetchSubAdminInit = () => ({
  type: actionTypes.FETCH_SUBADMIN,
});
export const fetchSubAdminFailure = (data) => ({
  type: actionTypes.FETCH_SUBADMIN_FAILURE,
});
export const fetchSubAdminSuccess = (data) => ({
  type: actionTypes.FETCH_SUBADMIN_SUCCESS,
  payload: { data },
});

export const fetchSubAdminById = (id) => {
  return (dispatch) => {
    dispatch(fetchSubAdminByIdInit());
    axios
      .get(`${baseUrl}/subAdmin/${id}`)
      .then((response) => {
        dispatch(fetchSubAdminByIdSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchSubAdminByIdFailure());
      });
  };
};

export const fetchSubAdminByIdInit = () => ({
  type: actionTypes.FETCH_SUBADMIN_BY_ID,
});
export const fetchSubAdminByIdFailure = (data) => ({
  type: actionTypes.FETCH_SUBADMIN_BY_ID_FAILURE,
});
export const fetchSubAdminByIdSuccess = (data) => ({
  type: actionTypes.FETCH_SUBADMIN_BY_ID_SUCCESS,
  payload: { data },
});

export const changeSubAdminPassword = (data) => {
  return (dispatch) => {
    dispatch(changeSubAdminPasswordInit());
    return axios
      .put(`${baseUrl}/subAdmin/changePass/${data.id}`, data)
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
          dispatch(changeSubAdminPasswordSuccess(response.data.data));
        }, 2000);
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
        setTimeout(() => {
          dispatch(changeSubAdminPasswordFailure());
        }, 2000);
      });
  };
};

export const changeSubAdminPasswordInit = () => ({
  type: actionTypes.CHANGE_SUBADMIN_PASSWORD,
});
export const changeSubAdminPasswordFailure = (data) => ({
  type: actionTypes.CHANGE_SUBADMIN_PASSWORD_FAILURE,
});
export const changeSubAdminPasswordSuccess = (data) => ({
  type: actionTypes.CHANGE_SUBADMIN_PASSWORD_SUCCESS,
  payload: { data },
});

export const forgetSubAdminPassword = (data) => {
  return (dispatch) => {
    dispatch(forgetSubAdminPasswordInit());
    return axios
      .post(`${baseUrl}/subAdmin/forgetPassword`, data)
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
        dispatch(forgetSubAdminPasswordSuccess(response.data.data));
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
        dispatch(forgetSubAdminPasswordFailure());
        // }, 2000);
      });
  };
};

export const forgetSubAdminPasswordInit = () => ({
  type: actionTypes.FORGET_SUBADMIN_PASSWORD,
});
export const forgetSubAdminPasswordFailure = (data) => ({
  type: actionTypes.FORGET_SUBADMIN_PASSWORD_FAILURE,
});
export const forgetSubAdminPasswordSuccess = (data) => ({
  type: actionTypes.FORGET_SUBADMIN_PASSWORD_SUCCESS,
  payload: { data },
});

export const resetSubAdminPassword = (data) => {
  return (dispatch) => {
    dispatch(resetSubAdminPasswordInit());
    return axios
      .post(`${baseUrl}/subAdmin/resetPassword`, data)
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
        dispatch(resetSubAdminPasswordSuccess(response.data.data));
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
        dispatch(resetSubAdminPasswordFailure());
        // }, 2000);
      });
  };
};

export const resetSubAdminPasswordInit = () => ({
  type: actionTypes.RESET_SUBADMIN_PASSWORD,
});
export const resetSubAdminPasswordFailure = (data) => ({
  type: actionTypes.RESET_SUBADMIN_PASSWORD_FAILURE,
});
export const resetSubAdminPasswordSuccess = (data) => ({
  type: actionTypes.RESET_SUBADMIN_PASSWORD_SUCCESS,
  payload: { data },
});
