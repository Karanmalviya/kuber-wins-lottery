import AddLotteriesPage from './addLotteries.component';
import { connect } from 'react-redux';
import { createlottery, updatelottery, fetchlottery, deletelottery } from './../../api/lottery/lotteryAction';
import { fetchCurrency } from '../../api/currency/currencyAction';
import { fetchTimezone } from '../../api/timezone/timezoneAction';

const mapDispatchToProps = {
    createlottery,
    updatelottery,
    fetchlottery,
    deletelottery,
    fetchCurrency,
    fetchTimezone,
}

const mapStateToProps = state => ({
    isError: state.lotteryPage.isError,
    isLoading: state.lotteryPage.isLoading,
    lotteries: state.lotteryPage.lotteries,
    isSaved: state.lotteryPage.isSaved,
    currencies: state.currencyPage.currencies,
    timezones: state.timezonePage.timezones,
});

export const AddLotteriesPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddLotteriesPage); 