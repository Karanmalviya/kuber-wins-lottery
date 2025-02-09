import * as actionTypes from "./lotteryActionType";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl =
  process.env.REACT_APP_API_URL || "http://159.223.51.198:5500/api";

export const createlottery = (data) => {
  // const headers = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }};
  const params = new FormData();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    params.append(key, value);
  });
  return (dispatch) => {
    dispatch(createlotteryInit());
    axios
      .post(`${baseUrl}/gameinfo/store`, params)
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
        dispatch(createlotterySuccess(response.data.data));
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
        dispatch(createlotteryFailure());
        // }, 3000);
      });
  };
};

export const createlotteryInit = () => ({
  type: actionTypes.CREATE_LOTTERY,
});
export const createlotteryFailure = (data) => ({
  type: actionTypes.CREATE_LOTTERY_FAILURE,
});
export const createlotterySuccess = (data) => ({
  type: actionTypes.CREATE_LOTTERY_SUCCESS,
  payload: {data},
});

export const updatelottery = (data) => {
  if (data) {
    const params = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      params.append(key, value);
    });
    return (dispatch) => {
      dispatch(updatelotteryInit());
      axios
        .put(`${baseUrl}/gameinfo/${data.id}`, params)
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
          dispatch(updatelotterySuccess(response.data.data));
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
          dispatch(updatelotteryFailure());
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

export const updatelotteryInit = () => ({
  type: actionTypes.UPDATE_LOTTERY,
});
export const updatelotteryFailure = (data) => ({
  type: actionTypes.UPDATE_LOTTERY_FAILURE,
});
export const updatelotterySuccess = (data) => ({
  type: actionTypes.UPDATE_LOTTERY_SUCCESS,
  payload: {data},
});

export const deletelottery = (data) => {
  return (dispatch) => {
    dispatch(deletelotteryInit());
    axios
      .delete(`${baseUrl}/gameinfo/${data.id}`, data)
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
          dispatch(deletelotterySuccess(response.data.data));
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
          dispatch(deletelotteryFailure());
        }, 3000);
      });
  };
};

export const deletelotteryInit = () => ({
  type: actionTypes.DELETE_LOTTERY,
});
export const deletelotteryFailure = (data) => ({
  type: actionTypes.DELETE_LOTTERY_FAILURE,
});
export const deletelotterySuccess = (data) => ({
  type: actionTypes.DELETE_LOTTERY_SUCCESS,
  payload: {data},
});

export const fetchlottery = (data) => {
  return (dispatch) => {
    dispatch(fetchlotteryInit());
    axios
      .get(`${baseUrl}/gameinfo`, {params: data})
      .then((response) => {
        dispatch(fetchlotterySuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchlotteryFailure());
      });
  };
};

export const fetchlotteryInit = () => ({
  type: actionTypes.FETCH_LOTTERY,
});
export const fetchlotteryFailure = (data) => ({
  type: actionTypes.FETCH_LOTTERY_FAILURE,
});
export const fetchlotterySuccess = (data) => ({
  type: actionTypes.FETCH_LOTTERY_SUCCESS,
  payload: {data},
});

export const fetchlotteryEdit = (id) => {
  return (dispatch) => {
    dispatch(fetchlotteryEditInit());
    axios
      .get(`${baseUrl}/gameinfo/` + id)
      .then((response) => {
        dispatch(fetchlotteryEditSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchlotteryEditFailure());
      });
  };
};

export const fetchlotteryEditInit = () => ({
  type: actionTypes.FETCH_LOTTERY_EDIT,
});
export const fetchlotteryEditFailure = (data) => ({
  type: actionTypes.FETCH_LOTTERY_EDIT_FAILURE,
});
export const fetchlotteryEditSuccess = (data) => ({
  type: actionTypes.FETCH_LOTTERY_EDIT_SUCCESS,
  payload: {data},
});

export const fetchGameReport = (id) => {
  return (dispatch) => {
    dispatch(fetchGameReportInit());
    axios
      .get(`${baseUrl}/gameinfo/details-lottery`)
      .then((response) => {
        dispatch(fetchGameReportSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchGameReportFailure());
      });
  };
};

