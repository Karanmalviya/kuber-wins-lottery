import StaffListPage from "./staffList.component";
import { connect } from "react-redux";
import { fetchSubAdmin, updateSubAdmin } from "../../api/staff/stafftAction";

const mapDispatchToProps = {
  fetchSubAdmin,
  updateSubAdmin,
};

const mapStateToProps = (state) => ({
  isError: state.staffPage.isError,
  isLoading: state.staffPage.isLoading,
  isSaved: state.staffPage.isSaved,
  count: state.staffPage.count,
  subAdmin: state.staffPage.subAdmin,
});

export const StaffListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffListPage);
