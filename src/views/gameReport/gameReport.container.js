import { connect } from "react-redux";
import { fetchGameReport } from "../../api/lottery/lotteryAction";
import { fetchScratchGameReport } from "../../api/scratchcard/scratchcardAction";
import { fetchSubAdminById } from "../../api/staff/stafftAction";
import GameReport from "./gameReport.component";

const mapDispatchToProps = {
  fetchGameReport,
  fetchScratchGameReport,
  fetchSubAdminById,
};

const mapStateToProps = (state) => ({
  isError: state.lotteryPage.isError,
  isLoading: state.lotteryPage.isLoading,
  gameReport: state.lotteryPage.gameReport,
  scratchGameReport: state.scratchcardPage.scratchGameReport,
  isSaved: state.lotteryPage.isSaved,
  count: state.lotteryPage.count,
  subAdminById: state.staffPage.subAdminById,
});

export const GameReportPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameReport);
