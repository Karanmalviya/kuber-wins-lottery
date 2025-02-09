import { connect } from "react-redux";
import TwofaPage from "./2fa.component";
import { verify2FA } from "../../api/2FA/2faAction";
import { fetchAdminData } from "../../api/user/userAction";

const mapDispatchToProps = {
  verify2FA,
  fetchAdminData,
};

const mapStateToProps = (state) => ({
  isLoading: state.twofaPage.isLoading,
  isError: state.twofaPage.isLoading,
  isSaved: state.twofaPage.isSaved,
  adminDataById: state.userPage.adminDataById,
});

export const TwofaPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TwofaPage);
