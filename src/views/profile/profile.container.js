import { connect } from "react-redux";
import ProfilePage from "./profile.component";
import { fetchAdminData } from "../../api/user/userAction";
import { register2FA, update2FAStatus } from "../../api/2FA/2faAction";
const mapDispatchToProps = {
  fetchAdminData,
  register2FA,
  update2FAStatus,
};

const mapStateToProps = (state) => ({
  isError: state.userPage.isError,
  isLoading: state.userPage.isLoading,
  isSaved: state.userPage.isSaved,
  adminDataById: state.userPage.adminDataById,
  isLoadingtwofaPage: state.twofaPage.isLoading,
  isSavedtwofaPage: state.twofaPage.isSaved,
});

export const ProfilePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
