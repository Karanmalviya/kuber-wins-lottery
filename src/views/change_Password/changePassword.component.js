import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import logologin from "./../../assets/img/logologin.png";
import { ToastContainer } from "react-toastify";

export default function ChangePasswordPage(props) {
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  const navigate = useNavigate();
  const {
    isSaved,
    changeSubAdminPassword,
    adminPasswordChange,
    isPassWordSaved,
  } = props;
  const [values, setValues] = useState({
    newPassword: "",
    currentPassword: "",
  });

  const [errors, setErrors] = useState({});
  if (isSaved || isPassWordSaved) {
    navigate("/");
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

  // useEffect(() => {
  //   if (admin.role === "admin") {
  //     navigate("/profile");
  //   }
  // }, [adminData]);
  // console.log(adminData);

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
                  <Card.Body>
                    <Form
                      class="row g-3 needs-validation"
                      novalidate
                      onSubmit={(e) => {
                        e.preventDefault();

                        if (admin?.role === "admin") {
                          adminPasswordChange(values);
                        } else {
                          changeSubAdminPassword({ ...values, id: admin.id });
                        }

                        setErrors(validate(values));
                      }}
                    >
                      {" "}
                      <h6 className="card-title text-center pb-0">
                        Change Password
                      </h6>
                      <div class="col-12">
                        <div className="input-group has-validation">
                          <Form.Control
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Current Password"
                            id="yourUsername"
                            required
                            value={values.currentPassword}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                currentPassword: e.target.value,
                              })
                            }
                          />
                        </div>
                        {errors.currentPassword && (
                          <p className="validationErrors">
                            {errors.currentPassword}
                          </p>
                        )}
                      </div>
                      <div class="col-12 mt-2">
                        <div className="input-group has-validation">
                          <Form.Control
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="New Password"
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
                      <div class="col-12 mt-3">
                        <button class="btn btn-primary w-100" type="submit">
                          Save
                        </button>{" "}
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
