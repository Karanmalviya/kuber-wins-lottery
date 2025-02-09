import ViewLotteriesPage from "./viewLotteries.component";
import { connect } from "react-redux";
import { fetchGameReport, fetchlottery } from "../../api/lottery/lotteryAction";
const mapDispatchToProps = { fetchGameReport, fetchlottery };

const mapStateToProps = (state) => ({
  isError: state.lotteryPage.isError,
  isLoading: state.lotteryPage.isLoading,
  lotteries: state.lotteryPage.lotteries,
  gameReport: state.lotteryPage.gameReport,
});

export const ViewLotteriesPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLotteriesPage);
