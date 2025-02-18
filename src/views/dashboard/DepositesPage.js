import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import "../../styles/paymentModal.css";
import { encrypt } from "../.././utils/encryptdecrypt";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommissionPercent,
  fetchDeposits,
  fetchReferedUser,
  fetchUser,
} from "../../features/apiSlice";
import MiniLoader from "../components/MiniLoader";
import TermAndConditionDialog from "../components/TermAndConditionDialog";
import { Modal } from "react-bootstrap";
import { createDepositApi } from "../../api/api";
import { Pagination } from "@mui/material";
import toast from "react-hot-toast";

export default function DepositesPage({ props }) {
  const termsAndConditonRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [depositAmount, setDepositAmount] = useState(0);
  const token = localStorage.getItem("accessToken");
  const [openDepositeBox, setOpenDepositeBox] = useState(false);

  const handleDepositeBoxClose = () => {
    setOpenDepositeBox(false);
  };

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchCommissionPercent());
    dispatch(fetchReferedUser(userId));
  }, [dispatch, userId]);

  const user = useSelector((state) => state.api.user);

  const { fetchDepositsData, fetchDepositsLoading } = useSelector(
    (state) => state.api
  );

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = fetchDepositsData?.totalPages;

  useEffect(() => {
    dispatch(fetchDeposits({ id: userId, page, pageSize }));
  }, [dispatch, userId, page, pageSize]);

  const handleDepositeSubmit = async () => {
    if (depositAmount !== "" && depositAmount !== 0) {
      const res = await createDepositApi({ amount: depositAmount, token });
      if (res?.message === "Success") {
        navigate(
          `/deposit/${encrypt(res?.data?.id.toString()).replace(/=+$/, "")}`
        );
      } else {
        toast.error(res?.message);
      }
    }
  };

  const status = (s) => {
    if (s === 0) {
      return (
        <span className="badge bg-primary rounded-pill">Request Generated</span>
      );
    } else if (s === 1) {
      return (
        <span className="badge bg-warning rounded-pill">
          Pending From Admin
        </span>
      );
    } else if (s === 2) {
      return <span className="badge bg-success rounded-pill">Approved</span>;
    } else {
      return <span className="badge bg-danger rounded-pill">Rejected</span>;
    }
  };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      <title>Deposits - Kuber Wins</title>
      <Navbar props={{ mainPage: "dashboard", subPage: "" }} />
      <section className="sec-dashbaord" style={{ backgroundColor: "#f5f6ff" }}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"deposit"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex justify-content-end mb-2">
                    <button
                      className="btn btn-info text-white btn-sm ms-lg-5 ms-2 px-3"
                      onClick={() => {
                        if (user.term_condition) {
                          setOpenDepositeBox(true);
                        } else {
                          termsAndConditonRef.current.handleClickOpen();
                        }
                      }}
                    >
                      Deposit
                    </button>
                  </div>{" "}
                  <div className="card card-table p-0">
                    <div className="card-header py-3 px-4">
                      <h5 className="mb-0 fs-5">Deposits</h5>
                    </div>
                    <div className="card-body p-0 table-responsive">
                      <table className="table table-bordered withdraw-table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Date & Time</th>
                            <th>Current Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fetchDepositsData?.data?.length > 0
                            ? fetchDepositsData?.data?.map((item, idx) => {
                                return (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>Rs.{item?.amount}</td>
                                    <td>
                                      {item?.payment_method
                                        ? item?.payment_method?.toUpperCase() +
                                          " Transfer"
                                        : "Not done"}
                                    </td>
                                    <td className="text-capitalize">
                                      {new Date(
                                        item?.createdAt
                                      ).toLocaleString()}
                                    </td>
                                    <td>{status(item?.status)}</td>
                                    <td>
                                      <Link
                                        state={item}
                                        to={`/deposit/${encrypt(
                                          item?.id.toString()
                                        ).replace(/=+$/, "")}`}
                                        className="btn btn-info inf-rounded btn-sm px-3 pt-sm"
                                      >
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })
                            : ""}
                        </tbody>
                      </table>
                      {fetchDepositsLoading && <MiniLoader />}
                      <div
                        className="row mb-2"
                        hidden={totalPages ? false : true}
                      >
                        <div className="col-lg-6 col-md-6">
                          <div className="d-flex ms-4">
                            <label>Rows per page:</label>
                            <select
                              className="form-select form-select-sm w-25 ms-3"
                              onChange={(e) => setPageSize(e.target.value)}
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, p) => setPage(p)}
                            showFirstButton
                            showLastButton
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <Modal
          show={openDepositeBox}
          onHide={handleDepositeBoxClose}
          centered
          className="fade-scale"
        >
          <Modal.Header closeButton className="OTP-modal">
            <Modal.Title>Deposit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-2">
              <span className="">Fill The Deposit Amount</span>
            </div>
            <input
              type="number"
              onChange={(e) => setDepositAmount(e.target.value)}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer className="d-inline" style={{ lineHeight: "9px" }}>
            <div className="mb-4">
              <span className="float-end">
                Total Amount :{" "}
                <span className="fw-bold text-black">Rs.{depositAmount}</span>
              </span>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className={"btn btn-primary px-3 btn-sm w-100"}
                onClick={handleDepositeSubmit}
              >
                Pay Request
              </button>
            </div>
            <span id="err" className="text-danger"></span>
          </Modal.Footer>
        </Modal>
        <TermAndConditionDialog ref={termsAndConditonRef} />
      </section>
      <Footer props={""} />
    </>
  );
}
