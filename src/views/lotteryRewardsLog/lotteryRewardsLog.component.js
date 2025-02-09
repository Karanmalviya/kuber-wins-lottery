import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

// page imports start
import {HeaderPageContainer} from "./../../component/header/header.container";
import {SidebarPageContainer} from "./../../component/sidebar/sidebar.container";
import {FooterPageContainer} from "./../../component/footer/footer.container";
// page imports end

// React bootstrap start
import {Container, Row, Col, Button} from "react-bootstrap";
import {BsArrowDownUp} from "react-icons/bs";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ScrollToTop from "react-scroll-to-top";
import Loader from "../../component/Loader";
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
export default function LotteryRewardsLogPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();
  const {fetchAllLotteryRewards, count, isLoading, lotteryRewardsAll} = props;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  console.log(lotteryRewardsAll);
  useEffect(() => {
    fetchAllLotteryRewards({
      page: page,
      pageSize: limit,
    });
  }, [page, limit]);

  const definePage = (p) => {
    setPage(p);
  };

  const defineLimit = (l) => {
    setLimit(l);
    setPage(1);
  };

  const defineSearch = (s) => {
    setPage(1);
  };

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
                <h1>Lottery Rewards Log</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Lottery Rewards</li>
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
                          Lottery Rewards
                          <Link
                            to="/deposit-commission"
                            className="btn btn-outline-primary btn-lg-3 ms-2 float-end"
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
                            className={
                              location.pathname === "/Win-commission"
                                ? "btn btn-outline-primary btn-lg-3 ms-2 float-end active"
                                : "btn btn-outline-primary btn-lg-3 ms-2 float-end"
                            }
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
                                  Lottery{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Tickets Earned{" "}
                                  <BsArrowDownUp className="updownArrow" />
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
                              {lotteryRewardsAll?.data?.length > 0 ? (
                                lotteryRewardsAll?.data?.map((row, i) => {
                                  return (
                                    <tr key={row.id} className="tableTd">
                                      <td>{(page - 1) * limit + 1 + i}</td>
                                      <td>
                                        {row?.User?.fname} {row?.User?.lname}
                                        <br></br>
                                        <Link
                                          to={`/all-user-detail/${row?.UserId}`}
                                        >
                                          <span className="text-primary">
                                            {row?.User?.username}
                                          </span>{" "}
                                        </Link>
                                      </td>
                                      <td>
                                        <DateComponent date={row?.updatedAt} />
                                      </td>

                                      <td>{row?.gameInformation?.gameName}</td>
                                      <td>{row?.free_tickets}</td>
                                      <td>{row?.level}</td>
                                      <td>Level {row?.level} Win commission</td>
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
                            Showing {(page - 1) * limit + 1} to{" "}
                            {count > page * limit ? page * limit : count} of{" "}
                            {count} entries
                          </h6>
                          <p>
                            <span
                              style={page > 1 ? {cursor: "pointer"} : {}}
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
                                count > page * limit ? {cursor: "pointer"} : {}
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
