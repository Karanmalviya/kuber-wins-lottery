import AllUserDetailPage from "./allUserDetail.component";
import { connect } from "react-redux";
import { fetchBuyTicket } from "../../api/buyticket/buyticketAction";
import {
  updateUser,
  updateBalance,
  addUpdateBalance,
} from "../../api/user/userAction";
import {
  fetchuserTransctionById,
  fetchuserTransction,
  fetchuserReferal,
  fetchUserDetails,
} from "../../api/userData/userDataAction";

const mapDispatchToProps = {
  fetchBuyTicket,
  updateUser,
  updateBalance,
  addUpdateBalance,
  fetchuserTransctionById,
  fetchuserTransction,
  fetchuserReferal,
  fetchUserDetails,
};
const mapStateToProps = (state) => ({
  isError: state.buyTicketPage.isError,
  isLoading: state.buyTicketPage.isLoading,
  tickets: state.buyTicketPage.tickets,
  isSaved: state.userPage.isSaved,
  count: state.buyTicketPage.count,
  transactionById: state.userDataPage.transactionById,
  transaction: state.userDataPage.transaction,
  referal: state.userDataPage.referal,
  userdetails: state.userDataPage.userdetails,

});
export const UserDetailPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUserDetailPage);
