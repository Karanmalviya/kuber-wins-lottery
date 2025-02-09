import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
import CountDown from "../../component/CountDown";
import ScrollToTop from "react-scroll-to-top";

export default function GameReport(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    fetchGameReport,
    gameReport,
    scratchGameReport,
    fetchScratchGameReport,
    count,
    isLoading,
    subAdminById,
    fetchSubAdminById,
  } = props;
  const [limit, setLimit] = useState(10);
  const [limit2, setLimit2] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);

  useEffect(() => {
    fetchGameReport();
    fetchScratchGameReport();
  }, []);

  useEffect(() => {
    fetchSubAdminById(admin.id);
  }, []);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const definePage2 = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const filterByRoleLottery = gameReport?.some_ticket?.filter((item) =>
    admin.role === "sub-admin"
      ? item.roleId === admin.id || item.roleId === 0
      : item
  );
  const currentWinnerLogs = filterByRoleLottery?.slice(startIndex, endIndex);
  const winnerLogCount = filterByRoleLottery?.length;
  const pageCount = Math.ceil(winnerLogCount / limit);

  const startIndex2 = (currentPage - 1) * limit;
  const endIndex2 = startIndex + limit;

  const filterByRoleScratch = scratchGameReport?.Cards?.filter((item) =>
    admin.role === "sub-admin"
      ? item.roleId === admin.id || item.roleId === 0
      : item
  );
  const currentWinnerLogsScratchCard = filterByRoleScratch?.slice(
    startIndex2,
    endIndex2
  );
  const winnerLogCount2 = filterByRoleScratch?.length;
  const pageCount2 = Math.ceil(winnerLogCount / limit);

  useEffect(() => {
    if (
      subAdminById.role === "sub-admin" &&
      !Object.values(subAdminById.manage_lottery).some(
        (value) => value === true
      ) &&
      Object.values(subAdminById.manage_scratchCard).some(
        (value) => value === true
      )
    ) {
      const tabElement = document.getElementById("pills-profile-tab");
      if (tabElement) {
        tabElement.click();
      }
    }
  }, [subAdminById]);

  return (
    <>
      <Loader loading={isLoading} />
      <Container fluid className="containerFluMainDiv">
        <Row className="containerFluMainDivRow ">
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
                <h1>Games Report</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Game Report</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}
              <ul
                className="nav nav-pills mb-3 my-4 pb-2 border-bottom border-secondary"
                id="pills-tab"
                role="tablist"
                hidden={
                  admin.role === "sub-admin"
                    ? !(
                        subAdminById?.manage_scratchCard &&
                        Object.values(subAdminById.manage_scratchCard).some(
                          (value) => value === true
                        ) &&
                        subAdminById?.manage_lottery &&
                        Object.values(subAdminById.manage_lottery).some(
                          (value) => value === true
                        )
                      )
                    : false
                }
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active py-1 px-4"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Lottery Ticket Game
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link py-1 px-4"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Scratcher Game
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <section className="section dashboard">
                    <div className="row">
                      {/* Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Lotteries Created
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-ticket-perforated" />
                              </div>
                              <div className="ps-3">
                                <h6>{gameReport?.All_lottery}</h6>
                                <Link
                                  to={"/lotteries"}
                                  className={`btn btn-warning btn-v btn-sm px-2 py-0 mt-1 pull-end ${
                                    admin?.role === "sub-admin" &&
                                    !subAdminById?.manage_lottery?.lottery &&
                                    `disabled`
                                  }`}
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Tickets Sold
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-laptop" />
                              </div>
                              <div className="ps-3">
                                <h6>{gameReport?.totalSoldTickets}</h6>
                                <Link
                                  to={"/sold-tickets"}
                                  className={`btn btn-warning btn-v btn-sm px-2 py-0 mt-1 ${
                                    admin?.role === "sub-admin" &&
                                    !subAdminById?.manage_reports
                                      ?.sold_lottery &&
                                    `disabled`
                                  }`}
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Draws Happened
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-card-list" />
                              </div>
                              <div className="ps-3">
                                <h6>{gameReport?.totalDrawTickets}</h6>
                                {/* <a
                                  href="#"
                                  className="btn btn-warning btn-v btn-sm px-2 py-0"
                                >
                                  View
                                </a> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Winners Created
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-trophy" />
                              </div>
                              <div className="ps-3">
                                <h6>{gameReport?.totalWinnersCount}</h6>
                                <Link
                                  to={"/winner-history"}
                                  className={`btn btn-warning btn-v btn-sm px-2 py-0 ${
                                    admin?.role === "sub-admin" &&
                                    !subAdminById?.manage_reports
                                      ?.lottery_winners &&
                                    `disabled`
                                  }`}
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Sold Amount
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-cart" />
                              </div>
                              <div className="ps-3">
                                <h6>
                                  $
                                  {gameReport?.totalSalesAmount?.toLocaleString()}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Win Amount
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-cash-coin" />
                              </div>
                              <div className="ps-3">
                                <h6>
                                  ${gameReport?.totalWinSum?.toLocaleString()}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Gross Revenue
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-bar-chart-line-fill" />
                              </div>
                              <div className="ps-3">
                                <h6>
                                  ${gameReport?.totalRevenue?.toLocaleString()}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Net Revenue
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-pie-chart-fill" />
                              </div>
                              <div className="ps-3">
                                <h6>
                                  ${gameReport?.totalRevenue?.toLocaleString()}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card rounded-pill border border-secondary pb-0 info-card sales-card mb-3">
                          <div className="card-body py-0">
                            <div className="row">
                              <div className="col-lg-4  col-md-4 col-sm-4 py-2 border-end border-secondary">
                                <p className="p-0 m-0">Most Earning Lottery</p>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm-4 py-2 border-end border-secondary">
                                <p className="p-0 m-0">Five Hour lotto</p>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm-4 py-2">
                                <p className="p-0 m-0">0</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="section">
                    <Row className="row">
                      <Col lg={12}>
                        <Card className="card">
                          <Card.Body className="card-body">
                            <h5 className="card-title">
                              Lottery Ticket Winners
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
                            </div>

                            <div className="table-responsive">
                              <Table
                                id="basic-6"
                                className="display tbl-ltr lotteriesTable"
                              >
                                <thead className="lotteriesTableHead">
                                  <tr className="tableTd">
                                    <th>
                                      S.No{" "}
                                      <BsArrowDownUp className="updownArrow" />
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
                                      Tickets Sold{" "}
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                    <th>
                                      Total Won
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                    <th>
                                      Total Draws
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                    <th>
                                      Total Winners{" "}
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>{" "}
                                    <th>
                                      Frequency{" "}
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>{" "}
                                    <th>
                                      Next Draw{" "}
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                    <th>
                                      Details{" "}
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currentWinnerLogs &&
                                    currentWinnerLogs.map((item, i) => (
                                      <tr>
                                        <td>{i + 1}</td>
                                        <td>
                                          <img src={item.image} />
                                        </td>
                                        <td>{item.gameName}</td>
                                        <td>{item.sold}</td>
                                        <td>
                                          ${item?.winnersSum?.toLocaleString()}
                                        </td>
                                        <td>{item.totalDraw}</td>
                                        <td>{item.winnersLength}</td>
                                        <td>
                                          {item.gameData &&
                                            (() => {
                                              const frequencyLabels = {
                                                1: "Daily",
                                                2: "Weekly",
                                                3: "Monthly",
                                              };

                                              const uniqueFrequencies = [];
                                              JSON.parse(item.gameData).forEach(
                                                (o) => {
                                                  const frequencyLabel =
                                                    frequencyLabels[
                                                      o.frequency
                                                    ];
                                                  if (
                                                    frequencyLabel &&
                                                    !uniqueFrequencies.includes(
                                                      frequencyLabel
                                                    )
                                                  ) {
                                                    uniqueFrequencies.push(
                                                      frequencyLabel
                                                    );
                                                  }
                                                }
                                              );

                                              return uniqueFrequencies.join(
                                                ", "
                                              );
                                            })()}{" "}
                                        </td>
                                        <td>
                                          <button className="btn btn-outline-secondary rounded-pill btn-sm">
                                            <CountDown
                                              props={{
                                                type: "ticket",
                                                dateTime:
                                                  item?.gameDuration +
                                                  " " +
                                                  item?.startTime,
                                              }}
                                            />
                                          </button>
                                        </td>{" "}
                                        <td>
                                          <button
                                            disabled={
                                              admin?.role === "sub-admin" &&
                                              !subAdminById?.manage_lottery
                                                ?.lottery
                                                ? true
                                                : false
                                            }
                                            className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                                            onClick={() =>
                                              navigate(
                                                "/view-lotteries/" + item.id
                                              )
                                            }
                                          >
                                            Details
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </Table>
                            </div>
                            <div className="tableBottomEntries">
                              <h6>
                                <p>
                                  {" "}
                                  Showing {(currentPage - 1) * limit +
                                    1} to{" "}
                                  {winnerLogCount > currentPage * limit
                                    ? currentPage * limit
                                    : winnerLogCount}{" "}
                                  of {winnerLogCount} entries
                                </p>
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
                                    winnerLogCount > currentPage * limit
                                      ? { cursor: "pointer" }
                                      : {}
                                  }
                                  onClick={() => {
                                    if (winnerLogCount > currentPage * limit) {
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
                </div>
                {/* tab 2 start here */}
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <section className="section dashboard">
                    <div className="row">
                      {/* Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Card Created
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-ticket-perforated" />
                              </div>
                              <div className="ps-3">
                                <h6>{scratchGameReport?.total_card_count}</h6>
                                <Link
                                  to={"/scratch-list"}
                                  className={`btn btn-warning btn-v btn-sm px-2 py-0 mt-1 pull-end ${
                                    admin?.role === "sub-admin" &&
                                    !subAdminById?.manage_scratchCard
                                      ?.scratchCard &&
                                    `disabled`
                                  }`}
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Scratch Card Sold
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-laptop" />
                              </div>
                              <div className="ps-3">
                                <h6>
                                  {scratchGameReport?.totalSoldCard?.toLocaleString()}
                                </h6>
                                <Link
                                  to={"/sold-scratch-cards"}
                                  className={`btn btn-warning btn-v btn-sm px-2 py-0 mt-1 ${
                                    admin?.role === "sub-admin" &&
                                    !subAdminById?.manage_reports
                                      ?.sold_scratchCard &&
                                    `disabled`
                                  }`}
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Draws Happened
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-card-list" />
                              </div>
                              <div className="ps-3">
                                <h6>{scratchGameReport?.totalDrawCard}</h6>
                                {/* <a
                                  href="#"
                                  className="btn btn-warning btn-v btn-sm px-2 py-0"
                                >
                                  View
                                </a> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Winners Created
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-trophy" />
                              </div>
                              <div className="ps-3">
                                <h6>
                                  {scratchGameReport?.total_card_win_count}
                                </h6>
                                <Link
                                  to={"/scratch-cards-winner"}
                                  className={`btn btn-warning btn-v btn-sm px-2 py-0 ${
                                    admin?.role === "sub-admin" &&
                                    !subAdminById?.manage_reports
                                      ?.scratchCard_winners &&
                                    `disabled`
                                  }`}
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Sold Amount
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-cart" />
                              </div>
                              <div className="ps-3">
                                <h6>
                                  $
                                  {scratchGameReport?.totalSumOfPurchaseCardPrices?.toLocaleString()}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Win Amount
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-cash-coin" />
                              </div>
                              <div className="ps-3">
                                <h6>
                                  $
                                  {scratchGameReport?.totalSumOfWonCardPrices?.toLocaleString()}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Gross Revenue
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-bar-chart-line-fill" />
                              </div>
                              <div className="ps-3">
                                <h6>
                                  $
                                  {scratchGameReport?.totalNetRevenue?.toLocaleString()}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                      <div className="col-lg-3">
                        <div className="card info-card-n sales-card mb-3">
                          <div className="card-body py-0">
                            <h5 className="card-title pt-2 pb-0">
                              Total Net Revenue
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-pie-chart-fill" />
                              </div>
                              <div className="ps-3">
                                <h6>
                                  $
                                  {scratchGameReport?.totalNetRevenue?.toLocaleString()}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Sales Card */}
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card rounded-pill border border-secondary pb-0 info-card sales-card mb-3">
                          <div className="card-body py-0">
                            <div className="row">
                              <div className="col-lg-4 py-2 border-end border-secondary">
                                <h5 className="p-0 m-0">
                                  Most Earning Lottery
                                </h5>
                              </div>
                              <div className="col-lg-4 py-2 border-end border-secondary">
                                <h5 className="p-0 m-0">Five Hour lotto</h5>
                              </div>
                              <div className="col-lg-4 py-2">
                                <h5 className="p-0 m-0">0</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="section">
                    <Row className="row">
                      <Col lg={12}>
                        <Card className="card">
                          <Card.Body className="card-body">
                            <h5 className="card-title">Scratch Card Winners</h5>
                            <div className="showentriesDiv">
                              <h6>
                                Show &nbsp;{" "}
                                <DropdownButton
                                  variant="outline-dark"
                                  id="dropdown-basic-button"
                                  title={limit2}
                                >
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setLimit2(10);
                                      setCurrentPage2(1);
                                    }}
                                  >
                                    10
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setLimit2(25);
                                      setCurrentPage2(1);
                                    }}
                                  >
                                    25
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setLimit2(50);
                                      setCurrentPage2(1);
                                    }}
                                  >
                                    50
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setLimit2(100);
                                      setCurrentPage2(1);
                                    }}
                                  >
                                    100
                                  </Dropdown.Item>
                                </DropdownButton>{" "}
                                &nbsp;entries
                              </h6>
                            </div>

                            <div className="table-responsive">
                              <Table
                                id="basic-6"
                                className="display tbl-ltr lotteriesTable"
                              >
                                <thead className="lotteriesTableHead">
                                  <tr className="tableTd">
                                    <th>
                                      S.No
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                    <th>
                                      Image
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                    <th>
                                      Scratch Card Name
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                    <th>
                                      Total Sold{" "}
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                    <th>
                                      Total Won
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                    <th>
                                      Total Reschedule{" "}
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                    <th>
                                      Total Winners{" "}
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>{" "}
                                    <th>
                                      Frequency{" "}
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>{" "}
                                    <th>
                                      Details{" "}
                                      <BsArrowDownUp className="updownArrow" />
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currentWinnerLogsScratchCard &&
                                    currentWinnerLogsScratchCard.map(
                                      (item, i) => (
                                        <tr>
                                          <td>{i + 1}</td>
                                          <td>
                                            <img src={item.image} />
                                          </td>
                                          <td>{item.card_name}</td>
                                          <td>{item.scratchDrawCount}</td>
                                          <td>
                                            $
                                            {item.totalAmount?.toLocaleString()}
                                          </td>
                                          <td>{item.rescheduleTime}</td>
                                          <td>{item.winnerCount}</td>
                                          <td>
                                            {" "}
                                            {(() => {
                                              try {
                                                const parsedData = JSON.parse(
                                                  item?.frequency
                                                );
                                                return parsedData?.[0]
                                                  .frequency;
                                              } catch (error) {}
                                            })()}
                                          </td>

                                          <td>
                                            {" "}
                                            <button
                                              disabled={
                                                admin?.role === "sub-admin" &&
                                                !subAdminById
                                                  ?.manage_scratchCard
                                                  ?.scratchCard
                                                  ? true
                                                  : false
                                              }
                                              className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                                              onClick={() =>
                                                navigate(
                                                  "/view-scratch/" + item.id
                                                )
                                              }
                                            >
                                              Details
                                            </button>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                </tbody>
                              </Table>
                            </div>
                            <div className="tableBottomEntries">
                              <h6>
                                <p>
                                  {" "}
                                  Showing {(currentPage2 - 1) * limit2 +
                                    1} to{" "}
                                  {winnerLogCount2 > currentPage2 * limit2
                                    ? currentPage2 * limit2
                                    : winnerLogCount2}{" "}
                                  of {winnerLogCount2} entries
                                </p>
                              </h6>
                              <p>
                                <span
                                  style={
                                    currentPage2 > 1
                                      ? { cursor: "pointer" }
                                      : {}
                                  }
                                  onClick={() => {
                                    if (currentPage2 > 1) {
                                      definePage2(currentPage2 - 1);
                                    }
                                  }}
                                >
                                  Previous
                                </span>
                                &nbsp;&nbsp;
                                <Button variant="outline-dark">
                                  {currentPage2}
                                </Button>
                                &nbsp;&nbsp;
                                <span
                                  style={
                                    winnerLogCount2 > currentPage2 * limit2
                                      ? { cursor: "pointer" }
                                      : {}
                                  }
                                  onClick={() => {
                                    if (
                                      winnerLogCount2 >
                                      currentPage2 * limit2
                                    ) {
                                      definePage2(currentPage2 + 1);
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
                </div>
              </div>
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
