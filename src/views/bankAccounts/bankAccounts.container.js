import BankAccountsPage from "./bankAccounts.component";
import { connect } from "react-redux";

import {
  fetchBankAccount,
  createBankAccount,
  updateBankAccount,
} from "../../api/bankAccount/bankAccountAction";

const mapDispatchToProps = {
  fetchBankAccount,
  createBankAccount,
  updateBankAccount,
};

const mapStateToProps = (state) => ({
  isError: state.bankAccountPage.isError,
  isLoading: state.bankAccountPage.isLoading,
  bankAccounts: state.bankAccountPage.bankAccounts,
  isSaved: state.bankAccountPage.isSaved,
  count: state.bankAccountPage.count,
});

export const BankAccountsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountsPage);
