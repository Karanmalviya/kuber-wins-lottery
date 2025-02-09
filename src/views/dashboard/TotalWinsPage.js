import React, {useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import ReactPaginate from "react-paginate";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchScratchCardWinners,
  fetchUserLotteryWinner,
  fetchWonScratchCard,
} from "../../features/apiSlice";
import {useLocation} from "react-router";
import {DateRange} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {addDays} from "date-fns";
import reactCSS from "reactcss";
import moment from "moment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {Pagination} from "@mui/material";
export default function TotalWinsPage({props}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [winnings, setWinnings] = useState([]);
  const [scratchCard, setScratchCard] = useState("");
  const [scratchCardWonData, setScratchCardWonData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [currentPage1, setCurrentPage1] = useState(0);
  const [currentPage2, setCurrentPage2] = useState(0);
  const [displayDateRangePicker, setDisplayRangePicker] = useState(false);
  const [uniqueScaratches, setUniqueScratches] = useState([]);
  const [uniqueLotteries, setUniqueLotteries] = useState([]);
  const [lotteryName, setLotteryName] = useState("");
  const [selectedLottery, setSelectedLottery] = useState([]);
  const [lotteryDate, setLotteryDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      date: "",
    },
  ]);

  const [scratchCardName, setScratchCardName] = useState("");
  const [selectedScratchCard, setSelectedScratchCard] = useState([]);
  const [scratchCardDate, setScratchCardDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      date: "",
    },
  ]);

  const styles = reactCSS({
    default: {
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
        right: "0",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  useEffect(() => {
    dispatch(fetchUserLotteryWinner(userId));
    dispatch(fetchWonScratchCard(userId));
    dispatch(fetchScratchCardWinners());
  }, [dispatch, userId]);

  const UserLotteryWinner = useSelector((state) => state.api.UserLotteryWinner);
  const scratchCardWinnersData = useSelector(
    (state) => state.api.scratchCardWinnersData
  );
  useEffect(() => {
    if (location?.state?.type === "handleScratch") {
      const tabElement = document.getElementById("pills-scratch-card-win-tab");
      if (tabElement) {
        tabElement.click();
        setScratchCardName(location?.state?.card_name);
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (UserLotteryWinner.length) {
      if (lotteryName) {
        const filter = UserLotteryWinner.filter(
          (item) => item.gameInformation.gameName === lotteryName
        );
        setSelectedLottery(filter);
      } else if (location.state) {
        const filter = UserLotteryWinner.filter(
          (item) => item.gameInformation.gameName === location.state
        );
        if (filter.length) setLotteryName(location.state);

        setSelectedLottery(filter);
      } else {
        setSelectedLottery(UserLotteryWinner);
      }
    }
  }, [UserLotteryWinner, lotteryName, location.state]);

  useEffect(() => {
    if (scratchCardWinnersData) {
      const filtered = scratchCardWinnersData.filter(
        (item) => item.UserId === +userId
      );
      if (scratchCardName && filtered?.length > 0) {
        const filter = filtered.filter(
          (item) => item.scratchCard.card_name === scratchCardName
        );
        setScratchCardWonData(filter);
      } else {
        setScratchCardWonData(filtered);
      }
    }
  }, [scratchCardWinnersData, scratchCard, scratchCardName]);

  useEffect(() => {
    if (selectedLottery.length) {
      const startDate = moment(lotteryDate?.[0].startDate).format("DD/MM/YYYY");
      const endDate = moment(lotteryDate?.[0].endDate).format("DD/MM/YYYY");
      const date = lotteryDate[0].date;
      if (date) {
        const filteredData = selectedLottery.filter((item) => {
          const createdAt = moment(item.createdAt).format("DD/MM/YYYY");
          return createdAt >= startDate && createdAt <= endDate;
        });
        setWinnings(filteredData);
      } else {
        setWinnings(selectedLottery);
      }
    }
  }, [selectedLottery, lotteryDate]);

  useEffect(() => {
    if (scratchCardWonData.length) {
      const startDate = moment(scratchCardDate[0].startDate).format(
        "DD/MM/YYYY"
      );
      const endDate = moment(scratchCardDate[0].endDate).format("DD/MM/YYYY");
      const date = lotteryDate[0].date;

      if (date) {
        const filteredData = scratchCardWonData.filter((item) => {
          const createdAt = moment(item.createdAt).format("DD/MM/YYYY");
          return createdAt >= startDate && createdAt <= endDate;
        });
        setSelectedScratchCard(filteredData);
      } else {
        setSelectedScratchCard(scratchCardWonData);
      }
    }
  }, [scratchCardWonData, scratchCardDate]);

  useEffect(() => {
    if (UserLotteryWinner.length) {
      const uniqueGameNames = new Set();
      const uniqueLotteryArray = UserLotteryWinner.filter((lottery) =>
        uniqueGameNames.has(lottery.gameInformation.gameName)
          ? false
          : (uniqueGameNames.add(lottery.gameInformation.gameName), true)
      );

      setUniqueLotteries(uniqueLotteryArray);
    }
  }, [UserLotteryWinner]);

  useEffect(() => {
    if (scratchCardWinnersData.length > 0) {
      const uniqueGameNames = new Set();
      const uniqueLotteryArray = scratchCardWinnersData.filter((lottery) =>
        uniqueGameNames.has(lottery?.scratchCard?.card_name)
          ? false
          : (uniqueGameNames.add(lottery?.scratchCard?.card_name), true)
      );

      setUniqueScratches(uniqueLotteryArray);
    }
  }, [scratchCardWinnersData]);

  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [pageRange1, setPageRange1] = useState(10);
  const [pageRange2, setPageRange2] = useState(10);

  const PER_PAGE1 = pageRange1;
  const PER_PAGE2 = pageRange2;
  const maxPage1 = Math.ceil(winnings.length / PER_PAGE1);
  const maxPage2 = Math.ceil(selectedScratchCard.length / PER_PAGE2);

  const currentPageData1 = winnings.slice(
    (page1 - 1) * PER_PAGE1,
    page1 * PER_PAGE1
  );
  const currentPageData2 = selectedScratchCard.slice(
    (page2 - 1) * PER_PAGE2,
    page2 * PER_PAGE2
  );

  const handlePageChange1 = (e, p) => {
    setPage1(p);
  };
  const handlePageChange2 = (e, p) => {
    setPage2(p);
  };
  return (
    <>
      <title>Ticket List - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"totalwins"} />

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
                        id="pills-lottery-winners-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-lottery-winners"
                        type="button"
                        role="tab"
                        aria-controls="pills-lottery-winners"
                        aria-selected="false"
                      >
                        Lottery Winners
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link "
                        id="pills-scratch-card-win-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-scratch-card-win"
                        type="button"
                        role="tab"
                        aria-controls="pills-scratch-card-win"
                        aria-selected="true"
                      >
                        Scratch Card Winners{" "}
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-12">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade active show"
                      id="pills-lottery-winners"
                      role="tabpanel"
                      aria-labelledby="pills-lottery-winners-tab"
                    >
                      <div className="card card-table p-0">
                        <div className="card-header py-3 px-4">
                          <div className="row">
                            <div className="col-lg-4">
                              <h5 className="mb-0 fs-5"> Lottery Winners</h5>
                            </div>
                            <div className="col-lg-8">
                              <div className="row d-flex justify-content-end">
                                <div className="col-lg-6 pe-lg-1">
                                  <select
                                    style={{fontSize: "13px"}}
                                    className="form-select form-select-sm w-100 rounded-pill border-0"
                                    onChange={(e) =>
                                      setLotteryName(e.target.value)
                                    }
                                    value={lotteryName}
                                  >
                                    <option selected value="">
                                      Select the Lottery
                                    </option>
                                    {uniqueLotteries.length &&
                                      uniqueLotteries.map((item) => (
                                        <option
                                          value={item.gameInformation.gameName}
                                        >
                                          {item.gameInformation.gameName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-lg-6 ps-lg-1">
                                  <div
                                    onClick={() =>
                                      setDisplayRangePicker(
                                        !displayDateRangePicker
                                      )
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
                                      className="input-group form-control form-control-sm w-100 rounded-pill border-0 text-truncate"
                                      value={
                                        lotteryDate[0].date &&
                                        moment(
                                          lotteryDate?.[0].startDate
                                        ).format("MMM DD, YYYY") +
                                          " to " +
                                          moment(
                                            lotteryDate?.[0].endDate
                                          ).format("MMM DD, YYYY")
                                      }
                                      placeholder="Select from - Select to"
                                    />
                                  </div>
                                  {displayDateRangePicker ? (
                                    <div style={styles.popover}>
                                      <div
                                        style={styles.cover}
                                        onClick={() =>
                                          setDisplayRangePicker(false)
                                        }
                                      />

                                      <DateRange
                                        maxDate={new Date()}
                                        className="card"
                                        editableDateInputs={true}
                                        onChange={(item) => {
                                          setLotteryDate([
                                            {
                                              ...item.selection,
                                              date: new Date(),
                                            },
                                          ]);
                                        }}
                                        moveRangeOnFirstSelection={false}
                                        ranges={lotteryDate}
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body p-0 table-responsive">
                          {" "}
                          <table className="table table-bordered withdraw-table">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th style={{textAlign: "left"}}>
                                  Lottery Name
                                </th>
                                <th style={{textAlign: "left"}}>Phase No.</th>
                                <th style={{textAlign: "left"}}>Ticket No.</th>
                                <th style={{textAlign: "left"}}>Win Bonus</th>
                                <th>Date & TIme</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentPageData1?.length > 0 &&
                                currentPageData1.map((winning, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        {(page1 - 1) * PER_PAGE1 + index + 1}.
                                      </td>
                                      <td
                                        style={{textAlign: "left"}}
                                        className="text-capitalize"
                                      >
                                        {winning?.gameInformation?.gameName}
                                      </td>
                                      <td style={{textAlign: "left"}}>
                                        {winning?.gamePhase
                                          ? winning?.gamePhase?.game
                                          : "-"}
                                      </td>
                                      <td style={{textAlign: "left"}}>
                                        {winning?.ticketNumber}
                                      </td>
                                      <td style={{textAlign: "left"}}>
                                        ${winning?.price?.toLocaleString()}
                                      </td>
                                      <td>
                                        {" "}
                                        {moment(winning?.createdAt).format(
                                          "DD/MM/YYYY, HH:mm:ss"
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                          <div
                            className="row mb-2"
                            hidden={winnings.length ? false : true}
                          >
                            <div className="col-lg-6">
                              <div className="d-flex ms-4">
                                <label>Rows per page:</label>
                                <select
                                  className="form-select form-select-sm w-25 ms-3"
                                  onChange={(e) => {
                                    setPageRange1(e.target.value);
                                    setPage1(1);
                                  }}
                                >
                                  <option value={10}>10</option>
                                  <option value={25}>25</option>
                                  <option value={50}>50</option>
                                  <option value={100}>100</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <Pagination
                                count={maxPage1}
                                page={page1}
                                onChange={handlePageChange1}
                                showFirstButton
                                showLastButton
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade "
                      id="pills-scratch-card-win"
                      role="tabpanel"
                      aria-labelledby="pills-scratch-card-win-tab"
                    >
                      <div className="card card-table p-0">
                        <div className="card-header py-3 px-4">
                          <div className="row">
                            <div className="col-lg-4">
                              <h5 className="mb-0 fs-5">
                                Scratch Card Winners
                              </h5>
                            </div>
                            <div className="col-lg-8">
                              <div className="row d-flex justify-content-end">
                                <div className="col-lg-6 pe-lg-1">
                                  <select
                                    className="form-select form-select-sm w-100 rounded-pill border-0"
                                    value={scratchCardName}
                                    onChange={(e) =>
                                      setScratchCardName(e.target.value)
                                    }
                                  >
                                    <option selected value="">
                                      Select ScratchCard
                                    </option>
                                    {uniqueScaratches?.length > 0 &&
                                      uniqueScaratches.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.scratchCard?.card_name}
                                        >
                                          {item.scratchCard?.card_name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-lg-6 ps-lg-1">
                                  <div
                                    onClick={() =>
                                      setDisplayRangePicker(
                                        !displayDateRangePicker
                                      )
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
                                      className="input-group form-control form-control-sm w-100 rounded-pill border-0 text-truncate"
                                      value={
                                        scratchCardDate[0].date &&
                                        moment(
                                          scratchCardDate?.[0].startDate
                                        ).format("MMM DD, YYYY") +
                                          " to " +
                                          moment(
                                            scratchCardDate?.[0].endDate
                                          ).format("MMM DD, YYYY")
                                      }
                                      placeholder="Select from - Select to"
                                    />
                                  </div>
                                  {displayDateRangePicker ? (
                                    <div style={styles.popover}>
                                      <div
                                        style={styles.cover}
                                        onClick={() =>
                                          setDisplayRangePicker(false)
                                        }
                                      />

                                      <DateRange
                                        className="card"
                                        maxDate={new Date()}
                                        editableDateInputs={true}
                                        onChange={(item) => {
                                          setScratchCardDate([
                                            {
                                              ...item.selection,
                                              date: new Date(),
                                            },
                                          ]);
                                        }}
                                        moveRangeOnFirstSelection={false}
                                        ranges={scratchCardDate}
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-body p-0 table-responsive">
                          <table className="table table-bordered withdraw-table">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th className="text-start">
                                  Scratch Card Name
                                </th>
                                <th className="text-start">Frequency</th>
                                <th className="text-start">Win Bonus</th>
                                {/* <th>Post Balance</th> */}
                                <th>Date & Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentPageData2 &&
                                currentPageData2
                                  ?.sort(
                                    (a, b) =>
                                      new Date(b.date) - new Date(a.date)
                                  )
                                  ?.map((item, index) => (
                                    <tr key={index}>
                                      <td>
                                        {(page2 - 1) * PER_PAGE2 + index + 1}
                                      </td>
                                      <td className="text-start">
                                        {item?.scratchCard?.card_name}
                                      </td>
                                      <td className="text-start">
                                        {item?.scratchCard?.card_type ===
                                        "single-scratch"
                                          ? "One Time Scratcher"
                                          : (() => {
                                              try {
                                                const parsedData = JSON.parse(
                                                  item?.scratchCard?.frequency
                                                );
                                                return (
                                                  parsedData?.[0].schedule
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                  parsedData?.[0].frequency.slice(
                                                    1
                                                  )
                                                );
                                              } catch (error) {}
                                            })()}
                                      </td>
                                      <td className="text-start">
                                        ${item?.amount?.toLocaleString()}
                                      </td>

                                      <td>
                                        {new Date(
                                          item?.createdAt
                                        ).toLocaleString()}
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>{" "}
                          <div
                            className="row  mb-2"
                            hidden={selectedScratchCard.length ? false : true}
                          >
                            <div className="col-lg-6">
                              <div className="d-flex ms-4">
                                <label>Rows per page:</label>
                                <select
                                  className="form-select form-select-sm w-25 ms-3"
                                  onChange={(e) => {
                                    setPageRange2(e.target.value);
                                    setPage2(1);
                                  }}
                                >
                                  <option value={10}>10</option>
                                  <option value={25}>25</option>
                                  <option value={50}>50</option>
                                  <option value={100}>100</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <Pagination
                                count={maxPage2}
                                page={page2}
                                onChange={handlePageChange2}
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
          </div>
        </div>
      </section>

      <Footer props={""} />
    </>
  );
}
