import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateCommissionLog,
  buyLotteryTickets,
  coinbasePayment,
  commissionTransaction,
  createDepositApi,
  fetchAccountDetailsByIdApi,
  fetchDepositsApi,
  fetchLotteryRewardsApi,
  fetchWithdrawalById,
  generateLotteryNumber,
  getAllPurchasedScratchCards,
  getBuyLotteryTicketById,
  getBuyLotteryTickets,
  getCommissionPercent,
  getCountries,
  getDeposit,
  getLotteryTickets,
  getLotteryTicketsDetail,
  getReferedUser,
  getScratchCardBuyNumbers,
  getScratchCardLoss,
  getScratchCardNumber,
  getScratchCardWins,
  getScratchCards,
  getScratchCardsById,
  getScratchCardsWinner,
  getStates,
  getSupportTicket,
  getSupportTicketReply,
  getSupportTicketReplyAttach,
  getTotalAmountScratchCardWins,
  getTransaction,
  getUserBuyTickets,
  getUserDetail,
  getUserWinners,
  getUsers,
  getWinnerList,
  getWinnerTickets,
  playAllScratchCard,
  registerTwofaVerification,
  updateDepositApi,
  verifyTwofaVerification,
  walletPayment,
  wonScratchCard,
} from "../api/api";

export const fetchUser = createAsyncThunk("api/fetchUser", async (id) => {
  return getUserDetail(id);
});

