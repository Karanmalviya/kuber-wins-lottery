import * as actionTypes from "./scratchcardActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl =
  process.env.REACT_APP_API_URL || "http://159.223.51.198:5500/api";

export const createScratchCard = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const params = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    params.append(key, value);
  });
  return (dispatch) => {
    dispatch(createScratchCardInit());
    return axios
      .post(`${baseUrl}/scratchcard/store`, params, headers)
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
        dispatch(createScratchCardSuccess(response.data.data));
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
        dispatch(createScratchCardFailure());
      });
  };
};

export const createScratchCardInit = () => ({
  type: actionTypes.CREATE_SCRATCH_CARD,
});
export const createScratchCardFailure = (data) => ({
  type: actionTypes.CREATE_SCRATCH_CARD_FAILURE,
});
export const createScratchCardSuccess = (data) => ({
  type: actionTypes.CREATE_SCRATCH_CARD_SUCCESS,
  payload: { data },
});

export const updateScratchCard = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const params = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    params.append(key, value);
  });
  return (dispatch) => {
    dispatch(updateScratchCardInit());
    return axios
      .put(`${baseUrl}/scratchcard/${data.id}`, params, headers)
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
        dispatch(updateScratchCardSuccess(response.data.data));
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
        dispatch(updateScratchCardFailure());
      });
  };
};

export const updateScratchCardInit = () => ({
  type: actionTypes.UPDATE_SCRATCH_CARD,
});
export const updateScratchCardFailure = (data) => ({
  type: actionTypes.UPDATE_SCRATCH_CARD_FAILURE,
});
export const updateScratchCardSuccess = (data) => ({
  type: actionTypes.UPDATE_SCRATCH_CARD_SUCCESS,
  payload: { data },
});

export const deleteScratchCard = (data) => {
  return (dispatch) => {
    dispatch(deleteScratchCardInit());
    return axios
      .delete(`${baseUrl}/scratchcard/${data.id}`, data)
      .then((response) => {
        dispatch(deleteScratchCardSuccess(response.data.data));
        return response.data;
      })
      .catch(function (error) {
        dispatch(deleteScratchCardFailure());
      });
  };
};

export const deleteScratchCardInit = () => ({
  type: actionTypes.DELETE_SCRATCH_CARD,
});
export const deleteScratchCardFailure = (data) => ({
  type: actionTypes.DELETE_SCRATCH_CARD_FAILURE,
});
export const deleteScratchCardSuccess = (data) => ({
  type: actionTypes.DELETE_SCRATCH_CARD_SUCCESS,
  payload: { data },
});

export const fetchScratchCard = (data) => {
  return (dispatch) => {
    dispatch(fetchScratchCardInit());
    axios
      .get(`${baseUrl}/scratchcard`, { params: data })
      .then((response) => {
        dispatch(fetchScratchCardSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchScratchCardFailure());
      });
  };
};

export const fetchScratchCardInit = () => ({
  type: actionTypes.FETCH_SCRATCH_CARD,
});
export const fetchScratchCardFailure = (data) => ({
  type: actionTypes.FETCH_SCRATCH_CARD_FAILURE,
});
export const fetchScratchCardSuccess = (data) => ({
  type: actionTypes.FETCH_SCRATCH_CARD_SUCCESS,
  payload: { data },
});

export const fetchScratchCardById = (id) => {
  return (dispatch) => {
    dispatch(fetchScratchCardInit());
    axios
      .get(`${baseUrl}/scratchcard/${id}`)
      .then((response) => {
        dispatch(fetchScratchCardByIdSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchScratchCardByIdFailure());
      });
  };
};

export const fetchScratchCardByIdInit = () => ({
  type: actionTypes.FETCH_SCRATCH_CARD_ID,
});
export const fetchScratchCardByIdFailure = (data) => ({
  type: actionTypes.FETCH_SCRATCH_CARD_ID_FAILURE,
});
export const fetchScratchCardByIdSuccess = (data) => ({
  type: actionTypes.FETCH_SCRATCH_CARD_ID_SUCCESS,
  payload: { data },
});

export const createScratchCardTable = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return (dispatch) => {
    dispatch(createScratchCardTableInit());
    axios
      .post(`${baseUrl}/scratchtable/store`, data, headers)
      .then((response) => {
        dispatch(createScratchCardTableSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(createScratchCardTableFailure());
      });
  };
};

export const createScratchCardTableInit = () => ({
  type: actionTypes.CREATE_SCRATCH_CARD_TABLE,
});
export const createScratchCardTableFailure = (data) => ({
  type: actionTypes.CREATE_SCRATCH_CARD_FAILURE_TABLE,
});
export const createScratchCardTableSuccess = (data) => ({
  type: actionTypes.CREATE_SCRATCH_CARD_SUCCESS_TABLE,
  payload: { data },
});

