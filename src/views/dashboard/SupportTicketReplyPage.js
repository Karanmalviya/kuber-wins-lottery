import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import {
  CreateSupportTicketAttach,
  CreateSupportTicketReply,
  updateMsg,
} from "../../utils/index";
import { FaUserCircle } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSupportTicketAttachment,
  fetchSupportTicketById,
  fetchSupportTicketReply,
  fetchUser,
} from "../../features/apiSlice";
import Swal from "sweetalert2";

export default function SupportTicketReplyPage({ props }) {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const [supportTickets, setSupportTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [supportTicketAttach, setSupportTicketAttach] = useState("");
  const [supportticketsid, setSupportTicketsid] = useState([]);
  const [supportTicketsidreplyattach, setSupportTicketsidreplyattach] =
    useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [supportTicketsidreply, setSupportTicketsidreply] = useState("");
  const userId = localStorage.getItem("userId");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const pathId = params.id;
  const [refresh, setRefresh] = useState(false);
  const [supportId, setSupportId] = useState("");
  const [ransub, setRansub] = useState("");
  const loading = false;

  useEffect(() => {
    if (location.state) {
      setSupportId(location.state.supportticket);
      setRansub(location.state.supportticketsub);
    }
  }, [location]);

  useEffect(() => {
    dispatch(fetchSupportTicketById(userId));
    dispatch(fetchSupportTicketAttachment(userId));
    dispatch(fetchSupportTicketReply());
    dispatch(fetchUser(userId));
  }, [dispatch, userId, refresh]);

  const supportTicketById = useSelector((state) => state.api.supportTicketById);
  const supportTicketReply = useSelector(
    (state) => state.api.supportTicketReply
  );

  const supportTicketAttachment = useSelector(
    (state) => state.api.supportTicketAttachment
  );
  const user = useSelector((state) => state.api.user);

  const scrollContainer = document.getElementById("scrollContainer");
  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [scrollContainer, refresh]);

  useEffect(() => {
    if (supportTicketById.length) {
      const newArr = supportTicketById.filter((item) => item?.id === +pathId);
      setSupportTicketsid(newArr[0]);
    }
    if (supportTicketReply.length) {
      setSupportTicketsidreply(supportTicketReply);
    }
    if (supportTicketAttachment.length) {
      setSupportTicketsidreplyattach(supportTicketAttachment);
    }
  }, [supportTicketById, supportTicketReply, supportTicketAttachment, pathId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message !== "") {
      setLoader(true);
      const body = {
        AdminId: 0,
        message: message,
        SupportTicketId: supportId,
      };
      const tickets = await CreateSupportTicketReply(body, {});
      updateMsg({ status: 0 }, supportId);
      setSupportTickets(tickets);
      var formdata = new FormData();
      for (let i = 0; i < imageFiles.length; i++) {
        formdata.append("file", imageFiles[i]);
      }
      formdata.append("SupportTicketMessageId", tickets.data.id);
      if (tickets.data) {
        const ticketattach = await CreateSupportTicketAttach(formdata, {
          "content-type": imageFiles.type,
          "content-length": `${imageFiles.size}`,
        });

        setSupportTicketAttach(ticketattach);
        setRefresh((prev) => !prev);
        setLoader(false);
        setMessage("");
      }
    }
  };

  if (supportTicketsidreply.length > 0) {
    var filteredReplies = supportTicketsidreply.filter((reply) => {
      return reply.SupportTicket?.UserId == userId;
    });
    if (filteredReplies.length > 0) {
      var filteredRepliesid = filteredReplies.filter((reply) => {
        return reply.SupportTicketId == supportId;
      });
    }
  }

  const onImageChange = (e) => {
    let files = e.target.files;
    setImageFiles([...imageFiles, ...files]);
  };

  return (
    <>
      {/* {loader && <LoadingSpinner />} */}
      <title>Support Ticket - Kuber Wins</title>

      <Navbar props={{ mainPage: "dashboard", subPage: "supportticket" }} />

      <section className="sec-dashbaord">
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"supportticketreplypage"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-2">
              <div className="row">
                <div className="col-lg-12 bg-white">
                  <div className="px-1">
                    <h4 className="mb-4 fw-bold pt-3">
                      {ransub}
                      {/* <div className="col-lg-4 col-md-6 mb-3" align="right"> */}
                      <button
                        className="btn btn-danger"
                        style={
                          supportticketsid?.status === "3"
                            ? { float: "right", display: "none" }
                            : { float: "right", display: "block" }
                        }
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: `Your Support ticket will be closed, do you want to continue?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#F73BB1",
                            cancelButtonColor: "#DC3545",
                            confirmButtonText: "Yes!, Close my support ticket",
                            cancelButtonText: "No, go back",
                            showLoaderOnConfirm: true,
                            preConfirm: async () => {
                              try {
                                await updateMsg({ status: 3 }, supportId);
                              } catch (error) {
                                Swal.showValidationMessage(
                                  `Request failed: ${error}`
                                );
                                throw error;
                              }
                            },
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              Swal.fire({
                                title: "Success!",
                                text: "Your support ticket has been closed",
                                icon: "success",
                              }).then(
                                (result1) =>
                                  result1.isConfirmed &&
                                  navigate("/support-ticket")
                              );
                            }
                          });
                        }}
                      >
                        <RxCross1 />
                      </button>
                      {/* </div> */}
                    </h4>

                    <form className="profile-form ">
                      {" "}
                      <div
                        className="row "
                        // style={{ backgroundColor: "#e1deeb" }}
                        style={{ backgroundColor: "#f5f6ff" }}
                      >
                        <div
                          style={{ overflowY: "scroll", maxHeight: "400px" }}
                          id="scrollContainer"
                        >
                          <div className="d-flex">
                            <div className="w-75 mt-2 message-orange  ">
                              <p className="message-content">
                                <div className="m-0 p-0">
                                  <small style={{ color: "purple" }}>Me</small>
                                </div>

                                <div className="m-0 p-0 ">
                                  {filteredRepliesid?.[0]?.SupportTicket
                                    ?.message ?? supportticketsid?.message}
                                </div>

                                <div className="mt-4 p-0">
                                  {filteredRepliesid?.[0]?.SupportTicket?.images.map(
                                    (imageUrl) => (
                                      <a
                                        href={imageUrl.url}
                                        target="_blank"
                                        style={{
                                          color: "purple",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        <BsImage
                                          style={{
                                            width: 18,
                                            height: 18,
                                            padding: 1,
                                            marginRight: 2,
                                          }}
                                        />
                                      </a>
                                    )
                                  ) ??
                                    supportticketsid?.images?.map(
                                      (imageUrl) => (
                                        <a
                                          href={imageUrl.url}
                                          target="_blank"
                                          style={{
                                            color: "purple",
                                            fontStyle: "italic",
                                          }}
                                        >
                                          <BsImage
                                            style={{
                                              width: 18,
                                              height: 18,
                                              padding: 1,
                                              marginRight: 2,
                                            }}
                                          />
                                        </a>
                                      )
                                    )}
                                </div>
                                <small className="message-timestamp-left d-flex justify-content-between">
                                  {new Date(
                                    filteredRepliesid?.[0]?.SupportTicket
                                      ?.updatedAt ?? supportticketsid?.updatedAt
                                  ).toLocaleString(0)}
                                </small>
                              </p>
                            </div>
                            <div className="ms-4">
                              <img
                                draggable="false"
                                src={user?.image}
                                style={{
                                  height: "22px",
                                  width: "22px",
                                }}
                                className="rounded-circle"
                              />{" "}
                            </div>
                          </div>
                          {filteredRepliesid &&
                            Array.isArray(filteredRepliesid) &&
                            filteredRepliesid.reverse().map((row, i) => {
                              return row?.AdminId === 0 ? (
                                <div className="d-flex">
                                  <div
                                    key={row.id}
                                    className="w-75 mt-2 message-orange"
                                  >
                                    <p className="message-content m-0 p-0">
                                      <small style={{ color: "purple" }}>
                                        Me
                                      </small>
                                      <div className="mt-0">{row?.message}</div>
                                      <div className="mt-3">
                                        {supportTicketsidreplyattach &&
                                          supportTicketsidreplyattach.map(
                                            (item) =>
                                              item.SupportTicketMessageId ===
                                                row.id && item.attachment
                                                ? item?.attachment.map(
                                                    (img) => (
                                                      <a
                                                        href={img.url}
                                                        target="_blank"
                                                        style={{
                                                          color: "purple",
                                                          fontStyle: "italic",
                                                        }}
                                                      >
                                                        <BsImage
                                                          style={{
                                                            width: 18,
                                                            height: 18,
                                                            // border: "1px #333 solid",
                                                            padding: 1,
                                                            marginRight: 2,
                                                          }}
                                                        />
                                                      </a>
                                                    )
                                                  )
                                                : ""
                                          )}
                                      </div>
                                      <small className="message-timestamp-left">
                                        {new Date(
                                          row?.updatedAt
                                        ).toLocaleString()}
                                      </small>
                                    </p>
                                    {/* <p>{row.image}</p> */}
                                  </div>
                                  <div className="ms-4">
                                    <img
                                      draggable="false"
                                      src={user?.image}
                                      style={{
                                        height: "22px",
                                        width: "22px",
                                      }}
                                      className="rounded-circle"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="d-flex justify-content-start ">
                                  <FaUserCircle
                                    style={{
                                      height: "22px",
                                      width: "22px",
                                      color: "gray",
                                    }}
                                    className="ms-3"
                                  />
                                  <div
                                    key={row.id}
                                    className=" w-75 message-blue "
                                  >
                                    <p className="message-content m-0 p-0">
                                      <small style={{ color: "gray" }}>
                                        Admin
                                      </small>
                                      <div className="mt-0">{row?.message}</div>
                                      <div className="mt-4">
                                        {supportTicketsidreplyattach &&
                                          supportTicketsidreplyattach.map(
                                            (item) =>
                                              item.SupportTicketMessageId ===
                                                row.id && item.attachment
                                                ? item?.attachment.map(
                                                    (img) => (
                                                      <a
                                                        href={img.url}
                                                        target="_blank"
                                                        style={{
                                                          color: "red",
                                                          fontStyle: "italic",
                                                        }}
                                                      >
                                                        <BsImage
                                                          style={{
                                                            width: 18,
                                                            height: 18,
                                                            // border: "1px #333 solid",
                                                            padding: 1,
                                                            marginRight: 2,
                                                          }}
                                                        />
                                                      </a>
                                                    )
                                                  )
                                                : ""
                                          )}
                                      </div>
                                      <div className="mt-2">
                                        <small className="message-timestamp-right">
                                          {new Date(
                                            row?.updatedAt
                                          ).toLocaleString()}
                                        </small>
                                      </div>
                                    </p>
                                  </div>{" "}
                                </div>
                              );
                            })}
                        </div>

                        <div className="col-lg-12 col-md-6 mb-3">
                          {/* <label for="">Reply</label> */}
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                            className="form-control"
                            placeholder="Start typing..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          ></textarea>
                        </div>

                        <div className="col-lg-8 col-md-6 mb-3">
                          {/* <label>Attachments</label> */}
                          <input
                            type="file"
                            name="img"
                            className="file f-img "
                            accept="image/jpg image/jpeg image/png"
                            id="file"
                            multiple
                            onChange={onImageChange}
                          />
                          <br />
                          <span className="font-sm text-muted">
                            Allowed Files: .jpg, .jpeg, .png, .pdf, .doc, .docx
                          </span>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-3" align="right">
                          <button
                            className="btn btn-info w-75 py-2 text-white"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading}
                          >
                            {loader ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              ></div>
                            ) : (
                              `Send `
                            )}
                          </button>
                        </div>

                        <div className="row mt-3 d-flex justify-content-center align-items-center">
                          <div className="col-lg-6"></div>
                        </div>
                      </div>
                    </form>
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
