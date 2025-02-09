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
import ScrollToTop from "react-scroll-to-top";
// React bootstrap end

export default function UserDepositPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { tickets, fetchuserTransctionById, transactionById } = props;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { id } = useParams();
  const navigate = useNavigate();
  const [filteredDeposite, setFilteredDeposite] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchuserTransctionById(id);
  }, []);
  useEffect(() => {
    if (transactionById.deposit) {
      setSelected(transactionById.deposit);
    }
    if (selected.length === 0) {
      navigate("/all-users");
    }
  }, [id]);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentTransactions = transactionById?.deposit?.slice(
    startIndex,
    endIndex
  );
  const count = transactionById?.deposit?.length;
  const pageCount = Math.ceil(count / limit);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredDeposite(currentTransactions);
    } else {
      const filtered = currentTransactions.filter((item) =>
        item?.tansactionId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDeposite(filtered);
    }
  }, [searchTerm, transactionById, currentPage, limit]);

  return (
    <>
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
                <h1>User Deposits </h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">User Deposit </li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">User Deposit</h5>
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
                          <p>
                            Search : &nbsp;
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  type="text"
                                  placeholder="Transaction ID"
                                />{" "}
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
                                <th>S.No</th>
                                <th>
                                  Transactions Id{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Type <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Amount{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Currency{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Sender{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Receiver{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Transactions Type{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredDeposite &&
                              Array.isArray(filteredDeposite) &&
                              filteredDeposite.length > 0 ? (
                                filteredDeposite.map((row, i) => {
                                  return (
                                    <tr>
                                      {" "}
                                      <td>
                                        {(currentPage - 1) * limit + 1 + i}
                                      </td>
                                      <td>{row?.tansactionId}</td>
                                      <td>{row?.type}</td>
                                      <td>${row?.amount?.toLocaleString()}</td>
                                      <td>{row?.currency && "usd"}</td>
                                      <td>{row?.sender}</td>
                                      <td>{row?.receiver}</td>
                                      <td>{row?.transactionType}</td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <>
                                  <tr>
                                    <td align="center" colSpan={7}>
                                      Record not found
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </Table>
                        </div>
                        <div className="tableBottomEntries">
                          <h6>
                            Showing {(currentPage - 1) * limit + 1} to{" "}
                            {count > currentPage * limit
                              ? currentPage * limit
                              : count}{" "}
                            of {count} entries
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
                              {" "}
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
