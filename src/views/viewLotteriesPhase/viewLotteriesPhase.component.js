import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// page imports start
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
// page imports end
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React bootstrap start
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowUpShort } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// React bootstrap end
import Loader from "../../component/Loader";
import ScrollToTop from "react-scroll-to-top";

const emptyCounter = {
  frequency: "",
  prize: "",
  winners: "",
  schedules: [],
  eligible: "",
  odds_winner: "",
  odds_out_of_winner: "",
};
// image: null,

export default function ViewLotteriesPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { lotteryPhase, isLoading } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(emptyCounter);
  useEffect(() => {
    if (id) {
      const sel = lotteryPhase.filter((x) => x.id == id);
      if (sel.length > 0) {
        setSelected(sel[0]);
      }
      if (lotteryPhase.length === 0) {
        navigate("/lottery-phases");
      }
    }
  }, []);

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
                        <Col lg={2} className="col-lg-2 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Game<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>
                            {selected["gameInformation"]
                              ? selected["gameInformation"].gameName
                              : ""}
                          </h6>
                        </Col>
                        <Col lg={2} className="col-lg-4 col-md-3 mb-3">
                          <Form.Label
                            for="inputText"
                            className="col-form-label"
                          >
                            Game No<span class="text-danger">*</span>
                          </Form.Label>
                          <h6>{selected.game ? selected.game : ""}</h6>
                        </Col>
                      </Row>

                      <Row>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Frequency</th>
                              <th>Schedules</th>
                              {/* <th>Prize</th> */}
                              {/* <th>Winners</th> */}
                              <th>Odds of Win/Loss</th>
                              <th>Eligible Ticket</th>
                              <th>Odds of price</th>
                              <th>Price</th>{" "}
                            </tr>
                          </thead>
                          <tbody>
                            {selected.gameData &&
                              Object.entries(JSON.parse(selected.gameData)).map(
                                ([i, value]) => {
                                  return (
                                    <>
                                      <tr>
                                        {" "}
                                        <td>
                                          {value.frequency === "1"
                                            ? "Daily"
                                            : ""}
                                          {value.frequency === "2"
                                            ? "Weekly"
                                            : ""}
                                          {value.frequency === "3"
                                            ? "Monthly"
                                            : ""}
                                        </td>
                                        <td className="text-capitalize">
                                          {value.schedules.length > 0
                                            ? value.schedules
                                                .sort(function (a, b) {
                                                  return a.value - b.value;
                                                })
                                                .map((val, idx) => {
                                                  return val.value.length ===
                                                    1 || val.value.length === 2
                                                    ? "Day " +
                                                        val.value +
                                                        (value.schedules
                                                          .length -
                                                          1 >
                                                        idx
                                                          ? ", "
                                                          : "")
                                                    : val.value +
                                                        (value.schedules
                                                          .length -
                                                          1 >
                                                        idx
                                                          ? ", "
                                                          : "");
                                                })
                                            : "Daily"}
                                        </td>
                                        <td>
                                          {value.odds_of_win}/
                                          {100 - value.odds_of_win}
                                        </td>
                                        <td>
                                          {value.eligible === "1" ? "Sold" : ""}
                                          {value.eligible === "2"
                                            ? "Unsold"
                                            : ""}
                                          {value.eligible === "3" ? "All" : ""}
                                        </td>
                                        <td>
                                          <table className="table table-bordered">
                                            <tbody>
                                              {value.table.map((item) => (
                                                <tr>
                                                  <td>{item.odds_of_price}%</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </td>
                                        <td>
                                          <table className="table table-bordered">
                                            <tbody>
                                              {value.table.map((item) => (
                                                <tr>
                                                  <td>Rs.{item.prize}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                }
                              )}
                          </tbody>
                        </Table>
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
