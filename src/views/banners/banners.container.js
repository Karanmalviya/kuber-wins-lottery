import ScratchListPage from "./banners.component";
import { connect } from "react-redux";
import {
  fetchScratchCard,
  deleteScratchCard,
  updateScratchCard,
  deleteScratchCardTableTableRandom,
  deleteScratchCardTableTable,
} from "../../api/scratchcard/scratchcardAction";
import { fetchSubAdminById } from "../../api/staff/stafftAction";
import BannersPage from "./banners.component";

const mapDispatchToProps = {
  fetchScratchCard,
  deleteScratchCard,
  updateScratchCard,
  deleteScratchCardTableTable,
  deleteScratchCardTableTableRandom,
  fetchSubAdminById,
};

const mapStateToProps = (state) => ({
  isError: state.scratchcardPage.isError,
  isLoading: state.scratchcardPage.isLoading,
  scratchcard: state.scratchcardPage.scratchcard,
  isSaved: state.scratchcardPage.isSaved,
  count: state.scratchcardPage.count,
  subAdminById: state.staffPage.subAdminById,
});

export const BannersPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BannersPage);
