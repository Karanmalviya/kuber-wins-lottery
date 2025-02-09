import DepositCommissionLog from "./depositCommissionLog.component";
import { connect } from "react-redux";
import { fetchCommissionUser } from "../../api/referal/referalphaseAction";

const mapDispatchToProps = {
  fetchCommissionUser,
};

const mapStateToProps = (state) => ({
  isError: state.referalUserPage.isError,
  isLoading: state.referalUserPage.isLoading,
  isSaved: state.referalUserPage.isSaved,
  commission: state.referalUserPage.commission,
});

export const DepositCommissionLogPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositCommissionLog);
