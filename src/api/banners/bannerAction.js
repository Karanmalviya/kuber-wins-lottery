import * as actionTypes from "./bannerActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = process.env.REACT_APP_API_URL || "https://kuberwins.com/api";

export const createBanner = (data) => {
  // const headers = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }};
  const params = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    params.append(key, value);
  });
  return (dispatch) => {
    dispatch(createBannerInit());
    axios
      .post(`${baseUrl}/banner/store`, params)
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
        dispatch(createBannerSuccess(response.data.data));
        // }, 3000);
      })
      .catch(function (error) {
        toast(error.response.data.message === "{\"name\":\"MulterError\",\"message\":\"File too large\",\"code\":\"LIMIT_FILE_SIZE\",\"field\":\"file\",\"storageErrors\":[]}" ? "Banner Size must be 2mb or less": error.response.data.message, {
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
        dispatch(createBannerFailure());
        // }, 3000);
      });
  };
};

export const createBannerInit = () => ({
  type: actionTypes.CREATE_BANNER,
});
export const createBannerFailure = (data) => ({
  type: actionTypes.CREATE_BANNER_FAILURE,
});
export const createBannerSuccess = (data) => ({
  type: actionTypes.CREATE_BANNER_SUCCESS,
  payload: { data },
});

export const updateBanner = (data) => {
  if (data) {
    const params = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      params.append(key, value);
    });
    return (dispatch) => {
      dispatch(updateBannerInit());
      axios
        .put(`${baseUrl}/banner/update/${data.id}`, params)
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
          // setTimeout(() => {
          dispatch(updateBannerSuccess(response.data.data));
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
          dispatch(updateBannerFailure());
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

export const updateBannerInit = () => ({
  type: actionTypes.UPDATE_BANNER,
});
export const updateBannerFailure = (data) => ({
  type: actionTypes.UPDATE_BANNER_FAILURE,
});
export const updateBannerSuccess = (data) => ({
  type: actionTypes.UPDATE_BANNER_SUCCESS,
  payload: { data },
});

export const fetchBanners = (data) => {
  return (dispatch) => {
    dispatch(fetchBannersInit());
    axios
      .get(
        `${baseUrl}/banner?page=${data?.page ?? ""}&pageSize=${
          data?.pageSize ?? ""
        }`
      )
      .then((response) => {
        dispatch(fetchBannersSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchBannersFailure());
      });
  };
};

export const fetchBannersInit = () => ({
  type: actionTypes.FETCH_BANNER,
});
export const fetchBannersFailure = (data) => ({
  type: actionTypes.FETCH_BANNER_FAILURE,
});
export const fetchBannersSuccess = (data) => ({
  type: actionTypes.FETCH_BANNER_SUCCESS,
  payload: { data },
});

export const fetchBannerById = (id) => {
  return (dispatch) => {
    dispatch(fetchBannerByIdInit());
    axios
      .get(`${baseUrl}/banner/` + id)
      .then((response) => {
        dispatch(fetchBannerByIdSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchBannerByIdFailure());
      });
  };
};

export const fetchBannerByIdInit = () => ({
  type: actionTypes.FETCH_BANNER_BY_ID,
});
export const fetchBannerByIdFailure = (data) => ({
  type: actionTypes.FETCH_BANNER_BY_ID_FAILURE,
});
export const fetchBannerByIdSuccess = (data) => ({
  type: actionTypes.FETCH_BANNER_BY_ID_SUCCESS,
  payload: { data },
});
