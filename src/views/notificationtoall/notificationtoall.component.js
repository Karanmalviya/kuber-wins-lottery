import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

// page imports start
import { HeaderPageContainer } from "./../../component/header/header.container";
import { SidebarPageContainer } from "./../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "./../../component/footer/footer.container";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// page imports end

// React bootstrap start
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowUpShort } from "react-icons/bs";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "react-scroll-to-top";
// React bootstrap end
const emptyObj = {
  subject: "",
  message: "",
  email: "",
};
export default function NotificationToAllPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const { sendMail, sendMailAll, tickets } = props;
  const [selected, setSelected] = useState(emptyObj);
  let emailArr = [];
  if (tickets.length > 0) {
    tickets.map((x) => {
      emailArr.push({ email: x.email, fname: x.fname, lname: x.lname });
    });
  }
  useEffect(() => {
    if (tickets.length == 0) {
      navigate("/all-users");
    }
    setSelected({
      ...selected,
      email: emailArr,
    });
  }, []);
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
                <h1>Send Mail to All</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Send Mail to All</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12} className="col-lg-12">
                    <Card className="card">
                      <Card.Body className="card-body pt-2">
                        {/* <!-- General Form Elements --> */}
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            sendMailAll({
                              subject: selected.subject,
                              html: selected.message,
                            });
                          }}
                        >
                          <Row className="row">
                            <Col
                              lg={12}
                              md={12}
                              className="col-lg-12 col-md-12 mb-12"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Subject<span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                onChange={(e) => {
                                  setSelected({
                                    ...selected,
                                    subject: e.target.value,
                                  });
                                }}
                                type="text"
                                required
                                className="form-control formWidth"
                              />
                            </Col>
                            <Col
                              lg={12}
                              md={12}
                              className="col-lg-12 col-md-12 mb-12"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Message<span className="text-danger">*</span>
                              </Form.Label>
                              <CKEditor
                                editor={ClassicEditor}
                                onReady={(editor) => {
                                  // You can store the "editor" and use when it is needed.
                                }}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setSelected({
                                    ...selected,
                                    message: data,
                                  });
                                }}
                                onBlur={(event, editor) => {
                                  editor.ui.view.editable.element.style.height =
                                    "122px";
                                }}
                                onFocus={(event, editor) => {
                                  editor.ui.view.editable.element.style.height =
                                    "122px";
                                }}
                              />
                            </Col>
                          </Row>
                          <Row className="row" style={{ marginTop: "10px" }}>
                            <Col lg={12} className="col-lg-12">
                              <Button
                                variant="success"
                                className="btn btn-sm px-4"
                                type="submit"
                              >
                                Send
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                        {/* <!-- End General Form Elements --> */}
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