export const fetchGameReportInit = () => ({
  type: actionTypes.FETCH_GAME_REPORT,
});
export const fetchGameReportFailure = (data) => ({
  type: actionTypes.FETCH_GAME_REPORT_FAILURE,
});
export const fetchGameReportSuccess = (data) => ({
  type: actionTypes.FETCH_GAME_REPORT_SUCCESS,
  payload: {data},
});

export const fetchManualDrawUsers = (id) => {
  return (dispatch) => {
    dispatch(fetchManualDrawUsersInit());
    axios
      .get(`${baseUrl}/buytickets/user/data?id=${id}`)
      .then((response) => {
        dispatch(fetchManualDrawUsersSuccess(response.data.data));
      })
      .catch(function (error) {
        dispatch(fetchManualDrawUsersFailure());
      });
  };
};

export const fetchManualDrawUsersInit = () => ({
  type: actionTypes.FETCH_MANUAL_DRAW_USER,
});
export const fetchManualDrawUsersFailure = (data) => ({
  type: actionTypes.FETCH_MANUAL_DRAW_USER_FAILURE,
});
export const fetchManualDrawUsersSuccess = (data) => ({
  type: actionTypes.FETCH_MANUAL_DRAW_USER_SUCCESS,
  payload: {data},
});

export const fetchManualDrawTickets = (data) => {
  return (dispatch) => {
    dispatch(fetchManualDrawTicketsInit());
    return axios
      .get(
        `${baseUrl}/user/userBuy/ticket?id=${
          data?.id ?? ""
        }&gameInformationId=${data?.gameInformationId ?? ""}`
      )
      .then((response) => {
        dispatch(fetchManualDrawTicketsSuccess(response.data.data));
        return response.data.data;
      })
      .catch(function (error) {
        dispatch(fetchManualDrawTicketsFailure());
      });
  };
};

export const fetchManualDrawTicketsInit = () => ({
  type: actionTypes.FETCH_MANUAL_DRAW_TICKET,
});
export const fetchManualDrawTicketsFailure = (data) => ({
  type: actionTypes.FETCH_MANUAL_DRAW_TICKET_FAILURE,
});
export const fetchManualDrawTicketsSuccess = (data) => ({
  type: actionTypes.FETCH_MANUAL_DRAW_TICKET_SUCCESS,
  payload: {data},
});

export const fetchManualDrawHistory = (data) => {
  return (dispatch) => {
    dispatch(fetchManualDrawHistoryInit());
    axios
      .get(
        `${baseUrl}/manualDraw/game/data?gameInformationId=${
          data.gameInformationId ?? ""
        }&status=${data.status}&page=${data.page ?? ""}&pageSize=${
          data.pageSize ?? ""
        }`
      )
      .then((response) => {
        dispatch(fetchManualDrawHistorySuccess(response.data));
      })
      .catch(function (error) {
        dispatch(fetchManualDrawHistoryFailure());
      });
  };
};

export const fetchManualDrawHistoryInit = () => ({
  type: actionTypes.FETCH_MANUAL_DRAW_HISTORY,
});
export const fetchManualDrawHistoryFailure = (data) => ({
  type: actionTypes.FETCH_MANUAL_DRAW_HISTORY_FAILURE,
});
export const fetchManualDrawHistorySuccess = (data) => ({
  type: actionTypes.FETCH_MANUAL_DRAW_HISTORY_SUCCESS,
  payload: {data},
});

export const updateManualDraw = (data) => {
  const headers = {
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
  };

  return (dispatch) => {
    dispatch(updateManualDrawInit());
    axios
      .put(`${baseUrl}/manualDraw/update/${data.id}`, data, headers)
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
        dispatch(updateManualDrawSuccess(response.data));
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
        dispatch(updateManualDrawFailure());
      });
  };
};

export const updateManualDrawInit = () => ({
  type: actionTypes.UPDATE_MANUAL_DRAW,
});
export const updateManualDrawFailure = (data) => ({
  type: actionTypes.UPDATE_MANUAL_DRAW_FAILURE,
});
export const updateManualDrawSuccess = (data) => ({
  type: actionTypes.UPDATE_MANUAL_DRAW_SUCCESS,
  payload: {data},
});
