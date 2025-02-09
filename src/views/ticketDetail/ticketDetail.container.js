import AllTicketDetailPage from './ticketDetail.component';
import { connect } from 'react-redux';
import {fetchTicketEdit} from '../../api/ticket/ticketAction'; 
const mapDispatchToProps = {
    fetchTicketEdit
};
const mapStateToProps = state => ({
    isError: state.ticketPage.isError,
    isLoading: state.ticketPage.isLoading,
    isSaved: state.ticketPage.isSaved,
    singleTicket: state.ticketPage.singleTicket,
});
export const TicketDetailPageContainer = connect(mapStateToProps,mapDispatchToProps)(AllTicketDetailPage);