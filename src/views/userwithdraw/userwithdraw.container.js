import UserWithDrawPage from "./userwithdraw.component";
import { connect } from "react-redux";
import { fetchBuyTicket } from "../../api/buyticket/buyticketAction";
import { fetchuserTransctionById } from "../../api/userData/userDataAction";
import { fetchUserwithdrawal } from "../../api/withdrawal/withdrawalAction";

const mapDispatchToProps = {
  fetchBuyTicket,
  fetchuserTransctionById,
  fetchUserwithdrawal,
};

const mapStateToProps = (state) => ({
  isError: state.buyTicketPage.isError,
  isLoading: state.buyTicketPage.isLoading,
  tickets: state.buyTicketPage.tickets,
  count: state.buyTicketPage.count,
  transactionById: state.userDataPage.transactionById,
  userwithdrawal: state.withdrawalPage.userwithdrawal,
});

export const UserWithdrawPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserWithDrawPage);
