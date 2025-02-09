import ScratchCardWinner from "./scratchCardWinner.component";
import { connect } from "react-redux";
import {
  fetchScratchCardSold,
  fetchScratchCardWinner,
  fetchScratchCard,
} from "../../api/scratchcard/scratchcardAction";
import { fetchuserTransction } from "../../api/userData/userDataAction";

const mapDispatchToProps = {
  fetchScratchCardSold,
  fetchScratchCardWinner,
  fetchuserTransction,
  fetchScratchCard,
};

const mapStateToProps = (state) => ({
  isError: state.scratchcardPage.isError,
  isLoading: state.scratchcardPage.isLoading,
  soldscratch: state.scratchcardPage.soldscratch,
  scratchwinner: state.scratchcardPage.scratchwinner,
  transaction: state.userDataPage.transaction,
  isSaved: state.scratchcardPage.isSaved,
  count: state.scratchcardPage.count,
  scratchcard: state.scratchcardPage.scratchcard,
});

export const ScratchCardWinnerPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScratchCardWinner);
