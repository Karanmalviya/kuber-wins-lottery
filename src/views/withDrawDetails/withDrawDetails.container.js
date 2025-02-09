import { connect } from "react-redux";
import {
  fetchwithdrawal,
  updateStatus,
  createWithDraw,
} from "../../api/withdrawal/withdrawalAction";
import WithdrawalsDetails from "./withDrawDetails.component";
const mapDispatchToProps = {
  fetchwithdrawal,
  updateStatus,
  createWithDraw,
};

const mapStateToProps = (state) => ({
  isError: state.withdrawalPage.isError,
  isLoading: state.withdrawalPage.isLoading,
  tickets: state.withdrawalPage.tickets,
  count: state.withdrawalPage.count,
  withdrawal: state.withdrawalPage.withdrawal,
});

export const WithdrawalsDetailsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawalsDetails);
