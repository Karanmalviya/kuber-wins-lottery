import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {forgetPassword, resetPassword} from "../../utils";
import {Alert} from "@mui/material";

export default function ForgotPasswordPage({props}) {
  const navigate = useNavigate();

  const [sendOtp, setSendOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgetEmail, setForgetEmail] = useState("");
  const [errMsg, setErrMsg] = useState({err: "", type: ""});

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (forgetEmail === "") {
      setErrMsg({
        err: "Enter your email",
        type: "error",
      });
    } else {
      const res = await forgetPassword({username: forgetEmail}, {});
      if (res) {
        setSendOtp(true);
        setErrMsg({
          err: res.message,
          type:
            res.message === "An OTP has been sent to your registered email."
              ? "success"
              : "error",
        });
      } else {
        setErrMsg({
          err: "Email doesn't exists",
          type: "error",
        });
      }
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (otp === "") {
      setErrMsg({
        err: "Please Enter Your OTP",
        type: "error",
      });
    } else {
      const restResponse = await resetPassword(
        {email: forgetEmail, newPassword: newPassword, OTP: +otp},
        {}
      );
      setErrMsg({
        err: restResponse.message,
        type:
          restResponse.message === "Password reset successfully."
            ? "success"
            : "error",
      });
      if (restResponse.message === "Password reset successfully.") {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  return (
    <>
      <title>Forgot Password - Kuber Wins</title>

      <section className="sec-login" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container">
          <div
            className="row d-flex align-items-center justify-content-center"
            style={{height: "100vh"}}
          >
            <div className="col-lg-6">
              <div className="row">
                {/* <div className="col-lg-4 col-md-4 d-none d-lg-block d-flex justify-content-center align-items-center pe-0">
                  <img
                    src="assets/images/login-left-bg_withname.png"
                    className="img-fluid"
                    alt=""
                  />
                </div> */}
                <div className="col-lg-12 col-md-12 bg-white">
                  <div className="px-5 pb-4 pt-3">
                    <h4 className="mb-4">
                      Welcome To&nbsp;
                      <i>
                        <span style={{color: "#EE015F"}}>KUBER</span>{" "}
                        <span style={{color: "#4E5FED"}}> WINS</span>
                      </i>
                    </h4>{" "}
                    {errMsg && (
                      <Alert severity={errMsg.type} id="error" className="mb-2">
                        {errMsg.err}
                      </Alert>
                    )}
                    <div hidden={sendOtp ? true : false}>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 mb-2">
                          <label>Username or Email Id</label>
                          <input
                            className="form-control"
                            placeholder="Username or Email Id"
                            required
                            onChange={(e) => setForgetEmail(e.target.value)}
                          />
                          <p className="p-0 m-0 pull-right">
                            Already have an account?{" "}
                            <Link to={"/login"}>Login Here</Link>
                          </p>
                        </div>
                      </div>
                      <div className="row mt-3 d-flex justify-content-center align-items-center">
                        <div className="col-lg-6">
                          <button
                            className="btn btn-info w-100"
                            onClick={handleForgetPassword}
                          >
                            Send Otp
                          </button>
                        </div>
                      </div>
                    </div>
                    <div hidden={sendOtp ? false : true}>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 mb-2">
                          <label>Email Id</label>
                          <input
                            className="form-control"
                            placeholder="Email Id"
                            value={forgetEmail}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 mb-2">
                          <label>OTP</label>

                          <input
                            className="form-control"
                            placeholder="OTP"
                            required
                            onChange={(e) => setOtp(e.target.value)}
                          />
                          <p className="p-0 m-0 pull-right">
                            If Not Received ?{" "}
                            <Link onClick={handleForgetPassword}>
                              Send Again
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 mb-2">
                          <label>New Password</label>
                          <input
                            className="form-control"
                            placeholder="New Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mt-3 d-flex justify-content-center align-items-center">
                        <div className="col-lg-6">
                          <button
                            className="btn btn-info w-100"
                            onClick={handleResetPassword}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
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
}
