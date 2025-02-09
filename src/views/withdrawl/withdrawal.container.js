// import LotteriesPage from "./withdrawl.component";
import { connect } from "react-redux";
import { fetchwithdrawal } from "../../api/withdrawal/withdrawalAction";
import Withdrawals from "./withdrawal.component";
// import {fet}
import { fetchuser } from "./../../api/userData/userDataAction";
import { fetchSubAdminById } from "../../api/staff/stafftAction";
const mapDispatchToProps = {
  fetchuser,
  fetchwithdrawal,
  fetchSubAdminById,
};

const mapStateToProps = (state) => ({
  isError: state.withdrawalPage.isError,
  isLoading: state.withdrawalPage.isLoading,
  tickets: state.withdrawalPage.tickets,
  count: state.withdrawalPage.count,
  user: state.withdrawalPage.user,
  withdrawal: state.withdrawalPage.withdrawal,
  subAdminById: state.staffPage.subAdminById,
});

export const WithdrawalsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Withdrawals);
