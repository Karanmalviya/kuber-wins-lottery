import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowDownUp } from "react-icons/bs";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Loader from "../../component/Loader";
import ScrollToTop from "react-scroll-to-top";

export default function BankAccountsPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const { isLoading, bankAccounts, fetchBankAccount, updateBankAccount } =
    props;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    fetchBankAccount({
      page: page,
      pageSize: limit,
      search: search.trim(),
    });
  }, [page, limit, search, isUpdate]);

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

  const count = bankAccounts?.totalRecords || 0;

  async function updateStatus(data, val) {
    const statusData = {
      status: val,
      id: data.id,
      account_number: data.account_number,
      upi_id: data.upi_id,
    };
    updateBankAccount(statusData);
    setIsUpdate(!isUpdate);
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
                <h1>Bank Accounts</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Bank Accounts</li>
                  </ol>
                </nav>
              </div>
              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">
                          All Bank Accounts
                          <Link
                            to="/add-bank-account"
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
                                  placeholder="Account Number"
                                  value={search}
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
                                  Bank Name{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Account Holder Name{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>{" "}
                                <th>
                                  IFSC Code{" "}
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
                              {bankAccounts?.data &&
                                Array.isArray(bankAccounts?.data) &&
                                bankAccounts?.data.map((row, i) => {
                                  return (
                                    <tr key={row.id} className="tableTd">
                                      <td>{i + 1}</td>
                                      <td>{row?.bank_name}</td>
                                      <td>{row?.account_holder_name}</td>{" "}
                                      <td className="text-capitalize">
                                        {row?.ifsc_code}
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
                                            navigate(`/bank-accounts/${row.id}`)
                                          }
                                          className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                                        >
                                          Edit
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
