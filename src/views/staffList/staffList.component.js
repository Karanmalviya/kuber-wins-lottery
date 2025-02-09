import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// page imports start
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
// page imports end

// local img import start
import scratchcards2 from "./../../assets/img/scratch-cards/scratchcards2.jpg";
import scratchcards3 from "./../../assets/img/scratch-cards/scratchcards3.jpg";
// local img import end

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
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";

export default function StaffListPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const navigate = useNavigate();
  const { count, isLoading, fetchSubAdmin, updateSubAdmin, subAdmin } = props;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSudAdmin, setFilteredSudAdmin] = useState([]);
  const [statusChange, setStatusChange] = useState([]);

  useEffect(() => {
    fetchSubAdmin();
  }, [statusChange]);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentSubAdmin = subAdmin.slice(startIndex, endIndex);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredSudAdmin(currentSubAdmin);
    } else {
      const filtered = currentSubAdmin.filter(
        (item) =>
          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${item?.firstName} ${item?.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredSudAdmin(filtered);
    }
  }, [searchTerm, subAdmin, currentPage, limit]);

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
                <h1>Staff List</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Staff List</li>
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
                          All Staff List
                          <Link
                            to="/add-staff"
                            className="btn btn-outline-dark btn-sm float-end"
                          >
                            Add New
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
                          <div className="d-flex align-items-center">
                            Search :&nbsp;
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  type="text"
                                />
                              </Form.Group>
                            </Form>
                          </div>
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
                                  S.N. <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Name <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Email{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>

                                <th>
                                  Status{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th className="text-center">
                                  Action
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredSudAdmin &&
                                Array.isArray(filteredSudAdmin) &&
                                filteredSudAdmin?.map((row, index) => {
                                  return (
                                    <tr key={row?.id}>
                                      <td>
                                        {(currentPage - 1) * limit + 1 + index}
                                      </td>
                                      <td>
                                        {row?.firstName} {row?.lastName}
                                      </td>
                                      <td>{row?.email}</td>
                                      <td className="text-center">
                                        {row?.status == 1 ? (
                                          <span className="badge rounded-pill bg-success">
                                            Active
                                          </span>
                                        ) : (
                                          <span className="badge rounded-pill bg-danger">
                                            Inactive
                                          </span>
                                        )}
                                      </td>
                                      <td className="text-center">
                                        {row?.status == 0 ? (
                                          <button
                                            onClick={async () => {
                                              const res = updateSubAdmin({
                                                status: 1,
                                                id: row.id,
                                              });
                                              res?.then((resolvedValue) => {
                                                setStatusChange(resolvedValue);
                                              });
                                            }}
                                            className="btn btn-outline-success mx-1 rounded-pill btn-sm"
                                          >
                                            Active
                                          </button>
                                        ) : (
                                          <button
                                            onClick={async () => {
                                              const res = updateSubAdmin({
                                                status: 0,
                                                id: row.id,
                                              });
                                              res.then((resolvedValue) => {
                                                setStatusChange(resolvedValue);
                                              });
                                            }}
                                            className="btn btn-outline-danger mx-1 rounded-pill btn-sm"
                                          >
                                            Inactive
                                          </button>
                                        )}
                                        <button
                                          className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                                          onClick={() =>
                                            navigate(`/add-staff/${row.id}`)
                                          }
                                        >
                                          Edit
                                        </button>
                                        {/* <button
                                          onClick={() =>
                                            navigate(`/view-staf/${row.id}`)
                                          }
                                          className="btn btn-outline-dark mx-1 rounded-pill btn-sm"
                                        >
                                          View
                                        </button> */}
                                        {/* <button
                                          onClick={() => handeDelete(row.id)}
                                          className="btn btn-outline-danger mx-1 rounded-pill btn-sm"
                                        >
                                          Delete
                                        </button> */}
                                      </td>
                                    </tr>
                                  );
                                })}
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
                          <div>
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
                            <Button variant="outline-dark">{page}</Button>
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
                          </div>
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
