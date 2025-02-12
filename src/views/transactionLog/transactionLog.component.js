import React, { useState, useEffect, useRef } from "react";
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
import reactCSS from "reactcss";
import moment from "moment";

// React bootstrap end
import Loader from "./../../component/Loader";
import { downloadExcel } from "react-export-table-to-excel";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ScrollToTop from "react-scroll-to-top";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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

  return <div className="m-0 p-0"> {formattedDate}</div>;
}

const styles = reactCSS({
  default: {
    swatch: {
      padding: "5px",
      background: "#fff",
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      display: "inline-block",
      cursor: "pointer",
    },
    popover: {
      position: "absolute",
      zIndex: "2",
      // right: "0",
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  },
});
export default function TransactionLog(props) {
  const navigate = useNavigate();
  const {
    fetchuser,
    fetchuserTransction,
    count,
    transaction,
    user,
    isLoading,
  } = props;
  const [limit, setLimit] = useState(10);
  const [filtered, setFiltered] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);

  const [filteredTransactions, setFilteredTransactions] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statement, setStatment] = useState("All");

  const [displayDateRangePicker, setDisplayRangePicker] = useState(false);
  const [transactionDate, setTransactionDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      date: "",
    },
  ]);

  useEffect(() => {
    fetchuserTransction();
    fetchuser();
  }, []);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // useEffect(() => {
  //   var filter = transaction.filter(
  //     (transaction) =>
  //       transaction.transactionType === "AdminWithdraw" ||
  //       transaction.transactionType === "AdminDeposit" ||
  //       transaction.transactionType === "Winning" ||
  //       transaction.transactionType === "Purchase" ||
  //       transaction.transactionType === "Card_Purchase"
  //   );
  //   if (statement === "Last Month") {
  //     filter = filter.filter((transaction) => {
  //       const date = new Date(transaction.createdAt);
  //       const lastMonth = new Date();
  //       lastMonth.setMonth(lastMonth.getMonth() - 1);
  //       return date > lastMonth;
  //     });
  //   } else if (statement === "Last 6 Month") {
  //     filter = filter.filter((transaction) => {
  //       const date = new Date(transaction.createdAt);
  //       const last6Months = new Date();
  //       last6Months.setMonth(last6Months.getMonth() - 6);
  //       return date > last6Months;
  //     });
  //   } else if (statement === "Last 12 Month") {
  //     filter = filter.filter((transaction) => {
  //       const date = new Date(transaction.createdAt);
  //       const last12Months = new Date();
  //       last12Months.setMonth(last12Months.getMonth() - 12);
  //       return date > last12Months;
  //     });
  //   } else if (statement === "Custom Date") {
  //     filter = filter.filter((transaction) => {
  //       const date = new Date(transaction.createdAt);
  //       const start = new Date(startDate + "T00:00:00Z");
  //       const end = new Date(endDate + "T23:59:59Z");
  //       return date >= new Date(start) && date <= new Date(end);
  //     });
  //   }
  //   setFiltered(filter);
  // }, [transaction, statement, startDate, endDate]);

  useEffect(() => {
    if (transaction.length) {
      const startDate = moment(transactionDate?.[0].startDate).format(
        "DD/MM/YYYY"
      );
      const endDate = moment(transactionDate?.[0].endDate).format("DD/MM/YYYY");
      const date = transactionDate[0].date;
      if (date) {
        const filteredData = transaction.filter((item) => {
          const createdAt = moment(item.createdAt).format("DD/MM/YYYY");
          return createdAt >= startDate && createdAt <= endDate;
        });
        setFiltered(filteredData);
      } else {
        setFiltered(transaction);
      }
    }
  }, [transaction, transactionDate]);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentTransactions = filtered.slice(startIndex, endIndex);
  const TransactionCount = filtered.length;
  const pageCount = Math.ceil(TransactionCount / limit);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTransactions(currentTransactions);
    } else {
      const filter = currentTransactions.filter(
        (withdraws) =>
          withdraws?.tansactionId
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          withdraws?.User.email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          withdraws?.User.userName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          withdraws?.User.fname
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredTransactions(filter);
    }
  }, [searchTerm, transaction, currentPage, limit, filtered]);

  // Export to PDF ,Excel and CSV files

  const dataArray = filtered
    ? filtered.map((elt, index) => {
        let userData = user.find((user) => user.id === elt.UserId);
        let userName = userData ? userData.userName : "";
        let email = userData ? userData.email : "";
        let fullName = userData ? userData.fname + " " + userData.lname : "";

        let additionalData = "";
        if (userData) {
          additionalData = [email, userName, fullName];
        }

        return {
          "S.No.": index + 1,
          "Full Name": fullName,
          UserName: userName,
          Email: email,
          Amount: elt.amount.toLocaleString(),
          "Total Wallet Balance": elt.balance.toLocaleString(),
          "Transaction ID": elt.tansactionId,
          Description: elt.description,
          TransactionDate: moment(elt.createdAt).format(
            "MM/DD/YYYY hh:mm:ss A"
          ),
        };
      })
    : "";
  const header = [
    "S.No",
    "Name",
    "Username",
    "Email",
    "Amount",
    "Total Wallet Balance",
    "Transaction Id",
    "Description",
    "Transaction Date",
  ];
  const handleExportExcel = () => {
    downloadExcel({
      fileName: `${statement} transaction log report ${new Date().toLocaleString()}`,
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        body: dataArray,
      },
    });
  };

  const handleExportPDF = () => {
    const unit = "pt";
    const size = "A3";
    const orientation = "landscape";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);

    const title = `Life Time Lotto Transaction Log Report  |  Date: ${moment().format(
      "MM/DD/YYYY hh:mm:ss A"
    )}\n${
      transactionDate[0].date &&
      `From ${moment(transactionDate[0].startDate).format(
        "MM/DD/YYYY"
      )} to ${moment(transactionDate[0].endDate).format("MM/DD/YYYY")}`
    }`;
    const headers = [
      [
        "S.No",
        "Name",
        "Username",
        "Email",
        "Amount",
        "Total Wallet Balance",
        "Transaction Id",
        "Description",
        "Transaction Date",
      ],
    ];

    const data = filtered.map((elt, index) => {
      let userData = user.find((user) => user.id === elt.UserId);
      let fullName = userData ? userData.fname + " " + userData.lname : "";
      let userName = userData ? userData.userName : "";
      let email = userData ? userData.email : "";

      let additionalData = "";
      if (userData) {
        additionalData = [fullName, userName, email];
      }

      return [
        index + 1,
        ...additionalData,
        elt.amount.toLocaleString(),
        elt.balance.toLocaleString(),
        elt.tansactionId,
        elt.description.replace(/^\s+|\s+$/gm, ""),
        moment(elt.createdAt).format("MM/DD/YYYY hh:mm:ss A"),
      ];
    });

    let content = {
      startY: 70,
      startX: 50,
      head: headers,
      body: data,
      tableWidth: "auto",
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(
      `${statement} transaction log report ${new Date().toLocaleString()}.pdf`
    );
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
                <h1>Transactions Log</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Transactions</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title">All Transactions Log</h5>
                          <div className="mt-3">
                            Export to
                            <CSVLink
                              data={dataArray ?? filtered}
                              filename={`${statement} transaction log report ${new Date().toLocaleString()}.csv`}
                              className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                            >
                              CSV
                            </CSVLink>
                            <button
                              onClick={handleExportExcel}
                              className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                            >
                              Excel
                            </button>
                            <button
                              onClick={handleExportPDF}
                              className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                            >
                              PDF
                            </button>
                          </div>
                        </div>
                        <div className="showentriesDiv mb-2 row">
                          {/* <div className="d-flex"> */}
                          <div className="col-lg-4 col-md-4">
                            <div> &nbsp;</div>
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

                          {/* <h6 className="d-inline ms-5">
                              <div>Filter</div>{" "}
                              <div>
                                {" "}
                                <DropdownButton
                                  variant="outline-dark"
                                  id="dropdown-basic-button"
                                  title={statement}
                                >
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setStatment("Last Month");
                                    }}
                                  >
                                    Last Month
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setStatment("Last 6 Month");
                                    }}
                                  >
                                    Last 6 Months
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setStatment("Last 12 Month");
                                    }}
                                  >
                                    Last 12 Months
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setStatment("Custom Date");
                                    }}
                                  >
                                    Custom Date
                                  </Dropdown.Item>
                                </DropdownButton>{" "}
                              </div>
                            </h6> */}

                          <div className="col-lg-4 col-md-4 ps-lg-1">
                            <div>Date Range</div>
                            <div
                              style={{ position: "relative" }}
                              onClick={() =>
                                setDisplayRangePicker(!displayDateRangePicker)
                              }
                            >
                              <Form.Control
                                value={
                                  transactionDate[0].date &&
                                  moment(transactionDate?.[0].startDate).format(
                                    "MMM DD, YYYY"
                                  ) +
                                    " to " +
                                    moment(transactionDate?.[0].endDate).format(
                                      "MMM DD, YYYY"
                                    )
                                }
                                placeholder={`Select from - Select to`}
                              />
                              <span>
                                <svg
                                  width="24"
                                  height="24"
                                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mt-1 bg-light cldr-icon css-i4bv87-MuiSvgIcon-root mt-1 bg-light cldr-icon"
                                  focusable="false"
                                  aria-hidden="true"
                                  viewBox="0 0 24 24"
                                  data-testid="CalendarMonthIcon"
                                >
                                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"></path>
                                </svg>
                              </span>
                            </div>
                            {displayDateRangePicker ? (
                              <div style={styles.popover}>
                                <div
                                  style={styles.cover}
                                  onClick={() => setDisplayRangePicker(false)}
                                />

                                <DateRange
                                  className="card"
                                  maxDate={new Date()}
                                  editableDateInputs={true}
                                  onChange={(item) => {
                                    setTransactionDate([
                                      {
                                        ...item.selection,
                                        date: new Date(),
                                      },
                                    ]);
                                  }}
                                  moveRangeOnFirstSelection={false}
                                  ranges={transactionDate}
                                />
                              </div>
                            ) : null}
                          </div>

                          {/* <h6
                            hidden={statement === "Custom Date" ? false : true}
                            className="m-0 p-0"
                          >
                            <div className="d-flex">
                              <div className="">
                                <div>Start Date</div>
                                <div>
                                  <input
                                    type="date"
                                    className="form-control"
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) =>
                                      setStartDate(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="ms-2">
                                <div>End Date Date</div>
                                <div>
                                  <input
                                    type="date"
                                    className="form-control"
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) => setEndDate(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </h6> */}
                          <div className="col-lg-4 col-md-4">
                            <div> Search : &nbsp;</div>
                            <div>
                              <Form>
                                <Form.Group>
                                  <Form.Control
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                    className="w-100"
                                    type="text"
                                    placeholder="Transaction Id , UserName, Name"
                                  />
                                </Form.Group>
                              </Form>
                            </div>
                          </div>
                        </div>

                        <div className="table-responsive">
                          <Table
                            // id="basic-6"
                            className="display tbl-ltr lotteriesTable "
                            id="table-to-xls"
                          >
                            <thead className="lotteriesTableHead">
                              <tr className="tableTd">
                                <th>
                                  <div className="d-flex ">
                                    {" "}
                                    S.N.{" "}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>{" "}
                                </th>
                                <th>
                                  <div className="d-flex ">
                                    User{" "}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex ">
                                    Transaction ID{" "}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  {" "}
                                  <div className="d-flex ">
                                    Transaction Date{" "}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex ">
                                    Amount{" "}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  <div className="d-flex ">
                                    Post Balance{" "}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                                <th>
                                  {" "}
                                  <div className="d-flex ">
                                    Details{" "}
                                    <BsArrowDownUp className="updownArrow" />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(filteredTransactions) &&
                                filteredTransactions.map((row, i) => {
                                  return (
                                    <tr
                                      key={row.id}
                                      className="tableTd"
                                      // style={{ height: "100vh" }}
                                      // style={{ paddingTop: 0,overflow: auto, scroll-snap-type: y mandatory }}
                                    >
                                      <td>
                                        {(currentPage - 1) * limit + 1 + i}
                                      </td>
                                      <td>
                                        {user.map((item) =>
                                          item.id == row.UserId ? (
                                            <div key={item.id}>
                                              <p className="tableP ">
                                                {item.userName}
                                              </p>
                                              <Link
                                                className="text-primary tableP"
                                                to={`/all-user-detail/${row.UserId}`}
                                              >
                                                {item.email}
                                              </Link>
                                            </div>
                                          ) : (
                                            ""
                                          )
                                        )}
                                      </td>
                                      <td>{row.tansactionId}</td>
                                      <td>
                                        {moment(row.createdAt).format(
                                          "DD/MM/YYY hh:mm:ss A"
                                        )}
                                        {/* <DateComponent date={row.createdAt} /> */}
                                      </td>
                                      <td
                                        className={
                                          row.transactionType === "AdminDeposit"
                                            ? "text-primary"
                                            : row.transactionType ===
                                              "AdminWithdraw"
                                            ? "text-danger"
                                            : "text-success"
                                        }
                                      >
                                        {row?.transactionType === "AdminDeposit"
                                          ? "+"
                                          : row?.transactionType ===
                                            "AdminWithdraw"
                                          ? "-"
                                          : ""}{" "}
                                        Rs.{row?.amount?.toLocaleString()}
                                      </td>
                                      <td>Rs.{row?.balance?.toLocaleString()}</td>
                                      <td>{row?.description}</td>
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
                                {TransactionCount > currentPage * limit
                                  ? currentPage * limit
                                  : TransactionCount}{" "}
                                of {TransactionCount} entries
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
                                TransactionCount > currentPage * limit
                                  ? { cursor: "pointer" }
                                  : {}
                              }
                              onClick={() => {
                                if (TransactionCount > currentPage * limit) {
                                  definePage(currentPage + 1);
                                }
                              }}
                            >
                              Next
                            </span>
                            &nbsp;&nbsp;
                          </p>
                        </div>
                        <div className="tableBottomEntries"></div>
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
