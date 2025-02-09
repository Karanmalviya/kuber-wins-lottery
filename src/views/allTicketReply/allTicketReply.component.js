import React, { ChangeEvent, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { TbMessageCircle2Filled, TbArrowBack } from "react-icons/tb";
// import { toast, ToastContainer } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { GrAttachment } from "react-icons/gr";

// page imports start
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
// page imports end

// React bootstrap start
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { BsImage } from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";
import ScrollToTop from "react-scroll-to-top";
// React bootstrap end
function DateComponent(props) {
  const date = new Date(props.date);
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "IST",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return <p className="m-0 p-0">{formattedDate}</p>;
}
export default function AllTicketPageReply(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const userId = id;
  const [message, setMessage] = useState("");
  const getid = state.setid;
  const getsid = state.setid;
  const ransub = state.supportticketsub;
  const [imageFiles, setImageFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const scrollContainer = document.getElementById("scrollContainer");

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [scrollContainer, refresh]);

  const {
    fetchsupportticketmsgattach,
    supportTicketreplymsg,
    CreateSupportTicket,
    fetchsupportticketmsgattachreply,
    supportTicketreplymsgattach,
    CreateSupportTicketAttach,
    updateStatus,
    fetchsupportticketfirstmsg,
    isLoading,
    supportTicketUser,
  } = props;
  useEffect(() => {
    fetchsupportticketfirstmsg(userId);
  }, []);
  let newArr = [];
  supportTicketUser?.forEach((item) => {
    if (Number(item?.id) === Number(getsid)) {
      newArr.push(item);
    }
  });
  const supportticketsid = newArr[0];
  useEffect(() => {
    fetchsupportticketmsgattach(getid);
  }, []);
  const data = supportTicketreplymsg.rows;
  useEffect(() => {
    fetchsupportticketmsgattachreply(getid);
  }, []);
  const dataattach = supportTicketreplymsgattach?.rows;
  const onImageChange = (e) => {
    let files = e.target.files;
    setImageFiles([...imageFiles, ...files]);
  };

  const postAttach = async (id) => {
    var formdata = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      formdata.append("file", imageFiles[i]);
    }
    formdata.append("SupportTicketMessageId", id);
    const replyattach = CreateSupportTicketAttach(formdata, {
      "content-type": imageFiles.type,
      "content-length": `${imageFiles.size}`,
    });
  };
  const postmsg = async (e) => {
    e.preventDefault();
    await CreateSupportTicket({
      AdminId: 1,
      SupportTicketId: Number(getsid),
      message: message,
    })
      .then((response) => {
        updateStatus({ status: 2 }, getsid);

        if (response.id) {
          postAttach(response.id);
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {});
  };

  if (data && data.length > 0) {
    var filterid = data.filter((reply) => {
      return reply.SupportTicketId == getsid;
    });
  }

  return (
    <>
      {/* <Loader loading={isLoading} /> */}
      <Container fluid className="containerFluMainDiv">
        <Row className="containerFluMainDivRow">
          <Col lg={12}>
            <HeaderPageContainer setOpenSidebar={setOpenSidebar} />
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        className={`containerFluMainDiv ${openSidebar && `mdbody`}`}
      >
        <Row className="containerFluMainDivRow">
          <Col lg={3} md={3} className="sibebarWidth">
            <SidebarPageContainer openSidebar={openSidebar} />
          </Col>
          <Col lg={9} md={9} sm={12} className="mainContantWidth">
            <main id="main" className="main">
              <div className="pagetitle">
                <h1>Reply Ticket</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">All Ticket</li>
                  </ol>
                </nav>
              </div>

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title ">
                          {ransub}
                          <button
                            className="btn btn-danger btn-sm"
                            style={
                              supportticketsid?.status === "3"
                                ? { float: "right", display: "none" }
                                : { float: "right", display: "block" }
                            }
                            onClick={() => {
                              confirmAlert({
                                title: "Confirm to close",
                                message: "Are you sure to close this ticket.",
                                buttons: [
                                  {
                                    label: "Yes",
                                    onClick: () => {
                                      updateStatus({ status: 3 }, getsid);
                                      navigate("/all-tickets");
                                    },
                                  },
                                  {
                                    label: "No",
                                  },
                                ],
                              });
                            }}
                          >
                            <RxCross1 />
                          </button>
                        </h5>
                        <form className="profile-form">
                          <div
                            className="row"
                            style={{ backgroundColor: "#e1deeb" }}
                          >
                            <div className="col-lg-12 col-md-12 mb-3">
                              <br></br>
                              <div
                                style={{
                                  overflowY: "scroll",
                                  maxHeight: "400px",
                                }}
                                id="scrollContainer"
                              >
                                <div className="w-75 mt-2 message-blue ">
                                  <p className="message-content">
                                    <div className="m-0 p-0">
                                      <small style={{ color: "purple" }}>
                                        {filterid?.[0]?.SupportTicket?.name ??
                                          supportticketsid?.name}
                                      </small>
                                    </div>
                                    <div className="m-0 p-0">
                                      {filterid?.[0]?.SupportTicket?.message ??
                                        supportticketsid?.message}
                                    </div>
                                    <div className="mt-3 p-0">
                                      {filterid?.[0]?.SupportTicket?.images.map(
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
                                    <br />
                                    <div>
                                      <small className="message-timestamp-left">
                                        <DateComponent
                                          date={
                                            filterid?.[0]?.SupportTicket
                                              ?.updatedAt ??
                                            supportticketsid?.updatedAt
                                          }
                                        />
                                      </small>
                                    </div>
                                  </p>
                                </div>
                                {data &&
                                  filterid?.reverse().map((row, i) => {
                                    return row?.AdminId === 0 ? (
                                      <div
                                        key={i}
                                        className="w-75 message-blue"
                                      >
                                        <p className="message-content m-0 p-0">
                                          <small style={{ color: "purple" }}>
                                            {filterid?.[0]?.SupportTicket
                                              ?.name ?? ""}
                                          </small>
                                          <div className="mt-0">
                                            {row?.message}
                                          </div>
                                          <div className="mt-3">
                                            {dataattach &&
                                              dataattach.map((item) =>
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
                                          <br />
                                          <small className="message-timestamp-left">
                                            <DateComponent
                                              date={row?.updatedAt}
                                            />
                                          </small>
                                        </p>
                                      </div>
                                    ) : (
                                      <div
                                        key={i}
                                        className="w-75 message-orange "
                                      >
                                        <p className="message-content m-0 p-0">
                                          <small style={{ color: "red" }}>
                                            Admin{" "}
                                          </small>
                                          <div className="mt-0">
                                            {row?.message}
                                          </div>
                                          <div className="mt-4">
                                            {dataattach &&
                                              dataattach.map((item) =>
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

                                            <small className="message-timestamp-right">
                                              <DateComponent
                                                date={row?.updatedAt}
                                              />
                                            </small>
                                          </div>
                                        </p>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                <textarea
                                  name=""
                                  id=""
                                  cols="30"
                                  rows="5"
                                  className="form-control"
                                  placeholder="Start typing..."
                                  onChange={(e) => setMessage(e.target.value)}
                                  required
                                ></textarea>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-8 col-md-6 mb-3">
                                {/* <label>Attachments  </label> */}
                                <input
                                  type="file"
                                  name="img"
                                  // className="file f-img"
                                  accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx"
                                  id="file"
                                  multiple
                                  onChange={onImageChange}
                                  className="form-control"
                                />
                                <br />
                                <span className="font-sm text-muted">
                                  Allowed Files: .jpg, .jpeg, .png, .pdf, .doc,
                                  .docx
                                </span>
                              </div>

                              <div className="col-lg-4 col-md-6 mb-3">
                                <button
                                  className="btn btn-primary w-100 text-white"
                                  type="submit"
                                  onClick={postmsg}
                                >
                                  Reply <TbArrowBack />
                                </button>
                              </div>
                            </div>

                            <div className="row mt-3 d-flex justify-content-center align-items-center">
                              <div className="col-lg-6"></div>
                            </div>
                          </div>
                        </form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>
            </main>
            <FooterPageContainer />
            <ScrollToTop
              smooth
              className="back-to-top"
              component={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-arrow-up "
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                  />
                </svg>
              }
            />
          </Col>
        </Row>
      </Container>
      {/* <ToastContainer limit={1} /> */}
    </>
  );
}
