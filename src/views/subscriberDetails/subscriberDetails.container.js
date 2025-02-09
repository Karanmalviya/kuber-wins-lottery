import SubscriberDetails from "./subscriberDetails.component";
import { connect } from "react-redux";
import {
  createCurrency,
  updateCurrency,
  deleteCurrency,
  fetchCurrency,
} from "../../api/currency/currencyAction";
import { CreateSendAllMail } from "../../api/subscriber/subscriberAction";
const mapDispatchToProps = {
  createCurrency,
  updateCurrency,
  deleteCurrency,
  fetchCurrency,
  CreateSendAllMail,
};

const mapStateToProps = (state) => ({
  isError: state.subscribeMailPage.isError,
  isLoading: state.subscribeMailPage.isLoading,
  isSaved: state.subscribeMailPage.isSaved,
});

export const SubscriberDetailsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriberDetails);
