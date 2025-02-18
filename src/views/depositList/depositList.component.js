import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// page imports start
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
// page imports end

// React bootstrap start
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowDownUp } from "react-icons/bs";
import DropdownButton from "react-bootstrap/DropdownButton";

import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
// React bootstrap end

import "../../style/paymentModal.css";
import { ToastContainer } from "react-toastify";
import Loader from "../../component/Loader";
import ScrollToTop from "react-scroll-to-top";
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

  return <p>{formattedDate}</p>;
}
export default function DepositList(props) {
  let index = 0;
  const { user, isLoading, fetchDeposits, deposits } = props;
  const [page, setPage] = useState(1);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDeposits({
      page: page,
      pageSize: limit,
      search: search.trim(),
    });
  }, [page, limit, search]);

  const definePage = (p) => {
    setPage(p);
  };

  const defineLimit = (l) => {
    setLimit(l);
    setPage(1);
  };

  const defineSearch = (s) => {
    setSearch(s);
    setPage(1);
  };

  const count = deposits?.totalRecords || 0;

  const status = (s) => {
    if (s === 0) {
      return (
        <span className="badge bg-primary rounded-pill">Request Generated</span>
      );
    } else if (s === 1) {
      return (
        <span className="badge bg-warning rounded-pill">
          Pending From Admin
        </span>
      );
    } else if (s === 2) {
      return <span className="badge bg-success rounded-pill">Approved</span>;
    } else {
      return <span className="badge bg-danger rounded-pill">Rejected</span>;
    }
  };

  return (
    <>
      <Loader loading={isLoading} />
      <ToastContainer />
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
                <h1>User Deposit </h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Deposit List </li>
                  </ol>
                </nav>
              </div>

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">All Deposits</h5>
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
                                  defineLimit(10);
                                }}
                              >
                                10
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  defineLimit(25);
                                }}
                              >
                                25
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  defineLimit(50);
                                }}
                              >
                                50
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  defineLimit(100);
                                }}
                              >
                                100
                              </Dropdown.Item>
                            </DropdownButton>{" "}
                            &nbsp;entries
                          </h6>
                          {/* <p>
                            Search : &nbsp;
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) => defineSearch(e.target.value)}
                                  type="text"
                                  placeholder="Account Number"
                                  value={search}
                                />
                              </Form.Group>
                            </Form>
                          </p> */}
                        </div>
                        <div className="table-responsive">
                          <Table
                            id="basic-6"
                            className="display tbl-ltr lotteriesTable"
                          >
                            <thead className="lotteriesTableHead">
                              <tr className="tableTd">
                                <th>
                                  <div className="d-flex">
                                    S.N.
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex">
                                    User
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex">
                                    Amount
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>{" "}
                                <th>
                                  <div className="d-flex">
                                    Payment Method
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>{" "}
                                <th>
                                  <div className="d-flex">
                                    Current Status
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex">
                                    Date & Time
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>{" "}
                                <th>
                                  <div className="d-flex">
                                    Action
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(deposits?.data) &&
                                deposits?.data.map((row, i) => {
                                  return (
                                    <tr key={row.id} className="tableTd">
                                      <td>
                                        {(page - 1) * limit + 1 + index++}
                                      </td>
                                      <td>
                                        <div>
                                          <p className="tableP">
                                            {row?.User?.userName}
                                          </p>
                                          <p className="text-primary tableP">
                                            {row?.User?.email}
                                          </p>
                                        </div>
                                      </td>
                                      <td>Rs.{row?.amount}</td>
                                      <td>
                                        {row?.payment_method
                                          ? row?.payment_method?.toUpperCase() + " Transfer"
                                          : "Not done"}
                                      </td>
                                      <td>{status(row?.status)}</td>
                                      <td>
                                        <DateComponent date={row?.createdAt} />
                                      </td>{" "}
                                      <td>
                                        <Link
                                          to={"/deposit/" + row?.id}
                                          className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                                        >
                                          Details
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </div>
                        <div className="tableBottomEntries">
                          <h6>
                            Showing {(page - 1) * limit + 1} to{" "}
                            {count > page * limit ? page * limit : count} of{" "}
                            {count} entries
                          </h6>
                          <p>
                            <span
                              style={page > 1 ? { cursor: "pointer" } : {}}
                              onClick={() => {
                                if (page > 1) {
                                  definePage(page - 1);
                                }
                              }}
                            >
                              Previous
                            </span>
                            &nbsp;&nbsp;
                            <Button variant="outline-dark">{page}</Button>{" "}
                            &nbsp;&nbsp;
                            <span
                              style={
                                count > page * limit
                                  ? { cursor: "pointer" }
                                  : {}
                              }
                              onClick={() => {
                                if (count > page * limit) {
                                  definePage(page + 1);
                                }
                              }}
                            >
                              Next
                            </span>
                            &nbsp;&nbsp;
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>
            </main>
            <FooterPageContainer />{" "}
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
    </>
  );
}
