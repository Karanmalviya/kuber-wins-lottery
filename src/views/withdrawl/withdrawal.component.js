import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import Loader from "../../component/Loader";
import ScrollToTop from "react-scroll-to-top";
import moment from "moment";

export default function Withdrawals(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  const navigate = useNavigate();
  const { withdrawal, fetchwithdrawal, isLoading, fetchSubAdminById } = props;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchwithdrawal({
      offset: (page - 1) * limit,
      limit: limit,
    });
    admin.role === "sub-admin" && fetchSubAdminById(admin.id);
  }, []);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const filterByRole = withdrawal?.filter((item) =>
    admin.role === "sub-admin"
      ? item.roleId === admin.id || item.roleId === 0
      : item
  );

  const currentTransactions = filterByRole.slice(startIndex, endIndex);
  const count = filterByRole.length;
  const pageCount = Math.ceil(count / limit);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTransactions(currentTransactions);
    } else {
      const filtered = currentTransactions.filter(
        (withdraws) =>
          withdraws?.tansactionId
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          withdraws?.Email?.toLowerCase().includes(
            searchTerm.trim().toLowerCase()
          ) ||
          `${withdraws?.User?.fname} ${withdraws?.User?.lname}`
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  }, [searchTerm, withdrawal, currentPage, limit]);

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
                <h1>WithDrawals</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">WithDrawals</li>
                  </ol>
                </nav>
              </div>

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">All Withdrawals</h5>
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
                            Filter &nbsp;{" "}
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
                                  setFilter("Approved");
                                }}
                              >
                                Approved
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFilter("Rejected");
                                }}
                              >
                                Rejected
                              </Dropdown.Item>
                            </DropdownButton>{" "}
                          </h6>

                          <p>
                            Search : &nbsp;
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  type="text"
                                  placeholder="Transaction ID, Username"
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
                                  Transaction Id{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Initiated Date{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Amount{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Approved/Rejected By{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Status{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Action{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredTransactions.length > 0 &&
                              Array.isArray(filteredTransactions) ? (
                                filteredTransactions
                                  .filter((row) => {
                                    if (filter == "All") {
                                      return true;
                                    } else if (filter === "Pending") {
                                      return row.status === 0;
                                    } else if (filter === "Approved") {
                                      return row.status === 1;
                                    } else if (filter === "Rejected") {
                                      return row.status === 2;
                                    }
                                  })
                                  .map((row, i) => {
                                    return (
                                      <tr key={row.id} className="tableTd">
                                        <td>
                                          {(currentPage - 1) * limit + 1 + i}
                                        </td>
                                        <td>
                                          <span>
                                            {row?.User?.fname}{" "}
                                            {row?.User?.lname}
                                          </span>
                                          <br />
                                          <span className="text-muted">
                                            {row?.User?.email}
                                          </span>
                                        </td>
                                        <td>
                                          {row?.status
                                            ? row?.status === 2
                                              ? "Withdrawal Rejected"
                                              : row?.status === 0
                                              ? "Pending"
                                              : row?.tansactionId
                                            : "Pending"}
                                        </td>
                                        <td>
                                          {moment(row?.createdAt).format(
                                            "DD/MM/YYYY hh:mm:ss A"
                                          )}
                                        </td>

                                        <td>
                                          ${row?.Amount?.toLocaleString()}
                                        </td>
                                        <td>
                                          {row.status
                                            ? row.roleId
                                              ? row?.SubAdmin?.firstName +
                                                " " +
                                                row?.SubAdmin?.lastName
                                              : "Super Admin"
                                            : "N/A"}
                                          {/* {row?.SubAdmin?.firstName}{" "}
                                          {row?.SubAdmin?.lastName} */}
                                        </td>
                                        <td>
                                          {row.status == 0 ? (
                                            <span className="badge rounded-pill bg-primary                            ">
                                              Pending
                                            </span>
                                          ) : row.status == 1 ? (
                                            <span className="badge rounded-pill bg-success">
                                              Approved
                                            </span>
                                          ) : (
                                            <span className="badge rounded-pill bg-danger">
                                              Rejected
                                            </span>
                                          )}
                                        </td>
                                        <td>
                                          <button
                                            onClick={() => {
                                              navigate(`/withdrawals-details`, {
                                                state: {
                                                  withdrawId: row.id,
                                                  withdrawUserId: row.UserId,
                                                },
                                              });
                                            }}
                                            className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                                          >
                                            Details
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })
                              ) : (
                                <tr>
                                  <td colSpan={7} className="text-center">
                                    No results found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                        <div className="tableBottomEntries">
                          <h6>
                            {searchTerm ||
                            filter == "Approved" ||
                            filter == "Pending" ||
                            filter == "Rejected" ? (
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
