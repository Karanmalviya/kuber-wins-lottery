import LoginPage from "./login.component";
import { connect } from "react-redux";
import { userLogin, staffLogin } from "./../../api/user/userAction";

const mapDispatchToProps = {
  userLogin,
  staffLogin,
};

const mapStateToProps = (state) => ({
  isLoading: state.userPage.isLoading,
  isLoggedIn: state.userPage.isLoggedIn,
  loggedUser: state.userPage.loggedUser,
});

export const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
