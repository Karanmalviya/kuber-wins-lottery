import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../utils/auth";
import { FormSchema } from "../schema/FormSchema";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";

const LoginPage = ({ props }) => {
  const auth = useAuth();
  const { id, password } = FormSchema;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onFormSubmit = async (data, e) => {
    e.preventDefault();
    const body = {
      username: data.id,
      password: data.password,
    };
    await auth.login(body);
  };

  return (
    <>
      <title>Login - Kuber Wins</title>

      <section className="sec-login" style={{ backgroundColor: "#f5f6ff" }}>
        <div className="container">
          <div
            className="row d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <div className="col-lg-10">
              <div className="row d-flex justify-content-center">
                {/* <div className="col-lg-4 col-md-4 d-none d-lg-block d-flex justify-content-center align-items-center pe-0">
                  <img
                    src="assets/images/login-left-bg_withname.png"
                    className="img-fluid"
                    alt=""
                  />
                </div> */}
                <div className="col-lg-12 col-md-12 bg-white d-flex align-items-center justify-content-center">
                  <div className="px-5 pb-4 pt-3">
                    <h4 className="mb-4">
                      Welcome To&nbsp;
                      <i>
                        <span style={{ color: "#EE015F" }}>KUBER</span>{" "}
                        <span style={{ color: "#4E5FED" }}> WINS</span>
                      </i>
                    </h4>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label>Email Id</label>
                          <input
                            className="form-control"
                            placeholder="Email Id"
                            {...register(id.key, id.options)}
                            id={id.key}
                            style={{ display: "unset" }}
                          />
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                          >
                            {errors.id ? <>{errors.id.message}</> : <>&nbsp;</>}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label>Password</label>{" "}
                          <div style={{ position: "relative" }}>
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              placeholder="Password"
                              {...register(password.key, password.options)}
                              id={password.key}
                              style={{ display: "unset" }}
                            />
                            {showPassword ? (
                              <BsFillEyeFill
                                onClick={() => setShowPassword(!showPassword)}
                                className="mt-2"
                                style={{
                                  cursor: "pointer",
                                  position: "absolute",
                                  zIndex: "99",
                                  right: "9px",
                                  fontSize: "20px",
                                }}
                              />
                            ) : (
                              <BsFillEyeSlashFill
                                onClick={() => setShowPassword(!showPassword)}
                                className="mt-2"
                                style={{
                                  cursor: "pointer",
                                  position: "absolute",
                                  zIndex: "99",
                                  right: "9px",
                                  fontSize: "20px",
                                }}
                              />
                            )}
                          </div>
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                          >
                            {errors.password ? (
                              <>{errors.password.message}</>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </div>
                          <p className="p-0 m-0 pull-right">
                            <Link to={"/forgot-password"}>
                              Forgot Password?
                            </Link>
                          </p>
                          <p className="p-0 m-0 pull-right">
                            New to Kuber Wins?{" "}
                            <Link to={"/registration"}>Register Here</Link>
                          </p>
                        </div>
                        {/* <CaptchaInput /> */}
                        {/* <div className="col-lg-12 mb-2 mt-3">
                                                <div className="input-group mb-2">
                                                    <span className="input-group-text">
                                                        <img src="assets/images/entercode.png" className="img-fluid" alt="" />
                                                    </span>
                                                    <input type="text" className="form-control border-start-0" placeholder="Enter Code" />
                                                </div>
                                            </div> */}
                      </div>
                      <div className="row mt-3 d-flex justify-content-center align-items-center">
                        <div className="col-lg-6">
                          <button
                            type="submit"
                            className="btn btn-info w-100"
                            variant="login-signup-btn"
                            disabled={!isValid}
                          >
                            Login Now
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="row mt-3 d-flex justify-content-center align-items-center">
                      <div className="col-lg-6 text-center">
                        <Link to={"/"}>
                          <i className="fa fa-arrow-left"></i> Back to Home
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
