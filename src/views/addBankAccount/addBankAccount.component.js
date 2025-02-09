import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
// page imports end
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React bootstrap start
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Loader from "../../component/Loader";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import ScrollToTop from "react-scroll-to-top";

const emptyData = {
  account_holder_name: "",
  account_number: "",
  ifsc_code: "",
  bank_name: "",
  account_type: "",
  upi_id: "",
  upi_qr: "upi_qr",
};

export default function AddBankAccountPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    isSaved,
    isLoading,
    createBankAccount,
    updateBankAccount,
    fetchBankAccountById,
    bankAccount,
  } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(emptyData);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (id) fetchBankAccountById({ id });
  }, [id]);

  useEffect(() => {
    if (isSaved && on) {
      navigate("/bank-accounts");
    }
  }, [isSaved]);

  useEffect(() => {
    if (id && bankAccount) {
      setSelected(bankAccount);
    }
  }, [id, bankAccount]);

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
                <h1>Add Bank Account</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      {/* <a href="index.html">Home</a>  */}
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Add Bank Account</li>
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
                            if (id) {
                              updateBankAccount(selected);
                            } else {
                              createBankAccount(selected);
                            }
                            setOn(true);
                          }}
                        >
                          <Row className="row">
                            <Col
                              lg={4}
                              md={4}
                              className="col-lg-4 col-md-4 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Account Holder Name
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={selected.account_holder_name}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    account_holder_name: e.target.value,
                                  })
                                }
                                className="form-control formWidth"
                              />
                            </Col>{" "}
                            <Col
                              lg={4}
                              md={4}
                              className="col-lg-4 col-md-4 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Bank Name
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={selected.bank_name}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    bank_name: e.target.value,
                                  })
                                }
                                className="form-control formWidth"
                              />
                            </Col>{" "}
                            <Col
                              lg={4}
                              md={4}
                              className="col-lg-4 col-md-4 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Type of Account
                                <span className="text-danger">*</span>
                              </Form.Label>

                              <Form.Select
                                required
                                value={selected.account_type || ""}
                                onChange={(e) => {
                                  // if (id) return;
                                  setSelected({
                                    ...selected,
                                    account_type: e.target.value,
                                  });
                                }}
                                className="form-control"
                              >
                                <option value="">
                                  <em>Select</em>
                                </option>
                                <option value="current">Current</option>
                                <option value="saving">Saving</option>
                                <option value="fixed">Fixed</option>
                              </Form.Select>
                            </Col>
                            <Col
                              lg={6}
                              md={6}
                              className="col-lg-6 col-md-6 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Account Number
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="number"
                                value={selected.account_number}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    account_number: e.target.value,
                                  })
                                }
                                className="form-control "
                              />
                            </Col>
                            <Col
                              lg={6}
                              md={6}
                              className="col-lg-6 col-md-6 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                IFSC Code
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={selected.ifsc_code}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    ifsc_code: e.target.value,
                                  })
                                }
                                className="form-control "
                              />
                            </Col>
                          </Row>

                          <Row className="row mb-3">
                            <Col
                              lg={6}
                              md={6}
                              className="col-lg-6 col-md-6 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                UPI ID
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={selected.upi_id}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    upi_id: e.target.value,
                                  })
                                }
                                className="form-control "
                              />
                            </Col>
                            {/* <Col lg={3} md={3} className="col-lg-3 col-md-3">
                              <img
                                src={
                                  selectedImage && selectedImage != ""
                                    ? selectedImage
                                    : selected.image
                                    ? selected.image
                                    : "https://placehold.jp/150x150.png"
                                }
                                id="preview"
                                className="img-thumbnail"
                                style={{ marginTop: "36px" }}
                              />
                              <input
                                type="file"
                                name="img"
                                className="file f-img"
                                accept="image/*"
                              />
                              <div className="input-group mt-2">
                                <Form.Control
                                  required={
                                    selected.image !== "" ? false : true
                                  }
                                  type="file"
                                  className="form-control formWidthInput"
                                  placeholder="Upload File"
                                  id="file"
                                  accept="image/*"
                                  onChange={onImageChange}
                                />
                              </div>
                            </Col> */}
                          </Row>

                          <Row className="row">
                            <Col lg={12} className="col-lg-12">
                              <Button
                                variant="success"
                                type="submit"
                                className="btn btn-sm px-4"
                              >
                                Save
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
