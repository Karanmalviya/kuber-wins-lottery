import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Table,
} from "react-bootstrap";
import Loader from "../../component/Loader";
import ScrollToTop from "react-scroll-to-top";

export default function ReferalPage(props) {
  const {
    createReferalUser,
    fetchLevelPercent,
    updatereferalstatus,
    referals,
    isSaved,
    isLoading,
  } = props;
  const [openSidebar, setOpenSidebar] = useState(false);
  const [depositDisableBtn, setDepositDisableBtn] = useState("depositEnable");
  const [buyDisableBtn, setBuyDisableBtn] = useState("buyEnable");
  const [winDisableBtn, setWinDisableBtn] = useState("winEnable");
  const [numBlocks, setNumBlocks] = useState(0);
  const [numBlocksSecond, setNumBlocksSecond] = useState(0);
  const [numBlocksThird, setNumBlocksThird] = useState(0);
  const [depositFilter, setDepositFilter] = useState("");
  const [buyFilter, setBuyFilter] = useState("");
  const [winFilter, setWinFilter] = useState("");
  const [formData, setFormDate] = useState({
    depositpercent: "",
    depositlevel: "",
    buypercent: "",
    buylevel: "",
    winlevel: "",
    winpercent: "",
  });
  useEffect(() => {
    fetchLevelPercent();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormDate({ ...formData, [name]: value });
  };

  useEffect(() => {
    const depositFiltered = referals?.filter(
      (per) => per.commission_type === "deposit"
    );
    const buyFiltered = referals?.filter(
      (per) => per.commission_type === "buy"
    );
    const winFiltered = referals?.filter(
      (per) => per.commission_type === "win"
    );

    setDepositFilter(depositFiltered?.[0]?.status);
    setBuyFilter(buyFiltered?.[0]?.status);
    setWinFilter(winFiltered?.[0]?.status);
  }, [referals]);

  const handleDeleteFirstRow = (index) => {
    blocks.splice(index, 1);
    setNumBlocks(blocks.length);
  };

  var blocks = [];
  for (let i = 0; i < numBlocks; i++) {
    blocks.push(
      <Row>
        <Col key={i} className="mt-3 input-group">
          <div className="input-group-text" style={{ fontWeight: "bold" }}>
            Level
          </div>
          <Form.Control
            type="number"
            className="form-control formWidth"
            // placeholder={i + 1}
            value={i + 1}
            name="depositlevel"
            id="depositidlevel"
            disabled={depositDisableBtn === "depositDisable"}
            style={{ fontWeight: "bold" }}
            required
          />
        </Col>

        <Col lg={4} className="mt-3">
          <Form.Control
            type="number"
            className="form-control formWidth"
            placeholder="Enter % of Commission"
            // value={percent}
            name={`depositpercent${i}`}
            id="depositidpercent"
            onChange={handleFormChange}
            disabled={depositDisableBtn === "depositDisable"}
            required
          />
        </Col>
        <Col lg={1}>
          <button
            className="btn btn-danger mt-3 "
            style={{ width: 40, height: 35 }}
            onClick={() => handleDeleteFirstRow(i)}
            disabled={depositDisableBtn === "depositDisable"}
          >
            <RxCross1 />
          </button>
        </Col>
      </Row>
    );
  }

  const handleDeleteSecondRow = (index) => {
    secondblocks.splice(index, 1);
    setNumBlocksSecond(secondblocks.length);
  };

  var secondblocks = [];
  for (let i = 0; i < numBlocksSecond; i++) {
    secondblocks.push(
      <Row>
        <Col key={i} className="mt-3 input-group">
          <div className="input-group-text" style={{ fontWeight: "bold" }}>
            Level
          </div>
          <Form.Control
            type="number"
            className="form-control formWidth"
            // placeholder={i + 1}
            value={i + 1}
            name="buylevel"
            id="buyidlevel"
            disabled={buyDisableBtn === "buyDisable"}
            style={{ fontWeight: "bold" }}
            required
          />
        </Col>

        <Col lg={4} className="mt-3">
          <Form.Control
            type="number"
            className="form-control formWidth"
            placeholder="Enter % of Commission"
            // value={percent}
            name={`buypercent${i}`}
            id="buyidpercent"
            onChange={handleFormChange}
            disabled={buyDisableBtn === "buyDisable"}
            required
          />
        </Col>
        <Col lg={1}>
          <button
            className="btn btn-danger mt-3 "
            style={{ width: 40, height: 35 }}
            onClick={() => handleDeleteSecondRow(i)}
            disabled={buyDisableBtn === "buyDisable"}
          >
            <RxCross1 />
          </button>
        </Col>
      </Row>
    );
  }

  const handleDeleteThirdRow = (index) => {
    thirdblocks.splice(index, 1);
    setNumBlocksThird(thirdblocks.length);
  };
  var thirdblocks = [];
  for (let i = 0; i < numBlocksThird; i++) {
    thirdblocks.push(
      <Row>
        <Col key={i} className="mt-3 input-group">
          <div className="input-group-text" style={{ fontWeight: "bold" }}>
            Level
          </div>
          <Form.Control
            type="number"
            className="form-control formWidth"
            // placeholder={i + 1}
            value={i + 1}
            name="winlevel"
            id="winidlevel"
            disabled={winDisableBtn === "winDisable"}
            style={{ fontWeight: "bold" }}
            required
          />
        </Col>

        <Col lg={4} className="mt-3">
          <Form.Control
            type="number"
            className="form-control formWidth"
            placeholder="Enter % of Commission"
            // value={percent}
            name={`winpercent${i}`}
            id="winidpercent"
            onChange={handleFormChange}
            disabled={winDisableBtn === "winDisable"}
            required
          />
        </Col>
        <Col lg={1}>
          <button
            className="btn btn-danger mt-3 "
            style={{ width: 40, height: 35 }}
            onClick={() => handleDeleteThirdRow(i)}
            disabled={winDisableBtn === "winDisable"}
          >
            <RxCross1 />
          </button>
        </Col>
      </Row>
    );
  }

  const handleCommissionPost = async (
    e,
    levelType,
    percentPrefix,
    commissionType
  ) => {
    e.preventDefault();
    const levels = Number(formData?.[levelType]);
    const resArray = [];

    for (let i = 0; i < levels; i++) {
      const percentKey = `${percentPrefix}${i}`;
      const percentValue = formData[percentKey];

      if (!percentValue) {
        alert(`Please fill out field ${i + 1}.`);
        return;
      }

      resArray.push({
        level: (i + 1).toString(),
        percent: percentValue,
        commission_type: commissionType,
      });
    }

    if (resArray.length === 0) {
      alert("Please fill out at least one field.");
    } else {
      await createReferalUser(resArray);
      await updatereferalstatus({ commission_type: commissionType, status: 1 });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const generateLevel = async (e) => {
    e.preventDefault();
    if (!formData.depositlevel) {
      alert("Please enter a value for the deposit level.");
      return;
    }
    setNumBlocks(formData.depositlevel);
  };

  const generateLevelSecond = async (e) => {
    e.preventDefault();
    if (!formData.buylevel) {
      alert("Please enter a value for the buy level.");
      return;
    }
    setNumBlocksSecond(formData.buylevel);
  };
  const generateLevelThird = async (e) => {
    e.preventDefault();
    if (!formData.winlevel) {
      alert("Please enter a value for the win level.");
      return;
    }
    setNumBlocksThird(formData.winlevel);
  };

  const handleButtonClick = async () => {
    if (depositFilter === 0) {
      const body = {
        commission_type: "deposit",
        status: 1,
      };
      const res3 = await updatereferalstatus(body);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setDepositDisableBtn("depositDisable");
    } else {
      setDepositDisableBtn("depositEnable");
      const body = {
        commission_type: "deposit",
        status: 0,
      };
      const res3 = await updatereferalstatus(body);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.innerText = "Click To Disable";
    }
  };
  const handleButtonSecondClick = async () => {
    if (buyFilter === 0) {
      const body = {
        commission_type: "buy",
        status: 1,
      };
      const res3 = await updatereferalstatus(body);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setBuyDisableBtn("buyDisable");
    } else {
      setBuyDisableBtn("buyEnable");
      const body = {
        commission_type: "buy",
        status: 0,
      };
      const res3 = await updatereferalstatus(body);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.innerText = "Click To Disable";
    }
  };

  const handleButtonThirdClick = async () => {
    if (winFilter === 0) {
      const body = {
        commission_type: "win",
        status: 1,
      };
      const res3 = await updatereferalstatus(body);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setWinDisableBtn("winDisable");
    } else {
      setWinDisableBtn("winEnable");
      const body = {
        commission_type: "win",
        status: 0,
      };
      const res3 = await updatereferalstatus(body);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.innerText = "Click To Disable";
    }
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
                <h1>Manage Referral</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Manage Referral</li>
                    <li className="breadcrumb-item active">
                      Referral Commission
                    </li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={4} className="col-lg-4">
                    <Card className="card" style={{ borderColor: "#5263ef" }}>
                      <Card.Header
                        className="text-white"
                        style={{
                          backgroundColor: "#5263ef",
                          fontWeight: "bold",
                        }}
                      >
                        Deposit Commission{" "}
                        {depositFilter === 1 ? (
                          <button
                            style={{
                              backgroundColor: "#198754",
                              borderRadius: 10,
                              marginLeft: 10,
                              color: "white",
                            }}
                          >
                            Enabled
                          </button>
                        ) : (
                          <button
                            style={{
                              backgroundColor: "#DC3545",
                              borderRadius: 10,
                              marginLeft: 10,
                              color: "white",
                            }}
                          >
                            Disabled
                          </button>
                        )}
                      </Card.Header>
                      <Card.Body className="card-body pt-2">
                        <Row className="mt-3">
                          <Col lg={12} className="text-center">
                            <Button
                              type="submit"
                              className={
                                depositFilter === 0
                                  ? "btn btn-xs btn-success"
                                  : "btn btn-xs btn-danger"
                              }
                              onClick={handleButtonClick}
                            >
                              {depositFilter === 0
                                ? "Click To Enable"
                                : "Click To Disable"}
                            </Button>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Table>
                            <thead>
                              <tr
                                style={{
                                  backgroundColor: "#5263ef",
                                  border: 6,
                                }}
                              >
                                <th
                                  style={{
                                    color: "white",
                                    fontWeight: "normal",
                                  }}
                                >
                                  Level
                                </th>
                                <th
                                  style={{
                                    color: "white",
                                    fontWeight: "normal",
                                    float: "right",
                                    marginRight: 50,
                                  }}
                                >
                                  Commission
                                </th>
                              </tr>
                            </thead>
                          </Table>
                          <Row className="row">
                            <Col lg={12}>
                              <Form.Control
                                className="form-control formWidth"
                                placeholder="Deposit Commission"
                                // value={type}
                                // onChange={handleFormChange}
                                readOnly
                                style={{
                                  fontWeight: "bold",
                                }}
                                hidden
                              />
                            </Col>

                            <div>
                              {referals.map((item, index) => {
                                return (
                                  item.commission_type === "deposit" && (
                                    <div
                                      key={index}
                                      className="row"
                                      disabled={
                                        depositDisableBtn === "depositDisable"
                                      }
                                    >
                                      <Col
                                        className="col-lg-6 mt-3"
                                        disabled={
                                          depositDisableBtn === "depositDisable"
                                        }
                                        style={{
                                          fontFamily: "sans-serif",
                                        }}
                                      >
                                        Level# {item?.level}
                                      </Col>
                                      <Col
                                        className="col mt-3 "
                                        disabled={
                                          depositDisableBtn === "depositDisable"
                                        }
                                        style={{
                                          fontFamily: "sans-serif",
                                          marginLeft: 40,
                                        }}
                                      >
                                        {item?.percent}%
                                      </Col>
                                    </div>
                                  )
                                );
                              })}
                            </div>
                            <Col lg={8} className="mt-3">
                              <Form.Control
                                type="number"
                                className="form-control formWidth"
                                placeholder="Enter Level"
                                // value={level}
                                name="depositlevel"
                                id="depositidlevel"
                                onChange={handleFormChange}
                                disabled={depositFilter === 0 ? true : false}
                                required
                              />
                            </Col>

                            <Col lg={4}>
                              <Button
                                type="submit"
                                className="btn btn-success mt-3"
                                disabled={depositFilter === 0 ? true : false}
                                onClick={generateLevel}
                              >
                                Generate
                              </Button>
                            </Col>
                            <h6
                              style={{
                                color: "green",
                                textAlign: "center",
                                marginTop: 10,
                              }}
                            >
                              Deposit Comission with set of Levels
                              {blocks}
                            </h6>
                            <Col lg={12}>
                              <button
                                hidden={blocks.length > 0 ? false : true}
                                className="btn btn-primary mt-3"
                                type="submit"
                                disabled={depositFilter === 0 ? true : false}
                                onClick={(e) =>
                                  handleCommissionPost(
                                    e,
                                    "depositlevel",
                                    "depositpercent",
                                    "deposit"
                                  )
                                }
                                style={{ marginLeft: 120 }}
                              >
                                Submit
                              </button>
                            </Col>
                          </Row>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={4} className="col-lg-4">
                    <Card className="card" style={{ borderColor: "#5263ef" }}>
                      <Card.Header
                        className="text-white"
                        style={{
                          backgroundColor: "#5263ef",
                          fontWeight: "bold",
                        }}
                      >
                        Buy Commission{" "}
                        {buyFilter === 1 ? (
                          <button
                            style={{
                              backgroundColor: "#198754",
                              borderRadius: 10,
                              marginLeft: 30,
                              color: "white",
                            }}
                          >
                            Enabled
                          </button>
                        ) : (
                          <button
                            style={{
                              backgroundColor: "#DC3545",
                              borderRadius: 10,
                              marginLeft: 30,
                              color: "white",
                            }}
                          >
                            Disabled
                          </button>
                        )}
                      </Card.Header>
                      <Card.Body className="card-body pt-2">
                        <Row className="mt-3">
                          <Col lg={12} className="text-center">
                            <Button
                              type="submit"
                              className={
                                buyFilter === 0
                                  ? "btn btn-xs btn-success"
                                  : "btn btn-xs btn-danger"
                              }
                              onClick={handleButtonSecondClick}
                            >
                              {buyFilter === 0
                                ? "Click to Enable"
                                : "Click to Disable"}
                            </Button>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Table>
                            <thead>
                              <tr
                                style={{
                                  backgroundColor: "#5263ef",
                                  border: 6,
                                }}
                              >
                                <th
                                  style={{
                                    color: "white",
                                    fontWeight: "normal",
                                  }}
                                >
                                  Level
                                </th>
                                <th
                                  style={{
                                    color: "white",
                                    fontWeight: "normal",
                                    float: "right",
                                    marginRight: 50,
                                  }}
                                >
                                  Commission
                                </th>
                              </tr>
                            </thead>
                          </Table>
                          <Row className="row">
                            <Col lg={12}>
                              <Form.Control
                                className="form-control formWidth"
                                placeholder="Buy Commission"
                                // value={type}
                                // onChange={handleFormChange}
                                readOnly
                                style={{
                                  fontWeight: "bold",
                                }}
                                hidden
                              />
                            </Col>
                            <div>
                              {referals.map((item, index) => {
                                return (
                                  item.commission_type === "buy" && (
                                    <div
                                      key={index}
                                      className="row"
                                      disabled={buyDisableBtn === "buyDisable"}
                                    >
                                      <Col
                                        className="col-lg-6 mt-3"
                                        disabled={
                                          buyDisableBtn === "buyDisable"
                                        }
                                        style={{
                                          fontFamily: "sans-serif",
                                        }}
                                      >
                                        Level# {item?.level}
                                      </Col>
                                      <Col
                                        className="col mt-3 "
                                        disabled={
                                          buyDisableBtn === "buyDisable"
                                        }
                                        style={{
                                          fontFamily: "sans-serif",
                                          marginLeft: 40,
                                        }}
                                      >
                                        {item?.percent}%
                                      </Col>
                                    </div>
                                  )
                                );
                              })}
                            </div>
                            <Col lg={8} className="mt-3">
                              <Form.Control
                                type="number"
                                className="form-control formWidth"
                                placeholder="Enter Level"
                                // value={level}
                                name="buylevel"
                                id="buyidlevel"
                                onChange={handleFormChange}
                                disabled={buyFilter === 0 ? true : false}
                                required
                              />
                            </Col>

                            <Col lg={4}>
                              <Button
                                type="submit"
                                className="btn btn-success mt-3"
                                disabled={buyFilter === 0 ? true : false}
                                onClick={generateLevelSecond}
                              >
                                Generate
                              </Button>
                            </Col>
                            <h6
                              style={{
                                color: "green",
                                textAlign: "center",
                                marginTop: 10,
                              }}
                            >
                              Buy Comission with set of Levels
                              {secondblocks}
                            </h6>
                            <Col lg={12}>
                              <button
                                hidden={secondblocks.length > 0 ? false : true}
                                className="btn btn-primary mt-3"
                                type="submit"
                                disabled={buyDisableBtn === "buyDisable"}
                                onClick={(e) =>
                                  handleCommissionPost(
                                    e,
                                    "buylevel",
                                    "buypercent",
                                    "buy"
                                  )
                                }
                                style={{ marginLeft: 120 }}
                              >
                                Submit
                              </button>
                            </Col>
                          </Row>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={4} className="col-lg-4">
                    <Card className="card" style={{ borderColor: "#5263ef" }}>
                      <Card.Header
                        className="text-white"
                        style={{
                          backgroundColor: "#5263ef",
                          fontWeight: "bold",
                        }}
                      >
                        Win Commission{" "}
                        {winFilter === 1 ? (
                          <button
                            style={{
                              backgroundColor: "#198754",
                              borderRadius: 10,
                              marginLeft: 30,
                              color: "white",
                            }}
                          >
                            Enabled
                          </button>
                        ) : (
                          <button
                            style={{
                              backgroundColor: "#DC3545",
                              borderRadius: 10,
                              marginLeft: 30,
                              color: "white",
                            }}
                          >
                            Disabled
                          </button>
                        )}
                      </Card.Header>
                      <Card.Body className="card-body pt-2">
                        <Row className="mt-3">
                          <Col lg={12} className="text-center">
                            <Button
                              type="submit"
                              className={
                                winFilter === 0
                                  ? "btn btn-xs btn-success"
                                  : "btn btn-xs btn-danger"
                              }
                              onClick={handleButtonThirdClick}
                            >
                              {winFilter === 0
                                ? "Click to Enable"
                                : "Click to Disable"}
                            </Button>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Table>
                            <thead>
                              <tr
                                style={{
                                  backgroundColor: "#5263ef",
                                  border: 6,
                                }}
                              >
                                <th
                                  style={{
                                    color: "white",
                                    fontWeight: "normal",
                                  }}
                                >
                                  Level
                                </th>
                                <th
                                  style={{
                                    color: "white",
                                    fontWeight: "normal",
                                    float: "right",
                                    marginRight: 50,
                                  }}
                                >
                                  Commission
                                </th>
                              </tr>
                            </thead>
                          </Table>
                          <Row className="row">
                            <Col lg={12}>
                              <Form.Control
                                className="form-control formWidth"
                                placeholder="Win Commission"
                                // value={type}
                                // onChange={handleFormChange}
                                readOnly
                                style={{
                                  fontWeight: "bold",
                                }}
                                hidden
                              />
                            </Col>

                            <div>
                              {referals.map((item, index) => {
                                return (
                                  item.commission_type === "win" && (
                                    <div key={index} className="row">
                                      <Col
                                        className="col-lg-7 mt-3 ms-1"
                                        style={{
                                          fontFamily: "sans-serif",
                                        }}
                                      >
                                        Level# {item?.level}
                                      </Col>
                                      <Col
                                        className="col-lg-4 mt-3"
                                        style={{
                                          fontFamily: "sans-serif",
                                        }}
                                      >
                                        {item?.percent}%
                                      </Col>
                                    </div>
                                  )
                                );
                              })}
                            </div>
                            <Col lg={8} className="mt-3">
                              <Form.Control
                                type="number"
                                className="form-control formWidth"
                                placeholder="Enter Level"
                                // value={level}
                                name="winlevel"
                                id="winidlevel"
                                onChange={handleFormChange}
                                disabled={winFilter === 0 ? true : false}
                                required
                              />
                            </Col>

                            <Col lg={4}>
                              <Button
                                type="submit"
                                className="btn btn-success mt-3"
                                disabled={winFilter === 0 ? true : false}
                                onClick={generateLevelThird}
                              >
                                Generate
                              </Button>
                            </Col>
                            <h6
                              style={{
                                color: "green",
                                textAlign: "center",
                                marginTop: 10,
                              }}
                            >
                              Win Comission with set of Levels
                              {thirdblocks}
                            </h6>
                            <Col lg={12}>
                              <button
                                hidden={thirdblocks.length > 0 ? false : true}
                                className="btn btn-primary mt-3"
                                type="submit"
                                disabled={winFilter === 0 ? true : false}
                                onClick={(e) =>
                                  handleCommissionPost(
                                    e,
                                    "winlevel",
                                    "winpercent",
                                    "win"
                                  )
                                }
                                style={{ marginLeft: 120 }}
                              >
                                Submit
                              </button>
                            </Col>
                          </Row>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>
            </main>
            {/* <!-- End #main --> */}
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
      <ToastContainer />
    </>
  );
}
