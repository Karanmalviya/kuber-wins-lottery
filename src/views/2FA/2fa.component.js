import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import logologin from "./../../assets/img/logologin.png";
import { ToastContainer } from "react-toastify";
import OtpInput from "react-otp-input";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginSuccess } from "../../api/user/userAction";
import { decrypt, encrypt } from "../../utils/encryptdecrypt";

export default function TwofaPage(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userPage.isLoggedIn);
  const { isLoading, verify2FA, adminDataById, fetchAdminData } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const adminData = localStorage.getItem("user");
  const admin = isLoggedIn && adminData && JSON.parse(adminData);
  const formattedData = location.state;

  useEffect(() => {
    if (formattedData?.id) fetchAdminData(formattedData?.id);
  }, [formattedData?.id]);
  console.log(admin);
  useEffect(() => {
    if (otp.length === 6) {
      const handle2Fa = async () => {
        const res = await verify2FA({
          email: formattedData ? formattedData.email : admin?.email,
          code: otp,
        });
        if (formattedData) {
          if (
            res?.success === "Authentication successful for LifeTime Lotto Game"
          ) {
            localStorage.setItem("user", JSON.stringify(formattedData.data));
            localStorage.setItem("token", formattedData.token);
            const data = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            if (data && token) {
              dispatch(userLoginSuccess(formattedData.data));
              navigate("/");
            }
          }
        } else {
          if (
            res?.success === "Authentication successful for LifeTime Lotto Game"
          ) {
            localStorage.setItem("isVerifiedPassword", encrypt("true"));
            const isVerified = localStorage.getItem("isVerifiedPassword");
            console.log(encrypt("true"), isVerified, decrypt(isVerified));
            if (decrypt(isVerified) === "true") {
              navigate("/change-password");
            }
          }
        }
      };
      handle2Fa();
    }
  }, [otp]);

  useEffect(() => {
    document.onvisibilitychange = function () {
      if (document.visibilityState === "hidden") {
        localStorage.removeItem("isVerifiedPassword");
      }
    };
  }, []);
  return (
    <main>
      <Container>
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <Container>
            <Row className="row justify-content-center">
              <Col
                lg={4}
                md={6}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <div className="d-flex justify-content-center py-4">
                  <a className="logo align-items-center text-center w-auto">
                    <img src={logologin} alt="" style={{ maxHeight: "52px" }} />
                    <h5 className="card-title text-center pb-0 fs-4">
                      Two Factor Authentication
                    </h5>
                  </a>
                </div>
                {/* End Logo */}

                <Card className="mb-3 w-100">
                  <Card.Body>
                    <Form
                      className="row g-3 needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();
                        verify2FA({
                          email: formattedData.email,
                          code: otp,
                        });
                      }}
                    >
                      {" "}
                      <h6 className="card-title text-center pb-0">
                        Authentication code
                      </h6>{" "}
                      <div className="col-12">
                        {" "}
                        <div className="input-group has-validation d-flex justify-content-center">
                          {" "}
                          <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            // placeholder="XXXXXX"
                            renderSeparator={<span>&nbsp;&nbsp;</span>}
                            renderInput={(props) => (
                              <input
                                {...props}
                                style={{ width: "40px" }}
                                className="form-control"
                              />
                            )}
                          />
                          {/* <Form.Control
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="XXXXXX"
                            id="yourUsername"
                            required
                            value={staffvalues.username}
                            onChange={(e) =>
                              setStaffValues({
                                ...staffvalues,
                                username: e.target.value,
                              })
                            }
                          /> */}
                        </div>
                      </div>
                      <div className="col-12 mt-3">
                        <button
                          className="btn btn-primary w-100"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div
                              className="spinner-border spinner-border-sm text-light"
                              role="status"
                            ></div>
                          ) : (
                            "Verify"
                          )}
                        </button>{" "}
                        <p className="mt-4" style={{ fontSize: "13px" }}>
                          open you two-factor authenticator (TOTP) app or
                          browser extension to view you authentication code.
                        </p>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
      <ToastContainer />
    </main>
  );
}
