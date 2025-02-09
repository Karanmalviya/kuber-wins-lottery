import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
import Loader from "./../../component/Loader";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import ScrollToTop from "react-scroll-to-top";

export default function WinnerHistory(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchwinnerTicket, winners, count, isLoading } = props;
  const [limit, setLimit] = useState(10);
  const [showWinner, setShowWinner] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [winnerLog, setWinnerLog] = useState([]);
  const [lotteryName, setLotteryName] = useState("");
  const [lotteryFiltered, setLotteryFiltered] = useState([]);

  useEffect(() => {
    fetchwinnerTicket();
  }, []);

  useEffect(() => {
    const fileredWinner = winners?.data?.filter((win) => win.UserId !== null);
    setShowWinner(fileredWinner);
  }, [winners]);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentWinnerLogs = showWinner?.slice(startIndex, endIndex);
  const winnerLogCount = showWinner?.length;
  const pageCount = Math.ceil(winnerLogCount / limit);
  
  useEffect(() => {
    if (searchTerm === "") {
      setLotteryFiltered(currentWinnerLogs);
    } else {
      const filter = currentWinnerLogs.filter(
        (logs) =>
          logs?.ticketNumber
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          logs?.gameInformation?.gameName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          logs?.User?.userName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          logs?.User?.fname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          logs?.User?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          logs?.User?.userName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLotteryFiltered(filter);
    }
  }, [searchTerm, winners, showWinner, currentPage, limit]);

  useEffect(() => {
    if (lotteryName === "") {
      setWinnerLog(lotteryFiltered);
    } else {
      const filteres =
        lotteryFiltered &&
        lotteryFiltered.filter(
          (item) => item.gameInformation.gameName === lotteryName
        );
      setWinnerLog(filteres);
    }
  }, [lotteryFiltered, lotteryName]);

  const uniqueGameNames = new Set();
  const uniqueLotteryArray =
    showWinner &&
    showWinner.filter((lottery) => {
      const gameName = lottery.gameInformation.gameName;
      if (!uniqueGameNames.has(gameName)) {
        uniqueGameNames.add(gameName);
        return true;
      }
      return false;
    });

  // const [data, setData] = useState([
  //   {
  //     name: "John Doe",
  //     age: 30,
  //   },
  //   {
  //     name: "Jane Doe",
  //     age: 25,
  //   },
  // ]);

  // const generatePDF = () => {
  //   const pdf = new jsPDF();

  //   pdf.text("User Data", 10, 10);

  //   data.forEach((user) => {
  //     pdf.text(user.name, 10, 20 + data.indexOf(user) * 10);
  //     pdf.text(String(user.age), 100, 20 + data.indexOf(user) * 10);
  //   });

  //   return pdf.output("blob");
  // };
  // const downloadPDF = () => {
  //   const blob = generatePDF();

  //   const anchor = document.createElement("a");
  //   anchor.href = URL.createObjectURL(blob);
  //   anchor.download = "user_data.pdf";
  //   anchor.click();
  // };

  const headers = [
    [
      "S.No",
      "User Name",
      "Email",
      "Country",
      "Game Name",
      "Game Phase",
      "Frequency",
      "Price",
      "Ticket Number",
      "Winning Date",
    ],
  ];

  const data =
    winnerLog &&
    winnerLog.map((elt, index) => [
      index + 1,
      `${elt.User.fname} ${elt.User.lname}`,
      elt.User.email,
      elt.User.country,
      elt.gameInformation.gameName,
      elt.gamePhase.game,
      elt.frequency === 1
        ? "Daily"
        : elt.frequency === 2
        ? "Weekly"
        : "Monthly",
      "$" + elt.price.toLocaleString(),
      elt.ticketNumber,
      new Date(elt.createdAt).toLocaleString(),
    ]);

  const handleExportPDF = () => {
    const unit = "pt";
    const size = "A3";
    const orientation = "landscape";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(12);
    const title = `Life Time Lotto Transaction Log Report | Date: ${new Date().toLocaleString()}`;

    const content = {
      startY: 50,
      startX: 70,
      head: headers,
      body: data,
      tableWidth: "auto",
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    const filename = `Lottery Winning Log Report ${new Date().toLocaleString()}.pdf`;
    doc.save(filename);
  };

  const convertToCSV = (data, headers) => {
    const csv = [headers[0].join(",")];
    data.forEach((row) => {
      csv.push(row.join(","));
    });
    return csv.join("\n");
  };

  const handleExportCSV = () => {
    const csvData = convertToCSV(data, headers);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    const fileName = `Lottery Winning Log Report ${new Date().toLocaleString()}.csv`;
    saveAs(blob, fileName);
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("WinnerLog");
    const excelData = [...headers, ...data];
    excelData.forEach((row) => {
      worksheet.addRow(row);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = `Lottery Winning Log Report ${new Date().toLocaleString()}.xlsx`;
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
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
                <h1>Lottery Ticket Winners</h1>
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
              {/* <div className="row commission-tab ">
                <div className="mb-4">
                  <ul
                    className="nav nav-pills justify-content-end"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="btn btn-outline-primary me-2"
                        id="pills-deposit-commission-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-deposit-commission"
                        type="button"
                        role="tab"
                        aria-controls="pills-deposit-commission"
                        aria-selected="false"
                        onClick={() => navigate("/scratch-cards-winner")}
                      >
                        Scratch Cards Winners
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={
                          location.pathname === "/winner-history"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        id="pills-lotterytab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-lottery"
                        type="button"
                        role="tab"
                        aria-controls="pills-lottery"
                        aria-selected="false"
                        onClick={() => navigate("/winner-history")}
                      >
                        Lottery Winners
                      </button>
                    </li>
                  </ul>
                </div>
              </div> */}
              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title">Lottery Ticket Winners</h5>
                          <div
                            className="mt-3"
                            // hidden={statement === "Select" ? true : false}
                          >
                            Export to
                            <button
                              onClick={handleExportCSV}
                              className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                            >
                              CSV
                            </button>
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
                        <div
                          className="showentriesDiv"
                          style={{ display: "block" }}
                        >
                          <div className="row">
                            <div className="col-lg-4">
                              {" "}
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
                            <div className="col-lg-4">
                              {" "}
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={lotteryName}
                                onChange={(e) => setLotteryName(e.target.value)}
                              >
                                <option selected value="">
                                  Select Lottery
                                </option>
                                {uniqueLotteryArray &&
                                  uniqueLotteryArray.map((item) => (
                                    <option
                                      value={item.gameInformation.gameName}
                                    >
                                      {item.gameInformation.gameName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-lg-4">
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
                                      placeholder="Ticket Number"
                                    />
                                  </Form.Group>
                                </Form>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="table-responsive">
                          <Table
                            id="basic-6"
                            className="display tbl-ltr lotteriesTable"
                          >
                            <thead className="lotteriesTableHead">
                              <tr className="tableTd">
                                <th>
                                  S.No <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  UserName{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Lottery-Name{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Lottery-Phase{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Ticket Number
                                  <BsArrowDownUp className="updownArrow" />
                                </th>

                                <th>
                                  Win-Bonus
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Date <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {winnerLog &&
                                Array.isArray(winnerLog) &&
                                winnerLog.map((row, i) => {
                                  return (
                                    <tr key={row.id} className="tableTd">
                                      <td>
                                        {(currentPage - 1) * limit + 1 + i}
                                      </td>

                                      <td>
                                        <p className="p-0  m-0">
                                          {row?.User?.userName
                                            ? row?.User?.userName
                                            : "--"}
                                        </p>
                                        <Link
                                          to={"/all-user-detail/" + row?.UserId}
                                        >
                                          {" "}
                                          {row?.User?.email
                                            ? row?.User?.email
                                            : "--"}
                                        </Link>
                                      </td>
                                      <td>{row?.gameInformation?.gameName}</td>
                                      <td>{row?.gamePhase?.game}</td>
                                      <td>{row.ticketNumber}</td>
                                      <td>${row?.price}</td>

                                      <td>
                                        {new Date(
                                          row.createdAt
                                        ).toLocaleString()}
                                      </td>
                                    </tr>
                                  );
                                })}
                              <tr>
                                <td colSpan={7} style={{ textAlign: "center" }}>
                                  {winnerLog?.length === 0 &&
                                    "No winners found"}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        <div className="tableBottomEntries">
                          <h6>
                            {!searchTerm && (
                              <p>
                                {" "}
                                Showing {(currentPage - 1) * limit + 1} to{" "}
                                {winnerLogCount > currentPage * limit
                                  ? currentPage * limit
                                  : winnerLogCount}{" "}
                                of {winnerLogCount} entries
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
