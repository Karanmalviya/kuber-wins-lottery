import React from "react";

// local pages import start
import { HeaderPageContainer } from "./../../component/header/header.container";
import { SidebarPageContainer } from "./../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "./../../component/footer/footer.container";
// local pages import end

// react bootstrap start
import { Container, Row, Col } from "react-bootstrap";
import { BsArrowUpShort } from "react-icons/bs";
import { useEffect, useRef } from "react";
// react bootstrap end
import * as echarts from "echarts";
import ApexCharts from "apexcharts";
import { useState } from "react";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import { confirmAlert } from "react-confirm-alert";
import "../../style/reactConfirm.css";

export default function DashboardPage({
  fetchuser,
  user,
  count,
  transaction,
  fetchuserTransction,
  withdrawal,
  fetchwithdrawal,
  fetchwinnerTicket,
  winners,
  fetchsoldTicket,
  soldticket,
  allUserLoginLogs,
  loginLogs,
  count_all,
  scratchcard,
  fetchScratchCard,
  updateTermsAndCondition,
}) {
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const [trafficChart, setTrafficChart] = useState([]);
  const [apexChart1, setApexChart1] = useState({});
  const [apexChart2, setApexChart2] = useState({});
  const [browserFilter, setBrowserFilter] = useState("");
  const [osFilter, setOsFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [totalScratchPayout, setTotalScratchPayout] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    fetchuser();
    fetchwithdrawal();
    fetchwinnerTicket();
    fetchsoldTicket();
    allUserLoginLogs();
    fetchuserTransction();
    fetchScratchCard();
  }, []);

  useEffect(() => {
    if (loginLogs) {
      const getCounts = (data, property) =>
        data.reduce((counts, obj) => {
          const value = obj[property];
          counts[value] = (counts[value] || 0) + 1;
          return counts;
        }, {});

      const filterDataByTime = (data, filter) => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        switch (filter) {
          case "Today":
            return data.filter((obj) => {
              const logDate = new Date(obj.createdAt);
              return (
                logDate.getFullYear() === year &&
                logDate.getMonth() + 1 === month &&
                logDate.getDate() === day
              );
            });

          case "Month":
            return data.filter((obj) => {
              const logDate = new Date(obj.createdAt);
              return (
                logDate.getFullYear() === year &&
                logDate.getMonth() + 1 === month
              );
            });

          case "Year":
            return data.filter((obj) => {
              const logDate = new Date(obj.createdAt);
              return logDate.getFullYear() === year;
            });

          default:
            return data;
        }
      };

      const filteredData1 = filterDataByTime(loginLogs, browserFilter);
      const browserCounts = getCounts(filteredData1, "browser");
      const result1 = Object.entries(browserCounts).map(([name, value]) => ({
        name,
        value,
      }));

      const filteredData2 = filterDataByTime(loginLogs, osFilter);
      const osCounts = getCounts(filteredData2, "os");
      const result2 = Object.entries(osCounts).map(([name, value]) => ({
        name,
        value,
      }));

      const filteredData3 = filterDataByTime(loginLogs, countryFilter);
      const countryCounts = getCounts(filteredData3, "country");
      const result3 = Object.entries(countryCounts).map(([name, value]) => ({
        name,
        value,
      }));
      setTrafficChart([
        {
          item: "trafficChart",
          data: result1.map((item) =>
            item.name == "null"
              ? {
                  name: "Mobile App",
                  value: item.value,
                }
              : item
          ),
        },
        {
          item: "trafficChart2",
          data: result2,
          data: result2.map((item) =>
            item.name == "null"
              ? {
                  name: "Mobile App",
                  value: item.value,
                }
              : item
          ),
        },
        {
          item: "trafficChart3",
          // data: result3,
          data: result3.map((item, i) =>
            item.name == "null"
              ? {
                  name: "Mobile App",
                  value: item.value,
                }
              : item
          ),
        },
      ]);
    }
  }, [loginLogs, browserFilter, osFilter, countryFilter]);

  useEffect(() => {
    if (transaction) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const filteredTransactions = transaction.filter(
        (obj) => new Date(obj.createdAt) >= thirtyDaysAgo
      );
      const filteredTransactionsBy = filteredTransactions.filter(
        (obj) =>
          obj.transactionType == "Purchase" ||
          obj.transactionType === "Card_Purchase"
      );
      var categoryDate1 = [];
      const transactionTypeData = filteredTransactionsBy.reduce((data, obj) => {
        const transactionType = obj.transactionType;
        const date = obj.createdAt;
        const amount = obj.amount;

        if (!data[transactionType]) {
          data[transactionType] = [];
        }
        categoryDate1.push(date);

        data[transactionType].push(amount);

        return data;
      }, {});

      const result1 = Object.entries(transactionTypeData).map(
        ([transactionType, amounts]) => ({
          name: transactionType,
          data: amounts,
        })
      );
      // chart2
      var categoryDate2 = [];
      const filtered = filteredTransactions.filter(
        (obj) =>
          obj.transactionType === "Deposit" ||
          obj.transactionType === "Withdraw"
      );
      var categoryDate2 = [];
      const transactionsMonthly = filtered.reduce((data, obj) => {
        const transactionType = obj.transactionType;
        const date = obj.createdAt;
        const amount = obj.amount;

        if (!data[transactionType]) {
          data[transactionType] = [];
        }
        categoryDate2.push(date);

        data[transactionType].push(amount);

        return data;
      }, {});

      const result2 = Object.entries(transactionsMonthly).map(
        ([transactionType, amounts]) => ({
          name: transactionType,
          data: amounts,
        })
      );
      setApexChart1({
        date: categoryDate1,
        chartData: result1,
        chartRef: 1,
      });
      setApexChart2({
        date: categoryDate2,
        chartData: result2,
        chartRef: 2,
      });
    }
  }, [transaction]);

  useEffect(() => {
    if (trafficChart.length > 0) {
      trafficChart.map((c) => {
        const chart = echarts.init(document.querySelector(`#${c.item}`));
        chart.setOption({
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "18",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: c.data,
            },
          ],
        });
      });
    }
  }, [trafficChart]);

  useEffect(() => {
    if (Object.keys(apexChart1).length > 0) {
      const chartOptions = {
        series: apexChart1.chartData,

        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        markers: {
          size: 4,
        },
        colors: ["#4154f1", "#2eca6a", "#ff771d"],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.4,
            stops: [0, 90, 100],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        xaxis: {
          type: "datetime",
          categories: apexChart1.date,
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      };

      const chart = new ApexCharts(chart1Ref.current, chartOptions);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [apexChart1]);

  useEffect(() => {
    if (Object.keys(apexChart2).length > 0) {
      const chartOptions = {
        series: apexChart2.chartData,

        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        markers: {
          size: 4,
        },
        colors: ["#4154f1", "#2eca6a", "#ff771d"],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.4,
            stops: [0, 90, 100],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        xaxis: {
          type: "datetime",
          categories: apexChart2.date,
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      };

      const chart = new ApexCharts(chart2Ref.current, chartOptions);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [apexChart2]);

  const winnersData = winners?.data
    ?.filter((win) => win.UserId !== null)
    ?.reduce(
      (acc, item) =>
        acc +
        Number(
          (() => {
            try {
              const parsedData =
                item?.gamePhase?.gameData &&
                JSON.parse(item?.gamePhase?.gameData);
              return parsedData?.[0]?.prize || 0;
            } catch (error) {
              return 0;
            }
          })()
        ),
      0
    );

  useEffect(() => {
    const fetchingCard = async () => {
      const updatedArray = await Promise.all(
        scratchcard.map(async (object) => {
          try {
            const response = await axios
              .get(
                `http://159.223.51.198:5500/api/transaction/count/${object.id}`
              )
              .then((res) => {
                return res.data;
              })
              .catch((err) => {
                return err.response.data;
              });
            const cardWonCount = response?.count?.Card_WonCount;
            return { ...object, totalPayout: cardWonCount };
          } catch (error) {
            return object;
          }
        })
      );

      setTotalScratchPayout(
        updatedArray.reduce((acc, item) => acc + item.totalPayout, 0)
      );
    };
    fetchingCard();
  }, [scratchcard]);

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
            <>
              <main id="main" className="main">
                <div className="pagetitle">
                  <h1>Dashboard</h1>
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                  </nav>
                </div>
                {/* End Page Title */}
                <section className="section dashboard">
                  <div className="row">
                    {/* Left side columns */}
                    <div className="col-lg-8">
                      <div className="row">
                        {/* Sales Card */}
                        <div className="col-xxl-4 col-md-6">
                          <div className="card info-card sales-card">
                            <div className="card-body">
                              <h5 className="card-title">
                                Users <span>| Total </span>
                              </h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-cart" />
                                </div>
                                <div className="ps-3">
                                  <h6>{count_all?.Total_Users}</h6>
                                  <span className="text-success small pt-1 fw-bold">
                                    {count_all?.Total_Users}%
                                  </span>{" "}
                                  <span className="text-muted small pt-2 ps-1"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Sales Card */}
                        {/* Revenue Card */}
                        <div className="col-xxl-4 col-md-6">
                          <div className="card info-card revenue-card">
                            <div className="card-body">
                              <h5 className="card-title">
                                Email Verified <span>| Users</span>
                              </h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-envelope" />
                                </div>
                                <div className="ps-3">
                                  <h6>{count_all?.emailverifycount}</h6>
                                  <span className="text-success small pt-1 fw-bold">
                                    {parseFloat(
                                      (count_all?.emailverifycount /
                                        count_all?.Total_Users) *
                                        100
                                    ).toFixed(2)}
                                    %
                                  </span>{" "}
                                  <span className="text-muted small pt-2 ps-1"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Revenue Card */}
                        {/* Revenue Card */}
                        <div className="col-xxl-4 col-md-6">
                          <div className="card info-card customers-card">
                            <div className="card-body">
                              <h5 className="card-title">
                                Email Unverified <span>| Users</span>
                              </h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-envelope" />
                                </div>
                                <div className="ps-3">
                                  <h6>{count_all?.email_unverified}</h6>
                                  <span className="text-danger small pt-1 fw-bold">
                                    {parseFloat(
                                      (count_all?.email_unverified /
                                        count_all?.Total_Users) *
                                        100
                                    ).toFixed(2)}
                                    %
                                  </span>{" "}
                                  <span className="text-muted small pt-2 ps-1"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Revenue Card */}
                        {/* Customers Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card revenue-card">
                            <div className="card-body">
                              <h5 className="card-title">Active Users</h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-people" />
                                </div>
                                <div className="ps-3">
                                  <h6>{count_all?.activeaccount}</h6>
                                  <span className="text-success small pt-1 fw-bold">
                                    {parseFloat(
                                      (count_all?.activeaccount /
                                        count_all?.Total_Users) *
                                        100
                                    ).toFixed(2)}
                                    %
                                  </span>{" "}
                                  <span className="text-muted small pt-2 ps-1"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card */}
                        {/* Customers Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card customers-card">
                            <div className="card-body">
                              <h5 className="card-title">Inactive Users</h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-people" />
                                </div>
                                <div className="ps-3">
                                  {/* <h6>1244</h6> */}
                                  <h6>{count_all?.inactiveaccount}</h6>
                                  <span className="text-success small pt-1 fw-bold">
                                    {parseFloat(
                                      (count_all?.inactiveaccount /
                                        count_all?.Total_Users) *
                                        100
                                    ).toFixed(2)}
                                    %
                                  </span>{" "}
                                  <span className="text-muted small pt-2 ps-1"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card */}
                        {/* Revenue Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card revenue-card">
                            <div className="card-body">
                              <h5 className="card-title">
                                Mobile Verified Users
                              </h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-telephone" />
                                </div>
                                <div className="ps-3">
                                  {/* <h6>1244</h6> */}
                                  <h6>{count_all?.user_sms_verify}</h6>
                                  <span className="text-success small pt-1 fw-bold">
                                    {parseFloat(
                                      (count_all?.user_sms_verify /
                                        count_all?.Total_Users) *
                                        100
                                    ).toFixed(2)}
                                    %
                                  </span>{" "}
                                  <span className="text-muted small pt-2 ps-1"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card */}
                        {/* Customers Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card customers-card">
                            <div className="card-body">
                              <h5 className="card-title">
                                Mobile Unverified Users
                              </h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-telephone"></i>{" "}
                                </div>
                                <div className="ps-3">
                                  {/* <h6>1244</h6> */}
                                  <h6>{count_all?.sms_unverified}</h6>
                                  <span className="text-danger small pt-1 fw-bold">
                                    {parseFloat(
                                      (count_all?.sms_unverified /
                                        count_all?.Total_Users) *
                                        100
                                    ).toFixed(2)}
                                    %
                                  </span>{" "}
                                  <span className="text-muted small pt-2 ps-1"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card */}
                        {/* Customers Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card sales-card">
                            <div className="card-body">
                              <h5 className="card-title">Total Deposited</h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-currency-rupee" />
                                </div>
                                <div className="ps-3">
                                  <h6>
                                    {transaction
                                      .filter(
                                        (item) =>
                                          item.transactionType === "Deposit"
                                      )
                                      .reduce(
                                        (acc, item) =>
                                          acc + Number(item.amount),
                                        0
                                      )
                                      ?.toLocaleString()}
                                  </h6>{" "}
                                  <span className="text-success small pt-1 fw-bold">
                                    {
                                      transaction.filter(
                                        (item) =>
                                          item.transactionType === "Deposit"
                                      ).length
                                    }{" "}
                                    user
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card sales-card">
                            <div className="card-body">
                              <h5 className="card-title">Total Withdrawal</h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-wallet-fill" />
                                </div>
                                <div className="ps-3">
                                  <h6>
                                    {" "}
                                    Rs.
                                    {withdrawal
                                      .filter((item) => item.status === 1)
                                      .reduce(
                                        (acc, item) =>
                                          acc + Number(item.Amount),
                                        0
                                      )
                                      ?.toLocaleString()}
                                  </h6>
                                  <span className="text-success small pt-1 fw-bold">
                                    {
                                      withdrawal.filter(
                                        (item) => item.status === 1
                                      ).length
                                    }{" "}
                                    user
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card */}
                        {/* Customers Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card customers-card">
                            <div className="card-body">
                              <h5 className="card-title">
                                Pending Withdrawals
                              </h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-arrow-repeat" />
                                </div>
                                <div className="ps-3">
                                  <h6>
                                    Rs.
                                    {withdrawal
                                      .filter((item) => item.status === 0)
                                      .reduce(
                                        (acc, item) =>
                                          acc + Number(item.Amount),
                                        0
                                      )
                                      ?.toLocaleString()}
                                  </h6>
                                  <span className="text-primary small pt-1 fw-bold">
                                    {withdrawal.filter(
                                      (item) => item.status === 0
                                    ).length === 0 ?? ""}{" "}
                                    user
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card */}
                        {/* Customers Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card customers-card">
                            <div className="card-body">
                              <h5 className="card-title">
                                Rejected Withdrawals
                              </h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-info-square" />
                                </div>
                                <div className="ps-3">
                                  <h6>
                                    Rs.
                                    {withdrawal
                                      .filter((item) => item.status === 2)
                                      .reduce(
                                        (acc, item) =>
                                          acc + Number(item.Amount),
                                        0
                                      )
                                      ?.toLocaleString()}
                                  </h6>
                                  <span className="text-danger small pt-1 fw-bold">
                                    {
                                      withdrawal.filter(
                                        (item) => item.status === 2
                                      ).length
                                    }{" "}
                                    user
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card */}
                        {/* Customers Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card sales-card">
                            <div className="card-body">
                              <h5 className="card-title">Sold Scratch Cards</h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-ticket-perforated-fill" />{" "}
                                </div>
                                <div className="ps-3">
                                  <h6>{scratchcard?.scratchDrawCount ?? 0}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card
                        {/* Customers Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card revenue-card">
                            <div className="card-body">
                              <h5 className="card-title">
                                Sold Lottery Tickets
                              </h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-stop-btn" />
                                </div>
                                <div className="ps-3">
                                  <h6>{soldticket?.length}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card */}
                        {/* Customers Card */}
                        {/* <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card revenue-card">
                            <div className="card-body">
                              <h5 className="card-title">Sold Amounts</h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-currency-dollar" />
                                </div>
                                <div className="ps-3">
                                  <h6>520</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        {/* End Customers Card */}
                        {/* Customers Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card revenue-card">
                            <div className="card-body">
                              <h5 className="card-title">Winners</h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-emoji-smile" />
                                </div>
                                <div className="ps-3">
                                  <h6>
                                    {" "}
                                    {
                                      winners?.data?.filter(
                                        (win) => win.UserId !== null
                                      ).length
                                    }
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card */}
                        {/* Customers Card */}
                        <div className="col-xxl-4 col-xl-6">
                          <div className="card info-card customers-card">
                            <div className="card-body">
                              <h5 className="card-title">
                                Total Winning Amounts
                              </h5>
                              <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                  <i className="bi bi-credit-card-fill" />
                                </div>
                                <div className="ps-3">
                                  <h6>
                                    Rs.
                                    {(
                                      winners?.data
                                        ?.filter((win) => win.UserId !== null)
                                        ?.reduce(
                                          (acc, item) =>
                                            acc +
                                            Number(
                                              (() => {
                                                try {
                                                  const parsedData =
                                                    item?.gamePhase?.gameData &&
                                                    JSON.parse(
                                                      item?.gamePhase?.gameData
                                                    );
                                                  return (
                                                    parsedData?.[0]?.prize || 0
                                                  );
                                                } catch (error) {
                                                  return 0;
                                                }
                                              })()
                                            ),
                                          0
                                        ) + totalScratchPayout
                                    ).toLocaleString()}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Customers Card */}
                      </div>
                    </div>
                    {/* 8 End Left side columns */}
                    <div className="col-lg-4">
                      {/* Login By Browser */}
                      <div className="card">
                        <div className="filter">
                          <a
                            className="icon"
                            href="#"
                            data-bs-toggle="dropdown"
                          >
                            <i className="bi bi-three-dots" />
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                              <h6>Filter</h6>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setBrowserFilter("Today")}
                              >
                                Today
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setBrowserFilter("Month")}
                              >
                                This Month
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setBrowserFilter("Year")}
                              >
                                This Year
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body pb-0">
                          <h5 className="card-title">
                            Login By Browser{" "}
                            <span>
                              |{" "}
                              {browserFilter === "Today"
                                ? "Today"
                                : browserFilter === "Month"
                                ? "Last 30 days"
                                : "Last year"}
                            </span>
                          </h5>
                          <div
                            id="trafficChart"
                            style={{ minHeight: 400 }}
                            className="echart"
                          />
                        </div>
                      </div>
                      {/* End Login By Browser */}
                      {/* Login By OS (Last 30 days) */}
                      <div className="card">
                        <div className="filter">
                          <a
                            className="icon"
                            href="#"
                            data-bs-toggle="dropdown"
                          >
                            <i className="bi bi-three-dots" />
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                              <h6>Filter</h6>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setOsFilter("Today")}
                              >
                                Today
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setOsFilter("Month")}
                              >
                                This Month
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setOsFilter("Year")}
                              >
                                This Year
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body pb-0">
                          <h5 className="card-title">
                            Login By OS
                            <span>
                              |{" "}
                              {osFilter === "Today"
                                ? "Today"
                                : osFilter === "Month"
                                ? "Last 30 days"
                                : "Last year"}
                            </span>
                          </h5>
                          <div
                            id="trafficChart2"
                            style={{ minHeight: 400 }}
                            className="echart"
                          />
                        </div>
                      </div>
                      {/* End Login By OS */}
                      {/* Login By Country (Last 30 days) */}
                      <div className="card">
                        <div className="filter">
                          <a
                            className="icon"
                            href="#"
                            data-bs-toggle="dropdown"
                          >
                            <i className="bi bi-three-dots" />
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                              <h6>Filter</h6>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setCountryFilter("Today")}
                              >
                                Today
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setCountryFilter("Month")}
                              >
                                This Month
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setCountryFilter("Year")}
                              >
                                This Year
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body pb-0">
                          <h5 className="card-title">
                            Login By Country
                            <span>
                              |{" "}
                              {countryFilter === "Today"
                                ? "Today"
                                : countryFilter === "Month"
                                ? "Last 30 days"
                                : "Last year"}
                            </span>
                          </h5>
                          <div
                            id="trafficChart3"
                            style={{ minHeight: 400 }}
                            className="echart"
                          />
                        </div>
                      </div>
                      {/* End Login By Country */}
                    </div>
                    {/* Transactions Report */}
                    <div className="col-lg-6">
                      <div className="card-body">
                        <h5 className="card-title">
                          Transactions Report<span> | Last 30 Days</span>
                        </h5>
                        {/* Line Chart */}
                        <div id="reportsChart2" ref={chart1Ref} />
                        {/* End Line Chart */}
                      </div>
                    </div>
                    {/* Monthly Deposit & Withdraw Report */}
                    <div className="col-lg-6">
                      <div className="card-body">
                        <h5 className="card-title">
                          Monthly Deposit &amp; Withdraw Report
                          <span> | Last 12 Month</span>
                        </h5>
                        {/* Line Chart */}
                        <div id="reportsChart" ref={chart2Ref} />
                        {/* End Line Chart */}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      Update Terms and Conditions:{" "}
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          confirmAlert({
                            title: "Confirm to Update",
                            message: "Update Terms and Conditions:",
                            buttons: [
                              {
                                label: "Yes",
                                onClick: () => {
                                  updateTermsAndCondition();
                                },
                              },
                              {
                                label: "No",
                              },
                            ],
                          });
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </section>
              </main>
              {/* End #main */}

              {/* End #main */}
            </>
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
