import DepositList from "./depositList.component";
import { connect } from "react-redux";
import {
  fetchuser,
  fetchuserTransction,
  fetchDeposits,
} from "./../../api/userData/userDataAction";
const mapDispatchToProps = {
  fetchuser,
  fetchuserTransction,
  fetchDeposits,
};

const mapStateToProps = (state) => ({
  isError: state.userDataPage.isError,
  isLoading: state.userDataPage.isLoading,
  tickets: state.userDataPage.tickets,
  count: state.userDataPage.count,
  user: state.userDataPage.user,
  transaction: state.userDataPage.transaction,
  deposits: state.userDataPage.deposits,
});

export const DepositeListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositList);
