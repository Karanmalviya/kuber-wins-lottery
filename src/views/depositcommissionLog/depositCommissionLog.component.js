import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// page imports start
import { HeaderPageContainer } from "./../../component/header/header.container";
import { SidebarPageContainer } from "./../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "./../../component/footer/footer.container";
// page imports end

// React bootstrap start
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowDownUp } from "react-icons/bs";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Loader from "../../component/Loader";
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
export default function DepositCommissionLog(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { fetchCommissionUser, isLoading, commission } = props;
  const [commissionData, setCommissionData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  useEffect(() => {
    fetchCommissionUser();
  }, []);
  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const current = commission?.rows
    ?.slice()
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const filteredCommission = current?.filter(
    (c) => c.commission_type === "deposit"
  );
  const currentCommission = filteredCommission?.slice(startIndex, endIndex);
  const CommissionCount = filteredCommission?.length;

  useEffect(() => {
    if (searchTerm === "" || searchTerm === null) {
      setCommissionData(currentCommission);
    } else {
      const filtered = currentCommission?.filter(
        (row) =>
          `${row?.User?.fname} ${row?.User?.lname}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          row?.User?.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          row?.randomNo?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCommissionData(filtered);
    }
  }, [searchTerm, commission, limit, currentPage]);

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
                <h1>Commission Log</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Commission</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">
                          Deposit Commission
                          <Link
                            to="/deposit-commission"
                            className={
                              location.pathname === "/deposit-commission"
                                ? "btn btn-outline-primary btn-lg-3 ms-2 float-end active"
                                : "btn btn-outline-primary btn-lg-3 ms-2 float-end"
                            }
                          >
                            Deposit Commission
                          </Link>
                          <Link
                            to="/buy-commission"
                            className="btn btn-outline-primary btn-lg-3 ms-2 float-end"
                          >
                            Buy Commission
                          </Link>
                          <Link
                            to="/Win-commission"
                            className="btn btn-outline-primary btn-lg-3 ms-2 float-end"
                          >
                            Win Commission
                          </Link>{" "}
                          <Link
                            to="/lottery-rewards-log"
                            className={
                              location.pathname === "/lottery-rewards-log"
                                ? "btn btn-outline-primary btn-lg-3 ms-2 float-end active"
                                : "btn btn-outline-primary btn-lg-3 ms-2 float-end"
                            }
                          >
                            Lottery Rewards
                          </Link>
                        </h5>
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
                                }}
                              >
                                10
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(25);
                                }}
                              >
                                25
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(50);
                                }}
                              >
                                50
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(100);
                                }}
                              >
                                100
                              </Dropdown.Item>
                            </DropdownButton>{" "}
                            &nbsp;entries
                          </h6>
                          <p>
                            Search : &nbsp;
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  placeholder="Trx Id Or UserName"
                                />
                              </Form.Group>
                            </Form>
                          </p>
                        </div>

                        <div className="table-responsive">
                          <Table
                            id="basic-6"
                            className="display tbl-ltr lotteriesTable"
                          >
                            <thead className="lotteriesTableHead">
                              <tr className="tableTd">
                                <th>
                                  S.N. <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  User <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Date <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Percent-Amount{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Trx <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Level{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Description{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {commissionData?.length > 0 ? (
                                commissionData?.map((row, i) => {
                                  return (
                                    <tr key={row.id} className="tableTd">
                                      <td>
                                        {(currentPage - 1) * limit + 1 + i}
                                      </td>
                                      <td>
                                        {row?.User?.fname} {row?.User?.lname}
                                        <br></br>
                                        <Link
                                          to={`/all-user-detail/${row?.UserId}`}
                                        >
                                          {" "}
                                          <span className="text-primary">
                                            {row?.User?.username}
                                          </span>{" "}
                                        </Link>
                                      </td>
                                      <td>
                                        <DateComponent date={row?.updatedAt} />

                                        {timeDifference(row?.updatedAt)}
                                      </td>

                                      <td>
                                        {row?.percent}%<br></br>${row?.amount}
                                      </td>
                                      <td>{row?.randomNo}</td>
                                      <td>{row?.level}</td>
                                      <td>
                                        Level {row?.level} Deposit commission by{" "}
                                        {row?.UserName}
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan={7} className="text-center">
                                    No Result found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                        <div className="tableBottomEntries">
                          <h6>
                            <p>
                              {" "}
                              Showing {(currentPage - 1) * limit + 1} to{" "}
                              {CommissionCount > currentPage * limit
                                ? currentPage * limit
                                : CommissionCount}{" "}
                              of {CommissionCount} entries
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
                                CommissionCount > currentPage * limit
                                  ? { cursor: "pointer" }
                                  : {}
                              }
                              onClick={() => {
                                if (CommissionCount > currentPage * limit) {
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
