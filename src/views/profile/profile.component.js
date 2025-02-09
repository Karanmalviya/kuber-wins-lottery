import React, { useState, useEffect, useRef } from "react";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loader from "../../component/Loader";
import TimezoneSelect from "react-timezone-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import copy from "copy-to-clipboard";

import "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import ScrollToTop from "react-scroll-to-top";
import Tooltip from "@mui/material/Tooltip";
import logo from "../../assets/img/favicon.png";

const emptyData = {
  gameNumber: "00" + Math.floor(Math.random() * 100) + 1 + "LTL",
  gameName: "",
  gameSlogan: "",
  gameDuration: "",
  maxNumberTickets: "",
  buyTicketLimit: "",
  ticketPrice: "",
  gameCurrency: 3,
  minPrizePool: "",
  startTime: "",
  timeZone: "",
  instruction: "",
  status: 1,
  image: "",
  draw: "",
};

export default function ProfilePage(props) {
  const ref = useRef();
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    fetchAdminData,
    adminDataById,
    isSaved,
    isLoading,
    register2FA,
    isLoadingtwofaPage,
    isSavedtwofaPage,
    update2FAStatus,
  } = props;
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({
    role: "admin",
    twofa_verification: 0,
    twofa_data: {
      email: "",
      issuer: "",
      data_url: "",
      adminSecretKey: "",
    },
  });

  useEffect(() => {
    fetchAdminData(admin.id);
  }, [isSavedtwofaPage]);

  useEffect(() => {
    if (Object.keys(adminDataById).length) {
      // const data = JSON.parse(adminDataById.twofa_data);
      setSelected({ ...adminDataById });
    }
  }, [adminDataById]);

  const handleEnableAuthentication = () => {
    register2FA({
      email: admin.email,
    });
  };

  useEffect(() => {
    if (selected.twofa_data?.data_url) {
      if (ref.current) {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = selected.twofa_data?.data_url;
        const overlay = new Image();
        overlay.src = logo;
        image.onload = function () {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          overlay.onload = function () {
            const overlayWidth = 60;
            const overlayHeight = 40;
            const centerX = canvas.width / 2 - overlayWidth / 2;
            const centerY = canvas.height / 2 - overlayHeight / 2;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(centerX + 5, centerY);
            ctx.lineTo(centerX + overlayWidth - 5, centerY);
            ctx.quadraticCurveTo(
              centerX + overlayWidth,
              centerY,
              centerX + overlayWidth,
              centerY + 5
            );
            ctx.lineTo(centerX + overlayWidth, centerY + overlayHeight - 5);
            ctx.quadraticCurveTo(
              centerX + overlayWidth,
              centerY + overlayHeight,
              centerX + overlayWidth - 5,
              centerY + overlayHeight
            );
            ctx.lineTo(centerX + 5, centerY + overlayHeight);
            ctx.quadraticCurveTo(
              centerX,
              centerY + overlayHeight,
              centerX,
              centerY + overlayHeight - 5
            );
            ctx.lineTo(centerX, centerY + 5);
            ctx.quadraticCurveTo(centerX, centerY, centerX + 5, centerY);
            ctx.closePath();
            ctx.fill();
            ctx.drawImage(
              overlay,
              centerX,
              centerY,
              overlayWidth,
              overlayHeight
            );
          };
        };
      }
    }
  }, [selected.twofa_data?.data_url]);
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
                <h1>Profile Setting</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Profile Setting</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12} className="col-lg-12">
                    <Card className="card">
                      <Card.Body className="card-body pt-2">
                        <div className="row">
                          <div className="d-flex justify-content-between">
                            <h4 className="mb-4 fw-bold pt-3">
                              Two Factor Authentication
                            </h4>
                            <div className="mt-3">
                              {selected.twofa_data !== null &&
                              selected.twofa_verification ? (
                                <button
                                  style={{
                                    backgroundColor: "#DC3545",
                                    borderRadius: 10,
                                    marginLeft: 10,
                                    color: "white",
                                  }}
                                  onClick={() =>
                                    update2FAStatus({
                                      twofa_verification: 0,
                                      id: admin.id,
                                    })
                                  }
                                >
                                  Disable
                                </button>
                              ) : (
                                <button
                                  style={{
                                    backgroundColor: "#198754",
                                    borderRadius: 10,
                                    marginLeft: 10,
                                    color: "white",
                                  }}
                                  onClick={() =>
                                    update2FAStatus({
                                      twofa_verification: 1,
                                      id: admin.id,
                                    })
                                  }
                                >
                                  Enable
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="card card-table text-center p-0">
                              <div className="card-header py-3 px-4">
                                <h5 className="mb-0 fs-5 text-center">
                                  Two Factor Authenticator
                                </h5>
                              </div>
                              <div className="card-body">
                                <div>
                                  <div className="input-group mb-3 mt-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=""
                                      readOnly
                                      value={
                                        selected.twofa_data?.adminSecretKey
                                      }
                                      aria-describedby="basic-addon2"
                                    />
                                    <Tooltip
                                      open={open}
                                      placement="top"
                                      disableFocusListener
                                      disableHoverListener
                                      disableTouchListener
                                      title="Copied"
                                    ></Tooltip>
                                    <div
                                      className="input-group-append"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        copy(
                                          selected.twofa_data?.adminSecretKey
                                        );
                                        setOpen(true);
                                        setTimeout(() => {
                                          setOpen(false);
                                        }, 2000);
                                      }}
                                    >
                                      <span
                                        className="input-group-text"
                                        id="basic-addon2"
                                      >
                                        <i class="bi bi-clipboard fs-6"></i>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ useSelector: "none" }}>
                                  {selected.twofa_data?.data_url ? (
                                    <>
                                      <canvas
                                        ref={ref}
                                        width={212}
                                        height={212}
                                      />
                                      {/* <img
                                        loading="lazy"
                                        src={selected.twofa_data?.data_url}
                                        // alt="QR Code"
                                        draggable={false}
                                      /> */}
                                      <p>
                                        Scan the QR code using your
                                        authenticator app or Enter the code
                                        manually
                                      </p>{" "}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {/* ) : authenticationData.data_url ===
                                      undefined &&
                                    (user.twofa_data === null ||
                                      user.twofa_data === "null") ? (
                                    ""
                                  ) : (
                                    <MiniLoader />
                                  )} */}
                                </div>
                                {selected.twofa_data === null && (
                                  <button
                                    className="btn btn-primary text-white px-5 my-4"
                                    onClick={handleEnableAuthentication}
                                  >
                                    {isLoadingtwofaPage ? (
                                      <div
                                        className="spinner-border spinner-border-sm text-light"
                                        role="status"
                                      ></div>
                                    ) : (
                                      "Enable 2FA"
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="card card-table  text-center p-0">
                              <div className="card-header py-3 px-4">
                                <h5 className="mb-0 fs-5 text-center">
                                  Google Authenticator
                                </h5>
                              </div>
                              <div className="card-body">
                                <p className="pt-3 mb-1">
                                  Google Authenticator is a multifactor app for
                                  mobile devices. It generates timed codes used
                                  during the 2-step verification process. To use
                                  Google Authenticator, install the Google
                                  Authenticator application on your mobile
                                  device.
                                </p>

                                <a
                                  className="btn btn-primary text-white px-5 my-3"
                                  href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1"
                                >
                                  Download App
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
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