export const fetchUsers = createAsyncThunk(
  "api/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await getUsers();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchScratchCard = createAsyncThunk(
  "api/fetchScratchCard",
  async (_, thunkAPI) => {
    try {
      const response = await getScratchCards();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchLottery = createAsyncThunk(
  "api/fetchLottery",
  async (_, thunkAPI) => {
    try {
      const response = await getLotteryTickets();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchWinnerTickets = createAsyncThunk(
  "api/fetchWinnerTickets",
  async () => {
    return getWinnerTickets();
  }
);

export const fetchBuyLotteryTicket = createAsyncThunk(
  "api/fetchBuyLotteryTicket",
  async (_, thunkAPI) => {
    try {
      const response = await getBuyLotteryTickets();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserLotteryWinner = createAsyncThunk(
  "api/fetchUserLotteryWinner",
  async (id, thunkAPI) => {
    try {
      const response = await getUserWinners(id);
      return response.data.Winners;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchScratchCardWinners = createAsyncThunk(
  "api/fetchScratchCardWinners",
  async (_, thunkAPI) => {
    try {
      const response = await getScratchCardsWinner();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllPurchasedScratchCard = createAsyncThunk(
  "api/fetchAllPurchasedScratchCard",
  async (_, thunkAPI) => {
    try {
      const response = await getAllPurchasedScratchCards();
      return response.rows;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchUserDeposits = createAsyncThunk(
  "api/fetchUserDeposits",
  async (id, thunkAPI) => {
    try {
      const response = await getDeposit(id);
      return response.data.deposit;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchUserWithDrawal = createAsyncThunk(
  "api/fetchUserWithDrawal",
  async (id, thunkAPI) => {
    try {
      const response = await fetchWithdrawalById(id);
      return response.data.Withdrawals;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const fetchTransaction = createAsyncThunk(
  "api/fetchTransaction",
  async (_, thunkAPI) => {
    try {
      const response = await getTransaction();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchUserBuyLottery = createAsyncThunk(
  "api/fetchUserBuyLottery",
  async (id, thunkAPI) => {
    try {
      const response = await getBuyLotteryTicketById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchLotteryTicketDetails = createAsyncThunk(
  "api/fetchLotteryTicketDetails",
  async (id, thunkAPI) => {
    try {
      const response = await getLotteryTicketsDetail(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchWonScratchCard = createAsyncThunk(
  "api/fetchWonScratchCard",
  async (id, thunkAPI) => {
    try {
      const response = await wonScratchCard(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchUserBuyLotteryTicket = createAsyncThunk(
  "api/fetchUserBuyLotteryTicket",
  async (id, thunkAPI) => {
    try {
      const response = await getUserBuyTickets(id);
      return response.data.BuyTickets;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchCommissionPercent = createAsyncThunk(
  "api/fetchCommissionPercent",
  async (_, thunkAPI) => {
    try {
      const response = await getCommissionPercent();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const fetchReferedUser = createAsyncThunk(
  "api/fetchReferedUser",
  async (id, thunkAPI) => {
    try {
      const response = await getReferedUser(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const fetchLotteryNumber = createAsyncThunk(
  "api/fetchLotteryNumber",
  async (data, thunkAPI) => {
    try {
      const response = await generateLotteryNumber(
        data.id,
        data.ticketQuantity
      );
      return response.randomNumbers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchLotteryWinnerList = createAsyncThunk(
  "api/fetchLotteryWinnerList",
  async (_, thunkAPI) => {
    try {
      const response = await getWinnerList();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchScratchCardsById = createAsyncThunk(
  "api/fetchScratchCardsById",
  async (id, thunkAPI) => {
    try {
      const response = await getScratchCardsById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchTotalAmountScratchCardWins = createAsyncThunk(
  "api/fetchTotalAmountScratchCardWins",
  async (id, thunkAPI) => {
    try {
      const response = await getTotalAmountScratchCardWins(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchCountries = createAsyncThunk(
  "api/fetchCountries",
  async (id, thunkAPI) => {
    try {
      const response = await getCountries();
      return response.data.countries;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchState = createAsyncThunk(
  "api/fetchState",
  async (id, thunkAPI) => {
    try {
      const response = await getStates(id);
      return response.data.States;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchScratchCardWins = createAsyncThunk(
  "api/fetchScratchCardWins",
  async (id, thunkAPI) => {
    try {
      const response = await getScratchCardWins(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchScratchCardLoss = createAsyncThunk(
  "api/fetchScratchCardLoss",
  async (id, thunkAPI) => {
    try {
      const response = await getScratchCardLoss(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchScratchCardNumbers = createAsyncThunk(
  "api/fetchScratchCardNumbers",
  async (data, thunkAPI) => {
    try {
      const response = await getScratchCardNumber(data.id, data.scratchCardId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchScratchCardBuyNumbers = createAsyncThunk(
  "api/fetchScratchCardBuyNumbers",
  async (data, thunkAPI) => {
    try {
      const response = await getScratchCardBuyNumbers(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const playAllScratchCards = createAsyncThunk(
  "api/playAllScratchCards",
  async (data, thunkAPI) => {
    try {
      const response = await playAllScratchCard(data.id, data.scratchCardId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchSupportTicketById = createAsyncThunk(
  "api/fetchSupportTicketById",
  async (id, thunkAPI) => {
    try {
      const response = await getSupportTicket(id);
      return response.data.SupportTickets;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchSupportTicketAttachment = createAsyncThunk(
  "api/fetchSupportTicketAttachment",
  async (_, thunkAPI) => {
    try {
      const response = await getSupportTicketReplyAttach();
      return response.data.rows;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchSupportTicketReply = createAsyncThunk(
  "api/fetchSupportTicketReply",
  async (_, thunkAPI) => {
    try {
      const response = await getSupportTicketReply();
      return response.data.rows;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchScratchCardNumberData = createAsyncThunk(
  "api/fetchScratchCardNumberData",
  async (data) => {
    return data;
  }
);

export const storeScratchCardNumberData = (data) => ({
  type: "api/storeScratchCardNumberData",
  payload: data,
});

// POST request

export const register2fa = createAsyncThunk(
  "api/register2fa",
  async (body, thunkAPI) => {
    try {
      const response = await registerTwofaVerification(body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const verfiy2fa = createAsyncThunk(
  "api/verfiy2fa",
  async (body, thunkAPI) => {
    try {
      const response = await verifyTwofaVerification(body);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const postBuyLotteryTickets = createAsyncThunk(
  "api/postBuyLotteryTickets",
  async (body, headers, thunkAPI) => {
    try {
      const response = await buyLotteryTickets(body, headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const postCommission = createAsyncThunk(
  "api/postCommission",
  async (body, id, thunkAPI) => {
    try {
      const response = await CreateCommissionLog(body, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const postCommissionTransaction = createAsyncThunk(
  "api/postCommissionTransaction",
  async (body, thunkAPI) => {
    try {
      const response = await commissionTransaction(body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const payWithWallet = createAsyncThunk(
  "api/payWithWallet",
  async (body, headers, id, thunkAPI) => {
    try {
      const response = await walletPayment(body, headers, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const payWithCoinbasePayment = createAsyncThunk(
  "api/payWithCoinbasePayment",
  async (body, thunkAPI) => {
    try {
      const response = await coinbasePayment(body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// PUT requests

export const updateLotteryNumber = createAsyncThunk(
  "api/updateLotteryNumber",
  async (body, headers, id, thunkAPI) => {
    try {
      const response = await buyLotteryTickets(headers, body, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const updateDeposit = createAsyncThunk(
  "api/updateDeposit",
  async (body, thunkAPI) => {
    try {
      const response = await updateDepositApi(body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const createDeposit = createAsyncThunk(
  "api/createDeposit",
  async (body, thunkAPI) => {
    console.log(body);
    try {
      const response = await createDepositApi(body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchAccountDetailsById = createAsyncThunk(
  "api/fetchAccountDetailsById",
  async (id, thunkAPI) => {
    try {
      const response = await fetchAccountDetailsByIdApi(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchDeposits = createAsyncThunk(
  "api/fetchDeposits",
  async (data, thunkAPI) => {
    try {
      const response = await fetchDepositsApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchLotteryRewards = createAsyncThunk(
  "api/fetchLotteryRewards",
  async (data, thunkAPI) => {
    try {
      const response = await fetchLotteryRewardsApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    user: {},
    users: {},

    scratchCardData: [],
    scratchCardLoading: false,
    scratchCardError: null,

    lotteryData: [],
    lotteryDataLoading: false,
    lotteryDataError: null,

    winnerTicketData: {},
    winnerTicketLoading: false,
    winnerTicketError: null,

    scratchCardWinnersData: [],
    scratchCardWinnersLoading: false,
    scratchCardWinnersError: null,

    lotteryBuyData: [],
    lotteryBuyDataError: null,
    lotteryBuyDataLoading: false,

    UserLotteryWinner: [],
    UserLotteryWinnerError: null,
    UserLotteryWinnerLoading: false,

    AllPurchasedScratchCard: [],
    AllPurchasedScratchCardError: null,
    AllPurchasedScratchCardLoading: false,

    buyLotteryTicketById: {},
    buyLotteryTicketByIdError: null,
    buyLotteryTicketByIdLoading: false,

    lotteryTicketDetails: {},
    lotteryTicketDetailsError: null,
    lotteryTicketDetailsLoading: false,

    wonScratchCards: {},
    wonScratchCardsError: null,
    wonScratchCardsLoading: false,

    deposits: [],
    depositsError: null,
    depositsLoading: false,

    withdrawal: [],
    withdrawalError: null,
    withdrawalLoading: false,

    transaction: [],
    transactionError: null,
    transactionLoading: false,

    userBuyLotteryTicket: [],
    userBuyLotteryLoading: false,
    userBuyLotteryError: null,

    // userBuyLotteryTicket: [],
    // userBuyLotteryLoading: false,
    // userBuyLotteryError: null,

    commissionPercent: [],
    commissionPercentLoading: false,
    commissionPercentError: null,

    referedUser: {},
    referedUserLoading: false,
    referedUserError: null,

    lotteryNumber: [],
    lotteryNumberLoading: false,
    lotteryNumberError: null,

    lotteryWinnerList: [],
    lotteryWinnerListLoading: false,
    lotteryWinnerListError: null,

    scratchCardById: {},
    scratchCardByIdLoading: false,
    scratchCardByIdError: null,

    totalAmountScratchCardWins: {},
    totalAmountScratchCardWinsLoading: false,
    totalAmountScratchCardWinsError: null,

    countriesData: [],
    countriesDataLoading: false,
    countriesDataError: null,

    stateData: [],
    stateDataLoading: false,
    stateDataError: null,

    // isko hatana hai
    scratchCardWins: [],
    scratchCardWinsLoading: false,
    scratchCardWinsError: null,

    // isko hatana hai
    scratchCardLoss: [],
    scratchCardLossLoading: false,
    scratchCardLossError: null,

    scratchCardNumber: [],
    scratchCardNumberLoading: false,
    scratchCardNumberError: null,

    scratchCardBuyNumber: [],
    scratchCardBuyNumberLoading: false,
    scratchCardBuyNumberError: null,

    scratchCardAll: [],
    scratchCardAllLoading: false,
    scratchCardAllError: null,

    supportTicketById: [],
    supportTicketByIdLoading: false,
    supportTicketByIdError: null,

    supportTicketAttachment: [],
    supportTicketAttachmentLoading: false,
    supportTicketAttachmentError: null,

    supportTicketReply: [],
    supportTicketReplyLoading: false,
    supportTicketReplyError: null,

    scratchCardNumberData: [],
    scratchCardNumberDataLoading: false,
    scratchCardNumberDataError: null,

    // Post request

    register2faData: [],
    register2faDataLoading: false,
    register2faDataError: null,

    verfiy2faData: [],
    verfiy2faDataLoading: false,
    verfiy2faDataError: null,

    buyLotteryTicketsData: [],
    buyLotteryTicketsLoading: false,
    buyLotteryTicketsError: null,

    commission: [],
    commissionLoading: false,
    commissionError: null,

    commissionTransactionData: [],
    commissionTransactionLoading: false,
    commissionTransactionError: null,

    postWalletPayment: [],
    postWalletPaymentLoading: false,
    postWalletPaymentError: null,

    postCoinbasePayment: [],
    postCoinbasePaymentLoading: false,
    postCoinbasePaymentError: null,

    // PUT request

    updateLotteryNumberData: [],
    updateLotteryNumberLoading: false,
    updateLotteryNumberError: null,

    getAccountDetailsByIdData: {},
    getAccountDetailsByIdLoading: false,
    getAccountDetailsByIdError: null,

    createDepositData: {},
    createDepositLoading: false,
    createDepositError: null,

    updateDepositData: {},
    updateDepositLoading: false,
    updateDepositError: null,

    fetchDepositsData: [],
    fetchDepositsLoading: false,
    fetchDepositsError: null,

    lotteryRewardsData: [],
    lotteryRewardsLoading: false,
    lotteryRewardsError: null,
  },
  reducers: {
    clearScratchCardData: (state) => {
      state.scratchCardById = {};
    },
    clearScratchCardNumber: (state) => {
      state.scratchCardNumber = {};
    },
    clearLotteryTicketDetails: (state) => {
      state.lotteryTicketDetails = [];
    },
    clearLotteryTicketNumber: (state) => {
      state.lotteryNumber = [];
    },
    clearScratchCardNumberData: (state) => {
      state.scratchCardNumberData = [];
    },
    //
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countriesData = action.payload;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.countriesData = [];
    });

    builder.addCase(fetchState.fulfilled, (state, action) => {
      state.stateData = action.payload;
    });
    builder.addCase(fetchState.rejected, (state, action) => {
      state.stateData = [];
    });

    builder.addCase(fetchScratchCardNumberData.fulfilled, (state, action) => {
      state.scratchCardNumberData = action.payload;
    });

    builder
      .addCase(fetchScratchCard.pending, (state) => {
        state.scratchCardLoading = true;
        state.scratchCardError = null;
      })
      .addCase(fetchScratchCard.fulfilled, (state, action) => {
        state.scratchCardLoading = false;
        state.scratchCardData = action.payload;
      })
      .addCase(fetchScratchCard.rejected, (state, action) => {
        state.scratchCardLoading = false;
        state.scratchCardError = action.payload;
      });

    builder
      .addCase(fetchLottery.pending, (state) => {
        state.lotteryDataLoading = true;
        state.lotteryDataError = null;
      })
      .addCase(fetchLottery.fulfilled, (state, action) => {
        state.lotteryDataLoading = false;
        state.lotteryData = action.payload;
      })
      .addCase(fetchLottery.rejected, (state, action) => {
        state.lotteryDataLoading = false;
        state.lotteryDataError = action.payload;
      });

    builder
      .addCase(fetchWinnerTickets.pending, (state) => {
        state.winnerTicketLoading = true;
        state.winnerTicketError = null;
      })
      .addCase(fetchWinnerTickets.fulfilled, (state, action) => {
        state.winnerTicketLoading = false;
        state.winnerTicketData = action.payload;
      })
      .addCase(fetchWinnerTickets.rejected, (state, action) => {
        state.winnerTicketLoading = false;
        state.winnerTicketError = action.payload;
      });

    builder
      .addCase(fetchScratchCardWinners.pending, (state) => {
        state.scratchCardWinnersLoading = true;
        state.scratchCardWinnersError = null;
      })
      .addCase(fetchScratchCardWinners.fulfilled, (state, action) => {
        state.scratchCardWinnersLoading = false;
        state.scratchCardWinnersData = action.payload;
      })
      .addCase(fetchScratchCardWinners.rejected, (state, action) => {
        state.scratchCardWinnersLoading = false;
        state.scratchCardWinnersError = action.payload;
      });

    builder
      .addCase(fetchBuyLotteryTicket.pending, (state) => {
        state.lotteryBuyDataLoading = true;
        state.lotteryBuyDataError = null;
      })
      .addCase(fetchBuyLotteryTicket.fulfilled, (state, action) => {
        state.lotteryBuyDataLoading = false;
        state.lotteryBuyData = action.payload;
      })
      .addCase(fetchBuyLotteryTicket.rejected, (state, action) => {
        state.lotteryBuyDataLoading = false;
        state.lotteryBuyDataError = [];
      });

    builder
      .addCase(fetchUserLotteryWinner.pending, (state) => {
        state.UserLotteryWinnerLoading = true;
        state.UserLotteryWinnerError = null;
      })
      .addCase(fetchUserLotteryWinner.fulfilled, (state, action) => {
        state.UserLotteryWinnerLoading = false;
        state.UserLotteryWinner = action.payload;
      })
      .addCase(fetchUserLotteryWinner.rejected, (state, action) => {
        state.UserLotteryWinnerLoading = false;
        state.UserLotteryWinnerError = action.payload;
      });

    builder
      .addCase(fetchAllPurchasedScratchCard.pending, (state) => {
        state.AllPurchasedScratchCardLoading = true;
        state.AllPurchasedScratchCardError = null;
      })
      .addCase(fetchAllPurchasedScratchCard.fulfilled, (state, action) => {
        state.AllPurchasedScratchCardLoading = false;
        state.AllPurchasedScratchCard = action.payload;
      })
      .addCase(fetchAllPurchasedScratchCard.rejected, (state, action) => {
        state.AllPurchasedScratchCardLoading = false;
        state.AllPurchasedScratchCardError = action.payload;
      });

    builder
      .addCase(fetchUserBuyLottery.pending, (state) => {
        state.buyLotteryTicketByIdLoading = true;
        state.buyLotteryTicketByIdError = null;
      })
      .addCase(fetchUserBuyLottery.fulfilled, (state, action) => {
        state.buyLotteryTicketByIdLoading = false;
        state.buyLotteryTicketById = action.payload;
      })
      .addCase(fetchUserBuyLottery.rejected, (state, action) => {
        state.buyLotteryTicketByIdLoading = false;
        state.buyLotteryTicketByIdError = action.payload;
      });

    builder
      .addCase(fetchLotteryTicketDetails.pending, (state) => {
        state.lotteryTicketDetailsLoading = true;
        state.lotteryTicketDetailsError = null;
      })
      .addCase(fetchLotteryTicketDetails.fulfilled, (state, action) => {
        state.lotteryTicketDetailsLoading = false;
        state.lotteryTicketDetails = action.payload;
      })
      .addCase(fetchLotteryTicketDetails.rejected, (state, action) => {
        state.lotteryTicketDetailsLoading = false;
        state.lotteryTicketDetailsError = action.payload;
      });

    builder
      .addCase(fetchWonScratchCard.pending, (state) => {
        state.wonScratchCardsLoading = true;
        state.wonScratchCardsError = null;
      })
      .addCase(fetchWonScratchCard.fulfilled, (state, action) => {
        state.wonScratchCardsLoading = false;
        state.wonScratchCards = action.payload;
      })
      .addCase(fetchWonScratchCard.rejected, (state, action) => {
        state.wonScratchCardsLoading = false;
        state.wonScratchCardsError = action.payload;
      });

    builder
      .addCase(fetchUserDeposits.pending, (state) => {
        state.depositsLoading = true;
        state.depositsError = null;
      })
      .addCase(fetchUserDeposits.fulfilled, (state, action) => {
        state.depositsLoading = false;
        state.deposits = action.payload;
      })
      .addCase(fetchUserDeposits.rejected, (state, action) => {
        state.depositsLoading = false;
        state.depositsError = action.payload;
      });

    builder
      .addCase(fetchUserWithDrawal.pending, (state) => {
        state.withdrawalLoading = true;
        state.withdrawalError = null;
      })
      .addCase(fetchUserWithDrawal.fulfilled, (state, action) => {
        state.withdrawalLoading = false;
        state.withdrawal = action.payload;
      })
      .addCase(fetchUserWithDrawal.rejected, (state, action) => {
        state.withdrawalLoading = false;
        state.withdrawalError = action.payload;
      });

    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.transactionLoading = true;
        state.transactionError = null;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.transactionLoading = false;
        state.transaction = action.payload;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.transactionLoading = false;
        state.transactionError = action.payload;
      });

    builder
      .addCase(fetchUserBuyLotteryTicket.pending, (state) => {
        state.userBuyLotteryLoading = true;
        state.userBuyLotteryError = null;
      })
      .addCase(fetchUserBuyLotteryTicket.fulfilled, (state, action) => {
        state.userBuyLotteryLoading = false;
        state.userBuyLotteryTicket = action.payload;
      })
      .addCase(fetchUserBuyLotteryTicket.rejected, (state, action) => {
        state.userBuyLotteryLoading = false;
        state.userBuyLotteryError = action.payload;
      });

    builder
      .addCase(fetchCommissionPercent.pending, (state) => {
        state.commissionPercentLoading = true;
        state.commissionPercentError = null;
      })
      .addCase(fetchCommissionPercent.fulfilled, (state, action) => {
        state.commissionPercentLoading = false;
        state.commissionPercent = action.payload;
      })
      .addCase(fetchCommissionPercent.rejected, (state, action) => {
        state.commissionPercentLoading = false;
        state.commissionPercentError = action.payload;
      });

    builder
      .addCase(fetchReferedUser.pending, (state) => {
        state.referedUserLoading = true;
        state.referedUserError = null;
      })
      .addCase(fetchReferedUser.fulfilled, (state, action) => {
        state.referedUserLoading = false;
        state.referedUser = action.payload;
      })
      .addCase(fetchReferedUser.rejected, (state, action) => {
        state.referedUserLoading = false;
        state.referedUserError = action.payload;
      });

    builder
      .addCase(fetchLotteryNumber.pending, (state) => {
        state.lotteryNumberLoading = true;
        state.lotteryNumberError = null;
      })
      .addCase(fetchLotteryNumber.fulfilled, (state, action) => {
        state.lotteryNumberLoading = false;
        state.lotteryNumber = action.payload;
      })
      .addCase(fetchLotteryNumber.rejected, (state, action) => {
        state.lotteryNumberLoading = false;
        state.lotteryNumberError = action.payload;
        state.lotteryNumber = [];
      });

    builder
      .addCase(fetchScratchCardsById.pending, (state) => {
        state.scratchCardByIdLoading = true;
        state.scratchCardByIdError = null;
      })
      .addCase(fetchScratchCardsById.fulfilled, (state, action) => {
        state.scratchCardByIdLoading = false;
        state.scratchCardById = action.payload;
      })
      .addCase(fetchScratchCardsById.rejected, (state, action) => {
        state.scratchCardByIdLoading = false;
        state.scratchCardByIdError = action.payload;
      });

    builder
      .addCase(fetchTotalAmountScratchCardWins.pending, (state) => {
        state.totalAmountScratchCardWinsLoading = true;
        state.totalAmountScratchCardWinsError = null;
      })
      .addCase(fetchTotalAmountScratchCardWins.fulfilled, (state, action) => {
        state.totalAmountScratchCardWinsLoading = false;
        state.totalAmountScratchCardWins = action.payload;
      })
      .addCase(fetchTotalAmountScratchCardWins.rejected, (state, action) => {
        state.totalAmountScratchCardWinsLoading = false;
        state.totalAmountScratchCardWinsError = action.payload;
      });

    builder
      .addCase(fetchLotteryWinnerList.pending, (state) => {
        state.lotteryWinnerListLoading = true;
        state.lotteryWinnerListError = null;
      })
      .addCase(fetchLotteryWinnerList.fulfilled, (state, action) => {
        state.lotteryWinnerListLoading = false;
        state.lotteryWinnerList = action.payload;
      })
      .addCase(fetchLotteryWinnerList.rejected, (state, action) => {
        state.lotteryWinnerListLoading = false;
        state.lotteryWinnerListError = action.payload;
      });

    builder
      .addCase(fetchScratchCardWins.pending, (state) => {
        state.scratchCardWinsLoading = true;
        state.scratchCardWinsError = null;
      })
      .addCase(fetchScratchCardWins.fulfilled, (state, action) => {
        state.scratchCardWinsLoading = false;
        state.scratchCardWins = action.payload;
      })
      .addCase(fetchScratchCardWins.rejected, (state, action) => {
        state.scratchCardWinsLoading = false;
        state.scratchCardWinsError = action.payload;
      });

    builder
      .addCase(fetchScratchCardLoss.pending, (state) => {
        state.scratchCardLossLoading = true;
        state.scratchCardLossError = null;
      })
      .addCase(fetchScratchCardLoss.fulfilled, (state, action) => {
        state.scratchCardLossLoading = false;
        state.scratchCardLoss = action.payload;
      })
      .addCase(fetchScratchCardLoss.rejected, (state, action) => {
        state.scratchCardLossLoading = false;
        state.scratchCardLossError = action.payload;
      });

    builder
      .addCase(fetchSupportTicketById.pending, (state) => {
        state.supportTicketByIdLoading = true;
        state.supportTicketByIdError = null;
      })
      .addCase(fetchSupportTicketById.fulfilled, (state, action) => {
        state.supportTicketByIdLoading = false;
        state.supportTicketById = action.payload;
      })
      .addCase(fetchSupportTicketById.rejected, (state, action) => {
        state.supportTicketByIdLoading = false;
        state.supportTicketByIdError = action.payload;
      });

    builder
      .addCase(fetchSupportTicketAttachment.pending, (state) => {
        state.supportTicketAttachmentLoading = true;
        state.supportTicketAttachmentError = null;
      })
      .addCase(fetchSupportTicketAttachment.fulfilled, (state, action) => {
        state.supportTicketAttachmentLoading = false;
        state.supportTicketAttachment = action.payload;
      })
      .addCase(fetchSupportTicketAttachment.rejected, (state, action) => {
        state.supportTicketAttachmentLoading = false;
        state.supportTicketAttachmentError = action.payload;
      });

    builder
      .addCase(fetchSupportTicketReply.pending, (state) => {
        state.supportTicketReplyLoading = true;
        state.supportTicketReplyError = null;
      })
      .addCase(fetchSupportTicketReply.fulfilled, (state, action) => {
        state.supportTicketReplyLoading = false;
        state.supportTicketReply = action.payload;
      })
      .addCase(fetchSupportTicketReply.rejected, (state, action) => {
        state.supportTicketReplyLoading = false;
        state.supportTicketReplyError = action.payload;
      });

    builder
      .addCase(fetchScratchCardNumbers.pending, (state) => {
        state.scratchCardNumberLoading = true;
        state.scratchCardNumberError = null;
      })
      .addCase(fetchScratchCardNumbers.fulfilled, (state, action) => {
        state.scratchCardNumberLoading = false;
        state.scratchCardNumber = action.payload;
      })
      .addCase(fetchScratchCardNumbers.rejected, (state, action) => {
        state.scratchCardNumberLoading = false;
        state.scratchCardNumberError = action.payload;
      });

    builder
      .addCase(fetchScratchCardBuyNumbers.pending, (state) => {
        state.scratchCardBuyNumberLoading = true;
        state.scratchCardBuyNumberError = null;
      })
      .addCase(fetchScratchCardBuyNumbers.fulfilled, (state, action) => {
        state.scratchCardBuyNumberLoading = false;
        state.scratchCardBuyNumber = action.payload;
      })
      .addCase(fetchScratchCardBuyNumbers.rejected, (state, action) => {
        state.scratchCardBuyNumberLoading = false;
        state.scratchCardBuyNumberError = action.payload;
      });

    builder
      .addCase(playAllScratchCards.pending, (state) => {
        state.scratchCardAllLoading = true;
        state.scratchCardAllError = null;
      })
      .addCase(playAllScratchCards.fulfilled, (state, action) => {
        state.scratchCardAllLoading = false;
        state.scratchCardAll = action.payload;
      })
      .addCase(playAllScratchCards.rejected, (state, action) => {
        state.scratchCardAllLoading = false;
        state.scratchCardAllError = action.payload;
      });

    // post request

    builder
      .addCase(verfiy2fa.pending, (state) => {
        state.verfiy2faDataLoading = true;
        state.verfiy2faDataError = null;
      })
      .addCase(verfiy2fa.fulfilled, (state, action) => {
        state.verfiy2faDataLoading = false;
        state.verfiy2faData = action.payload;
      })
      .addCase(verfiy2fa.rejected, (state, action) => {
        state.verfiy2faDataLoading = false;
        state.verfiy2faDataError = action.payload;
      });

    builder
      .addCase(register2fa.pending, (state) => {
        state.register2faDataLoading = true;
        state.register2faDataError = null;
      })
      .addCase(register2fa.fulfilled, (state, action) => {
        state.register2faDataLoading = false;
        state.register2faData = action.payload;
      })
      .addCase(register2fa.rejected, (state, action) => {
        state.register2faDataLoading = false;
        state.register2faDataError = action.payload;
      });

    builder
      .addCase(postBuyLotteryTickets.pending, (state) => {
        state.buyLotteryTicketsLoading = true;
        state.buyLotteryTicketsError = null;
      })
      .addCase(postBuyLotteryTickets.fulfilled, (state, action) => {
        state.buyLotteryTicketsLoading = false;
        state.buyLotteryTicketsData = action.payload;
      })
      .addCase(postBuyLotteryTickets.rejected, (state, action) => {
        state.buyLotteryTicketsLoading = false;
        state.buyLotteryTicketsError = action.payload;
      });

    builder
      .addCase(postCommission.pending, (state) => {
        state.commissionLoading = true;
        state.commissionError = null;
      })
      .addCase(postCommission.fulfilled, (state, action) => {
        state.commissionLoading = false;
        state.commission = action.payload;
      })
      .addCase(postCommission.rejected, (state, action) => {
        state.commissionLoading = false;
        state.commissionError = action.payload;
      });

    builder
      .addCase(postCommissionTransaction.pending, (state) => {
        state.commissionTransactionLoading = true;
        state.commissionTransactionError = null;
      })
      .addCase(postCommissionTransaction.fulfilled, (state, action) => {
        state.commissionTransactionLoading = false;
        state.commissionTransactionData = action.payload;
      })
      .addCase(postCommissionTransaction.rejected, (state, action) => {
        state.commissionTransactionLoading = false;
        state.commissionTransactionError = action.payload;
      });

    builder
      .addCase(payWithWallet.pending, (state) => {
        state.postWalletPaymentLoading = true;
        state.postWalletPaymentError = null;
      })
      .addCase(payWithWallet.fulfilled, (state, action) => {
        state.postWalletPaymentLoading = false;
        state.postWalletPayment = action.payload;
      })
      .addCase(payWithWallet.rejected, (state, action) => {
        state.postWalletPaymentLoading = false;
        state.postWalletPaymentError = action.payload;
      });

    builder
      .addCase(payWithCoinbasePayment.pending, (state) => {
        state.postCoinbasePaymentLoading = true;
        state.postCoinbasePaymentError = null;
      })
      .addCase(payWithCoinbasePayment.fulfilled, (state, action) => {
        state.postCoinbasePaymentLoading = false;
        state.postCoinbasePayment = action.payload;
      })
      .addCase(payWithCoinbasePayment.rejected, (state, action) => {
        state.postCoinbasePaymentLoading = false;
        state.postCoinbasePaymentError = action.payload;
      });

    builder
      .addCase(fetchAccountDetailsById.pending, (state) => {
        state.getAccountDetailsByIdLoading = true;
        state.getAccountDetailsByIdError = null;
      })
      .addCase(fetchAccountDetailsById.fulfilled, (state, action) => {
        state.getAccountDetailsByIdLoading = false;
        state.getAccountDetailsByIdData = action.payload;
      })
      .addCase(fetchAccountDetailsById.rejected, (state, action) => {
        state.getAccountDetailsByIdLoading = false;
        state.getAccountDetailsByIdError = action.payload;
      });
    // PUT request

    builder
      .addCase(updateLotteryNumber.pending, (state) => {
        state.updateLotteryNumberLoading = true;
        state.updateLotteryNumberError = null;
      })
      .addCase(updateLotteryNumber.fulfilled, (state, action) => {
        state.updateLotteryNumberLoading = false;
        state.updateLotteryNumber = action.payload;
      })
      .addCase(updateLotteryNumber.rejected, (state, action) => {
        state.updateLotteryNumberLoading = false;
        state.updateLotteryNumberError = action.payload;
      });

    builder
      .addCase(createDeposit.pending, (state) => {
        state.createDepositLoading = true;
        state.createDepositError = null;
      })
      .addCase(createDeposit.fulfilled, (state, action) => {
        state.createDepositLoading = false;
        state.createDepositData = action.payload;
      })
      .addCase(createDeposit.rejected, (state, action) => {
        state.createDepositLoading = false;
        state.createDepositError = action.payload;
      });

    builder
      .addCase(updateDeposit.pending, (state) => {
        state.updateDepositLoading = true;
        state.updateDepositError = null;
      })
      .addCase(updateDeposit.fulfilled, (state, action) => {
        state.updateDepositLoading = false;
        state.updateDepositData = action.payload;
      })
      .addCase(updateDeposit.rejected, (state, action) => {
        state.updateDepositLoading = false;
        state.updateDepositError = action.payload;
      });

    builder
      .addCase(fetchDeposits.pending, (state) => {
        state.fetchDepositsLoading = true;
        state.fetchDepositsError = null;
      })
      .addCase(fetchDeposits.fulfilled, (state, action) => {
        state.fetchDepositsLoading = false;
        state.fetchDepositsData = action.payload;
      })
      .addCase(fetchDeposits.rejected, (state, action) => {
        state.fetchDepositsLoading = false;
        state.fetchDepositsError = action.payload;
      });

    builder
      .addCase(fetchLotteryRewards.pending, (state) => {
        state.lotteryRewardsLoading = true;
        state.lotteryRewardsError = null;
      })
      .addCase(fetchLotteryRewards.fulfilled, (state, action) => {
        state.lotteryRewardsLoading = false;
        state.lotteryRewardsData = action.payload;
      })
      .addCase(fetchLotteryRewards.rejected, (state, action) => {
        state.lotteryRewardsLoading = false;
        state.lotteryRewardsError = action.payload;
      });

    // Handle other cases...
  },
});

export default apiSlice.reducer;
export const {
  clearScratchCardData,
  clearScratchCardNumber,
  clearLotteryTicketDetails,
  clearLotteryTicketNumber,
  clearScratchCardNumberData,
} = apiSlice.actions;
