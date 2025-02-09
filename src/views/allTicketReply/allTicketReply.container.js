// import AllTicketPageReply from "./allTicketReply.component";
import AllTicketPageReply from "./allTicketReply.component";
import { connect } from "react-redux";
import { fetchsupportticket, updateStatus } from "../../api/supportticket/supportTicketAction";
import {
  fetchsupportticketmsgattach,
  CreateSupportTicket,
  fetchsupportticketmsgattachreply,
  CreateSupportTicketAttach,
  fetchsupportticketfirstmsg,
} from "../../api/supportticketreply/supportTicketReplyAction";

const mapDispatchToProps = {
  fetchsupportticket,
  fetchsupportticketmsgattach,
  CreateSupportTicket,
  fetchsupportticketmsgattachreply,
  CreateSupportTicketAttach,
  updateStatus,
  fetchsupportticketfirstmsg,
};

const mapStateToProps = (state) => ({
  isError: state.supportTicketPage.isError,
  isLoading: state.supportTicketPage.isLoading,
  isSaved: state.supportTicketPage.isSaved,
  supportTicket: state.supportTicketPage.supportTicket,
  supportTicketreplymsg: state.supportTicketPageReply.supportTicketreplymsg,
  supportTicketreplymsgattach: state.supportTicketPageReply.supportTicketreplymsgattach,
  supportTicketUser: state.supportTicketPageReply.supportTicketUser,


});
export const AllTicketPageReplyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllTicketPageReply);
