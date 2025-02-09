import HeaderPage from "./header.component";
import { connect } from "react-redux";
import { userLogout } from "./../../api/user/userAction";
import {
  fetchsupportticket,
  updateStatus,
} from "../../api/supportticket/supportTicketAction";
import { fetchuser } from "../../api/userData/userDataAction";
import { fetchwithdrawal } from "../../api/withdrawal/withdrawalAction";
import { fetchSubAdminById } from "../../api/staff/stafftAction";

const mapDispatchToProps = {
  userLogout,
  fetchsupportticket,
  updateStatus,
  fetchuser,
  fetchwithdrawal,
  fetchSubAdminById,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.userPage.isLoggedIn,
  supportTicket: state.supportTicketPage.supportTicket,
  user: state.userDataPage.user,
  withdrawal: state.withdrawalPage.withdrawal,
  subAdminById: state.staffPage.subAdminById,
});

export const HeaderPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderPage);
// export const CompresserPageContainer = connect(mapStateToProps, mapDispatchToProps)(CompresserPage);
