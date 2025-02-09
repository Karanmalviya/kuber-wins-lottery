import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import {FaDesktop} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchSupportTicketAttachment,
  fetchSupportTicketById,
} from "../../features/apiSlice";
import MiniLoader from "../components/MiniLoader";

export default function SupportTicketPage({props}) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [supportTickets, setSupportTickets] = useState([]);
  const [supportTicketsidreplyattach, setSupportTicketsidreplyattach] =
    useState([]);

  useEffect(() => {
    dispatch(fetchSupportTicketById(userId));
    dispatch(fetchSupportTicketAttachment());
  }, [dispatch, userId]);

  const supportTicketById = useSelector((state) => state.api.supportTicketById);
  const supportTicketByIdLoading = useSelector(
    (state) => state.api.supportTicketByIdLoading
  );
  const supportTicketAttachment = useSelector(
    (state) => state.api.supportTicketAttachment
  );
  const supportTicketAttachmentLoading = useSelector(
    (state) => state.api.supportTicketAttachmentLoading
  );

  useEffect(() => {
    if (supportTicketById.length) {
      setSupportTickets(supportTicketById);
    }
    if (supportTicketAttachment.length) {
      setSupportTicketsidreplyattach(supportTicketAttachment);
    }
  }, [supportTicketById, supportTicketAttachment]);

  function timeDifference(dateTime) {
    if (dateTime) {
      const currentDate = new Date();
      const inputDate = new Date(dateTime);
      const diff = currentDate.getTime() - inputDate.getTime();

      const second = 1000;
      const minute = 60 * second;
      const hour = 60 * minute;
      const day = 24 * hour;
      const month = 30 * day;
      const year = 365 * day;

      if (diff < minute) {
        return Math.floor(diff / 1000) + " seconds ago";
      } else if (diff < hour) {
        return Math.floor(diff / minute) + " minutes ago";
      } else if (diff < day) {
        return Math.floor(diff / hour) + " hours ago";
      } else if (diff < month) {
        return Math.floor(diff / day) + " days ago";
      } else if (diff < year) {
        return Math.floor(diff / month) + " months ago";
      } else {
        return Math.floor(diff / year) + " years ago";
      }
    } else {
      return "Waiting for reply";
    }
  }

  const currentTime = (id) => {
    const currArr =
      supportTicketsidreplyattach.length > 0 &&
      supportTicketsidreplyattach
        .filter(
          (item) =>
            item.SupportTicketMessage.AdminId === 0 &&
            item.SupportTicketMessage.SupportTicketId === id
        )
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 1);

    const currArr1st = supportTickets.filter((item1) => item1.id === id);
    return timeDifference(
      currArr.length > 0 ? currArr[0].createdAt : currArr1st[0].createdAt
    );
  };

  return (
    <>
      <title>Support Ticket - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"supportticket"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="mb-4">
                  <Link
                    to={"/new-support-ticket"}
                    className="float-end btn-withdrawal pull-start "
                  >
                    <i
                      className="fa fa-plus-circle text-white fs-3 pe-1"
                      style={{verticalAlign: "middle"}}
                    ></i>{" "}
                    New Ticket
                  </Link>
                </div>
                <div className="col-lg-12">
                  <div className="card card-table p-0">
                    <div className="card-header py-3 px-4">
                      <h5 className="mb-0 fs-5">Support Ticket List</h5>
                    </div>
                    <div className="card-body table-responsive">
                      <table className="table table-bordered withdraw-table">
                        <thead>
                          <tr>
                            <th>SNo.</th>
                            <th style={{float: "left"}}>Subject</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Last Reply</th>
                            <th></th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {supportTickets &&
                            Array.isArray(supportTickets) &&
                            supportTickets
                              .slice()
                              .sort(
                                (a, b) =>
                                  new Date(b.createdAt) - new Date(a.createdAt)
                              )
                              .map((ticket, index) => {
                                var itemArr = [];
                                if (supportTicketsidreplyattach.length > 0) {
                                  supportTicketsidreplyattach.map((item) => {
                                    if (
                                      item?.SupportTicketMessage
                                        ?.SupportTicketId === ticket?.id
                                    ) {
                                      if (
                                        item?.SupportTicketMessage?.AdminId ===
                                        1
                                      ) {
                                        itemArr.push(
                                          item?.SupportTicketMessage
                                        );
                                      }
                                    }
                                  });
                                }
                                let replyDateTime = "Waiting for reply";
                                if (itemArr.length > 0) {
                                  const latestDate = itemArr
                                    .sort(
                                      (a, b) =>
                                        new Date(b.updatedAt) -
                                        new Date(a.updatedAt)
                                    )
                                    .slice(0, 1);
                                  replyDateTime = timeDifference(
                                    latestDate[0].updatedAt
                                  );
                                }
                                return (
                                  <tr key={ticket.id} className="acc">
                                    <td>{index + 1}</td>
                                    <td
                                      style={{float: "left"}}
                                    >{`[Ticket#${ticket.randomNo}] ${ticket.subject}`}</td>
                                    {/* <td> {messageStatus}</td> */}
                                    <td>
                                      {ticket.status == 1 ? (
                                        <span className="badge rounded-pill bg-warning">
                                          Opened
                                        </span>
                                      ) : ticket.status == 2 ? (
                                        <span className="badge rounded-pill bg-success">
                                          Answered
                                        </span>
                                      ) : ticket.status == 3 ? (
                                        <span className="badge rounded-pill bg-secondary">
                                          Closed
                                        </span>
                                      ) : (
                                        <span className="badge rounded-pill bg-danger">
                                          Pending
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      {ticket.priority == 1 ? (
                                        <span className="badge rounded-pill bg-danger">
                                          Low
                                        </span>
                                      ) : ticket.priority == 2 ? (
                                        <span className="badge rounded-pill bg-warning">
                                          Medium
                                        </span>
                                      ) : (
                                        <span className="badge rounded-pill bg-success">
                                          High
                                        </span>
                                      )}
                                    </td>
                                    <td>{replyDateTime}</td>
                                    <td></td>
                                    <Link
                                      state={{
                                        supportticket: ticket.id,
                                        supportticketsub: `[Ticket#${ticket.randomNo}]${ticket.subject}`,
                                      }}
                                      to={`/supportticketreplypage/${ticket.id}`}
                                    >
                                      <td>
                                        <FaDesktop
                                          style={{
                                            color: "#0d6efd",
                                            borderRadius: 3,
                                            fontSize: 30,
                                            marginTop: -35,
                                          }}
                                        />
                                      </td>
                                    </Link>
                                  </tr>
                                );
                              })}
                        </tbody>
                      </table>
                      {supportTicketByIdLoading &&
                        supportTicketAttachmentLoading && <MiniLoader />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer props={""} />
    </>
  );
}
