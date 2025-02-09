import { connect } from "react-redux";
import SoldScratchCards from "./soldScratchCards.component";
import { fetchScratchCardSold } from "../../api/scratchcard/scratchcardAction";

const mapDispatchToProps = {
  fetchScratchCardSold,
};

const mapStateToProps = (state) => ({
  isError: state.scratchcardPage.isError,
  isLoading: state.scratchcardPage.isLoading,
  soldscratch: state.scratchcardPage.soldscratch,
  isSaved: state.scratchcardPage.isSaved,
  count: state.scratchcardPage.count,
});

export const SoldScratchCardsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SoldScratchCards);
