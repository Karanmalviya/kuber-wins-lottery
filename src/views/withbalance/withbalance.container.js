import WithBalancePage from './withbalance.component';
import { connect } from 'react-redux';
// import { createlottery, updatelottery, fetchlottery, deletelottery } from './../../api/lottery/lotteryAction';
// import { fetchCurrency } from '../../api/currency/currencyAction';
import { fetchBuyTicket } from '../../api/buyticket/buyticketAction';

const mapDispatchToProps = {
    fetchBuyTicket
}

const mapStateToProps = state => ({
    isError: state.buyTicketPage.isError,
    isLoading: state.buyTicketPage.isLoading,
    tickets: state.buyTicketPage.tickets,
    count: state.buyTicketPage.count
});
export const WithBalancePageContainer = connect(mapStateToProps, mapDispatchToProps)(WithBalancePage); 
