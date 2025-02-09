import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// page imports start
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
// page imports end
// React bootstrap start
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  InputGroup,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ScrollToTop from "react-scroll-to-top";
// React bootstrap end

export default function AllTicketDetailPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { fetchTicketEdit, singleTicket } = props;
  const id = useParams();
  const [images, setImages] = useState([""]);
  const addImage = () => {
    setImages(images.concat([""]));
  };
  const deleteImage = (index) => {
    setImages((images) => images.filter((x, i) => i !== index));
  };
  const updateImage = (i, v) => {
    const nextList = [...images];
    nextList[i] = v;
    setImages(nextList);
  };
  useEffect(() => {
    fetchTicketEdit(id);
  }, [id]);

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
            <main id="main" className="main">
              <div className="pagetitle">
                <h1>All Ticket Detail</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Ticket Details</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 text-start">
                            <h5 className="card-title">
                              <span className="badge bg-success text-white">
                                Open
                              </span>{" "}
                              [Ticket#{singleTicket.ticket_number}] Thank
                            </h5>
                          </div>
                          <div className="col-lg-6 col-md-6 text-end">
                            <button className="btn btn-danger btn-sm mt-3">
                              Close Ticket
                            </button>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <textarea
                              className="form-control"
                              rows="5"
                              cols="10"
                            ></textarea>
                            <p>
                              Attachments{" "}
                              <span className="text-danger">
                                Max 5 files can be uploaded. Maximum upload size
                                is 256M
                              </span>
                            </p>
                            <button className="btn btn-sm btn-success float-end px-5">
                              Replay
                            </button>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <h6>
                              Allowed File Extensions: .jpg, .jpeg, .png, .pdf,
                              .doc, .docx
                            </h6>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-lg-6">
                            <div className="field_wrapper">
                              {images.map((x, i) => {
                                return (
                                  <div className="mt-3 d-flex justify-content-center align-items-center">
                                    <Form.Control
                                      type="file"
                                      className="form-control"
                                      placeholder="select your file"
                                    />
                                    {i !== 0 ? (
                                      <a
                                        href="javascript:void(0);"
                                        onClick={() => deleteImage(i)}
                                        title="Remove field"
                                        className="ms-2 remove_button"
                                      >
                                        -
                                      </a>
                                    ) : (
                                      // <Button className="ms-2 remove_button" onClick={() => deleteImage(i)} title="Remove field">-</Button>
                                      <a
                                        href="javascript:void(0);"
                                        onClick={() => addImage()}
                                        title="Add Rows"
                                        className="ms-2 add_button"
                                      >
                                        +
                                      </a>
                                      // <Button className="ms-2 add_button" onClick={() => addImage()} title="Remove field">+</Button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-lg-12">
                            <div className="card p-4 border border-primary">
                              <div className="row">
                                <div className="col-lg-3 border-end border-primary">
                                  <p>Reklamniy-AgentBit</p>
                                </div>
                                <div className="col-lg-9 ps-lg-5">
                                  <p>
                                    Posted on Thursday, 22nd December 2022 @
                                    08:47
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-3 border-end border-primary">
                                  <p>@Reklamniy-AgentBit</p>
                                  <button className="btn btn-sm btn-danger float-end w-100">
                                    Delete
                                  </button>
                                </div>
                                <div className="col-lg-9 ps-lg-5">
                                  <p>
                                    Агентство наружной рекламы
                                    {/* <a href="http://maps.google.ro/url?q=http://1avtoskupka.ru>http://google.com.gh/url?q=https://1avtoskupka.ru"></a> */}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
      <></>
    </>
  );
}
