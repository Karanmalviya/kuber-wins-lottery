import ReferalPage from "./lotteryRewards.component";
import { connect } from "react-redux";
import {
  createLotteryRewards,
  updateLotteryRewards,
  fetchLotteryRewards,
  updateLotteryRewardsStatus,
} from "../../api/referal/referalphaseAction";
import LotteryRewardsPage from "./lotteryRewards.component";

const mapDispatchToProps = {
  createLotteryRewards,
  updateLotteryRewards,
  fetchLotteryRewards,
  updateLotteryRewardsStatus,
};

const mapStateToProps = (state) => ({
  isError: state.referalUserPage.isError,
  isLoading: state.referalUserPage.isLoading,
  isSaved: state.referalUserPage.isSaved,
  lotteryRewards: state.referalUserPage.lotteryRewards,
});

export const LotteryRewardsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LotteryRewardsPage);
