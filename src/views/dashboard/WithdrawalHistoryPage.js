import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import {encrypt} from "../../utils/encryptdecrypt";
import usePagination from "../../hooks/usePaginate";
import ReactPaginate from "react-paginate";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {fetchUserWithDrawal} from "../../features/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import MiniLoader from "../components/MiniLoader";
import {Pagination} from "@mui/material";

export default function WithdrawalHistoryPage({props}) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [withdrawal, setWithdrawal] = useState([]);

  useEffect(() => {
    dispatch(fetchUserWithDrawal(userId));
  }, [userId]);

  const UserWithDrawal = useSelector((state) => state.api.withdrawal);
  const UserWithDrawalLoading = useSelector(
    (state) => state.api.withdrawalLoading
  );

  useEffect(() => {
    if (UserWithDrawal.length) {
      setWithdrawal(UserWithDrawal);
    }
  }, [UserWithDrawal, userId]);

  const [page, setPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const PER_PAGE = pageRange;
  const maxPage = Math.ceil(withdrawal.length / PER_PAGE);
  const currentPageData = withdrawal.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const handleChange = (e, p) => {
    setPage(p);
  };

  return (
    <>
      <title>Withdrawal History - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"withdrawal"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="mb-4">
                  <Link
                    to={"/withdrawal"}
                    className="float-end btn-withdrawal pull-start"
                  >
                    Withdraw Now
                  </Link>
                </div>
                <div className="col-lg-12">
                  <div className="card card-table p-0">
                    <div className="card-header py-3 px-4">
                      <h5 className="mb-0 fs-5">Withdrawal History</h5>
                    </div>
                    <div className="card-body p-0 table-responsive">
                      <table className="table table-bordered withdraw-table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Initiated</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPageData?.length > 0
                            ? currentPageData
                                .sort(
                                  (a, b) =>
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                                )
                                .map((item, idx) => {
                                  return (
                                    <tr key={idx}>
                                      <td>{(page - 1) * PER_PAGE + idx + 1}</td>
                                      <td>
                                        {item?.status
                                          ? item?.status === 2
                                            ? "Withdrawal Rejected"
                                            : item?.status === 0
                                            ? "Pending"
                                            : item?.tansactionId
                                          : "Pending"}
                                      </td>
                                      <td>Rs.{item?.Amount?.toLocaleString()}</td>

                                      <td className="text-capitalize">
                                        {new Date(
                                          item?.createdAt
                                        ).toLocaleString()}
                                      </td>
                                      <td>
                                        {item.status == 0 ? (
                                          <span className="badge rounded-pill bg-primary ">
                                            Pending
                                          </span>
                                        ) : item.status == 1 ? (
                                          <span className="badge rounded-pill bg-success ">
                                            Approved
                                          </span>
                                        ) : (
                                          <span className="badge rounded-pill bg-danger">
                                            Rejected
                                          </span>
                                        )}
                                      </td>
                                      <td>
                                        <Link
                                          to={`/withdrawal-view/${encrypt(
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
                      {UserWithDrawalLoading && <MiniLoader />}
                      <div
                        className="row mb-2"
                        hidden={withdrawal.length ? false : true}
                      >
                        <div className="col-lg-6 col-md-6">
                          <div className="d-flex ms-4">
                            <label>Rows per page:</label>
                            <select
                              className="form-select form-select-sm w-25 ms-3"
                              onChange={(e) => {
                                setPageRange(e.target.value);
                                setPage(1);
                              }}
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
                            count={maxPage}
                            page={page}
                            onChange={handleChange}
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
      </section>

      <Footer props={""} />
    </>
  );
}
