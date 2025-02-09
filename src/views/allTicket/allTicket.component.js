import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDesktop } from "react-icons/fa";

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
import Loader from "../../component/Loader";
import ScrollToTop from "react-scroll-to-top";
// React bootstrap end

export default function AllTicketPage(props) {
  const { supportTicket, isLoading, updateStatus } = props;
  const [openSidebar, setOpenSidebar] = useState(false);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("All");
  const [priority, setPriority] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSupportTicket, setFilteredSupportTicket] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentTransactions = supportTicket?.slice(startIndex, endIndex);
  const count = supportTicket?.length;

  useEffect(() => {
    if (!searchTerm) {
      setFilteredSupportTicket(currentTransactions);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = currentTransactions.filter(
      (supportticket) =>
        supportticket?.name?.toLowerCase().includes(searchTermLower) ||
        supportticket?.randomNo?.toLowerCase().includes(searchTermLower)
    );

    setFilteredSupportTicket(filtered);
  }, [searchTerm, currentTransactions]);

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
                <h1>All Ticket</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      {/* <a href="index.html">Home</a> */}
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active">All Ticket</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">All Ticket</h5>
                        <div className="showentriesDiv">
                          <h6>
                            Show &nbsp;{" "}
                            <DropdownButton
                              variant="outline-dark"
                              id="dropdown-basic-button"
                              title={limit}
                            >
                              <Dropdown.Item
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

                          <h6>
                            Status &nbsp;{" "}
                            <DropdownButton
                              variant="outline-dark"
                              id="dropdown-basic-button"
                              title={filter}
                            >
                              <Dropdown.Item
                                variant
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFilter("All");
                                }}
                              >
                                All
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFilter("Pending");
                                }}
                              >
                                Pending
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFilter("Closed");
                                }}
                              >
                                Closed
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFilter("Opened");
                                }}
                              >
                                Opened
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFilter("Answered");
                                }}
                              >
                                Answered
                              </Dropdown.Item>
                            </DropdownButton>{" "}
                          </h6>
                          <h6>
                            Priority &nbsp;{" "}
                            <DropdownButton
                              variant="outline-dark"
                              id="dropdown-basic-button"
                              title={priority}
                            >
                              <Dropdown.Item
                                variant
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPriority("All");
                                }}
                              >
                                All
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPriority("Low");
                                }}
                              >
                                Low
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPriority("Medium");
                                }}
                              >
                                Medium
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPriority("High");
                                }}
                              >
                                High
                              </Dropdown.Item>
                            </DropdownButton>{" "}
                          </h6>
                          <p>
                            Search :
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  type="text"
                                  placeholder="Subject id, Username"
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
                                  SNo. <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Subject{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Submitted By{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Status{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Priority{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Last Reply{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th></th>
                                <th>
                                  View{" "}
                                  {/* <BsArrowDownUp className="updownArrow" /> */}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredSupportTicket &&
                                Array.isArray(filteredSupportTicket) &&
                                filteredSupportTicket
                                  .filter((row) => {
                                    if (filter === "All") {
                                      return true;
                                    } else if (filter === "Opened") {
                                      return row.status == 1;
                                    } else if (filter === "Answered") {
                                      return row.status == 2;
                                    } else if (filter === "Closed") {
                                      return row.status == 3;
                                    } else if (filter === "Pending") {
                                      return row.status == 0;
                                    }
                                  })
                                  .filter((row) => {
                                    if (priority === "All") {
                                      return true;
                                    } else if (priority === "Low") {
                                      return row.priority == 1;
                                    } else if (priority === "Medium") {
                                      return row.priority == 2;
                                    } else if (priority === "High") {
                                      return row.priority == 3;
                                    }
                                  })
                                  .map((row, i) => {
                                    return (
                                      <tr key={row.id} className="acc">
                                        <td>
                                          {(currentPage - 1) * limit + 1 + i}
                                        </td>
                                        <td>
                                          {`[Ticket#${row.randomNo}]${row.subject}`}
                                        </td>
                                        <td>{row.name}</td>
                                        <td>
                                          {row.status == 1 ? (
                                            <span className="badge rounded-pill bg-warning">
                                              Opened
                                            </span>
                                          ) : row.status == 2 ? (
                                            <span className="badge rounded-pill bg-success">
                                              Answered
                                            </span>
                                          ) : row.status == 3 ? (
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
                                          {row.priority == 1 ? (
                                            <span className="badge rounded-pill bg-danger">
                                              Low
                                            </span>
                                          ) : row.priority == 2 ? (
                                            <span className="badge rounded-pill bg-warning">
                                              Medium
                                            </span>
                                          ) : (
                                            <span className="badge rounded-pill bg-success">
                                              High
                                            </span>
                                          )}
                                        </td>

                                        <td>
                                          <td>
                                            {timeDifference(
                                              row?.SupportTicketMessages[
                                                row?.SupportTicketMessages
                                                  .length - 1
                                              ]?.updatedAt
                                            )}
                                          </td>
                                        </td>
                                        <td>{row.afterCharge}</td>
                                        <Link
                                          to={
                                            "/all-ticket-page-reply/" +
                                            row.UserId
                                          }
                                          state={{
                                            setid: row.id,
                                            supportticketsub: `[Ticket#${row.randomNo}]${row.subject}`,
                                          }}
                                        >
                                          <td>
                                            <FaDesktop
                                              onClick={() => {
                                                if (row.status == 3) {
                                                  updateStatus(
                                                    { status: 3 },
                                                    row.id
                                                  );
                                                } else {
                                                  updateStatus(
                                                    { status: 1 },
                                                    row.id
                                                  );
                                                }
                                              }}
                                              style={{
                                                color: "#393f70",
                                                borderRadius: 3,
                                                fontSize: 30,
                                              }}
                                            />
                                          </td>
                                        </Link>
                                      </tr>
                                    );
                                  })}
                            </tbody>
                          </Table>
                        </div>
                        <div className="tableBottomEntries">
                          <h6>
                            {filter == "Answered" ||
                            filter == "Pending" ||
                            (filter == "Closed") | (filter == "Opened") ? (
                              ""
                            ) : (
                              <p>
                                {" "}
                                Showing {(currentPage - 1) * limit + 1} to{" "}
                                {count > currentPage * limit
                                  ? currentPage * limit
                                  : count}{" "}
                                of {count} entries
                              </p>
                            )}
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
                                if (count > currentPage * limit) {
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
    </>
  );
}
