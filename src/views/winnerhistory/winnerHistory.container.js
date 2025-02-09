import WinnerHistory from "./winnerHistory.component";
import { connect } from "react-redux";
import { fetchwinnerTicket } from "./../../api/buyticket/buyticketAction";

const mapDispatchToProps = {
  fetchwinnerTicket,
};

const mapStateToProps = (state) => ({
  isError: state.buyTicketPage.isError,
  isLoading: state.buyTicketPage.isLoading,
  winners: state.buyTicketPage.winners,
  isSaved: state.buyTicketPage.isSaved,
  count: state.buyTicketPage.count,
});

export const WinnerHistoryPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WinnerHistory);
