import UserReferalPage from "./userreferal.component";
import { connect } from "react-redux";
import { fetchuserReferal } from "../../api/userData/userDataAction";
const mapDispatchToProps = {
  fetchuserReferal,
};

const mapStateToProps = (state) => ({
  isError: state.buyTicketPage.isError,
  isLoading: state.buyTicketPage.isLoading,
  tickets: state.buyTicketPage.tickets,
  count: state.buyTicketPage.count,
  referal: state.userDataPage.referal,
});

export const UserReferalPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReferalPage);
