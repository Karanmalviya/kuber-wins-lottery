import AllTicketPage from './allTicket.component';
import { connect } from 'react-redux';
import { fetchsupportticket, updateStatus } from "../../api/supportticket/supportTicketAction";
import { fetchsupportticketmsgattachreply} from '../../api/supportticketreply/supportTicketReplyAction';

const mapDispatchToProps = {
  fetchsupportticket,
  updateStatus,
  fetchsupportticketmsgattachreply,
};

const mapStateToProps = (state) => ({
  isError: state.supportTicketPage.isError,
  isLoading: state.supportTicketPage.isLoading,
  isSaved: state.supportTicketPage.isSaved,
  supportTicket: state.supportTicketPage.supportTicket,
  supportTicketreplymsgattach: state.supportTicketPageReply.supportTicketreplymsgattach,
  count: state.supportTicketPage.count,


});

export const AllTicketPageContainer = connect(mapStateToProps, mapDispatchToProps)(AllTicketPage);