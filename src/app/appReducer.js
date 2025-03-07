import { combineReducers } from "redux";
import { userReducer as userPage } from "./../api/user/userReducer";
import { currencyReducer as currencyPage } from "../api/currency/currencyReducer";
import { timezoneReducer as timezonePage } from "../api/timezone/timezoneReducer";
import { lotteryReducer as lotteryPage } from "../api/lottery/lotteryReducer";
import { lotteryPhaseReducer as lotteryPhasePage } from "../api/lotteryphase/lotteryphaseReducer";
import { scratchcardReducer as scratchcardPage } from "../api/scratchcard/scratchcardReducer";
import { ticketReducer as ticketPage } from "../api/ticket/ticketReducer";
import { buyTicketReducer as buyTicketPage } from "../api/buyticket/buyticketReducer";
import { loginLogsReducer as loginlogsPage } from "../api/loginlogs/loginlogsReducer";
import { sendMailReducer as sendMailPage } from "../api/sendmail/sendmailReducer";
import { subscriberDataReducer as subscribeMailPage } from "../api/subscriber/subscriberReducer";
// import { depositeReducer as addDepositePage } from "../api/deposit/depositeReducer";
import { userDataReducer as userDataPage } from "../api/userData/userDataReducer";
import { supportTicketReducer as supportTicketPage } from "../api/supportticket/supportTicketReducer";
import { supportticketreplyReducer as supportTicketPageReply } from "../api/supportticketreply/supportTicketReplyReducer";
import { withdrawalReducer as withdrawalPage } from "../api/withdrawal/withdrawalReducer";
import { referalUserReducer as referalUserPage } from "../api/referal/referalphaseReducer";
import { staffReducer as staffPage } from "../api/staff/staffReducer";
import { TwofaReducer as twofaPage } from "../api/2FA/2faReducer";
import { bankAccountReducer as bankAccountPage } from "../api/bankAccount/bankAccountReducer";
import { bannerReducer as bannerPage } from "../api/banners/bannerReducer";

const appReducer = combineReducers({
  userPage,
  currencyPage,
  timezonePage,
  lotteryPage,
  lotteryPhasePage,
  scratchcardPage,
  ticketPage,
  buyTicketPage,
  loginlogsPage,
  sendMailPage,
  subscribeMailPage,
  userDataPage,
  supportTicketPage,
  supportTicketPageReply,
  withdrawalPage,
  referalUserPage,
  staffPage,
  twofaPage,
  bankAccountPage,
  bannerPage,
});

export default appReducer;
