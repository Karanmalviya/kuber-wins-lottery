import UserTransactionPage from "./usertransaction.component";
import { connect } from "react-redux";
import { fetchBuyTicket } from "../../api/buyticket/buyticketAction";
import { fetchuserTransction } from "../../api/userData/userDataAction";
const mapDispatchToProps = {
  fetchBuyTicket,
  fetchuserTransction,
};

const mapStateToProps = (state) => ({
  isError: state.buyTicketPage.isError,
  isLoading: state.buyTicketPage.isLoading,
  tickets: state.buyTicketPage.tickets,
  count: state.buyTicketPage.count,
  transaction: state.userDataPage.transaction,
});

export const UserTransactionPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTransactionPage);
