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

export default function UserWithDrawPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { transactionById, fetchUserwithdrawal, userwithdrawal } = props;
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserwithdrawal(id);
    setSelected(userwithdrawal.Withdrawals);
    if (selected.length === 0) {
      navigate("/all-users");
    }
  }, [id]);
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
                <h1>User Withdrawals </h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      User Withdrawals{" "}
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
                        <h5 className="card-title">User Withdrawals</h5>
                        <div className="showentriesDiv">
                          <h6>
                            Show &nbsp;{" "}
                            <DropdownButton
                              variant="outline-dark"
                              id="dropdown-basic-button"
                              title="10"
                            >
                              <Dropdown.Item variant href="#/action-1">
                                10
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">
                                25
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                50
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                1000
                              </Dropdown.Item>
                            </DropdownButton>{" "}
                            &nbsp;entries
                          </h6>
                          <p>
                            Search : &nbsp;
                            <Form>
                              <Form.Group>
                                <Form.Control type="text" />
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
                                  UserName{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
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
                                {/* <th>
                                  Sender{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th> */}
                                <th>
                                  Account Holder Name{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                {/* <th>
                                  Transactions Type{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th> */}
                                <th>
                                  Date & Time{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {selected &&
                              Array.isArray(selected) &&
                              selected.length > 0 ? (
                                selected.map((row) => {
                                  return (
                                    <tr>
                                      <td>
                                        <p className="m-0 p-0">
                                          {transactionById?.fname}{" "}
                                          {transactionById?.lname}
                                        </p>
                                        <Link
                                          state={{
                                            withdrawId: row.id,
                                            withdrawUserId: id,
                                          }}
                                          to={"/withdrawals-details"}
                                          className="m-0 p-0"
                                        >
                                          {transactionById?.email}
                                        </Link>
                                      </td>
                                      <td>{row.tansactionId}</td>
                                      <td>{row.Type_of_account}</td>
                                      <td>Rs.{row.Amount}</td>
                                      <td>USD</td>
                                      <td>{row.Account_Holder_Name}</td>
                                      {/* <td>{row.transactionType}</td> */}
                                      <td>
                                        {new Date(
                                          row.createdAt
                                        ).toLocaleString()}
                                      </td>
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
                            Showing {(page - 1) * limit + 1} to{" "}
                            {count > page * limit ? page * limit : count} of{" "}
                            {count} entries
                          </h6>
                          <p>
                            <span>Previous</span>&nbsp;&nbsp;
                            <Button variant="outline-dark">1</Button>
                            &nbsp;&nbsp;<span>Next</span>&nbsp;&nbsp;
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
