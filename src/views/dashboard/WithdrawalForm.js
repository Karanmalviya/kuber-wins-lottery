import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  fetchUserWithDrawal,
  verfiy2fa,
} from "../../features/apiSlice";
import { withdrawal } from "../../utils";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { verifyTwofaVerification } from "../../api/api";
import { toast } from "react-hot-toast";
import CustomModalAlert from "../../utils/CustomModalAlert";

export default function WithdrawalForm({ props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);
  const [filteredWithdrawalsId, setFilteredWithdrawalsId] = useState([]);
  const userId = localStorage.getItem("userId");
  const [withdrawas, setWithdrawas] = useState([]);
  const [verifyCode, setVerifyCode] = useState("");
  const [errMsg, setErrMsg] = useState({ err: "", type: "" });
  const [eligibleAmount, setEligibleAmount] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    message: "",
    primaryButtonText: "",
    secondaryButtonText: "",
    link: "",
  });
  const [accountDetails, setAccountDetails] = useState({
    Account_Holder_Name: "",
    Account_Number: "",
    Type_of_account: "",
    IFSC_Number: "",
    PanCard_No: "",
    Amount: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
      dispatch(fetchUserWithDrawal(userId));
    }
  }, [userId, dispatch]);

  const user = useSelector((state) => state.api.user);
  const userWithdrawal = useSelector((state) => state.api.withdrawal);

  const contactChange = (e) => {
    const { name, value } = e.target;
    if (name === "Amount" && value >= 5000) {
      setEligibleAmount(true);
    } else {
      setEligibleAmount(false);
    }
    setAccountDetails({
      ...accountDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    setWithdrawas(location?.state);
  }, [location]);

  useEffect(() => {
    if (userWithdrawal.length) {
      setFilteredWithdrawalsId(userWithdrawal);
    }
  }, [userWithdrawal]);

  const filteredWithdrawalStatus = filteredWithdrawalsId?.filter(
    (withdrawStatus) => {
      return withdrawStatus.status == 0;
    }
  );

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (
      (!withdrawas?.Account_Holder_Name || accountDetails.Amount == "") &&
      (accountDetails.Account_Holder_Name === "" ||
        accountDetails.Account_Number == "" ||
        accountDetails.Amount == "" ||
        accountDetails.IFSC_Number === "" ||
        accountDetails.PanCard_No === "" ||
        accountDetails.Type_of_account === "")
    ) {
      setErrMsg({ err: "Please fill in all fields", type: "error" });
      setTimeout(() => {
        setErrMsg();
      }, 2000);
    } else {
      if (user.balance > 0 && user.balance >= +accountDetails.Amount) {
        if (filteredWithdrawalStatus && filteredWithdrawalStatus.length < 1) {
          if (!eligibleAmount) {
            setLoading(true);
            const res = await withdrawal(
              {
                Account_Holder_Name:
                  withdrawas?.Account_Holder_Name ??
                  accountDetails.Account_Holder_Name,
                UserId: userId,
                Account_Number:
                  withdrawas?.Account_Number ?? accountDetails.Account_Number,
                Type_of_account:
                  withdrawas?.Type_of_account ?? accountDetails.Type_of_account,
                IFSC_Number:
                  withdrawas?.IFSC_Number ?? accountDetails.IFSC_Number,
                Email: user.email,
                PanCard_No: withdrawas?.PanCard_No ?? accountDetails.PanCard_No,
                Amount: accountDetails.Amount,
              },
              { Authorization: `Bearer ${token}` }
            );
            if (res?.message == "Success") {
              setErrMsg({
                err: "Withdrawal request sent successfully",
                type: "success",
              });

              navigate("/withdrawal-history");
              setLoading(false);
            } else {
              setErrMsg({
                err: res?.message ?? "Something went wrong",
                type: "error",
              });
              setLoading(false);
            }
          } else {
            if (user.twofa_data === null || user.twofa_data === "null") {
              setAlertMessage({
                title: "Enable 2FA",
                message: "Enable 2FA from Accounts section in your Dashboard.",
                primaryButtonText: "Yes",
                link: "/authentication",
              });
              setShowModal(true);
            } else {
              setShow(true);
            }
          }
        } else {
          setErrMsg({
            err: "You already have a withdrawl request",
            type: "warning",
          });
          setLoading(false);
        }
      } else {
        setErrMsg({
          err: "Insufficient Balance in Wallet",
          type: "warning",
        });
        setLoading(false);
      }
    }
  };

  const handleValidate = async () => {
    const response = await verifyTwofaVerification({
      email: user.email,
      code: verifyCode,
    });
    if (
      response.message === "Authentication successful for LifeTime Lotto Game"
    ) {
      handleSubmit();
      toast.success("Verified Successfully", {
        duration: 3000,
        id: "clipboard",
      });
      setShow(false);
      setEligibleAmount(false);
    } else {
      toast.error("Wrong Code", {
        duration: 3000,
        id: "clipboard",
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <title>Withdrawal - Kuber Wins</title>

      <Navbar props={{ mainPage: "dashboard", subPage: "" }} />

      <section className="sec-dashbaord" style={{ backgroundColor: "#f5f6ff" }}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"withdrawal"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="mb-4">
                  <Link
                    to={"/withdrawal-history"}
                    className="float-end btn-withdrawal pull-start"
                  >
                    Withdraw History
                  </Link>
                </div>

                <section className="sec-second pb-4">
                  <div className="container">
                    <h2 className="mt-4 mb-4 sec-heading text-center">
                      Withdrawal
                    </h2>
                    {errMsg && (
                      <Alert severity={errMsg.type} id="error" className="mb-2">
                        {errMsg.err}
                      </Alert>
                    )}

                    <div className="row d-flex justify-content-center align-items-center">
                      <form className="col-lg-12" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                autofocus
                                id="txtFirstName"
                                placeholder=" "
                                name="Account_Holder_Name"
                                pattern="[a-zA-Z]+([\s][a-zA-Z]+)*"
                                onChange={contactChange}
                                value={
                                  withdrawas?.Account_Holder_Name ??
                                  contactChange.Account_Holder_Name
                                }
                              />
                              <label for="txtFirstName">
                                Account Holder's Name
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                min={0}
                                className="form-control"
                                id="txtLastName"
                                placeholder=" "
                                name="Account_Number"
                                onChange={contactChange}
                                pattern="[0-9]*"
                                title="Please enter numbers only"
                                value={
                                  withdrawas?.Account_Number ??
                                  contactChange.Account_Number
                                }
                              />
                              <label for="txtLastName">Account Number</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                autofocus
                                id="txtFirstName"
                                placeholder=" "
                                name="IFSC_Number"
                                onChange={contactChange}
                                value={
                                  withdrawas?.IFSC_Number ??
                                  accountDetails.IFSC_Number
                                }
                              />
                              <label for="txtFirstName">IFSC Code</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="txtLastName"
                                placeholder=" "
                                name="PanCard_No"
                                onChange={contactChange}
                                value={
                                  withdrawas?.PanCard_No ??
                                  accountDetails.PanCard_No
                                }
                              />
                              <label for="txtLastName">Pan Card Number</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <select
                                className="form-control form-select form-select-md mb-3"
                                autofocus
                                id="txtEmail"
                                placeholder=" "
                                name="Type_of_account"
                                aria-label="form-select-sm example"
                                onChange={contactChange}
                                value={
                                  withdrawas?.Type_of_account ??
                                  accountDetails.Type_of_account
                                }
                              >
                                <option selected></option>
                                <option value="Saving">Saving</option>
                                <option value="Current">Current</option>
                                <option value="Fixed">Fixed</option>
                              </select>
                              <label for="txtEmail">Type of Account</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                autofocus
                                min={1}
                                id="txtEmail"
                                placeholder=" "
                                name="Amount"
                                onChange={contactChange}
                              />
                              <label for="txtEmail">Amount</label>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <button
                              className="btn btn-info rounded-0 w-100 text-white border-0 py-2"
                              onClick={() => handleSubmit}
                            >
                              Request
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <>
          <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton className="OTP-modal">
              <Modal.Title>
                {" "}
                Verify Your 2 Factor Authentication Code
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="" className="profile-form">
                <input
                  type="number"
                  name="code"
                  id="code"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  className="form-control"
                  placeholder="Enter Code"
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleValidate}>
                Verify
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <>
          <CustomModalAlert
            show={showModal}
            handleClose={handleCloseModal}
            modalTitle={alertMessage.title}
            modalBody={alertMessage.message}
            primaryButtonText={alertMessage.primaryButtonText}
            secondaryButtonText={alertMessage.secondaryButtonText}
            link={alertMessage.link}
          />
        </>
      </section>

      <Footer props={""} />
    </>
  );
}
