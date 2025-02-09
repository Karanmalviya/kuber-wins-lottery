import UserDepositPage from "./userdeposit.component";
import { connect } from "react-redux";
import { fetchBuyTicket } from "../../api/buyticket/buyticketAction";
import { fetchuserTransctionById } from "../../api/userData/userDataAction";
const mapDispatchToProps = {
  fetchBuyTicket,
  fetchuserTransctionById,
};

const mapStateToProps = (state) => ({
  isError: state.buyTicketPage.isError,
  isLoading: state.buyTicketPage.isLoading,
  tickets: state.buyTicketPage.tickets,
  count: state.buyTicketPage.count,
  transactionById: state.userDataPage.transactionById,
});

export const UserDepositPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDepositPage);
