import React, {useState, useEffect, Fragment} from "react";
import {Link, useNavigate} from "react-router-dom";
import {HeaderPageContainer} from "../../component/header/header.container";
import {SidebarPageContainer} from "../../component/sidebar/sidebar.container";
import {FooterPageContainer} from "../../component/footer/footer.container";
import {Container, Row, Col, Button, Modal, InputGroup} from "react-bootstrap";
import {BsArrowDownUp} from "react-icons/bs";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Loader from "../../component/Loader";
import ScrollToTop from "react-scroll-to-top";
import {toast} from "react-toastify";

export default function ManualLotteriesHistoryPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const {
    fetchlottery,
    lotteries,
    isLoading,
    fetchManualDrawTickets,
    fetchManualDrawUsers,
    fetchManualDrawHistory,
    manualDrawUsers,
    manualDrawHistory,
    updateManualDraw,
    isSaved,
  } = props;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({
    gameInformationId: "",
    winnerDetails: [
      {winnerUserId: "", ticketNumber: "", winRatio: "", tickets: []},
    ],
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchlottery();
  }, []);

  useEffect(() => {
    fetchManualDrawUsers(selected?.gameInformationId);
  }, [selected?.gameInformationId]);

  useEffect(() => {
    fetchManualDrawHistory({
      gameInformationId: selected?.gameInformationId,
      page,
      pageSize: limit,
      status: 1,
    });
  }, [selected?.gameInformationId, page, limit, search]);

  const count = manualDrawHistory.totalRecords;

  const addWinner = () => {
    setSelected((prevState) => ({
      ...prevState,
      winnerDetails: [
        ...prevState.winnerDetails,
        {winnerUserId: "", ticketNumber: "", winRatio: 0, tickets: []},
      ],
    }));
  };

  const deleteWinner = (index) => {
    setSelected((prevState) => ({
      ...prevState,
      winnerDetails: prevState.winnerDetails.filter((_, i) => i !== index),
    }));
  };

  const updateWinner = (index, e) => {
    const {name, value} = e.target;
    setSelected((prevState) => {
      const updatedDetails = [...prevState.winnerDetails];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [name]: value,
      };
      return {...prevState, winnerDetails: updatedDetails};
    });
  };

  const handleManualDrawTickets = async (index, e) => {
    const {value} = e.target;
    if (selected?.gameInformationId) {
      const res = await fetchManualDrawTickets({
        gameInformationId: selected.gameInformationId,
        id: value,
      });

      setSelected((prevState) => {
        const selectedTickets = new Set(
          prevState.winnerDetails.map((w) => w.ticketNumber)
        );

        const updatedDetails = [...prevState.winnerDetails];
        updatedDetails[index] = {
          ...updatedDetails[index],
          winnerUserId: value,
          tickets: res.filter((ticket) => !selectedTickets.has(ticket)),
        };

        return {...prevState, winnerDetails: updatedDetails};
      });
    }
  };

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

  const sumOfWinRatio = selected.winnerDetails.reduce(
    (sum, obj) => sum + +(obj["winRatio"] || 0),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketNumbers = selected.winnerDetails.map(
      (winner) => winner.ticketNumber
    );
    const hasDuplicates = new Set(ticketNumbers).size !== ticketNumbers.length;
    if (hasDuplicates) {
      toast("Each winner must have a unique ticket number!");
      return;
    }
    if (sumOfWinRatio === 100) {
      updateManualDraw({...selected, id: data.id});
    } else {
      toast("Win Ratio must sum up to 100%");
    }
  };

  useEffect(() => {
    if (isSaved) {
      setOpen(false);
    }
  }, [isSaved]);

  console.log(manualDrawHistory);

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
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Lotteries</li>
                    <li className="breadcrumb-item active">
                      <Link to="/manual-draw">Manual Draw History</Link>
                    </li>
                  </ol>
                </nav>
              </div>

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card px-3 pb-3">
                      <h5 className="card-title">Manual Draw History</h5>
                      <Form.Select
                        type="text"
                        onChange={(e) =>
                          setSelected({
                            ...selected,
                            gameInformationId: e.target.value,
                          })
                        }
                      >
                        {lotteries?.length &&
                          lotteries.map((item, i) => (
                            <>
                              {i == 0 && <option value="">Select</option>}
                              <option
                                value={item.gamePhases?.[0]?.gameInformationId}
                              >
                                {item?.gameName}
                              </option>
                            </>
                          ))}
                      </Form.Select>
                    </Card>
                  </Col>
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <div className="row d-flex align-items-center">
                          <div className="col-6">
                            <h5 className="card-title">Upload History</h5>
                          </div>
                          <div className="col-6 text-end"></div>
                        </div>
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
                          {/* <p>
                            Search : &nbsp;
                            <Form.Group>
                              <Form.Control
                                onChange={(e) => defineSearch(e.target.value)}
                                type="text"
                                placeholder="Account Number"
                                value={search}
                              />
                            </Form.Group>
                          </p> */}
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
                                  Draw Time{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Draw Schedule{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Winning Prize{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>{" "}
                                <th>
                                  Total Winners{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>{" "}
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
                              {manualDrawHistory &&
                                Array.isArray(manualDrawHistory.data) &&
                                manualDrawHistory.data.map((row, i) => {
                                  return (
                                    <tr key={row.id} className="tableTd">
                                      <td>{i + 1}</td>
                                      <td>
                                        {row?.gameDuration} {row?.gameTime}{" "}
                                        {row?.gameDay}
                                      </td>
                                      <td>
                                        {row?.gameFrequency === "1"
                                          ? "Daily"
                                          : row?.gameFrequency === "2"
                                          ? "Weekly"
                                          : "Monthly"}
                                      </td>
                                      <td>Rs.{row?.winningAmount}</td>{" "}
                                      <td>{row?.winnerDetails?.length}</td>{" "}
                                      <td>
                                        {row.status == 0 ? (
                                          <span className="badge rounded-pill bg-danger">
                                            Winning Upload Pending
                                          </span>
                                        ) : (
                                          <span className="badge rounded-pill bg-success">
                                            Winning Uploaded
                                          </span>
                                        )}
                                      </td>
                                      <td>
                                        <button
                                          onClick={() => {
                                            setOpen(!open);
                                            setData(row);
                                            if (row.winnerDetails) {
                                              setSelected({
                                                ...selected,
                                                winnerDetails:
                                                  row.winnerDetails,
                                              });
                                            }
                                          }}
                                          className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                                        >
                                          {row?.status
                                            ? "View"
                                            : "Upload Winning"}
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
            <Modal
              show={open}
              onHide={() => setOpen(!open)}
              centered
              size="lg"
              className="winning"
            >
              <Modal.Header closeButton>
                <h5 className="mb-0">Select Winners and Upload Result:</h5>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="border-bottom mb-2 pb-2">
                    <Col lg={6} md={6} sm={6}>
                      <h6>Draw Time:</h6>
                      {data?.gameDuration} {data?.gameTime} {data?.gameDay}
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <h6>Draw Schedule:</h6>{" "}
                      {data?.gameFrequency === "1"
                        ? "Daily"
                        : data?.gameFrequency === "2"
                        ? "Weekly"
                        : "Monthly"}
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <h6>Winning Prize:</h6>{" "}
                      {data?.winningAmount?.toLocaleString()} Rs.
                    </Col>
                  </Row>
                  {selected.winnerDetails?.length > 0 &&
                    selected.winnerDetails.map((item, index) => (
                      <>
                        <Row key={index} className="mb-3">
                          <Col lg={4} md={4} sm={4}>
                            <Form.Label>Select Customer:</Form.Label>
                            <Form.Control
                              name="winnerUserId"
                              value={item.winnerUserId}
                              readOnly
                            />
                          </Col>
                          <Col lg={3} md={3} sm={3}>
                            <Form.Label>Select Ticket:</Form.Label>
                            <Form.Control
                              name="ticketNumber"
                              required
                              value={item.ticketNumber}
                              readOnly
                            />
                          </Col>
                          <Col lg={2} md={2} sm={2}>
                            <Form.Label>Win Ratio:</Form.Label>
                            <InputGroup>
                              <Form.Control
                                type="text"
                                name="winRatio"
                                value={item.winRatio}
                                onChange={(e) => updateWinner(index, e)}
                                disabled={data.status}
                              />
                              <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>

                            {selected.winnerDetails.length - 1 === index && (
                              <div className="pt-2">{sumOfWinRatio}%</div>
                            )}
                          </Col>
                          <Col lg={3} md={3} sm={3}>
                            <Form.Label>Win Prize:</Form.Label>
                            <Form.Control
                              type="text"
                              readOnly
                              value={
                                ((parseFloat(
                                  selected.winnerDetails[index].winRatio
                                ) || 0) *
                                  data?.winningAmount) /
                                100
                              }
                            />
                            {selected.winnerDetails.length - 1 === index && (
                              <div className="pt-2">
                                Rs.
                                {selected.winnerDetails.reduce(
                                  (sum, obj) =>
                                    sum +
                                    +(
                                      ((parseFloat(obj["winRatio"]) || 0) *
                                        data?.winningAmount) /
                                        100 || 0
                                    ),
                                  0
                                )}
                              </div>
                            )}
                          </Col>
                        </Row>
                      </>
                    ))}
                </Form>
              </Modal.Body>
            </Modal>
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
