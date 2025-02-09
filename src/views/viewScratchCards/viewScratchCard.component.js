import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// page imports start
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
// page imports end
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React bootstrap start
import { Container, Row, Col } from "react-bootstrap";
import { BsArrowUpShort } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Loader from "../../component/Loader";

import moment from "moment";
import "moment-timezone";
import ScrollToTop from "react-scroll-to-top";

export default function ViewScratchCard(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [discount, setDiscount] = useState([]);

  const {
    fetchScratchCard,
    fetchScratchCardById,
    isLoading,
    scratchcard,
    scratchcardId,
    fetchScratchGameReport,
    scratchGameReport,
  } = props;
  const { id } = useParams();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchScratchCard();
    fetchScratchGameReport();
    if (id) fetchScratchCardById(id);
  }, [id]);

  useEffect(() => {
    if (
      !id ||
      Object.keys(scratchGameReport).length === 0 ||
      !Object.keys(scratchGameReport).length
    ) {
      return;
    }
    // const sel = scratchcard.find((x) => x.id === +id);
    const sel = scratchcardId;
    const sel1 = scratchGameReport.Cards.find((x) => x.id === +id);
    if (sel && sel1) {
      setSelected({ ...sel, ...sel1 });
      setDiscount(sel.discountTicket ? JSON.parse(sel.discountTicket) : [""]);
    }
  }, [id, scratchcardId, scratchGameReport]);

  function convertUTCToLocalTime(utcTime, timeZone) {
    const localDateTime = moment
      .utc(utcTime, "HH:mm")
      .tz(timeZone)
      .format("HH:mm");
    return localDateTime;
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
                <h1>View Scratch Card</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      View Scratch Card
                    </li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Col lg={12} className="col-lg-12">
                  <Card className="card">
                    <Card.Body className="card-body pt-2">
                      <Row className="row">
                        <Col lg={2} className="col-lg-2 col-md-2 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Total Scratch Card Sold
                          </Form.Label>
                          <h6>{selected.scratchDrawCount}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-2 col-md-2 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Total Reschedule
                          </Form.Label>
                          <h6>{selected.rescheduleTime}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-2 col-md-2 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Total Winner
                          </Form.Label>
                          <h6>{selected.winnerCount}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-2 col-md-2 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Total Win Amount
                          </Form.Label>
                          <h6>${selected?.totalAmount?.toLocaleString()}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-2 col-md-2 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Total Sold Amount
                          </Form.Label>
                          <h6>${selected?.sumOfAmount?.toLocaleString()}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-2 col-md-2 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Scratch Card Type
                          </Form.Label>
                          <h6 className="text-capitalize">
                            {selected?.card_type?.replace("-", " ")}
                          </h6>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className="card">
                    <Card.Body className="card-body pt-2">
                      <Row className="row">
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Scratch Card Name
                          </Form.Label>
                          <h6>{selected.card_name}</h6>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Scratch Card Price
                          </Form.Label>
                          <h6>${selected.ticketPrize?.toLocaleString()}</h6>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Top Prize
                          </Form.Label>
                          <h6>${selected.topPrize?.toLocaleString()}</h6>
                        </Col>{" "}
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Scratch Card Buy Limit{" "}
                          </Form.Label>
                          <h6>{selected.buyTicketLimit}</h6>
                        </Col>
                        {/* </Row>
                      <Row className="row"> */}
                        {selected.card_type === "single-scratch" ? null : (
                          <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                            <Form.Label
                              for="inputText"
                              className="col-form-label"
                            >
                              Start Time
                            </Form.Label>
                            <h6>
                              {selected.startTime &&
                                selected.timeZone &&
                                convertUTCToLocalTime(
                                  selected.startTime,
                                  selected.timeZone
                                )}
                            </h6>
                          </Col>
                        )}
                        {selected.card_type === "single-scratch" ? null : (
                          <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                            <Form.Label
                              for="inputText"
                              className="col-form-label"
                            >
                              Frequency
                            </Form.Label>

                            <h6>
                              {selected.frequency &&
                                JSON.parse(selected.frequency)[0]
                                  .frequency}{" "}
                              :{" "}
                              <span className="text-capitalize">
                                {selected.frequency &&
                                  JSON.parse(selected.frequency)[0].schedule}
                              </span>
                            </h6>
                          </Col>
                        )}
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Status
                          </Form.Label>
                          <h6>{selected.status ? "Active" : "DeActive"}</h6>
                        </Col>{" "}
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Odds of Wins
                          </Form.Label>
                          <h6>{selected.odds_of_win}</h6>
                        </Col>
                        {/* </Row>
                      <Row className="row"> */}
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Odds of loss
                          </Form.Label>
                          <h6>{selected.odds_of_loss}</h6>
                        </Col>{" "}
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            UnMatched Message
                          </Form.Label>

                          <h6>
                            {selected.unmatchedMessage
                              ? selected.unmatchedMessage
                              : "AL"}
                          </h6>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Matched Message
                          </Form.Label>
                          <h6>{selected.matchMessage}</h6>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Game Slogan
                          </Form.Label>
                          <h6>{selected.game_slogan}</h6>
                        </Col>{" "}
                        {/* </Row>

                      <Row className="row"> */}
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            End Date
                          </Form.Label>

                          <h6>
                            {selected.endDate === "0"
                              ? "N/A"
                              : selected.endDate}
                          </h6>
                        </Col>{" "}
                        {selected.card_type === "single-scratch" ? (
                          <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                            <Form.Label
                              for="inputText"
                              className="col-form-label"
                            >
                              Max No. of Scratchers{" "}
                            </Form.Label>

                            <h6>{selected.maxNumberCard}</h6>
                          </Col>
                        ) : null}
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Circle Background Color
                          </Form.Label>
                          <div className="w-75 p-1 card">
                            <div
                              style={{
                                border: "1px solid #CFCFD0",
                                borderRadius: "0.375rem",
                                background: selected?.circle_bg,
                                height: "20px",
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Circle Font Color
                          </Form.Label>
                          <div className="w-75 p-1 card">
                            <div
                              style={{
                                border: "1px solid #CFCFD0",
                                borderRadius: "0.375rem",
                                background: selected?.fontColor,
                                height: "20px",
                              }}
                            />
                          </div>
                        </Col>{" "}
                        {/* </Row>

                      <Row className="row"> */}
                        {/* <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            End Date
                          </Form.Label>

                          <h6>
                            {selected.endDate === "0"
                              ? "N/A"
                              : selected.endDate}
                          </h6>
                        </Col>{" "} */}
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Time Zone
                          </Form.Label>
                          <h6>{selected.timeZone}</h6>
                        </Col>
                        <Col lg={6} className="col-lg-6 col-md-6 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Game Features
                          </Form.Label>
                          <h6>
                            {" "}
                            <div
                              dangerouslySetInnerHTML={{
                                __html: selected.game_Features,
                              }}
                            />
                          </h6>
                        </Col>{" "}
                      </Row>
                      <Row className="row">
                        <Col lg={4} className="col-lg-4 col-md-4 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label d-block"
                          >
                            Scratch Card Image
                          </Form.Label>
                          <img
                            src={selected.image}
                            width={"150px"}
                            height={"150px"}
                            className="d-block"
                          />
                        </Col>
                        <Col lg={4} className="col-lg-4 col-md-4 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label d-block"
                          >
                            Scratch Card Image
                          </Form.Label>
                          <img
                            src={selected.image1}
                            width={"150px"}
                            height={"150px"}
                            className="d-block"
                          />
                        </Col>
                        <Col lg={4} className="col-lg-4 col-md-4 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label d-block"
                          >
                            Scratch Card Image
                          </Form.Label>
                          <img
                            src={selected.image2}
                            width={"150px"}
                            height={"150px"}
                            className="d-block"
                          />
                        </Col>
                      </Row>

                      <Row>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">Discount Ticket</th>
                              <th scope="col">Discount Percent</th>
                            </tr>
                          </thead>
                          <tbody>
                            {discount !== null ? (
                              discount.map((item, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{item.discountTicket}</td>
                                  <td>{item.discountPercent}%</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td>N/A</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </Row>
                      <Row>
                        {/* <h5>Game Features</h5> */}
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">Odds of price</th>
                              <th scope="col">Price</th>
                              <th scope="col">RNG</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selected.ScratchTables &&
                              selected.ScratchTables.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.odds_of_price}%</td>
                                    <td>
                                      ${Number(item.price)?.toLocaleString()}
                                    </td>
                                    <td>{item.rng}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
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
