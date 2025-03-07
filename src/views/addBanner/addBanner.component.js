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
  order: "",
  file: "",
};

export default function AddBannerPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    isSaved,
    isLoading,
    createBanner,
    updateBanner,
    fetchBannerById,
    banner,
  } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(emptyData);

  useEffect(() => {
    if (id) fetchBannerById(id);
  }, [id]);

  useEffect(() => {
    if (id && banner && Object.keys(banner).length) {
      setSelected(banner);
    }
  }, [id, banner]);

  useEffect(() => {
    if (isSaved) {
      navigate("/banners");
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
                <h1>Add Banner</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      {/* <a href="index.html">Home</a>  */}
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Add Banner</li>
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
                              updateBanner(selected);
                            } else {
                              createBanner(selected);
                            }
                          }}
                        >
                          <Row className="row">
                            <Col
                              lg={2}
                              md={2}
                              className="col-lg-2 col-md-2 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Order
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="number"
                                value={selected.order}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    order: e.target.value,
                                  })
                                }
                                className="form-control formWidth"
                              />
                            </Col>{" "}
                            <Col
                              lg={10}
                              md={10}
                              className="col-lg-10 col-md-10 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Banner
                                <span className="text-danger">*</span> (.jpg,
                                .png, .jpeg) size must be 916 x 298
                              </Form.Label>
                              <Form.Control
                                required
                                type="file"
                                accept=".jpg, .png, .jpeg"
                                // value={selected.file}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    file: e.target.files[0],
                                  })
                                }
                                className="form-control "
                              />
                            </Col>
                            <Col
                              lg={10}
                              md={10}
                              className="col-lg-10 col-md-10 mb-3"
                            >
                              {" "}
                              <img
                                src={
                                  selected.file || selected.banner
                                    ? typeof selected.file === "object"
                                      ? URL.createObjectURL(selected.file)
                                      : selected.banner
                                    : "https://placehold.jp/916x298.png"
                                }
                                id="preview"
                                className="img-thumbnail w-100"
                                key={id ?? "add"}
                              />
                            </Col>
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
