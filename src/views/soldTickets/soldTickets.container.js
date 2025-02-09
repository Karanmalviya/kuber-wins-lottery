import SoldTickets from "./soldTickets.component";
import { connect } from "react-redux";
import { fetchsoldTicket } from "./../../api/buyticket/buyticketAction";

const mapDispatchToProps = {
    fetchsoldTicket,
};

const mapStateToProps = (state) => ({
  isError: state.buyTicketPage.isError,
  isLoading: state.buyTicketPage.isLoading,
  soldticket: state.buyTicketPage.soldticket,
  isSaved: state.buyTicketPage.isSaved,
  count: state.buyTicketPage.count,
});

export const SoldTicketsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SoldTickets);
