// import LoginLogsPage from "./loginlogs.component";
// import { connect } from "react-redux";
// import {
//   userLoginLogs,
//   allUserLoginLogs,
// } from "../../api/loginlogs/loginlogsAction";
// const mapDispatchToProps = {
//   userLoginLogs,
//   allUserLoginLogs,
// };

// const mapStateToProps = (state) => ({
//   isError: state.loginlogsPage.isError,
//   isLoading: state.loginlogsPage.isLoading,
//   history: state.loginlogsPage.users,
//   count: state.loginlogsPage.count,
//   allUserLoginLogs});
// export const LoginLogsPageContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LoginLogsPage);
import LoginLogsPage from "./loginlogs.component";
import { connect } from "react-redux";
import {
  userLoginLogs,
  allUserLoginLogs,
} from "../../api/loginlogs/loginlogsAction";
const mapDispatchToProps = {
  userLoginLogs,
  allUserLoginLogs,
};

const mapStateToProps = (state) => ({
  isError: state.loginlogsPage.isError,
  isLoading: state.loginlogsPage.isLoading,
  history: state.loginlogsPage.users,
  count: state.loginlogsPage.count,
  loginLogs: state.loginlogsPage.loginLogs,
});
export const LoginLogsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginLogsPage);
