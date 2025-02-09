import {connect} from "react-redux";
import {
  fetchlottery,
  deletelottery,
  updatelottery,
  fetchlotteryEdit,
  fetchManualDrawTickets,
  fetchManualDrawUsers,
  fetchManualDrawHistory,
  updateManualDraw,
} from "../../api/lottery/lotteryAction";
import ManualLotteriesHistoryPage from "./manualLotteriesHistory.component";

const mapDispatchToProps = {
  fetchlottery,
  deletelottery,
  updatelottery,
  fetchlotteryEdit,
  fetchManualDrawTickets,
  fetchManualDrawUsers,
  fetchManualDrawHistory,
  updateManualDraw,
};

const mapStateToProps = (state) => ({
  isError: state.lotteryPage.isError,
  isLoading: state.lotteryPage.isLoading,
  manualDrawUsers: state.lotteryPage.manualDrawUsers,
  manualDrawTickets: state.lotteryPage.manualDrawTickets,
  manualDrawHistory: state.lotteryPage.manualDrawHistory,
  lotteries: state.lotteryPage.lotteries,
  isSaved: state.lotteryPage.isSaved,
  count: state.lotteryPage.count,
});

export const ManualLotteriesHistoryPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManualLotteriesHistoryPage);
