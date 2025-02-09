import NotificationToAllPage from "./notificationtoall.component";
import { connect } from "react-redux";
import { sendMail, sendMailAll } from "../../api/sendmail/sendmailAction";
import { fetchBuyTicket } from "../../api/buyticket/buyticketAction";

const mapDispatchToProps = {
  sendMail,
  sendMailAll,
  fetchBuyTicket,
};

const mapStateToProps = (state) => ({
  isError: state.sendMailPage.isError,
  isLoading: state.sendMailPage.isLoading,
  isSend: state.sendMailPage.isSend,
  tickets: state.buyTicketPage.tickets,
});
export const NotificationToAllPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationToAllPage);
