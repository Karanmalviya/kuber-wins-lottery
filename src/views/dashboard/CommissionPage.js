import React, {useState, useEffect} from "react";
// import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import {getCommissionUser, getReferedUser} from "../../utils";
import ReactPaginate from "react-paginate";
import {fetchLotteryRewards} from "../../features/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "@mui/material";

export default function CommissionPage() {
  const dispatch = useDispatch();
  const [commissionUser, setCommissionUser] = useState([]);
  // const [loader, setLoader] = useState(false);
  const [referUser, setReferUser] = useState([]);
  const [otherCommission, setOtherCommission] = useState([]);
  const [currentPage1, setCurrentPage1] = useState(0);
  const [currentPage2, setCurrentPage2] = useState(0);
  const [currentPage3, setCurrentPage3] = useState(0);
  const [commissionDeposit, setCommissionDeposit] = useState([]);
  const [commissionBuy, setCommissionBuy] = useState([]);
  const [commissionWin, setCommissionWin] = useState([]);
  const {lotteryRewardsData} = useSelector((state) => state.api);

  const itemsPerPage = 10;
  const offset1 = currentPage1 * itemsPerPage;
  const offset2 = currentPage2 * itemsPerPage;
  const offset3 = currentPage3 * itemsPerPage;
  const userId = localStorage.getItem("userId");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = lotteryRewardsData?.totalPages;

  useEffect(() => {
    async function fetchReferedUser() {
      const referCommission = await getCommissionUser({});
      setCommissionUser(referCommission?.data?.rows);
    }
    fetchReferedUser();
  }, []);

  useEffect(() => {
    if (userId) {
      async function fetchReferedUser() {
        const refer = await getReferedUser({}, userId);
        setReferUser(refer?.data?.referredUsers);
        setOtherCommission(refer?.data?.commission);
      }

      fetchReferedUser();
    }
    dispatch(fetchLotteryRewards({userId}));
  }, [userId]);

  useEffect(() => {
    const referUserMap = new Map(referUser.map((user) => [user.id, user]));
    const otherCommissionMap = new Map(
      otherCommission.map((user) => [user.id, user])
    );

    const filteredCommissions = commissionUser.filter((commission) => {
      const otherUser = otherCommissionMap.get(commission.id);
      return otherUser && referUserMap.has(otherUser.to_id);
    });

    const processCommissions = (type) => {
      return filteredCommissions
        .filter((commission) => commission.commission_type === type)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((user) => {
          const referralUser = otherCommissionMap.get(user.id);
          if (referralUser) {
            const referralName = referUserMap.get(referralUser.to_id);
            if (referralName) {
              return {
                ...user,
                referralName: `${referralName.fname} ${referralName.lname}`,
              };
            }
          }
          return user;
        });
    };

    setCommissionDeposit(processCommissions("deposit"));
    setCommissionBuy(processCommissions("buy"));
    setCommissionWin(processCommissions("win"));
  }, [commissionUser, referUser, otherCommission]);

  // useEffect(() => {
  //   if(lotteryRewardsData)
  // }, [input])

  const currentPageData1 = commissionDeposit?.slice(
    offset1,
    offset1 + itemsPerPage
  );

  const currentPageData2 = commissionBuy?.slice(
    offset2,
    offset2 + itemsPerPage
  );
  const currentPageData3 = commissionWin?.slice(
    offset3,
    offset3 + itemsPerPage
  );

  const handlePageChange1 = (selectedPage) => {
    setCurrentPage1(selectedPage.selected);
  };
  const handlePageChange2 = (selectedPage) => {
    setCurrentPage2(selectedPage.selected);
  };
  const handlePageChange3 = (selectedPage) => {
    setCurrentPage3(selectedPage.selected);
  };

  return (
    <>
      <title>Referral Commission - Kuber Wins</title>
      <Navbar props={{mainPage: "dashboard", subPage: ""}} />
      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props="commission" />
            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row commission-tab ">
                <div className="mb-4">
                  <ul
                    className="nav nav-pills justify-content-end"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-deposit-commission-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-deposit-commission"
                        type="button"
                        role="tab"
                        aria-controls="pills-deposit-commission"
                      >
                        Deposit Commission
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-lottery-commission-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-lottery-commission"
                        type="button"
                        role="tab"
                        aria-controls="pills-lottery-commission"
                      >
                        Lottery Buy Commission
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link "
                        id="pills-win-commission-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-win-commission"
                        type="button"
                        role="tab"
                        aria-controls="pills-win-commission"
                      >
                        Win Commission
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link "
                        id="pills-lottery-rewards-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-lottery-rewards"
                        type="button"
                        role="tab"
                        aria-controls="pills-lottery-rewards"
                      >
                        Lottery Rewards
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-12">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade active show"
                      id="pills-deposit-commission"
                      role="tabpanel"
                      aria-labelledby="pills-deposit-commission-tab"
                    >
                      <div className="card card-table p-0">
                        <div className="card-header py-3 px-4">
                          <h5 className="mb-0 fs-5">Deposit Commissions</h5>
                        </div>
                        <div className="card-body p-0 table-responsive">
                          <table className="table table-bordered withdraw-table">
                            <thead>
                              <tr>
                                <th>SNo.</th>
                                <th>Commision From</th>
                                <th>Comission Level</th>
                                <th>Amount</th>
                                <th>Title</th>
                                <th>Transaction</th>
                              </tr>
                            </thead>

                            <tbody>
                              {currentPageData1 &&
                              currentPageData1.length > 0 ? (
                                currentPageData1.map((item, i) => (
                                  <tr key={item.id} className="acc">
                                    <td>{offset1 + i + 1}</td>
                                    <td>{item?.referralName}</td>
                                    <td>Level {item?.level}</td>
                                    <td>Rs.{item?.amount}</td>
                                    <td>Deposit Commission</td>
                                    <td>{item?.randomNo}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={6}>No Data Found</td>
                                </tr>
                              )}
                            </tbody>
                            <tfoot
                              hidden={
                                commissionDeposit.length > itemsPerPage
                                  ? false
                                  : true
                              }
                            >
                              <ReactPaginate
                                previousLabel={
                                  currentPage1 === 0 ? null : "Previous"
                                }
                                nextLabel={
                                  currentPage1 ===
                                  Math.ceil(
                                    commissionDeposit.length / itemsPerPage
                                  ) -
                                    1
                                    ? null
                                    : "Next"
                                }
                                breakLabel="..."
                                breakClassName="break-me"
                                pageCount={Math.ceil(
                                  commissionDeposit.length / itemsPerPage
                                )}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange1}
                                containerClassName="pagination"
                                activeClassName="active"
                                previousClassName={
                                  currentPage1 === 0 ? "pagniation-none" : ""
                                }
                                nextClassName={
                                  currentPage1 ===
                                  Math.ceil(
                                    commissionDeposit.length / itemsPerPage
                                  ) -
                                    1
                                    ? "pagniation-none"
                                    : ""
                                }
                              />{" "}
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-lottery-commission"
                      role="tabpanel"
                      aria-labelledby="pills-lottery-commission-tab"
                    >
                      <div className="card card-table p-0">
                        <div className="card-header py-3 px-4">
                          <h5 className="mb-0 fs-5">Lottery Buy Commissions</h5>
                        </div>
                        <div className="card-body p-0 table-responsive">
                          <table className="table table-bordered withdraw-table">
                            <thead>
                              <tr>
                                <th>SNo.</th>
                                <th>Commision From</th>
                                <th>Comission Level</th>
                                <th>Amount</th>
                                <th>Title</th>
                                <th>Transaction</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentPageData2 &&
                              currentPageData2.length > 0 ? (
                                currentPageData2.map((item, i) => (
                                  <tr key={item.id} className="acc">
                                    <td>{offset2 + i + 1}</td>
                                    <td>{item?.referralName}</td>
                                    <td>Level {item?.level}</td>
                                    <td>Rs.{item?.amount}</td>
                                    <td>Lottery Buy Commission</td>
                                    <td>{item?.randomNo}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={6}>No Data Found</td>
                                </tr>
                              )}
                            </tbody>{" "}
                            <tfoot
                              hidden={
                                commissionBuy.length > itemsPerPage
                                  ? false
                                  : true
                              }
                            >
                              <ReactPaginate
                                previousLabel={
                                  currentPage2 === 0 ? null : "Previous"
                                }
                                nextLabel={
                                  currentPage2 ===
                                  Math.ceil(
                                    commissionBuy.length / itemsPerPage
                                  ) -
                                    1
                                    ? null
                                    : "Next"
                                }
                                breakLabel="..."
                                breakClassName="break-me"
                                pageCount={Math.ceil(
                                  commissionBuy.length / itemsPerPage
                                )}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange2}
                                containerClassName="pagination"
                                activeClassName="active"
                                previousClassName={
                                  currentPage2 === 0 ? "pagniation-none" : ""
                                }
                                nextClassName={
                                  currentPage2 ===
                                  Math.ceil(
                                    commissionDeposit.length / itemsPerPage
                                  ) -
                                    1
                                    ? "pagniation-none"
                                    : ""
                                }
                              />{" "}
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade "
                      id="pills-win-commission"
                      role="tabpanel"
                      aria-labelledby="pills-win-commission-tab"
                    >
                      <div className="card card-table p-0">
                        <div className="card-header py-3 px-4">
                          <h5 className="mb-0 fs-5">Win Commissions</h5>
                        </div>
                        <div className="card-body p-0 table-responsive">
                          <table className="table table-bordered withdraw-table">
                            <thead>
                              <tr>
                                <th>SNo.</th>
                                <th>Commision From</th>
                                <th>Comission Level</th>
                                <th>Amount</th>
                                <th>Title</th>
                                <th>Transaction</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentPageData3 &&
                              currentPageData3.length > 0 ? (
                                currentPageData3.map((item, i) => (
                                  <tr key={item.id} className="acc">
                                    <td>{offset3 + i + 1}</td>
                                    <td>{item?.referralName}</td>
                                    <td>Level {item?.level}</td>
                                    <td>Rs.{item?.amount}</td>
                                    <td>Win Commission</td>
                                    <td>{item?.randomNo}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={6}>No Data Found</td>
                                </tr>
                              )}
                            </tbody>{" "}
                            <tfoot
                              hidden={
                                commissionWin.length > itemsPerPage
                                  ? false
                                  : true
                              }
                            >
                              <ReactPaginate
                                previousLabel={
                                  currentPage3 === 0 ? null : "Previous"
                                }
                                nextLabel={
                                  currentPage3 ===
                                  Math.ceil(
                                    commissionWin.length / itemsPerPage
                                  ) -
                                    1
                                    ? null
                                    : "Next"
                                }
                                breakLabel="..."
                                breakClassName="break-me"
                                pageCount={Math.ceil(
                                  commissionWin.length / itemsPerPage
                                )}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange3}
                                containerClassName="pagination"
                                activeClassName="active"
                                previousClassName={
                                  currentPage3 === 0 ? "pagniation-none" : ""
                                }
                                nextClassName={
                                  currentPage3 ===
                                  Math.ceil(
                                    commissionDeposit.length / itemsPerPage
                                  ) -
                                    1
                                    ? "pagniation-none"
                                    : ""
                                }
                              />{" "}
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade "
                      id="pills-lottery-rewards"
                      role="tabpanel"
                      aria-labelledby="pills-lottery-rewards-tab"
                    >
                      <div className="card card-table p-0">
                        <div className="card-header py-3 px-4">
                          <h5 className="mb-0 fs-5">Lottery Rewards</h5>
                        </div>
                        <div className="card-body p-0 table-responsive">
                          <table className="table table-bordered withdraw-table">
                            <thead>
                              <tr>
                                <th>SNo.</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Lottery</th>
                                <th>Tickets Earned</th>
                                <th>Level</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {lotteryRewardsData?.data?.length > 0 ? (
                                lotteryRewardsData?.data?.map((item, i) => (
                                  <tr key={item.id} className="acc">
                                    <td>{offset3 + i + 1}</td>
                                    <td>
                                      {item?.User?.fname} {item?.User?.lname}
                                    </td>
                                    <td>
                                      {new Date(
                                        item?.createdAt
                                      ).toLocaleString()}
                                    </td>
                                    <td>{item?.gameInformation?.gameName}</td>
                                    <td>{item?.free_tickets}</td>
                                    <td>{item?.level}</td>
                                    <td>Win Commission</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={6}>No Data Found</td>
                                </tr>
                              )}
                            </tbody>{" "}
                            <tfoot
                              hidden={
                                commissionWin.length > itemsPerPage
                                  ? false
                                  : true
                              }
                            >
                              <div
                                className="row mb-2"
                                hidden={totalPages ? false : true}
                              >
                                <div className="col-lg-6 col-md-6">
                                  <div className="d-flex ms-4">
                                    <label>Rows per page:</label>
                                    <select
                                      className="form-select form-select-sm w-25 ms-3"
                                      onChange={(e) =>
                                        setPageSize(e.target.value)
                                      }
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
                            </tfoot>
                          </table>
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
