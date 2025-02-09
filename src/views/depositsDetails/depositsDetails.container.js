import { connect } from "react-redux";
import {
  fetchwithdrawal,
  updateStatus,
  createWithDraw,
} from "../../api/withdrawal/withdrawalAction";
import DepositsDetailsPage from "./depositsDetails.component";
import {
  fetchDepositsById,
  updateDeposit,
} from "../../api/userData/userDataAction";

const mapDispatchToProps = {
  fetchwithdrawal,
  updateStatus,
  createWithDraw,
  fetchDepositsById,
  updateDeposit,
};

const mapStateToProps = (state) => ({
  isError: state.withdrawalPage.isError,
  isLoading: state.withdrawalPage.isLoading,
  tickets: state.withdrawalPage.tickets,
  count: state.withdrawalPage.count,
  withdrawal: state.withdrawalPage.withdrawal,
  depositsById: state.userDataPage.depositsById,
  isSaved: state.userDataPage.isSaved,
});

export const DepositsDetailsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositsDetailsPage);
