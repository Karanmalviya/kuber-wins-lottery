import SidebarPage from "./sidebar.component";
import { connect } from "react-redux";
import {
  fetchBuyTicket,
  totalCount,
} from "./../../api/buyticket/buyticketAction";
import { fetchSubAdminById } from "../../api/staff/stafftAction";

const mapDispatchToProps = {
  fetchBuyTicket,
  totalCount,
  fetchSubAdminById,
};

const mapStateToProps = (state) => ({
  activeaccount: state.buyTicketPage.activeaccount,
  inactiveaccount: state.buyTicketPage.inactiveaccount,
  emailverifycount: state.buyTicketPage.emailverifycount,
  smscount: state.buyTicketPage.smscount,
  kycpendingcount: state.buyTicketPage.kycpendingcount,
  kycunverifycount: state.buyTicketPage.kycunverifycount,
  balancecount: state.buyTicketPage.balancecount,
  subAdminById: state.staffPage.subAdminById,
});
export const SidebarPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPage);
