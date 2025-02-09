import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import {fetchWithdrawalById} from "../../utils/index";
import LoadingSpinner from "../components/LoadingSpinner";
import {encrypt} from "../../utils/encryptdecrypt";
import usePagination from "../../hooks/usePaginate";
import ReactPaginate from "react-paginate";
import {fetchUserWithDrawal} from "../../features/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import MiniLoader from "../components/MiniLoader";

export default function WithdrawalPage({props}) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    dispatch(fetchUserWithDrawal(userId));
  }, [userId]);

  const UserWithDrawal = useSelector((state) => state.api.withdrawal);
  const UserWithDrawalLoading = useSelector(
    (state) => state.api.withdrawalLoading
  );

  useEffect(() => {
    if (UserWithDrawal.length) {
      setWithdrawals(UserWithDrawal);
    }
  }, [UserWithDrawal, userId]);

  const uniqueWithdrawals = withdrawals.reduce((acc, item) => {
    const existingItem = acc.find(
      (withdrawal) =>
        withdrawal.Account_Number === item.Account_Number &&
        withdrawal.IFSC_Number === item.IFSC_Number
    );

    if (!existingItem) {
      acc.push(item);
    }
    return acc;
  }, []);

  const itemsPerPage = 10;

  const {currentPage, handlePageChange, getCurrentPageData, pageCount} =
    usePagination(uniqueWithdrawals, itemsPerPage);

  const {currentPageData, offset} = getCurrentPageData();
  return (
    <>
      <title>Withdrawal - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"withdrawal"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="mb-4 d-flex justify-content-between">
                  <Link
                    to={"/withdrawal-form"}
                    className="float-end btn-withdrawal pull-start"
                  >
                    Add New
                  </Link>
                  <Link
                    to={"/withdrawal-history"}
                    className="float-end btn-withdrawal pull-start"
                  >
                    Withdraw History
                  </Link>
                </div>

                <div className="col-lg-12">
                  <div className="card card-table p-0">
                    <div className="card-header py-3 px-4">
                      <h5 className="mb-0 fs-5">Account Details</h5>
                    </div>
                    <div className="card-body p-0 table-responsive">
                      <table className="table table-bordered withdraw-table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Account Holder Name</th>
                            <th>Account No.</th>
                            <th>IFSC Code</th>
                            <th>Type of Account</th>
                            <th>PanCard No.</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPageData.map((item, idx) => {
                            return (
                              <tr key={idx} className="acc">
                                <td>{offset + idx + 1}</td>
                                <td>{item.Account_Holder_Name}</td>
                                <td>{item.Account_Number}</td>
                                <td className="text-capitalize">
                                  {item.IFSC_Number}
                                </td>
                                <td>{item.Type_of_account}</td>
                                <td>{item.PanCard_No}</td>
                                <td>
                                  {" "}
                                  <Link
                                    className="btn btn-info inf-rounded btn-sm px-3 pt-sm"
                                    state={item}
                                    to={`/withdrawal-form/${encrypt(
                                      item.id.toString()
                                    ).replace(/=+$/, "")}`}
                                  >
                                    Request
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="py-2">
                        {UserWithDrawalLoading && <MiniLoader />}
                      </div>
                      <div
                        hidden={
                          uniqueWithdrawals.length > itemsPerPage ? false : true
                        }
                      >
                        <ReactPaginate
                          previousLabel={currentPage === 0 ? null : "Previous"}
                          nextLabel={
                            currentPage === pageCount - 1 ? null : "Next"
                          }
                          breakLabel="..."
                          breakClassName="break-me"
                          pageCount={Math.ceil(
                            uniqueWithdrawals.length / itemsPerPage
                          )}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageChange}
                          containerClassName="pagination"
                          activeClassName="active"
                          previousClassName={
                            currentPage === 0 ? "pagniation-none" : ""
                          }
                          nextClassName={
                            currentPage === pageCount - 1
                              ? "pagniation-none"
                              : ""
                          }
                        />
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
