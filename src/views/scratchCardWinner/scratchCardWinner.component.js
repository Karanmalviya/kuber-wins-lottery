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
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import Loader from "../../component/Loader";
import ScrollToTop from "react-scroll-to-top";

export default function ScratchCardWinner(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const {
    fetchScratchCardSold,
    fetchuserTransction,
    soldscratch,
    transaction,
    isLoading,
  } = props;
  const [limit, setLimit] = useState(10);
  const [showWinner, setShowWinner] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [winnerLog, setWinnerLog] = useState("");
  const [scratchCardName, setScratchCardName] = useState("");
  const [scratchData, setScratchData] = useState([]);

  useEffect(() => {
    fetchScratchCardSold();
    fetchuserTransction();
  }, []);

  useEffect(() => {
    const scratchWinner = async () => {
      const filteredData = soldscratch.filter((item, index, arr) => {
        return !arr
          .slice(index + 1)
          .some(
            (nextItem) =>
              nextItem.UserId === item.UserId &&
              nextItem.scratchCardId === item.scratchCardId
          );
      });

      const filterdTransaction = transaction.filter(
        (item) => item.transactionType === "Card_Won"
      );
      const resultArray = [];
      filterdTransaction.forEach((obj1) => {
        filteredData.forEach((obj2) => {
          if (
            obj1.scratchCardId === obj2.scratchCardId &&
            obj1.UserId === obj2.UserId
          ) {
            const newObj = {
              scratchCardId: obj2.scratchCardId,
              card_name: obj2.scratchCard.card_name,
              frequency: obj2.scratchCard.frequency,
              createdAt: new Date(obj1.createdAt).toLocaleString(),
              post_balance: obj1.balance,
              amount: obj1.amount,
              userName: obj2.User.userName,
              name: obj2.User.fname + " " + obj2.User.lname,
              email: obj2.User.email,
              UserId: obj1.UserId,
            };
            resultArray.push(newObj);
          }
        });
      });

      setShowWinner(resultArray);
    };
    scratchWinner();
  }, [transaction, soldscratch]);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentWinnerLogs = showWinner?.slice(startIndex, endIndex);
  const winnerLogCount = showWinner?.length;

  useEffect(() => {
    if (searchTerm === "") {
      setScratchData(currentWinnerLogs);
    } else {
      const filter = currentWinnerLogs.filter(
        (logs) =>
          logs?.card_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          logs?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          logs?.userName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setScratchData(filter);
    }
  }, [searchTerm, showWinner, currentPage, limit]);

  useEffect(() => {
    if (scratchCardName === "") {
      setWinnerLog(scratchData);
    } else {
      const filteres =
        scratchData &&
        scratchData.filter((item) => item.card_name === scratchCardName);
      setWinnerLog(filteres);
    }
  }, [scratchData, scratchCardName]);

  const uniqueGameNames = new Set();
  const uniqueScratchCardArray =
    soldscratch &&
    soldscratch.filter((item) => {
      const card_name = item.scratchCard.card_name;
      if (!uniqueGameNames.has(card_name)) {
        uniqueGameNames.add(card_name);
        return true;
      }
      return false;
    });

  const headers = [
    [
      "S.No",
      "User Name",
      "Email",
      "Scratch Card Name",
      "Frequency",
      "Price",
      "Post Balance",
      "Winning Date",
    ],
  ];

  const data =
    showWinner &&
    showWinner.map((elt, index) => [
      index + 1,
      elt.name,
      elt.email,
      elt.card_name,
      JSON.parse(elt.frequency).map((item) => item.frequency)[0],
      "$" + elt.amount.toLocaleString(),
      "$" + elt.post_balance.toLocaleString(),
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
                <h1>Scratch Card Winners</h1>
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
                        className={
                          location.pathname === "/scratch-cards-winner"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        id="pills-scratchcard-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-scratchcard"
                        type="button"
                        role="tab"
                        aria-controls="pills-scratchcard"
                        aria-selected="true"
                        onClick={() => navigate("/scratch-cards-winner")}
                      >
                        Scratch Cards Winners
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="btn btn-outline-primary ms-2"
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
                          <h5 className="card-title">Scratch Card Winners</h5>
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
                            <div className="col-4">
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
                            <div className="col-4">
                              {" "}
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={scratchCardName}
                                onChange={(e) =>
                                  setScratchCardName(e.target.value)
                                }
                              >
                                <option selected value="">
                                  Select Scratch Card
                                </option>
                                {uniqueScratchCardArray &&
                                  uniqueScratchCardArray.map((item) => (
                                    <option value={item.scratchCard.card_name}>
                                      {item.scratchCard.card_name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-4">
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
                                      placeholder="Scratch Card"
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
                                  Scratch Card Name{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Frequency{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Win Bonus
                                  <BsArrowDownUp className="updownArrow" />
                                </th>{" "}
                                <th>
                                  Post Balance
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Date & time
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {winnerLog &&
                                Array.isArray(winnerLog) &&
                                winnerLog.map((row, i) => {
                                  return (
                                    <tr key={i} className="tableTd">
                                      <td>
                                        {(currentPage - 1) * limit + 1 + i}
                                      </td>

                                      <td>
                                        <p className="m-0 p-0">
                                          {row?.userName ? row?.userName : "--"}
                                        </p>
                                        <Link
                                          to={"/all-user-detail/" + row?.UserId}
                                        >
                                          {row?.email ? row?.email : "--"}
                                        </Link>
                                      </td>
                                      <td>{row?.card_name}</td>
                                      <td>
                                        {" "}
                                        {(() => {
                                          try {
                                            const parsedData = JSON.parse(
                                              row?.frequency
                                            );
                                            return (
                                              parsedData?.[0].schedule
                                                .charAt(0)
                                                .toUpperCase() +
                                              parsedData?.[0].schedule.slice(1)
                                            );
                                          } catch (error) {}
                                        })()}
                                      </td>

                                      <td>${row?.amount.toLocaleString()}</td>
                                      <td>
                                        ${row?.post_balance.toLocaleString()}
                                      </td>

                                      <td>
                                        {new Date(
                                          row.createdAt
                                        ).toLocaleString()}{" "}
                                      </td>
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
