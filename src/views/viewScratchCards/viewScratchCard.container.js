import ViewScratchCard from "./viewScratchCard.component";
import { connect } from "react-redux";
import {
  fetchScratchCard,
  fetchScratchCardById,
} from "./../../api/scratchcard/scratchcardAction";
import { fetchScratchGameReport } from "../../api/scratchcard/scratchcardAction";

const mapDispatchToProps = {
  fetchScratchCard,
  fetchScratchCardById,
  fetchScratchGameReport,
};

const mapStateToProps = (state) => ({
  isError: state.scratchcardPage.isError,
  isLoading: state.scratchcardPage.isLoading,
  scratchcard: state.scratchcardPage.scratchcard,
  scratchcardId: state.scratchcardPage.scratchcardId,
  isSaved: state.scratchcardPage.isSaved,
  scratchGameReport: state.scratchcardPage.scratchGameReport,
  count: state.scratchcardPage.count,
});

export const ViewScratchCardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewScratchCard);
