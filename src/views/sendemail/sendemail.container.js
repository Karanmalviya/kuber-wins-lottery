import SendEmailPage from './sendemail.component';
import { connect } from 'react-redux';
import { sendMail } from '../../api/sendmail/sendmailAction';
import {fetchBuyTicket} from '../../api/buyticket/buyticketAction';
const mapDispatchToProps = {
    sendMail,
    fetchBuyTicket
}

const mapStateToProps = state => ({
    isError: state.sendMailPage.isError,
    isLoading: state.sendMailPage.isLoading,
    isSend: state.sendMailPage.isSend,
    tickets: state.buyTicketPage.tickets,
});
export const SendEmailPageContainer = connect(mapStateToProps, mapDispatchToProps)(SendEmailPage); 
