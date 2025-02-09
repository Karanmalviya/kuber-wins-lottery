import ViewLotteriesPage from './viewLotteriesPhase.component';
import { connect } from 'react-redux';
const mapDispatchToProps = {
    
}

const mapStateToProps = state => ({
    isError: state.lotteryPhasePage.isError,
    isLoading: state.lotteryPhasePage.isLoading,
    lotteryPhase: state.lotteryPhasePage.lotteryPhase
});

export const ViewLotteriesPhasePageContainer = connect(mapStateToProps, mapDispatchToProps)(ViewLotteriesPage); 


