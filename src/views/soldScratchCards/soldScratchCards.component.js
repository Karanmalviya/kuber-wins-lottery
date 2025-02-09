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
import moment from "moment";
import ScrollToTop from "react-scroll-to-top";

export default function SoldScratchCards(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const navigate = useNavigate();
  const { fetchScratchCardSold, soldscratch, count, isLoading } = props;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSoldTicket, setFilteredSoldTicket] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchScratchCardSold();
  }, []);
  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const soldTicketFilter = soldscratch.slice(startIndex, endIndex);
  const soldTicketCount = soldscratch.length;
  const pageCount = Math.ceil(soldTicketCount / limit);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredSoldTicket(soldTicketFilter);
    } else {
      const filter = soldTicketFilter.filter(
        (ticket) =>
          ticket?.scratchCard?.card_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          ticket?.User?.email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          ticket?.User?.userName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          ticket?.User?.fname?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSoldTicket(filter);
    }
  }, [searchTerm, soldscratch, currentPage, limit]);

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
                <h1>Sold Scratch Cards</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Sold Scratch Cards
                    </li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title"> Sold Scratch Cards</h5>
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
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  type="text"
                                  placeholder="Scratch Name, Username, Name"
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
                                  UserName{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Scratch Card Name{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Total Plays{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Total Amount{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Date & Time{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredSoldTicket &&
                                Array.isArray(filteredSoldTicket) &&
                                filteredSoldTicket.map((row, i) => {
                                  return (
                                    <tr key={row.id} className="tableTd">
                                      <td>
                                        {(currentPage - 1) * limit + 1 + i}
                                      </td>
                                      <td>
                                        <div>{row?.User?.userName}</div>
                                        <Link
                                          className="text-primary"
                                          to={`/all-user-detail/${row.id}`}
                                        >
                                          {row?.User?.email}
                                        </Link>
                                      </td>
                                      <td>{row?.scratchCard?.card_name}</td>
                                      <td>{row?.scratchDrawCount}</td>
                                      <td>
                                        ${row?.totalPrice.toLocaleString()}
                                      </td>
                                      <td>
                                        {" "}
                                        {moment(row.updatedAt).format(
                                          "MMMM Do YYYY, h:mm:ss a"
                                        )}{" "}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </div>
                        <div className="tableBottomEntries">
                          <h6>
                            {!searchTerm && (
                              <p>
                                {" "}
                                Showing {(currentPage - 1) * limit + 1} to{" "}
                                {soldTicketCount > currentPage * limit
                                  ? currentPage * limit
                                  : soldTicketCount}{" "}
                                of {soldTicketCount} entries
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
                                soldTicketCount > currentPage * limit
                                  ? { cursor: "pointer" }
                                  : {}
                              }
                              onClick={() => {
                                if (soldTicketCount > currentPage * limit) {
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
