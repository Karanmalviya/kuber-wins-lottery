import LotteryRewardsLogPage from "./lotteryRewardsLog.component";
import { connect } from "react-redux";
import { fetchAllLotteryRewards } from "../../api/referal/referalphaseAction";

const mapDispatchToProps = {
  fetchAllLotteryRewards,
};

const mapStateToProps = (state) => ({
  isError: state.referalUserPage.isError,
  isLoading: state.referalUserPage.isLoading,
  isSaved: state.referalUserPage.isSaved,
  lotteryRewardsAll: state.referalUserPage.lotteryRewardsAll,
});

export const LotteryRewardsLogPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LotteryRewardsLogPage);
