import DashboardPage from "./dashboard.component";
import { connect } from "react-redux";
// import { pdfStart, pdfUpload, pdfProcess, pdfDownload, setConvertType } from './../../api/user/userAction';
import {
  fetchuser,
  fetchuserTransction,
} from "./../../api/userData/userDataAction";
import { fetchwithdrawal } from "../../api/withdrawal/withdrawalAction";
import {
  fetchwinnerTicket,
  fetchsoldTicket,
} from "./../../api/buyticket/buyticketAction";
import { allUserLoginLogs } from "../../api/loginlogs/loginlogsAction";
import { totalCount } from "./../../api/buyticket/buyticketAction";
import { fetchScratchCard } from "./../../api/scratchcard/scratchcardAction";
import { updateTermsAndCondition } from "./../../api/user/userAction";
const mapDispatchToProps = {
  // pdfStart,
  // pdfUpload,
  // pdfProcess,
  // pdfDownload,
  // setConvertType

  fetchuserTransction,
  fetchuser,
  fetchwithdrawal,
  fetchwinnerTicket,
  fetchsoldTicket,
  allUserLoginLogs,
  totalCount,
  fetchScratchCard,
  updateTermsAndCondition,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userPage.isLoggedIn,
  isError: state.userDataPage.isError,
  isLoading: state.userDataPage.isLoading,
  isSaved: state.userDataPage.isSaved,
  user: state.userDataPage.user,
  count: state.userDataPage.count,
  transaction: state.userDataPage.transaction,
  withdrawal: state.withdrawalPage.withdrawal,
  winners: state.buyTicketPage.winners,
  soldticket: state.buyTicketPage.soldticket,
  loginLogs: state.loginlogsPage.loginLogs,
  count_all: state.buyTicketPage.count_all,
  scratchcard: state.scratchcardPage.scratchcard,
  termsLoading: state.userPage.isLoading,
});

export const DashboardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
// export const CompresserPageContainer = connect(mapStateToProps, mapDispatchToProps)(CompresserPage);
