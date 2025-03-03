import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import logologin from "./../../assets/img/LifetimeLottoLOGO.png";
import { ToastContainer } from "react-toastify";
import Loader from "../../component/Loader";

export default function StaffForgetPasswordPage(props) {
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isSaved,
    isLoading,
    resetisSaved,
    changePassData,
    forgetSubAdminPassword,
    resetSubAdminPassword,
    forgetAdminPassword,
    resetAdminPassword,
  } = props;
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    email: "",
    newPassword: "",
    OTP: "",
  });

  const [errors, setErrors] = React.useState({});
  if (resetisSaved || isSaved) {
    navigate("/login");
  }
  const validate = (values) => {
    let errorss = {};
    let isError = false;

    if (!values.password) {
      isError = true;
      errorss.password = "Password is required";
    }
    return errorss;
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    }
  }, [location.state]);
  return (
    <main>
      <Loader loading={isLoading} />
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
                  {/* <a href="index.html" className="logo d-flex align-items-center w-auto"> */}
                  <a
                    // href="/"
                    className="logo align-items-center text-center w-auto"
                  >
                    <img src={logologin} alt="" style={{ maxHeight: "52px" }} />
                    {/* <h5 className="card-title text-center pb-0 fs-4">
                      Change Password
                    </h5> */}
                  </a>
                </div>
                {/* End Logo */}

                <Card className="mb-3 w-100">
                  {isSaved ? (
                    <Card.Body>
                      <Form
                        class="row g-3 needs-validation"
                        novalidate
                        onSubmit={(e) => {
                          e.preventDefault();

                          if (location.state.isAdmin) {
                            resetAdminPassword({
                              ...values,
                              email: email,
                              OTP: +values.OTP,
                            });
                          } else {
                            resetSubAdminPassword({ ...values, email: email });
                          }
                          setErrors(validate(values));
                        }}
                      >
                        <h6 className="card-title text-center pb-0">
                          Forget Password
                        </h6>
                        <div class="col-12 mt-2">
                          <div className="input-group has-validation">
                            <Form.Control
                              type="text"
                              name="username"
                              className="form-control"
                              placeholder="Enter your New Password"
                              id="yourUsername"
                              required
                              value={values.newPassword}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  newPassword: e.target.value,
                                })
                              }
                            />
                          </div>
                          {errors.newPassword && (
                            <p className="validationErrors">
                              {errors.newPassword}
                            </p>
                          )}
                        </div>
                        <div class="col-12 mt-2">
                          <div className="input-group has-validation">
                            <Form.Control
                              type="text"
                              name="username"
                              className="form-control"
                              placeholder="OTP"
                              id="yourUsername"
                              required
                              value={values.OTP}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  OTP: e.target.value,
                                })
                              }
                            />
                          </div>
                          {errors.OTP && (
                            <p className="validationErrors">{errors.OTP}</p>
                          )}
                        </div>
                        <div class="col-12 mt-3">
                          <button
                            class="btn btn-primary w-100"
                            type="submit"
                            disabled={isLoading}
                          >
                            Submit
                          </button>{" "}
                        </div>
                      </Form>
                    </Card.Body>
                  ) : (
                    <Card.Body>
                      <Form
                        class="row g-3 needs-validation"
                        novalidate
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (location.state.isAdmin) {
                            forgetAdminPassword({ username: email });
                          } else {
                            forgetSubAdminPassword({ email: email });
                          }
                          setErrors(validate(email));
                        }}
                      >
                        <h6 className="card-title text-center pb-0">
                          Forget Password
                        </h6>
                        <div class="col-12 mt-2">
                          <div className="input-group has-validation">
                            <Form.Control
                              type="text"
                              name="username"
                              className="form-control"
                              placeholder="Enter your email"
                              id="yourUsername"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          {errors.email && (
                            <p className="validationErrors">{errors.email}</p>
                          )}
                        </div>
                        <div class="col-12 mt-3">
                          <button
                            class="btn btn-primary w-100"
                            type="submit"
                            disabled={isLoading}
                          >
                            Submit
                          </button>{" "}
                        </div>
                      </Form>
                    </Card.Body>
                  )}
                  {/* <Card.Body>
                    <Form
                      class="row g-3 needs-validation"
                      novalidate
                      onSubmit={(e) => {
                        e.preventDefault();
                        forgetSubAdminPassword({ email: email });
                        setErrors(validate(email));
                      }}
                    >
                      <h6 className="card-title text-center pb-0">
                        Forget Password
                      </h6>
                      <div class="col-12 mt-2">
                        <div className="input-group has-validation">
                          <Form.Control
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Enter your email"
                            id="yourUsername"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        {errors.email && (
                          <p className="validationErrors">{errors.email}</p>
                        )}
                      </div>
                      <div class="col-12 mt-3">
                        <button class="btn btn-primary w-100" type="submit">
                          Submit
                        </button>{" "}
                      </div>
                    </Form>
                  </Card.Body> */}
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
