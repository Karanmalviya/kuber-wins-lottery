import { connect } from "react-redux";
import {
  forgetSubAdminPassword,
  resetSubAdminPassword,
} from "../../api/staff/stafftAction";
import {
  forgetAdminPassword,
  resetAdminPassword,
} from "../../api/user/userAction";
import StaffForgetPasswordPage from "./staffForgetPassword.component";
const mapDispatchToProps = {
  forgetSubAdminPassword,
  resetSubAdminPassword,
  forgetAdminPassword,
  resetAdminPassword,
};

const mapStateToProps = (state) => ({
  isSaved: state.staffPage.isSaved,
  isSaved: state.userPage.isSaved,
  isLoading: state.staffPage.isLoading,
  resetisSaved: state.staffPage.resetisSaved,
  count: state.staffPage.count,
  changePassData: state.staffPage.changePassData,
});

export const StaffForgetPasswordPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffForgetPasswordPage);
