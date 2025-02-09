import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

// react bootstrap start
import {Container, Row, Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// react bootstrap end

// local images import end
import logologin from "./../../assets/img/LifetimeLottoLOGO.png";
// local images import start
import {ToastContainer} from "react-toastify";

export default function LoginPage(props) {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState(false);
  const {isLoading, isLoggedIn, userLogin, loggedUser, staffLogin} = props;
  const [values, setValues] = useState({username: "", password: ""});
  const [staffvalues, setStaffValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  if (isLoggedIn) {
    navigate("/");
  }
  const validate = (values) => {
    let errorss = {};
    let isError = false;
    if (!values.username) {
      isError = true;
      errorss.username = "Username is required";
    }
    if (!values.password) {
      isError = true;
      errorss.password = "Password is required";
    }
    // if (!isError) {
    //   userLogin(values);
    // }
    return errorss;
  };

  // useEffect(() => {
  //   if (loggedUser?.role === "admin") {
  //     navigate("/two-factor", {
  //       state: { id: loggedUser.id, token: loggedUser.token, email: loggedUser.email },
  //     });
  //   }
  // }, [loggedUser]);

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
                  {/* <a href="index.html" className="logo d-flex align-items-center w-auto"> */}
                  <a href="/" className="logo d-flex align-items-center w-auto">
                    <img src={logologin} alt="" style={{maxHeight: "52px"}} />
                  </a>
                </div>

                {/* End Logo */}
                {/* {loginType ? ( */}
                <Card className="mb-3 w-100">
                  <Card.Body>
                    <div className="pt-3">
                      <div
                        className="nav nav-pills d-flex justify-content-between"
                        id="pills-tab"
                        role="tablist"
                      >
                        {/* <div className="nav-item" role="presentation"> */}
                        <button
                          className={
                            "btn px-3 py-1 nav-link active btn-sm w-50"
                          }
                          style={{border: "1px solid"}}
                          id="pills-deposit-commission-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-deposit-commission"
                          type="button"
                          aria-controls="pills-deposit-commission"
                        >
                          Admin Login
                        </button>
                        {/* </div> */}
                        {/* <div className="nav-item" role="presentation"> */}
                        <button
                          style={{border: "1px solid"}}
                          className={"btn px-3 py-1 nav-link btn-sm w-50"}
                          id="pills-lottery-commission-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-lottery-commission"
                          type="button"
                          aria-controls="pills-lottery-commission"
                        >
                          Staff login
                        </button>
                        {/* </div> */}
                      </div>{" "}
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                      {/* ADMIN LOGIN */}
                      <div
                        className="tab-pane fade"
                        id="pills-lottery-commission"
                        role="tabpanel"
                        aria-labelledby="pills-lottery-commission-tab"
                      >
                        <div className="pt-2 pb-2">
                          <h5 className="card-title text-center pb-0 fs-4">
                            Login to Your Staff Account
                          </h5>
                          <p className="text-center small">
                            Enter your username & password to login
                          </p>
                        </div>
                        <Form
                          class="row g-3 needs-validation"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            staffLogin(staffvalues);
                            setErrors(validate(staffvalues));
                          }}
                        >
                          <div class="col-12">
                            <Form.Label for="yourUsername" class="form-label">
                              Username
                            </Form.Label>
                            <div className="input-group has-validation">
                              <Form.Control
                                type="email"
                                name="username"
                                className="form-control"
                                placeholder="Username"
                                id="yourUsername"
                                // required
                                value={staffvalues.username}
                                onChange={(e) =>
                                  setStaffValues({
                                    ...staffvalues,
                                    username: e.target.value,
                                  })
                                }
                              />
                            </div>
                            {errors.username && (
                              <p className="validationErrors">
                                {errors.username}
                              </p>
                            )}
                          </div>

                          <div className="col-12">
                            <Form.Label
                              for="yourPassword"
                              className="form-label"
                            >
                              Password
                            </Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder="Password"
                              className="form-control"
                              id="yourPassword"
                              // required
                              value={staffvalues.password}
                              onChange={(e) =>
                                setStaffValues({
                                  ...staffvalues,
                                  password: e.target.value,
                                })
                              }
                            />
                          </div>
                          {errors.password && (
                            <p className="validationErrors">
                              {errors.password}
                            </p>
                          )}

                          <div className="row">
                            <div className="col-6 d-flex">
                              <div className="form-check ">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="remember"
                                  value="true"
                                  id="rememberMe"
                                />
                                <Form.Label
                                  className="form-check-label"
                                  for="rememberMe"
                                  style={{fontSize: "14px"}}
                                >
                                  Remember me
                                </Form.Label>
                              </div>
                            </div>
                            <div className="col-6 d-flex">
                              <div className="form-check ">
                                <Form.Label
                                  className="form-check-label"
                                  for="rememberMe"
                                  style={{fontSize: "14px"}}
                                >
                                  <Link
                                    to={"/forget-password"}
                                    state={{isAdmin: false}}
                                  >
                                    Forget Password
                                  </Link>
                                </Form.Label>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <button class="btn btn-primary w-100" type="submit">
                              Login
                            </button>
                          </div>
                        </Form>
                      </div>

                      {/* STAFF LOGIN */}

                      <div
                        className="tab-pane fade active show"
                        id="pills-deposit-commission"
                        role="tabpanel"
                        aria-labelledby="pills-deposit-commission-tab"
                      >
                        <div className="pt-2 pb-2">
                          <h5 className="card-title text-center pb-0 fs-4">
                            Login to Your Admin Account
                          </h5>
                          <p className="text-center small">
                            Enter your username & password to login
                          </p>
                        </div>
                        <Form
                          class="row g-3 needs-validation"
                          onSubmit={(e) => {
                            e.preventDefault();
                            userLogin(values);
                            setErrors(validate(values));
                          }}
                        >
                          <div class="col-12">
                            <Form.Label for="yourSUsername" class="form-label">
                              Username
                            </Form.Label>
                            <div className="input-group has-validation">
                              <Form.Control
                                type="email"
                                name="username"
                                className="form-control"
                                placeholder="Username"
                                id="yourSUsername"
                                value={values.username}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    username: e.target.value,
                                  })
                                }
                              />
                            </div>
                            {errors.username && (
                              <p className="validationErrors">
                                {errors.username}
                              </p>
                            )}
                          </div>

                          <div className="col-12">
                            <Form.Label
                              for="yourSPassword"
                              className="form-label"
                            >
                              Password
                            </Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder="Password"
                              className="form-control"
                              id="yourSPassword"
                              // required
                              value={values.password}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  password: e.target.value,
                                })
                              }
                            />
                          </div>
                          {errors.password && (
                            <p className="validationErrors">
                              {errors.password}
                            </p>
                          )}

                          <div className="row">
                            <div className="col-6 d-flex">
                              <div className="form-check ">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="remember"
                                  value="true"
                                  id="rememberMe"
                                />
                                <Form.Label
                                  className="form-check-label"
                                  for="rememberMe"
                                  style={{fontSize: "14px"}}
                                >
                                  Remember me
                                </Form.Label>
                              </div>
                            </div>
                            <div className="col-6 d-flex">
                              <div className="form-check ">
                                <Form.Label
                                  className="form-check-label"
                                  for="rememberMe"
                                  style={{fontSize: "14px"}}
                                >
                                  <Link
                                    to={"/forget-password"}
                                    state={{isAdmin: true}}
                                  >
                                    Forget Password
                                  </Link>
                                </Form.Label>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <button class="btn btn-primary w-100" type="submit">
                              Login
                            </button>
                          </div>
                        </Form>{" "}
                      </div>
                    </div>
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
