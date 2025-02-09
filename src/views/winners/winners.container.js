import WinnerPage from './winners.component';
import { connect } from 'react-redux';
import { fetchBuyTicket } from '../../api/buyticket/buyticketAction';
import { updateUser } from '../../api/user/userAction';

const mapDispatchToProps = {
    fetchBuyTicket,
    updateUser
}

const mapStateToProps = state => ({
    isError: state.buyTicketPage.isError,
    isLoading: state.buyTicketPage.isLoading,
    tickets: state.buyTicketPage.tickets,
    count: state.buyTicketPage.count
});

export const WinnerPageContainer = connect(mapStateToProps, mapDispatchToProps)(WinnerPage); 
