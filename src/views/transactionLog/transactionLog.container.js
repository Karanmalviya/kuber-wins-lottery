import TransactionLog from "./transactionLog.component";
import { connect } from "react-redux";
import {
  fetchuser,
  fetchuserTransction,
} from "./../../api/userData/userDataAction";

const mapDispatchToProps = {
  fetchuser,
  fetchuserTransction,
};

const mapStateToProps = (state) => ({
  isError: state.userDataPage.isError,
  isLoading: state.userDataPage.isLoading,
  tickets: state.userDataPage.tickets,
  count: state.userDataPage.count,
  user: state.userDataPage.user,
  transaction: state.userDataPage.transaction,
  depositCount: state.userDataPage.depositCount,
});

export const TransactionLogPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionLog);
