import ReferalPage from "./referal.component";
import { connect } from "react-redux";
import {
  createReferalUser,
  fetchLevelPercent,
  updatereferalstatus,
} from "../../api/referal/referalphaseAction";

const mapDispatchToProps = {
  createReferalUser,
  fetchLevelPercent,
  updatereferalstatus,
};

const mapStateToProps = (state) => ({
  isError: state.referalUserPage.isError,
  isLoading: state.referalUserPage.isLoading,
  isSaved: state.referalUserPage.isSaved,
  referals: state.referalUserPage.referals,
});

export const ReferalPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferalPage);
