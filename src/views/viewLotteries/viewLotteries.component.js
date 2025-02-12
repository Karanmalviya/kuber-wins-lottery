import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowUpShort } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Loader from "../../component/Loader";
import moment from "moment";
import "moment-timezone";
import ScrollToTop from "react-scroll-to-top";

const emptyData = {
  gameNumber: "00" + Math.floor(Math.random() * 100) + 1 + "LTL",
  gameName: "",
  gameSlogan: "",
  gameDuration: "",
  maxNumberTickets: "",
  ticketPrice: "",
  gameCurrency: "",
  minPrizePool: "",
  startTime: "",
  timeZone: "",
  instruction: "",
  status: 1,
};

export default function ViewLotteriesPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { lotteries, fetchlottery, isLoading, fetchGameReport, gameReport } =
    props;
  const { id } = useParams();
  const [selected, setSelected] = useState(emptyData);

  useEffect(() => {
    fetchlottery();
    fetchGameReport();
  }, []);

  useEffect(() => {
    if (!id || lotteries.length === 0 || !Object.keys(gameReport).length) {
      return;
    }
    const sel = lotteries.filter((x) => x.id == id);
    const sel1 = gameReport?.some_ticket?.filter((x) => x.id == id);
    if (sel && sel1) {
      setSelected({ ...sel[0], ...sel1[0] });
    }
  }, [id, lotteries, gameReport]);

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
                <h1>View Lottery</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">View Lottery</li>
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
                            Total Tickets Sold
                          </Form.Label>
                          <h6>{selected.sold}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-2 col-md-2 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Total Draw
                          </Form.Label>
                          <h6>{selected.totalDraw}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-2 col-md-2 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Total Winner
                          </Form.Label>
                          <h6>{selected.winnersLength}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-2 col-md-2 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Total Win Amount
                          </Form.Label>
                          <h6>Rs.{selected.winnersSum}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-2 col-md-2 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Total Win Amount
                          </Form.Label>
                          <h6>Rs.{selected?.sumOfPurchase}</h6>
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
                            Game Number<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>{selected.gameNumber}</h6>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Game Name<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>{selected.gameName}</h6>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Game Slogan<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>{selected.gameSlogan}</h6>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Game Start Date<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>{selected.gameDuration}</h6>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Max No. Tickets<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>{selected.maxNumberTickets}</h6>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Ticket Price<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>{selected.ticketPrice}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Per Person Buy Limiy{" "}
                            <span class="text-danger">*</span>
                          </Form.Label>

                          <h6>{selected?.buyTicketLimit}</h6>
                        </Col>

                        <Col lg={2} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Status <span class="text-danger">*</span>
                          </Form.Label>

                          <h6>{selected?.status ? "Active" : "Inactive"}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Minmum Prize Pool<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>{selected.minPrizePool}</h6>
                        </Col>
                        <Col lg={2} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Start Time<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>
                            {selected.startTime &&
                              selected.timeZone &&
                              convertUTCToLocalTime(
                                selected?.startTime,
                                selected?.timeZone
                              )}
                          </h6>
                        </Col>
                        <Col lg={2} className="col-lg-3 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Time Zone<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>{selected.timeZone}</h6>
                        </Col>
                        <Col lg={3} className="col-lg-3 col-md-3">
                          <img
                            src={selected.image}
                            class="img-fluid"
                            height={150}
                            width={150}
                          />
                        </Col>
                      </Row>
                      <Row className="row mb-3">
                        <Col lg={9} className="col-lg-9 col-md-9">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            {" "}
                            Instruction
                            <div
                              dangerouslySetInnerHTML={{
                                __html: selected.instruction,
                              }}
                            />
                          </Form.Label>
                        </Col>
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
