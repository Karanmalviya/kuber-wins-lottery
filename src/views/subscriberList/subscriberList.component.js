import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import "../../style/paymentModal.css";
// import {toast, ToastContainer} from "react-toastify";
// page imports start
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";

// React bootstrap start
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import {
  //  BsArrowUpShort
  BsArrowDownUp,
} from "react-icons/bs";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
// React bootstrap end
import Loader from "../../component/Loader";
import { toast, ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";

function DateComponent(props) {
  const date = new Date(props.date);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "IST",
    hour: "2-digit",
    minute: "2-digit",
  });

  return <p>{formattedDate}</p>;
}

export default function SubscriberList(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const {
    fetchsubscribe,
    subscriber,
    createsubscribe,
    count,
    isLoading,
    isSaved,
  } = props;

  const [subscribe, setSubscribe] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [subscriberList, setSubscribeList] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchsubscribe({
      offset: (page - 1) * limit,
      limit: limit,
    });
  }, []);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const defineLimit = (l) => {
    setLimit(l);
    fetchsubscribe({
      offset: (page - 1) * l,
      limit: l,
    });
  };

  const defineSearch = (s) => {
    setSearch(s);
    if (s.trim().length > 0) {
      fetchsubscribe({
        offset: (page - 1) * limit,
        limit: limit,
        search: s.trim(),
      });
    } else {
      fetchsubscribe({
        offset: (page - 1) * limit,
        limit: limit,
      });
    }
  };
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentSubscriber = subscriber.slice(startIndex, endIndex);
  const SubscriberCount = subscriber.length;
  const pageCount = Math.ceil(SubscriberCount / limit);

  useEffect(() => {
    if (searchTerm === "") {
      setSubscribeList(currentSubscriber);
    } else {
      const filtered = currentSubscriber.filter((row) =>
        row?.mail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSubscribeList(filtered);
    }
  }, [searchTerm, subscriber, limit, currentPage]);

  const handleSubmit = async (e, subscribe) => {
    e.preventDefault();
    const subscribeData = {
      to: subscribe.mail,
      text: text,
      subject: subject,
    };
    try {
      const response = await createsubscribe(subscribeData);
    } catch (error) {}
    setSubscribe(false);
  };

  return (
    <>
      <Loader loading={isLoading} />
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
                <h1>Subscriber List</h1>

                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Subscriber List</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">All Subscriber List</h5>
                        <div className="showentriesDiv">
                          <h6>
                            Show &nbsp;{" "}
                            <DropdownButton
                              variant="outline-dark"
                              id="dropdown-basic-button"
                              title="10"
                            >
                              <Dropdown.Item
                                variant
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(10);
                                  setCurrentPage(1);
                                }}
                              >
                                10
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(25);
                                  setCurrentPage(1);
                                }}
                              >
                                25
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(50);
                                  setCurrentPage(1);
                                }}
                              >
                                50
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(100);
                                  setCurrentPage(1);
                                }}
                              >
                                100
                              </Dropdown.Item>
                            </DropdownButton>{" "}
                            &nbsp;entries
                          </h6>

                          <p>
                            Search :
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  // onChange={(e) => defineSearch(e.target.value)}
                                  type="email"
                                />
                              </Form.Group>
                            </Form>
                          </p>
                        </div>

                        {/* <!-- Default Table --> */}
                        <div className="table-responsive">
                          <Table
                            id="basic-6"
                            className="display tbl-ltr lotteriesTable"
                          >
                            <thead className="lotteriesTableHead">
                              <tr className="tableTd">
                                <th>
                                  <div className="d-flex">
                                    S.N.{" "}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex">
                                    Email{" "}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex">
                                    Date | Time {""}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex">
                                    Action{" "}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {subscriberList &&
                                Array.isArray(subscriberList) &&
                                subscriberList.map((row, i) => {
                                  return (
                                    <tr key={row.id} className="tableTd">
                                      <td>
                                        {(currentPage - 1) * limit + 1 + i}
                                      </td>

                                      <td>{row.mail}</td>
                                      <td>
                                        <DateComponent date={row?.createdAt} />
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-outline-dark mx-1 rounded-pill btn-sm"
                                          data-id={row.mail}
                                          onClick={() => setSubscribe(row)}
                                          // onClick={() => setShow(true)}
                                        >
                                          Send Email
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </div>
                        <div className="tableBottomEntries">
                          <h6>
                            <p>
                              {" "}
                              Showing {(currentPage - 1) * limit + 1} to{" "}
                              {SubscriberCount > currentPage * limit
                                ? currentPage * limit
                                : SubscriberCount}{" "}
                              of {SubscriberCount} entries
                            </p>
                          </h6>
                          <p>
                            <span
                              style={
                                currentPage > 1 ? { cursor: "pointer" } : {}
                              }
                              onClick={() => {
                                if (currentPage > 1) {
                                  definePage(currentPage - 1);
                                }
                              }}
                            >
                              Previous
                            </span>
                            &nbsp;&nbsp;
                            <Button variant="outline-dark">
                              {currentPage}
                            </Button>
                            &nbsp;&nbsp;
                            <span
                              style={
                                count > currentPage * limit
                                  ? { cursor: "pointer" }
                                  : {}
                              }
                              onClick={() => {
                                if (SubscriberCount > currentPage * limit) {
                                  definePage(currentPage + 1);
                                }
                              }}
                            >
                              Next
                            </span>
                            &nbsp;&nbsp;
                          </p>
                        </div>
                        {/* <!-- End Default Table Example --> */}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* {subscribe && (
                  <div className="modal_modal">
                    <div className="overlay_modal">
                      <div className="modal-content_modal">
                        <div className="d-flex justify-content-between">
                          <div>
                            <form
                              action=""
                              className="profile-form"
                              onSubmit={(e) => handleSubmit(e, subscribe)}
                            >
                              <div className="row">
                                <div className=" col-lg-12 col-md-6 mb-3">
                                  <label>Your Email Id</label>
                                  <input
                                    className="form-control"
                                    placeholder=""
                                    value={subscribe.mail}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className=" col-lg-12 col-md-6 mb-3">
                                  <label>Subject</label>
                                  <input
                                    className="form-control"
                                    placeholder=""
                                    type="text"
                                    required
                                    onChange={(e) => setSubject(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-6 mb-3">
                                  <label>Text</label>
                                  <textarea
                                    name="message"
                                    rows="5"
                                    cols="60"
                                    className="form-control"
                                    required
                                    onChange={(e) => setText(e.target.value)}
                                  ></textarea>
                                </div>
                              </div>
                              <div className=" mt-3 d-flex justify-content-center align-items-center">
                                <button
                                  className="btn btn-info w-25 py-2 m-4 text-white"
                                  type="submit"
                                >
                                  Confirm
                                </button>

                                <button
                                  className="btn btn-info w-25 py-2 text-white bg-danger"
                                  onClick={() => setSubscribe(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                          <RxCross2
                            className="fs-4 mb-2"
                            onClick={() => setSubscribe(false)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}
              </section>
            </main>

            <Modal show={subscribe} onHide={() => setSubscribe(false)} centered>
              <Modal.Header closeButton className="OTP-modal">
                <Modal.Title>Send mail to subscriber</Modal.Title>
              </Modal.Header>
              <form
                action=""
                className="profile-form"
                onSubmit={(e) => handleSubmit(e, subscribe)}
              >
                <Modal.Body>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label>Your Email Id</label>
                      <input
                        className="form-control form-control-sm"
                        placeholder=""
                        value={subscribe?.mail}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className=" col-12 mb-3">
                      <label>Subject</label>
                      <input
                        className="form-control form-control-sm"
                        placeholder=""
                        type="text"
                        required
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label>Text</label>
                      <textarea
                        name="message"
                        rows="5"
                        cols="60"
                        className="form-control form-control-sm"
                        required
                        onChange={(e) => setText(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-start">
                  <div className="d-flex justify-content-start">
                    <button
                      className={"btn btn-primary px-3 btn-sm w-50"}
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-primary px-3 btn-sm w-50 ms-1 "
                      onClick={() => setSubscribe(false)}
                    >
                      Cancel{" "}
                    </button>
                  </div>
                </Modal.Footer>
              </form>
            </Modal>
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
        <ToastContainer />
      </Container>
    </>
  );
}
