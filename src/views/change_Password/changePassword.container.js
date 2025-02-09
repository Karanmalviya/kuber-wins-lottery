import { connect } from "react-redux";
import ChangePasswordPage from "./changePassword.component";
import { changeSubAdminPassword } from "../../api/staff/stafftAction";
import { adminPasswordChange } from "../../api/user/userAction";
const mapDispatchToProps = {
  changeSubAdminPassword,
  adminPasswordChange,
};

const mapStateToProps = (state) => ({
  isSaved: state.staffPage.isSaved,
  isPassWordSaved: state.userPage.isSaved,
  count: state.staffPage.count,
});

export const ChangePasswordPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordPage);
