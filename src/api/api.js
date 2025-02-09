"use server";
import axios from "axios";
import { config } from "../config";

const path = {
  baseUrl: config.mainUrl,
  assetsUrl: config.assetsUrl,
  apiUrl: config.apiUrl,
};

export const getScratchCards = async (headers) => {
  const response = await axios
    .get(`${path.apiUrl}/api/scratchcard`, headers)
    .then((res) => {
      return res.data.data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const getLotteryTickets = async (headers) => {
  const response = await axios
    .get(`${path.apiUrl}/api/gameinfo`, headers)
    .then((res) => {
      return res.data.data.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getLotteryTicketsDetail = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/gameinfo/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getBuyLotteryTickets = async (headers) => {
  const response = await axios
    .get(`${path.apiUrl}/api/buytickets`, headers)
    .then((res) => {
      return res.data.data.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getBuyLotteryTicketById = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/buytickets/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const buyLotteryTickets = async (body, headers) => {
  const config = {
    method: "post",
    url: `${path.apiUrl}/api/buytickets/store`,
    headers: headers,
    data: body,
  };
  const response = axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};
export const generateLotteryNumber = async (id, ticketQuantity) => {
  const response = await axios
    .get(`${path.apiUrl}/api/lotterygenerat/${id}/${ticketQuantity}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const userLogin = async (body, headers) => {
  const response = await axios
    .post(`${path.apiUrl}/api/user/authenticate`, body, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const userRegisteration = async (body, headers) => {
  const response = await axios
    .post(`${path.apiUrl}/api/user/register`, body, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const getCountries = async () => {
  const response = await axios
    .get(`${path.apiUrl}/api/countries`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const getStates = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/countries/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const updateUserDetail = async (body, headers, id) => {
  const response = await axios
    .put(`${path.apiUrl}/api/user/${id}`, body, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const updateUserPassword = async (body, headers) => {
  const config = {
    method: "post",
    url: `${path.apiUrl}/api/user/change-password`,
    headers: headers,
    data: body,
  };
  const response = axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};

export const getUsers = async () => {
  const response = await axios
    .get(`${path.apiUrl}/api/user`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const updateLotteryGeneratedNumber = async (headers, number, id) => {
  const config = {
    method: "put",
    url: `${path.apiUrl}/api/lotterygenerat/${number}/${id}`,
    headers: headers,
  };
  const response = axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};

export const getWinnerList = async (headers) => {
  const response = await axios
    .get(`${path.apiUrl}/api/winner-tickets`, headers)
    .then((res) => {
      return res.data.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const walletPayment = async (body, headers) => {
  const response = await axios
    .post(`${path.apiUrl}/api/transaction/store`, body, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });

  return response;
};

export const CreateSupportTicket = async (body, headers) => {
  const response = await axios
    .post(`${path.apiUrl}/api/support-tickets/store`, body, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const getSupportTicket = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/support/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const CreateSupportTicketReply = async (body, headers) => {
  const response = await axios
    .post(`${path.apiUrl}/api/ticket-message/store`, body, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const CreateSupportTicketAttach = async (body, headers) => {
  const response = await axios
    .post(`${path.apiUrl}/api/ticket-attachment/store`, body, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const forgetPassword = async (body, headers) => {
  const response = await axios
    .post(`${path.apiUrl}/api/user/forget-password`, body, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const resetPassword = async (body, headers) => {
  const response = await axios
    .post(`${path.apiUrl}/api/user/reset-password`, body, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getSupportTicketReply = async (headers, id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/ticket-message`, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const contactUs = async (body, headers) => {
  const response = await axios
    .post(`${path.apiUrl}/api/contact/contact-us`, body, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getWinnerTickets = async (headers) => {
  const response = await axios
    .get(`${path.apiUrl}/api/winner-tickets`, headers)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getUserBuyTickets = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/buyticket/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const withdrawal = async (body, headers) => {
  const response = await axios
    .post(`${path.apiUrl}/api/withdrawals/store`, body, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const fetchWithdrawalById = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/withdrawals/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getUserDetail = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getDeposit = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/deposit/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getSupportTicketReplyAttach = async (headers) => {
  const response = await axios
    .get(`${path.apiUrl}/api/ticket-attachment`, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const updateMsg = async (body, id) => {
  const response = await axios
    .put(`${path.apiUrl}/api/support-tickets/${id}`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getUserWinners = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/winners/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const CreateSubscribeSendMail = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/subscribe/store`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const getTransaction = async () => {
  const response = await axios
    .get(`${path.apiUrl}/api/transaction`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getReferedUser = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/refer/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const getCommissionPercent = async (headers, id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user-referral`, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const CreateCommissionLog = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/commission/store`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const getCommissionUser = async (headers, id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/commission`, headers)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};
export const getScratchCardsById = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/scratchcard/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const buyScratchCard = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/scratchcardplay/store`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const buyScratchCardWin = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/scratchcardwin/store`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const buyScratchCardLoss = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/scratchcardloss/store`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const getAllPurchasedScratchCards = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/scratchcardplay`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const getScratchCardWins = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/scratchcard-win/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const getScratchCardsWinner = async () => {
  const response = await axios
    .get(`${path.apiUrl}/api/winners_card`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const getScratchCardLoss = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/scratchcard-loss/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const getTotalAmountScratchCardWins = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/scratchcard/${id}`)
    .then((res) => {
      return res.data.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const playAllScratchCard = async (data) => {
  const response = await axios
    .get(
      `${path.apiUrl}/api/user/scratchcardWinLossAll/${data.id}/${data.scratchCardId}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

const controller = new AbortController();
export const scratchWinUpdateStatus = async (id) => {
  let isSend = false;
  if (isSend) {
    controller.abort();
  }
  isSend = true;
  const response = await axios
    .put(`${path.apiUrl}/api/scratchcardwin/${id}`, {
      signal: controller.signal,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const scratchLossUpdateStatus = async (id) => {
  const response = await axios
    .put(`${path.apiUrl}/api/scratchcardloss/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const getScratchCardBuyNumbers = async (data) => {
  const response = await axios
    .get(
      `${path.apiUrl}/api/scratchgenerat/${data.scratchCardId}/${data.number}/${data.oddsOfWin}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};
export const getScratchCardNumber = async (id, scratchCardId) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/scratchcardWinLoss/${id}/${scratchCardId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const priceDistribution = async (body) => {
  const response = await axios
    .put(`${path.apiUrl}/api/cardscratch/store/user`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const wonScratchCard = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user/card-transaction/${id}`)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err.response?.data;
    });

  return response;
};

export const otpVerification = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/user/verify-otp`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const sendOTP = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/user/send-otp`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const getCountryCode = async () => {
  const response = await axios
    .get(`http://ip-api.com/json`)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err.response?.data;
    });

  return response;
};

export const coinbasePayment = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/coinbase/checkout`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const commissionTransaction = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/transaction/commission/store  `, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const registerTwofaVerification = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/2fa/register  `, body)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};
export const verifyTwofaVerification = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/2fa/verify`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const selfExclusion = async (body) => {
  const response = await axios
    .post(`${path.apiUrl}/api/self-exclusion/self`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const fetchAccountDetailsByIdApi = async (id) => {
  const response = await axios
    .get(`${path.apiUrl}/api/user_deposit/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const createDepositApi = async (body) => {
  const headers = {
    Authorization: `Bearer ${body?.token}`,
  };

  const response = await axios
    .post(
      `${path.apiUrl}/api/user_deposit/add`,
      { amount: body?.amount },
      { headers }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};
export const updateDepositApi = async (body) => {
  const headers = {
    Authorization: `Bearer ${body?.token}`,
  };

  const response = await axios
    .put(`${path.apiUrl}/api/user_deposit/update`, body?.body, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const fetchDepositsApi = async (data) => {
  const response = await axios
    .get(
      `${path.apiUrl}/api/user/userDeposit/${data.id}?page=${
        data?.page ?? ""
      }&pageSize=${data?.pageSize ?? ""}&search=${data?.search ?? ""}
`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return response;
};

export const fetchLotteryRewardsApi = async (data) => {
  const response = await axios
    .get(
      `${path.apiUrl}/api/freeLotteryClaims?page=${data?.page ?? ""}&pageSize=${
        data?.pageSize ?? ""
      }&search=${data?.userId ?? ""}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
};
