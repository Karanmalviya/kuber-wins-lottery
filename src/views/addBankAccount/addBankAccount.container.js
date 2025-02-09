import AddBankAccountPage from "./addBankAccount.component";
import { connect } from "react-redux";
import {
  createlottery,
  updatelottery,
  fetchlottery,
  deletelottery,
} from "../../api/lottery/lotteryAction";
import { fetchCurrency } from "../../api/currency/currencyAction";
import { fetchTimezone } from "../../api/timezone/timezoneAction";

import {
  fetchBankAccountById,
  createBankAccount,
  updateBankAccount,
} from "../../api/bankAccount/bankAccountAction";

const mapDispatchToProps = {
  createlottery,
  updatelottery,
  fetchlottery,
  deletelottery,
  fetchCurrency,
  fetchTimezone,
  createBankAccount,
  fetchBankAccountById,
  updateBankAccount,
};

const mapStateToProps = (state) => ({
  isError: state.bankAccountPage.isError,
  isLoading: state.bankAccountPage.isLoading,
  bankAccount: state.bankAccountPage.bankAccount.data,
  isSaved: state.bankAccountPage.isSaved,
});

export const AddBankAccountPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBankAccountPage);
