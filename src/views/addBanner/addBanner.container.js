import { connect } from "react-redux";
import {
  createBanner,
  updateBanner,
  fetchBannerById,
} from "../../api/banners/bannerAction";
import AddBannerPage from "./addBanner.component";

const mapDispatchToProps = {
  createBanner,
  updateBanner,
  fetchBannerById,
};

const mapStateToProps = (state) => ({
  isError: state.bannerPage.isError,
  isLoading: state.bannerPage.isLoading,
  banner: state.bannerPage.banner,
  isSaved: state.bannerPage.isSaved,
});

export const AddBannerPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBannerPage);
