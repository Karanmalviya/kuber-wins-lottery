import React, {useState} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import {updateUserPassword} from "../../utils/index";
import {useAuth} from "../../utils/auth";
import Alert from "@mui/material/Alert";

export default function ChangePasswordPage({props}) {
  const {user} = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState({err: "", type: ""});

  const handleSubmit = async () => {
    if (currentPassword && newPassword && confirmPassword) {
      if (currentPassword !== newPassword) {
        if (newPassword === confirmPassword) {
          const body = JSON.stringify({
            password: currentPassword,
            currentPassword: newPassword,
          });
          const response = await updateUserPassword(body, {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          });
          if (response) {
            setErrMsg({
              err: response.data.message,
              type:
                response.data.message === "Password changed successfully."
                  ? "success"
                  : "error",
            });
          }
        } else {
          setErrMsg({
            err: "Confirm password do not matched",
            type: "warning",
          });
        }
      } else {
        setErrMsg({
          err: "New password can't be same as old password",
          type: "warning",
        });
      }
    }
  };

  return (
    <>
      <title>Change Password - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"changepassword"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="col-lg-12 bg-white">
                  <div className="px-5 p-4">
                    <h4 className="mb-4 fw-bold text-center pt-3">
                      Change Password
                    </h4>

                    <div className="profile-form">
                      <div className="d-flex align-items-center justify-content-center flex-column ">
                        <div className="col-lg-6 col-md-6 mb-3">
                          {errMsg && (
                            <Alert
                              severity={errMsg.type}
                              id="error"
                              className="mb-2"
                            >
                              {errMsg.err}
                            </Alert>
                          )}
                        </div>
                        <div className="col-lg-6 col-md-6 mb-3">
                          <label>Current Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder=""
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 mb-3">
                          <label>New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder=""
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 mb-3">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder=""
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mt-3 d-flex justify-content-center align-items-center">
                        <div className="col-lg-6">
                          <button
                            className="btn btn-info w-100 py-2 text-white"
                            onClick={(e) => handleSubmit()}
                          >
                            Update
                          </button>
                        </div>
                      </div>
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
