import AddStaffPage from "./addStaff.component";
import { connect } from "react-redux";
import {
  createSubAdmin,
  fetchSubAdmin,
  updateSubAdmin,
} from "../../api/staff/stafftAction";

const mapDispatchToProps = { createSubAdmin, fetchSubAdmin, updateSubAdmin };

const mapStateToProps = (state) => ({
  isError: state.staffPage.isError,
  isLoading: state.staffPage.isLoading,
  isSaved: state.staffPage.isSaved,
  count: state.staffPage.count,
  subAdmin: state.staffPage.subAdmin,
});

export const AddStaffPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStaffPage);
