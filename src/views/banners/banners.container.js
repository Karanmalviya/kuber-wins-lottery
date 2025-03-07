import { connect } from "react-redux";
import { fetchBanners } from "../../api/banners/bannerAction";
import BannersPage from "./banners.component";

const mapDispatchToProps = {
  fetchBanners,
};

const mapStateToProps = (state) => ({
  isError: state.bannerPage.isError,
  isLoading: state.bannerPage.isLoading,
  banners: state.bannerPage.banners,
  isSaved: state.bannerPage.isSaved,
  count: state.bannerPage.count,
});

export const BannersPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BannersPage);
