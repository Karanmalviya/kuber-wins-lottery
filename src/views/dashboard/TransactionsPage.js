import React, {useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import usePagination from "../../hooks/usePagination";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "../components/LoadingSpinner";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {fetchTransaction} from "../../features/apiSlice";
import MiniLoader from "../components/MiniLoader";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";
import {stylesDate} from "../../styles/tableStyle";
import {DateRange} from "react-date-range";
import Pagination from "@mui/material/Pagination";

export default function DashboardPage({props}) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [transactions, setTransactions] = useState([]);
  const [transactionSearch, setTransactionSearch] = useState("");
  const [pageRange, setPageRange] = useState(10);
  const [selectedTransaction, setSelectedTransaction] = useState([]);
  const [selectedDateTransaction, setSelectedDateTransaction] = useState([]);
  const [displayDateRangePicker, setDisplayRangePicker] = useState(false);
  const [transactionDate, setTransactionDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      date: "",
    },
  ]);

  const transaction = useSelector((state) => state.api.transaction);
  const transactionLoading = useSelector(
    (state) => state.api.transactionLoading
  );

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(transaction).length) {
      const {rows} = transaction;
      const filtersUsers = rows.filter((user) => user.UserId == userId);
      const filters = filtersUsers
        ?.filter(
          (transaction) =>
            transaction.transactionType === "AdminWithdraw" ||
            transaction.transactionType === "AdminDeposit" ||
            transaction.transactionType === "Winning" ||
            transaction.transactionType === "Purchase" ||
            transaction.transactionType === "Card_Purchase" ||
            transaction.transactionType === "Commission"
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTransactions(filters);
    }
  }, [transaction, userId]);

  useEffect(() => {
    if (transactionSearch) {
      const filtered = transactions.filter((item) =>
        item.tansactionId
          .toLowerCase()
          .includes(transactionSearch.toLowerCase())
      );
      setSelectedTransaction(filtered);
    } else {
      setSelectedTransaction(transactions);
    }
  }, [transactions, transactionSearch]);

  useEffect(() => {
    if (selectedTransaction.length) {
      const startDate = moment(transactionDate[0].startDate).format(
        "DD/MM/YYYY"
      );
      const endDate = moment(transactionDate[0].endDate).format("DD/MM/YYYY");
      const date = transactionDate[0].date;

      if (date) {
        const filteredData = selectedTransaction.filter((item) => {
          const createdAt = moment(item.createdAt).format("DD/MM/YYYY");
          return createdAt >= startDate && createdAt <= endDate;
        });
        setSelectedDateTransaction(filteredData);
      } else {
        setSelectedDateTransaction(selectedTransaction);
      }
    }
  }, [selectedTransaction, transactionDate]);

  const [page, setPage] = useState(1);
  const PER_PAGE = pageRange;
  const maxPage = Math.ceil(selectedDateTransaction.length / PER_PAGE);
  const currentPageData = selectedDateTransaction.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const handleChange = (e, p) => {
    setPage(p);
  };

  return (
    <>
      <title>Transactions - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"transactions"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-table p-0">
                    <div className="card-header py-3 px-4">
                      <div className="row">
                        <div className="col-lg-4">
                          <h5 className="mb-0 fs-5">Transactions</h5>
                        </div>
                        <div className="col-lg-8 ">
                          <div className="row d-flex justify-content-end">
                            <div className="col-lg-6 col-md-6 col-sm-6 pe-lg-1 pt-1">
                              <div className="form-group has-search">
                                <span className="fa fa-search form-control-feedback" />
                                <input
                                  style={{fontSize: "13px"}}
                                  type="text"
                                  className="form-control form-control-t input-groupl form-control-sm w-100 rounded-pill border-0"
                                  placeholder="Transaction ID"
                                  onChange={(e) =>
                                    setTransactionSearch(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 ps-lg-1 pt-1">
                              <div
                                onClick={() =>
                                  setDisplayRangePicker(!displayDateRangePicker)
                                }
                              >
                                <CalendarMonthIcon
                                  className="mt-1 bg-light"
                                  style={{
                                    cursor: "pointer",
                                    position: "absolute",
                                    zIndex: "99",
                                    right: "36px",
                                    fontSize: "19px",
                                  }}
                                />

                                <input
                                  style={{fontSize: "13px"}}
                                  className="input-group form-control form-control-sm w-100 rounded-pill border-0 text-truncate text-start"
                                  value={
                                    transactionDate[0].date &&
                                    moment(
                                      transactionDate?.[0].startDate
                                    ).format("MMM DD, YYYY") +
                                      " to " +
                                      moment(
                                        transactionDate?.[0].endDate
                                      ).format("MMM DD, YYYY")
                                  }
                                  placeholder="Select from - Select to"
                                />
                              </div>
                              {displayDateRangePicker ? (
                                <div style={stylesDate.popover}>
                                  <div
                                    style={stylesDate.cover}
                                    onClick={() => setDisplayRangePicker(false)}
                                  />

                                  <DateRange
                                    maxDate={new Date()}
                                    className="card"
                                    editableDateInputs={true}
                                    onChange={(item) => {
                                      setTransactionDate([
                                        {
                                          ...item.selection,
                                          date: new Date(),
                                        },
                                      ]);
                                    }}
                                    moveRangeOnFirstSelection={false}
                                    ranges={transactionDate}
                                  />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="card-header py-3 px-4">
                      <h5 className="mb-0 fs-5">Transactions</h5>
                    </div> */}
                    <div className="card-body p-0 table-responsive">
                      <table className="table table-bordered withdraw-table">
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th>Transaction ID</th>
                            <th>Transaction Date</th>
                            <th>Amount</th>
                            <th>Post Balance</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPageData?.length > 0
                            ? currentPageData.map((item, idx) => {
                                return (
                                  <tr key={idx}>
                                    <td>{(page - 1) * PER_PAGE + idx + 1}</td>
                                    <td>{item?.tansactionId}</td>
                                    <td>
                                      {moment(item?.createdAt).format(
                                        "DD/MM/YYYY hh:mm:ss A"
                                      )}
                                      {/* {new Date(
                                        item?.createdAt
                                      ).toLocaleString()}{" "} */}
                                    </td>
                                    <td>${item?.amount?.toLocaleString()}</td>
                                    <td>${item?.balance?.toLocaleString()}</td>
                                    <td style={{textAlign: "left"}}>
                                      {item?.description}
                                    </td>
                                  </tr>
                                );
                              })
                            : ""}
                        </tbody>
                      </table>
                      <div>{transactionLoading && <MiniLoader />}</div>{" "}
                      <div
                        className="row mb-2"
                        hidden={selectedDateTransaction.length ? false : true}
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
