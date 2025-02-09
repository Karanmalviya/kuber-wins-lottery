import AddScratchPage from "./addScratch.component";
import { connect } from "react-redux";
import {
  createScratchCard,
  createScratchCardTable,
  updateScratchCard,
  deleteScratchCard,
  fetchScratchCard,
  updateScratchCardTable,
} from "./../../api/scratchcard/scratchcardAction";
import { fetchTimezone } from "./../../api/timezone/timezoneAction";

const mapDispatchToProps = {
  createScratchCard,
  createScratchCardTable,
  updateScratchCard,
  deleteScratchCard,
  fetchScratchCard,
  updateScratchCardTable,
  fetchTimezone,
};

const mapStateToProps = (state) => ({
  isError: state.scratchcardPage.isError,
  isLoading: state.scratchcardPage.isLoading,
  scratchcard: state.scratchcardPage.scratchcard,
  isSaved: state.scratchcardPage.isSaved,
  timezones: state.timezonePage.timezones,
});

export const AddScratchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddScratchPage);
