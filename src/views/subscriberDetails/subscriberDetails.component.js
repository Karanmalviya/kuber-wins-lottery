import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { confirmAlert } from "react-confirm-alert";
import ScrollToTop from "react-scroll-to-top";
import Loader from "../../component/Loader";

export default function SubscriberDetails(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const { CreateSendAllMail, isSaved, isLoading } = props;
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (isSaved) {
      navigate("/subscriber-list");
    }
  }, [isSaved]);

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
                <h1>Subscriber Details</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Subscriber Details
                    </li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}
              <div
                style={{
                  margin: "auto",
                  //   marginLeft: "500px",
                }}
              />
              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">All Subscriber Details</h5>

                        {/* <!-- Default Table --> */}
                        <div className="">
                          <form
                            action=""
                            className="profile-form"
                            onSubmit={(e) => {
                              e.preventDefault();
                              confirmAlert({
                                title: "Confirm to submit",
                                message: "Are you sure to send mail",
                                buttons: [
                                  {
                                    label: "Yes",
                                    onClick: () => {
                                      CreateSendAllMail({
                                        subject: subject,
                                        text: text,
                                      });
                                    },
                                  },
                                  {
                                    label: "No",
                                  },
                                ],
                              });
                            }}
                          >
                            <div className="row">
                              <div className=" col-lg-12 col-md-6 mb-3">
                                <label>Subject</label>
                                <input
                                  required
                                  className="form-control"
                                  placeholder=""
                                  type="text"
                                  onChange={(e) => setSubject(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-6 mb-3">
                                <label>Text</label>
                                <textarea
                                  required
                                  name="message"
                                  rows="5"
                                  cols="60"
                                  className="form-control"
                                  onChange={(e) => setText(e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                            <div className=" mt-3 d-flex justify-content-center ">
                              <button
                                className="btn btn-primary w-25 py-2 text-white"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
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
