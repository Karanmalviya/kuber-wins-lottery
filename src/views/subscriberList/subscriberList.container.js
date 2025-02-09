import SubscriberList from "./subscriberList.component";
import { connect } from "react-redux";
import { fetchsubscribe,createsubscribe} from "./../../api/subscriber/subscriberAction";

const mapDispatchToProps = {
  fetchsubscribe,
  createsubscribe,
};

const mapStateToProps = (state) => ({
  isError: state.subscribeMailPage.isError,
  isLoading: state.subscribeMailPage.isLoading,
  isSaved: state.subscribeMailPage.isSaved,
  subscriber: state.subscribeMailPage.subscriber,
  count: state.subscribeMailPage.count,
});

export const SubscriberListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriberList);
