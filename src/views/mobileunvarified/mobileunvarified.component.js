import React, { useEffect, useState } from "react";
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
import moment from "moment";
import ScrollToTop from "react-scroll-to-top";
// React bootstrap end
const useSortableData = (tickets, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...tickets];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {

        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tickets, sortConfig]);
  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  return { tickets: sortedItems, requestSort, sortConfig };
};
export default function MobileUnvarifiedPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const navigate = useNavigate();
  const { fetchBuyTicket, count } = props;
  const { tickets, requestSort, sortConfig } = useSortableData(props.tickets);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    fetchBuyTicket(
      {
        offset: (page - 1) * limit,
        limit: limit,
      },
      "mobile-unverified"
    );
  }, []);

  const definePage = (p) => {
    setPage(p);
    fetchBuyTicket(
      {
        offset: (p - 1) * limit,
        limit: limit,
      },
      "mobile-unverified"
    );
  };

  const defineLimit = (l) => {
    setLimit(l);
    fetchBuyTicket(
      {
        offset: (page - 1) * l,
        limit: l,
      },
      "mobile-unverified"
    );
  };

  const defineSearch = (s) => {
    setSearch(s);
    if (s.trim().length > 0) {
      fetchBuyTicket(
        {
          offset: (page - 1) * limit,
          limit: limit,
          search: s.trim(),
        },
        "mobile-unverified"
      );
    } else {
      fetchBuyTicket(
        {
          offset: (page - 1) * limit,
          limit: limit,
        },
        "mobile-unverified"
      );
    }
  };
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
                <h1>Mobile unverified users</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Mobile unverified users
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
                        <h5 className="card-title">Mobile unverified users</h5>
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
                          <p>
                            Search : &nbsp;
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) => defineSearch(e.target.value)}
                                  type="text"
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
                                <th onClick={() => requestSort("fname")}>
                                  User <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th onClick={() => requestSort("email")}>
                                  Email-Phone{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th onClick={() => requestSort("country")}>
                                  Country{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th onClick={() => requestSort("created_at")}>
                                  Joined At{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th onClick={() => requestSort("balance")}>
                                  Balance{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Action{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {tickets &&
                                Array.isArray(tickets) &&
                                tickets.map((row) => {
                                  return (
                                    <tr key={row.id}>
                                      <td>
                                        <p className="tableP">
                                          {row.fname
                                            ? row.fname.toUpperCase() +
                                              " " +
                                              row.lname.toUpperCase()
                                            : "-"}{" "}
                                        </p>
                                        {row.userName ? (
                                          <Link
                                            to={"/all-user-detail/" + row.id}
                                          >
                                            {" "}
                                            <p className="tableP">
                                              {row.userName}
                                            </p>
                                          </Link>
                                        ) : (
                                          ""
                                        )}
                                      </td>
                                      <td>
                                        <p className="tableP">
                                          {row.email ? row.email : "-"}
                                        </p>
                                        <p className="tableP">
                                          {row.mobileNo ? row.mobileNo : "-"}
                                        </p>
                                      </td>
                                      <td>
                                        <b>{row.country ? row.country : "-"}</b>
                                      </td>
                                      <td>
                                        <p className="tableP">
                                          {moment(row.createdAt).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                          )}
                                        </p>
                                        {/* <p className="tableP">1 day ago</p> */}
                                      </td>
                                      <td>
                                        <b>
                                          $
                                          {row.balance
                                            ? parseInt(
                                                row.balance
                                              ).toLocaleString()
                                            : 0.0}
                                        </b>
                                      </td>
                                      <td>
                                        <button
                                          onClick={() =>
                                            navigate(
                                              `/all-user-detail/${row.id}`
                                            )
                                          }
                                          className="btn btn-outline-dark mx-1 rounded-pill btn-sm"
                                        >
                                          Details
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
                            &nbsp;&nbsp;{" "}
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
