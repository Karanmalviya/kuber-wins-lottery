import KycPendingPage from './kycpending.component';
import { connect } from 'react-redux';
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
export const KycPendingPageContainer = connect(mapStateToProps, mapDispatchToProps)(KycPendingPage); 
