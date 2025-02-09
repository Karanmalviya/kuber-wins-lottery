import LotteriesPage from './lotteries.component';
import { connect } from 'react-redux';
import { fetchlottery,deletelottery, updatelottery,fetchlotteryEdit } from './../../api/lottery/lotteryAction';

const mapDispatchToProps = {
     fetchlottery,
     deletelottery,
     updatelottery,
     fetchlotteryEdit
}

const mapStateToProps = state => ({
    isError: state.lotteryPage.isError,
    isLoading: state.lotteryPage.isLoading,
    lotteries: state.lotteryPage.lotteries,
    isSaved: state.lotteryPage.isSaved,
    count : state.lotteryPage.count 
});

export const LotteriesPageContainer = connect(mapStateToProps, mapDispatchToProps)(LotteriesPage);  