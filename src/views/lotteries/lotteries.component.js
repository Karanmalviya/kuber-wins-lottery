import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
// React bootstrap end
import Loader from "./../../component/Loader";
import ScrollToTop from "react-scroll-to-top";

export default function LotteriesPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  const navigate = useNavigate();
  const { fetchlottery, lotteries, updatelottery, isLoading } = props;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [lotterPagination, setLotteryPagination] = useState([]);

  useEffect(() => {
    fetchlottery();
  }, []);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (lotteries) {
      const filteredLotteryByRole = lotteries?.filter((item) => {
        if (admin.role === "sub-admin") {
          return item.roleId === admin.id || item.roleId === 0;
        }
        return true;
      });
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;
      const currentLottery = filteredLotteryByRole.slice(startIndex, endIndex);
      setLotteryPagination(currentLottery);
    }
  }, [lotteries]);

  const count = lotterPagination.length;

  async function updateStatusCron(data, val) {
    data.forEach((items) => {
      let gameDuration = new Date(items.gameDuration);
      let currentDate = new Date();
      let statusVal = val;
      if (gameDuration >= currentDate) {
        statusVal = 1;
      } else {
        statusVal = 0;
      }
      const statusData = { status: statusVal, id: items.id };
      updatelottery(statusData);
    });

    setTimeout(() => {
      fetchlottery();
      window.location.reload(false);
    }, 1000);
    navigate("/lotteries");
  }

  async function updateStatus(data, val) {
    const statusData = { status: val, id: data.id };
    updatelottery(statusData);

    setTimeout(() => {
      fetchlottery();
    }, 1000);
  }

  useEffect(() => {
    if (searchTerm) {
      const filtered = lotterPagination.filter((item) =>
        item.gameName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSelected(filtered);
    } else {
      setSelected(lotterPagination);
    }
  }, [lotterPagination, searchTerm]);

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
                <h1>Lotteries</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Lotteries</li>
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
                          All Lotteries
                          <Link
                            to="/lottery"
                            className="btn btn-outline-dark btn-sm float-end"
                          >
                            Add New
                          </Link>
                          {/* {lotteries && Array.isArray(lotteries) ? (
                            <button
                              onClick={() => updateStatusCron(lotteries, 0)}
                              className="btn btn-outline-dark btn-sm float-end"
                            >
                              Check lottery expiration
                            </button>
                          ) : (
                            ""
                          )} */}
                        </h5>
                        <div className="showentriesDiv">
                          <h6>
                            Show &nbsp;{" "}
                            <DropdownButton
                              variant="outline-dark"
                              id="dropdown-basic-button"
                              title={limit}
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
                            Search : &nbsp;
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  type="text"
                                  placeholder="Lottery Name"
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
                                  Image{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Lottery Name{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Price{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>{" "}
                                <th>
                                  Lottery Type{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Created By{" "}
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
                              {selected &&
                                Array.isArray(selected) &&
                                selected.map((row, i) => {
                                  return (
                                    <tr key={row.id} className="tableTd">
                                      <td>{i + 1}</td>
                                      <td>
                                        <img
                                          alt=""
                                          src={row?.image}
                                          className="img-fluid lotteriesImg"
                                        />
                                      </td>
                                      <td>{row?.gameName}</td>
                                      <td>
                                        Rs.{(+row?.ticketPrice).toLocaleString()}
                                      </td>{" "}
                                      <td className="text-capitalize">
                                        {row?.draw?.replace("-", " ")}
                                      </td>
                                      <td>
                                        {row?.roleId
                                          ? row?.SubAdmin?.firstName +
                                            " " +
                                            row?.SubAdmin?.lastName
                                          : "Super Admin"}
                                      </td>
                                      <td>
                                        {row.status == 0 ? (
                                          <span className="badge rounded-pill bg-danger">
                                            Inactive
                                          </span>
                                        ) : (
                                          <span className="badge rounded-pill bg-success">
                                            Active
                                          </span>
                                        )}
                                      </td>
                                      <td>
                                        {row.status == 0 ? (
                                          <button
                                            onClick={() => updateStatus(row, 1)}
                                            className="btn btn-outline-success mx-1 rounded-pill btn-sm"
                                          >
                                            Active
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => updateStatus(row, 0)}
                                            className="btn btn-outline-danger mx-1 rounded-pill btn-sm"
                                          >
                                            Inactive
                                          </button>
                                        )}

                                        <button
                                          onClick={() =>
                                            navigate(`/add-lotteries/${row.id}`)
                                          }
                                          className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            navigate(
                                              `/view-lotteries/${row.id}`
                                            )
                                          }
                                          className="btn btn-outline-dark mx-1 rounded-pill btn-sm"
                                        >
                                          View
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
                              {currentPage}
                            </Button>{" "}
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