export const updateScratchCardTable = (data) => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  return (dispatch) => {
    dispatch(updateScratchCardTableInit());
    return axios
      .put(`${baseUrl}/scratchtable/update`, data, headers)
      .then((response) => {
        dispatch(updateScratchCardTableSuccess(response.data.data));
        return response.data.data;
      })
      .catch(function (error) {
        dispatch(updateScratchCardFailure());
      });
  };
};

export const updateScratchCardTableInit = () => ({
  type: actionTypes.UPDATE_SCRATCH_CARD_TABLE,
});
export const updateScratchCardTableFailure = (data) => ({
  type: actionTypes.UPDATE_SCRATCH_CARD_FAILURE_TABLE,
});
export const updateScratchCardTableSuccess = (data) => ({
  type: actionTypes.UPDATE_SCRATCH_CARD_SUCCESS_TABLE,
  payload: { data },
});

export const deleteScratchCardTableTable = (data) => {
  return (dispatch) => {
    dispatch(deleteScratchCardTableInit());
    return axios
      .delete(`${baseUrl}/scratchtable/delete/${data.id}`, data)
      .then((response) => {
        dispatch(deleteScratchCardTableSuccess(response.data.data));
        return response.data;
      })
      .catch(function (error) {
        dispatch(deleteScratchCardTableFailure());
      });
  };
};

export const deleteScratchCardTableInit = () => ({
  type: actionTypes.DELETE_SCRATCH_CARD_TABLE,
});
export const deleteScratchCardTableFailure = (data) => ({
  type: actionTypes.DELETE_SCRATCH_CARD_TABLE_FAILURE,
});
export const deleteScratchCardTableSuccess = (data) => ({
  type: actionTypes.DELETE_SCRATCH_CARD_TABLE_SUCCESS,
  payload: { data },
});

export const deleteScratchCardTableTableRandom = (data) => {
  return (dispatch) => {
    dispatch(deleteScratchCardTableRandomInit());
    return axios
      .delete(`${baseUrl}/scratchgenerat/${data.id}`, data)
      .then((response) => {
        dispatch(deleteScratchCardTableRandomSuccess(response.data.data));
        return response.data;
      })
      .catch(function (error) {
        dispatch(deleteScratchCardTableRandomFailure());
      });
  };
};

export const deleteScratchCardTableRandomInit = () => ({
  type: actionTypes.DELETE_SCRATCH_CARD_TABLE_RANDOM,
});
export const deleteScratchCardTableRandomFailure = (data) => ({
  type: actionTypes.DELETE_SCRATCH_CARD_TABLE_RANDOM_FAILURE,
});
export const deleteScratchCardTableRandomSuccess = (data) => ({
  type: actionTypes.DELETE_SCRATCH_CARD_TABLE_RANDOM_SUCCESS,
  payload: { data },
});

export const fetchScratchCardSold = () => {
  return (dispatch) => {
    dispatch(fetchScratchCardSoldInit());
    axios
      .get(`${baseUrl}/scratchcardplay`)
      .then((response) => {
        dispatch(fetchScratchCardSoldSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchScratchCardSoldFailure());
      });
  };
};

export const fetchScratchCardSoldInit = () => ({
  type: actionTypes.FETCH_SCRATCH_CARD_SOLD,
});
export const fetchScratchCardSoldFailure = (data) => ({
  type: actionTypes.FETCH_SCRATCH_CARD_SOLD_FAILURE,
});
export const fetchScratchCardSoldSuccess = (data) => ({
  type: actionTypes.FETCH_SCRATCH_CARD_SOLD_SUCCESS,
  payload: { data },
});

export const fetchScratchCardWinner = (id) => {
  return (dispatch) => {
    dispatch(fetchScratchCardWinnerInit());
    axios
      .get(`${baseUrl}/transaction/count/${id}`)
      .then((response) => {
        dispatch(fetchScratchCardWinnerSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(fetchScratchCardWinnerFailure());
      });
  };
};

export const fetchScratchCardWinnerInit = () => ({
  type: actionTypes.FETCH_SCRATCH_CARD_WINNER,
});
export const fetchScratchCardWinnerFailure = (data) => ({
  type: actionTypes.FETCH_SCRATCH_CARD_WINNER_FAILURE,
});
export const fetchScratchCardWinnerSuccess = (data) => ({
  type: actionTypes.FETCH_SCRATCH_CARD_WINNER_SUCCESS,
  payload: { data },
});

export const fetchScratchGameReport = (id) => {
  return (dispatch) => {
    dispatch(fetchScratchGameReportInit());
    axios
      .get(`${baseUrl}/scratchcard/details-card`)
      .then((response) => {
        dispatch(fetchScratchGameReportSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchScratchGameReportFailure());
      });
  };
};

export const fetchScratchGameReportInit = () => ({
  type: actionTypes.FETCH_SCRATCH_GAME_REPORT,
});
export const fetchScratchGameReportFailure = (data) => ({
  type: actionTypes.FETCH_SCRATCH_GAME_REPORT_FAILURE,
});
export const fetchScratchGameReportSuccess = (data) => ({
  type: actionTypes.FETCH_SCRATCH_GAME_REPORT_SUCCESS,
  payload: { data },
});
