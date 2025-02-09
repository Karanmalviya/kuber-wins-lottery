import React, {useRef, useState} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, register2fa} from "../../features/apiSlice";
import {useEffect} from "react";
import copy from "copy-to-clipboard";
import {toast} from "react-hot-toast";
import MiniLoader from "../components/MiniLoader";

export default function AuthenticationPage({props}) {
  const ref = useRef();
  const dispatch = useDispatch();
  const [authenticationData, setAuthenticationData] = useState({});
  const userId = localStorage.getItem("userId");
  const user = useSelector((state) => state.api.user);
  const registerData = useSelector((state) => state.api.register2faData);
  const register2faDataLoading = useSelector(
    (state) => state.api.register2faDataLoading
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [userId, registerData]);

  useEffect(() => {
    if (user.twofa_data) {
      setAuthenticationData(JSON.parse(user.twofa_data));
    }
  }, [user, registerData]);

  const handleEnableAuthentication = async () => {
    dispatch(
      register2fa({
        email: user.email,
      })
    );
  };

  useEffect(() => {
    if (authenticationData.data_url) {
      if (ref.current) {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = authenticationData.data_url;
        const overlay = new Image();
        overlay.src = "../assets/images/favicon.png";
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
  }, [authenticationData.data_url]);

  return (
    <>
      <title>2 Factor Authentication - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord">
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"authentication"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <h4 className="mb-4 fw-bold pt-3">Two Factor Authentication</h4>
                <div className="col-lg-6">
                  <div className="card card-table text-center p-0">
                    <div className="card-header py-3 px-4">
                      <h5 className="mb-0 fs-5 text-center">
                        Two Factor Authenticator
                      </h5>
                    </div>
                    <div className="card-body">
                      <div>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            readOnly
                            value={authenticationData?.userSecretKey}
                            aria-describedby="basic-addon2"
                          />
                          <div
                            className="input-group-append"
                            style={{cursor: "pointer"}}
                            onClick={() => {
                              copy(authenticationData?.userSecretKey);
                              toast.success(`copied `, {
                                duration: 3000,
                                id: "clipboard",
                              });
                            }}
                          >
                            <span
                              className="input-group-text"
                              id="basic-addon2"
                            >
                              <i className="fa-regular fa-copy fs-4"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{useSelector: "none"}}>
                        {authenticationData.data_url !== undefined ? (
                          <>
                            <canvas ref={ref} width={212} height={212} />
                            {/* <img
                              loading="lazy"
                              src={authenticationData.data_url}
                              // alt="QR Code"
                              draggable={false}
                            /> */}
                            <p>
                              Scan the QR code using your authenticator app or
                              Enter the code manually
                            </p>{" "}
                          </>
                        ) : authenticationData.data_url === undefined &&
                          (user.twofa_data === null ||
                            user.twofa_data === "null") ? (
                          ""
                        ) : (
                          <MiniLoader />
                        )}
                      </div>
                      {(user.twofa_data === null ||
                        user.twofa_data === "null") && (
                        <button
                          className="btn btn-info text-white px-5 my-4"
                          onClick={handleEnableAuthentication}
                        >
                          {" "}
                          {register2faDataLoading ? (
                            <div
                              className="spinner-border spinner-border-sm text-light"
                              role="status"
                            ></div>
                          ) : (
                            `Enable 2FA`
                          )}
                        </button>
                      )}

                      {/* <div
                        className="modal fade"
                        id="TwoFactor"
                        tabindex="-1"
                        aria-labelledby="authentication-modal"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header OTP-modal">
                              <h5
                                className="modal-title"
                                id="authentication-modal"
                              >
                                Verify Your OTP
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form action="" className="profile-form">
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  className="form-control"
                                  placeholder="Enter Code"
                                />
                              </form>
                            </div>
                            <div className="modal-footer ">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="button" className="btn btn-primary">
                                Verify
                              </button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card card-table  text-center p-0">
                    <div className="card-header py-3 px-4">
                      <h5 className="mb-0 fs-5 text-center">Authenticator</h5>
                    </div>
                    <div className="card-body">
                      <p className="pt-3 mb-1">
                        Authenticator is a multifactor app for mobile devices.
                        It generates timed codes used during the 2-step
                        verification process. To use Authentication, install the
                        Any Authenticator application on your mobile device or
                        web.
                      </p>

                      <a
                        className="btn btn-info text-white px-5 my-3"
                        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1"
                      >
                        Download App
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer props={""} />
    </>
  );
}
