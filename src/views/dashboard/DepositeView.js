import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccountDetailsById,
  fetchCommissionPercent,
  fetchDeposits,
  fetchReferedUser,
  fetchUser,
  updateDeposit,
} from "../../features/apiSlice";
import { upiQr } from "../../utils/generatePaymentQR";
import { decrypt } from "../../utils/encryptdecrypt";
import { updateDepositApi } from "../../api/api";
import { commissionTransaction, CreateCommissionLog } from "../../utils";
import DepositesPaymentStatus from "./DepositPaymentStatus";
import copy from "copy-to-clipboard";

export default function DepositesView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [referredData, setReferredData] = useState("");
  const [referByValue, setReferByValue] = useState("");
  const [isCopied, setIsCopied] = useState("");
  const [percent, setPercent] = useState(null);
  const [level, setLevel] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);
  const depositId = decrypt(id);
  const [canvas, setCanvas] = useState(null);
  const dispatch = useDispatch();

  const {
    user,
    commissionPercent,
    referedUser,
    fetchDepositsData,
    getAccountDetailsByIdData,
  } = useSelector((state) => state.api);
  const depositData = getAccountDetailsByIdData?.admin_account;
  const token = localStorage.getItem("accessToken");

  const [data, setData] = useState({
    amount: "",
    payment_method: "",
    status: 1,
    image: "",
    adminAccountId: "",
  });

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchCommissionPercent());
    dispatch(fetchReferedUser(userId));
    dispatch(fetchDeposits({ id: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (commissionPercent.length) setReferredData(commissionPercent);
    if (Object.keys(referedUser).length) {
      setReferByValue(referedUser.user.refer_by);
    }
  }, [referedUser, commissionPercent]);

  useEffect(() => {
    if (fetchDepositsData) {
      setTransactionCount(fetchDepositsData?.total);
    }
  }, [fetchDepositsData]);

  useEffect(() => {
    if (referredData && referredData.data) {
      const filtered = referredData.data.filter(
        (per) => per.commission_type === "deposit"
      );
      const percentArray = filtered.map((per) => per.percent);
      const levelArray = filtered.map((per) => per.level);
      setPercent(percentArray);
      setLevel(levelArray);
    }
  }, [referredData]);

  useEffect(() => {
    dispatch(fetchAccountDetailsById(depositId));
  }, [dispatch]);

  let count = 0;
  const handleCommission = async () => {
    if (transactionCount < level.length && count === 0) {
      const body = {
        to_id: +userId,
        from_id: +referByValue,
        UserName: user?.userName,
        level: level[transactionCount],
        percent: percent[transactionCount],
        main_amount: getAccountDetailsByIdData?.amount,
        commission_type: "deposit",
      };
      const res3 = await CreateCommissionLog(body, userId);
      const commissionAmount = parseFloat(
        (percent[transactionCount] / 100) * getAccountDetailsByIdData?.amount
      ).toFixed(2);

      if (res3) {
        const combody = {
          transactionType: "Commission",
          amount: commissionAmount.toString(),
          userId: +referByValue,
          sender: "Commission",
          receiver: "User",
          description: "Deposit Commission",
        };
        await commissionTransaction(combody);
      }
      count++;
    }
  };

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const generatedCanvas = await upiQr({
          amount: getAccountDetailsByIdData?.amount ?? "",
          name: depositData?.account_holder_name,
          upi: depositData?.upi_id,
        });
        setCanvas(generatedCanvas);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [
    depositData?.account_holder_name,
    depositData?.upi_id,
    getAccountDetailsByIdData?.amount,
  ]);

  const handleDeposite = async (e) => {
    e.preventDefault();
    const mData = {
      ...data,
      adminAccountId: getAccountDetailsByIdData?.adminAccountId,
      amount: getAccountDetailsByIdData?.amount,
    };
    const params = new FormData();
    Object.keys(mData).forEach((key) => {
      const value = mData[key];
      params.append(key, value);
    });
    const res = await updateDepositApi({ body: params, token });
    if (res?.message === "Success") {
      handleCommission();
      navigate("/deposit");
    }
  };
  return (
    <>
      <title>Deposites - Kuber Wins</title>
      <Navbar props={{ mainPage: "dashboard", subPage: "" }} />
      <section className="sec-dashbaord" style={{ backgroundColor: "#f5f6ff" }}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"deposit"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="col-lg-12">
                  {getAccountDetailsByIdData?.status === 0 ? (
                    <div className="card card-table p-0">
                      <div className="card-header py-3 px-4">
                        <h5 className="mb-0 fs-5">Deposites Details</h5>
                      </div>
                      <div className="row px-4 pt-4 pb-2">
                        <h3 className="border-bottom">
                          Amount : Rs.{getAccountDetailsByIdData.amount}
                        </h3>
                        <div className="col-lg-6 col-md-6 col-12 border-end">
                          <h6 className="fw-bold">Bank Transfer</h6>
                          <div className="">
                            Account Holder Name :{" "}
                            {depositData?.account_holder_name}
                          </div>
                          <div className="mt-3">
                            Bank Name : {depositData?.bank_name}
                          </div>
                          <div className="mt-3">
                            Account Type : {depositData?.account_type}
                          </div>
                          <div className="mt-3">
                            Account Number : {depositData?.account_number}
                          </div>
                          <div className="mt-3">
                            IFSC Code : {depositData?.ifsc_code}
                          </div>
                        </div>
                        <span className="py-3 text-center d-lg-none d-md-none">
                          OR
                        </span>
                        <div className="col-lg-6 col-md-6 col-12">
                          <h6 className="fw-bold">UPI Transfer</h6>
                          <div>
                            {canvas ? (
                              <div
                                ref={(node) => {
                                  if (node && canvas?.canvas) {
                                    node.innerHTML = "";
                                    node.appendChild(canvas?.canvas);
                                  }
                                }}
                              />
                            ) : (
                              <p>Loading QR code...</p>
                            )}
                            <a
                              download
                              href={canvas?.canvas?.toDataURL(canvas?.canvas)}
                              className="btn btn-info inf-rounded btn-sm px-3 ms-2"
                            >
                              Download QR
                            </a>
                          </div>{" "}
                          <div className="">
                            UPI ID : {depositData?.upi_id}{" "}
                            <img
                              src={
                                "assets/images/material-symbols_file-copy-outline.png"
                              }
                              onClick={() => {
                                copy(depositData?.upi_id);
                                setIsCopied("Copied");
                                setTimeout(() => {
                                  setIsCopied("");
                                }, 2000);
                              }}
                              className="img-fluid"
                              alt=""
                              style={{ cursor: "pointer", height: "16px" }}
                            />
                            {isCopied}
                          </div>{" "}
                          <span style={{ fontSize: "13px" }}>
                            Scan the QR code from any UPI app to complete the
                            payment.
                          </span>
                          <div
                            style={{ fontSize: "13px" }}
                            className="d-block d-sm d-lg-none d-md-none"
                          >
                            OR <br /> Click "Pay by UPI" button to make payment
                            directly from any UPI App.
                            <a
                              href={canvas?.url}
                              className="btn inf-rounded btn-sm px-3 ms-2 upi-btn"
                            >
                              Pay by{" "}
                              <img
                                src="../assets/images/upi-logo.png"
                                className="img-fluid"
                                style={{ height: "18px" }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="row px-4  pb-2">
                        <div className="border-top" />
                      </div>

                      <div className="px-4">
                        {getAccountDetailsByIdData?.status === 0 && (
                          <form onSubmit={handleDeposite} className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                              <div className="form-lable">
                                Payment Method{" "}
                                <span className="text-danger">*</span>
                              </div>
                              <select
                                required
                                className="form-select"
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    payment_method: e.target.value,
                                  })
                                }
                              >
                                <option value="">Select</option>
                                <option value="upi">UPI</option>
                                <option value="bank">Bank</option>
                              </select>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                              {" "}
                              <div className="form-lable">
                                Upload Screentshot (jpg, jpeg, png)
                                <span className="text-danger">*</span>{" "}
                              </div>
                              <input
                                required
                                type="file"
                                className="form-control"
                                accept=".png, .jpg, .jpeg"
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    image: e.target.files[0],
                                  })
                                }
                              />
                              <span style={{ fontSize: "13px" }}>
                                Upload the screenshot of the payment you have
                                done
                              </span>
                            </div>
                            <div className="col-12 py-2 text-center">
                              <button className="btn btn-primary" type="submit">
                                Submit
                              </button>
                            </div>
                          </form>
                        )}

                        {getAccountDetailsByIdData?.status === 1 && (
                          <div className="py-2 text-danger">
                            Request for Deposite is already been done, Pending
                            from admin side
                          </div>
                        )}
                        {getAccountDetailsByIdData?.status !== 0 && (
                          <div>
                            Payment done throungh{" "}
                            <span className="text-uppercase">
                              {getAccountDetailsByIdData?.payment_method}{" "}
                              TRANSFER
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <DepositesPaymentStatus
                      getAccountDetailsByIdData={getAccountDetailsByIdData}
                    />
                  )}
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
