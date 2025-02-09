import AddLotteryPhasePage from './addlotteryPhase.component';
import { connect } from 'react-redux';
import { createlotteryphase, updatelotteryphase, deletelotteryphase, fetchlotteryphase } from '../../api/lotteryphase/lotteryphaseAction';
import { fetchlottery, fetchlotteryEdit } from '../../api/lottery/lotteryAction';

const mapDispatchToProps = {
    createlotteryphase, updatelotteryphase, deletelotteryphase, fetchlotteryphase, fetchlottery, fetchlotteryEdit
}

const mapStateToProps = state => ({
    isError: state.lotteryPhasePage.isError,
    isLoading: state.lotteryPhasePage.isLoading,
    lotteryPhase: state.lotteryPhasePage.lotteryPhase,
    isSaved: state.lotteryPhasePage.isSaved,
    lotteries : state.lotteryPage.lotteries
});

export const AddLotteryPhasePageContainer = connect(mapStateToProps, mapDispatchToProps)(AddLotteryPhasePage); 