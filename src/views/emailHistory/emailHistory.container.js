import EmailHistory from "./emailHistory.component";
import { connect } from "react-redux";
import { fetchuserEmail } from "./../../api/sendmail/sendmailAction";

const mapDispatchToProps = {
  fetchuserEmail,
};

const mapStateToProps = (state) => ({
  isError: state.sendMailPage.isError,
  isLoading: state.sendMailPage.isLoading,
  email: state.sendMailPage.email,
  isSaved: state.sendMailPage.isSaved,
  count: state.sendMailPage.count,
});

export const EmailHistoryPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailHistory);
