import LotteryPhasePage from './lotteryphases.component';
import { connect } from 'react-redux';
import { fetchlotteryphase, deletelotteryphase, updatelotteryphase } from "./../../api/lotteryphase/lotteryphaseAction";

const mapDispatchToProps = {
    fetchlotteryphase, deletelotteryphase, updatelotteryphase
}

const mapStateToProps = state => ({
    isError: state.lotteryPhasePage.isError,
    isLoading: state.lotteryPhasePage.isLoading,
    lotteryPhase: state.lotteryPhasePage.lotteryPhase,
    isSaved: state.lotteryPhasePage.isSaved,
    count : state.lotteryPhasePage.count
});

export const LotteryPhasePageContainer = connect(mapStateToProps, mapDispatchToProps)(LotteryPhasePage); 