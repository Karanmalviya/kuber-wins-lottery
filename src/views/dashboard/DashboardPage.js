import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import copy from "copy-to-clipboard";
import CountDown from "../components/CountDown";
import AbbrNumber from "../components/AbbrNumber";
import {encrypt} from "../../utils/encryptdecrypt";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchAllPurchasedScratchCard,
  fetchBuyLotteryTicket,
  fetchScratchCard,
  fetchTotalAmountScratchCardWins,
  fetchUserBuyLotteryTicket,
  fetchUserDeposits,
  fetchUserLotteryWinner,
  fetchUserWithDrawal,
} from "../../features/apiSlice";
import {toast} from "react-hot-toast";
import {Pagination} from "@mui/material";
import moment from "moment";

export default function DashboardPage({props}) {
  const [buyTickets, setBuyTickets] = useState([]);
  const [userWinners, setUserWinners] = useState([]);
  const [userDeposits, setUserDeposits] = useState([]);
  const [userWithdraws, setUserWithdraws] = useState([]);
  const [referenceLink, setReferenceLink] = useState("");
  const userId = localStorage.getItem("userId");
  const users = useSelector((state) => state.api.user);
  const dispatch = useDispatch();
  const [soldScratchData, setSoldScratchData] = useState([]);
  const [lotteryName, setLotteryName] = useState("");
  const [selectedLottery, setSelectedLottery] = useState([]);
  const [latestScratchCard, setLatestScratchCard] = useState([]);
  const [scratchCardName, setScratchCardName] = useState("");
  const [selectedScratchCard, setSelectedScratchCard] = useState([]);
  const [sortedLottery, setSortedLottery] = useState([]);

  const copyToClipboard = (text) => {
    copy(text);
    toast.success(`copied ${text}`, {
      duration: 3000,
      id: "clipboard",
    });
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserLotteryWinner(userId));
      dispatch(fetchUserDeposits(userId));
      dispatch(fetchUserWithDrawal(userId));
      dispatch(fetchTotalAmountScratchCardWins(userId));
      dispatch(fetchUserBuyLotteryTicket(userId));
    }
    dispatch(fetchBuyLotteryTicket());
    dispatch(fetchScratchCard());
    dispatch(fetchAllPurchasedScratchCard());
  }, [dispatch, userId]);

  const lotteryBuyData = useSelector((state) => state.api.lotteryBuyData);
  const lotteryBuyDataLoading = useSelector(
    (state) => state.api.lotteryBuyDataLoading
  );
  const UserLotteryWinner = useSelector((state) => state.api.UserLotteryWinner);
  const UserDeposits = useSelector((state) => state.api.deposits);
  const UserWithDrawal = useSelector((state) => state.api.withdrawal);
  const totalAmountScratchCardWins = useSelector(
    (state) => state.api.totalAmountScratchCardWins
  );
  const totalAmountScratchCardWinsLoading = useSelector(
    (state) => state.api.totalAmountScratchCardWinsLoading
  );
  const userBuyLotteryTicket = useSelector(
    (state) => state.api.userBuyLotteryTicket
  );

  useEffect(() => {
    if (Object.keys(totalAmountScratchCardWins).length) {
      setSoldScratchData(totalAmountScratchCardWins.scratchCardPlays);
    }
  }, [totalAmountScratchCardWins]);

  useEffect(() => {
    const filterData = () => {
      const latestEntriesMap = new Map();
      const totalPriceSumMap = new Map();
      const wonAmountMap = new Map();
      const scratchDrawSumMap = new Map();

      soldScratchData.map((entry) => {
        const {scratchCardId, createdAt, totalPrice, won, scratchDraw} = entry;

        if (
          !latestEntriesMap.has(scratchCardId) ||
          createdAt > latestEntriesMap.get(scratchCardId).createdAt
        ) {
          latestEntriesMap.set(scratchCardId, {...entry});
        }

        totalPriceSumMap.set(
          scratchCardId,
          (totalPriceSumMap.get(scratchCardId) || 0) + parseFloat(totalPrice)
        );
        wonAmountMap.set(
          scratchCardId,
          wonAmountMap.get(scratchCardId) || won || 0
        );
        scratchDrawSumMap.set(
          scratchCardId,
          (scratchDrawSumMap.get(scratchCardId) || 0) + scratchDraw
        );
      });

      const latestEntriesArrayScratchCard = Array.from(
        latestEntriesMap.values()
      )
        .map((entry) => ({
          ...entry,
          totalPriceSum: totalPriceSumMap.get(entry.scratchCardId),
          won: wonAmountMap.get(entry.scratchCardId),
          scratchDrawSum: scratchDrawSumMap.get(entry.scratchCardId),
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setLatestScratchCard(latestEntriesArrayScratchCard);
    };
    filterData();
  }, [soldScratchData]);

  useEffect(() => {
    if (latestScratchCard.length) {
      if (scratchCardName) {
        const filter = latestScratchCard.filter(
          (item) => item.scratchCard.card_name === scratchCardName
        );
        setSelectedScratchCard(filter);
      } else {
        setSelectedScratchCard(latestScratchCard);
      }
    }
  }, [latestScratchCard, scratchCardName]);

  useEffect(() => {
    if (users) {
      const {protocol, hostname, port} = window.location;
      const emailPrefix = users.email?.split("@")[0];
      const referenceLink = `${protocol}//${hostname}:${port}/#/reference/${emailPrefix}`;
      setReferenceLink(referenceLink);
    }
  }, [users]);

  useEffect(() => {
    if (UserLotteryWinner.length) {
      setUserWinners(UserLotteryWinner);
    }
    if (UserDeposits.length) {
      setUserDeposits(UserDeposits);
    }
    if (UserWithDrawal.length) {
      const filterd = UserWithDrawal.filter((item) => item.status === 1);
      setUserWithdraws(filterd);
    }
  }, [UserLotteryWinner, UserDeposits, UserWithDrawal]);

  useEffect(() => {
    if (userBuyLotteryTicket.length > 0) {
      const filterLatestS = userBuyLotteryTicket
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const allTickets = filterLatestS.reduce((acc, item) => {
        if (item.gameInformation.draw === "single-draw") {
          const key = `${item.gameInformation.id}-${item.gameInformation.draw}-${item.drawTime}`;
          const existingTicket = acc.find((t) => t.key === key);
          if (existingTicket) {
            existingTicket.tickets.push(...item.tickets.split(","));
          } else {
            acc.push({
              lotteryId: item.gameInformation.id,
              draw: item.gameInformation.draw,
              drawTime: item.drawTime,
              ...item,
              tickets: item.tickets.split(","),
              createdAt: item.createdAt,

              key,
            });
          }
        } else if (item.gameInformation.draw === "multi-draw") {
          const key = `${item.gameInformation.id}-${item.gameInformation.draw}`;
          const existingTicket = acc.find((t) => t.key === key);
          if (existingTicket) {
            existingTicket.tickets.push(...item.tickets.split(","));
          } else {
            acc.push({
              lotteryId: item.gameInformation.id,
              draw: item.gameInformation.draw,
              drawTime: item.drawTime,
              ...item,
              tickets: item.tickets.split(","),
              createdAt: item.createdAt,
              key,
            });
          }
        }
        return acc;
      }, []);
      setBuyTickets(allTickets);
    }
  }, [lotteryBuyData, userId]);

  useEffect(() => {
    if (buyTickets.length) {
      if (lotteryName) {
        const filter = buyTickets.filter(
          (item) => item.gameInformation.gameName === lotteryName
        );
        setSelectedLottery(filter);
      } else {
        setSelectedLottery(buyTickets);
      }
    }
  }, [buyTickets, lotteryName]);

  const totalAmount = (items, prop) => {
    return items.reduce(function (a, b) {
      return a + +b[prop];
    }, 0);
  };

  const prizeSum = (items, prop) => {
    return items.reduce(function (a, b) {
      return Number(a) + Number(b[prop]);
    }, 0);
  };

  const totalWinnings = (items, prop) =>
    items.reduce((total, item) => total + Number(item[prop]), 0);

  const checkTicketNumber = (items, prop) => {
    const checkedItems = prop.map((i) => {
      const checkTicket = items.filter((item) => {
        return item?.ticketNumber === i;
      });
      return checkTicket;
    });

    if (checkedItems.some((checkTicket) => checkTicket.length > 0)) {
      return prizeSum(checkedItems.flat(), "price");
    }
  };

  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [pageRange1, setPageRange1] = useState(10);
  const [pageRange2, setPageRange2] = useState(10);

  const PER_PAGE1 = pageRange1;
  const PER_PAGE2 = pageRange2;
  const maxPage1 = Math.ceil(selectedLottery.length / PER_PAGE1);
  const maxPage2 = Math.ceil(selectedScratchCard.length / PER_PAGE2);

  const currentPageData1 = selectedLottery.slice(
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

  const handleName = (item) => {
    return item
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  function convertUTCToLocalDateTime(utcTimeString, type) {
    const userTimezone = moment.tz.guess();
    const localTime = moment.utc(utcTimeString).tz(userTimezone);
    const formattedLocalTime = localTime.format(type);
    return formattedLocalTime;
  }

  const handleTimer = (ticket, type) => {
    const drawTime = moment(
      convertUTCToLocalDateTime(ticket?.drawTime, "YYYY-MM-DD HH:mm:ss")
    );
    const currentDrawTime = moment();
    if (type === "single-draw") {
      if (
        drawTime.isAfter(currentDrawTime) &&
        ticket?.gamePhase?.status === 1
      ) {
        return (
          <CountDown
            props={{
              type: "ticket",
              dateTime:
                ticket?.gameInformation?.gameDuration +
                " " +
                ticket?.gameInformation?.startTime,
            }}
          />
        );
      } else if (
        drawTime.isBefore(currentDrawTime) &&
        !ticket?.gamePhase?.status
      ) {
        return (
          <div className="btn-timer-disabled d-flex justify-content-center">
            Inactive
          </div>
        );
      } else {
        return (
          <div className="btn-timer-drawn d-flex justify-content-center">
            Drawn
          </div>
        );
      }
    } else {
      if (ticket?.gamePhase?.status === 1) {
        return (
          <CountDown
            props={{
              type: "ticket",
              dateTime:
                ticket?.gameInformation?.gameDuration +
                " " +
                ticket?.gameInformation?.startTime,
            }}
          />
        );
      } else {
        return (
          <div className="btn-timer-disabled d-flex justify-content-center">
            Inactive
          </div>
        );
      }
    }
  };

  const uniqueGameNames = new Set();
  const uniqueLotteryArray =
    buyTickets &&
    buyTickets.filter((lottery) => {
      const gameName = lottery.gameInformation.gameName;
      if (!uniqueGameNames.has(gameName)) {
        uniqueGameNames.add(gameName);
        return true;
      }
      return false;
    });

  return (
    <>
      <title>Dashboard - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord">
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"dashboard"} />

            <div
              className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4"
              style={{backgroundColor: "#f5f6ff"}}
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-wallet">
                    <div className="card-body p-0">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-3 ps-3 col-sm col-3 col-md-3 start-3 text-center">
                          <span>Referral Link</span>
                        </div>
                        <div className="col-lg-6 col-sm col-5 col-md-3">
                          <Link id="copyToClipboardText">{referenceLink}</Link>
                          <img
                            src={
                              "assets/images/material-symbols_file-copy-outline.png"
                            }
                            onClick={() => {
                              copyToClipboard(referenceLink);
                            }}
                            className="img-fluid"
                            alt=""
                            style={{cursor: "pointer"}}
                          />
                          {/* <span
                            className="badge btn-info rounded-pill"
                            style={{ cursor: "pointer" }}
                          >
                            copy
                          </span> */}
                        </div>
                        <div
                          className="col-lg-3 col-sm col-4 col-md-3 end-3 py-3 px-4"
                          style={{backgroundColor: "##212529"}}
                        >
                          <h6>
                            <img
                              src={
                                "assets/images/material-symbols_account-balance-wallet-old.png"
                              }
                              className="img-fluid"
                              alt=""
                            />
                            Wallet
                          </h6>
                          <h5 className="text-white fw-bold m-0">
                            ${users?.balance?.toLocaleString() ?? 0}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row dash-card-row my-4">
                    <div className="col-lg-3 px-1 col-md-3 col-6 col-sm mb-3">
                      <div
                        className="card card-background"
                        style={{
                          borderRadius: 15,
                        }}
                      >
                        <div className="card-body py-2 px-4">
                          <p className="p-0 mb-2">Total Winnings</p>
                          <h3 className="p-0 m-0">
                            $
                            <AbbrNumber
                              props={{
                                number:
                                  (userWinners?.length > 0
                                    ? totalWinnings(userWinners, "price")
                                    : 0) +
                                  Number(users?.totalScratchCardWon ?? 0),
                                decPlaces: 2,
                              }}
                            />
                          </h3>
                          <Link
                            to={"/total-wins"}
                            className="btn btn-info inf-rounded mt-1"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 px-1 col-md-3 col-6 col-sm mb-3">
                      <div
                        className="card card-background"
                        style={{
                          borderRadius: 15,
                        }}
                      >
                        <div className="card-body py-2 px-4">
                          <p className="p-0 mb-2">Total Deposits</p>
                          <h3 className="p-0 m-0">
                            $
                            <AbbrNumber
                              props={{
                                number:
                                  userDeposits?.length > 0
                                    ? totalAmount(userDeposits, "amount")
                                    : 0,
                                decPlaces: 2,
                              }}
                            />
                          </h3>
                          <Link
                            to={"/deposit"}
                            className="btn btn-info inf-rounded mt-1"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 px-1 col-md-3 col-6 col-sm mb-3">
                      <div
                        className="card card-background"
                        style={{
                          borderRadius: 15,
                        }}
                      >
                        <div className="card-body py-2 px-4">
                          <p className="p-0 mb-2">Total Withdraw</p>
                          <h3 className="p-0 m-0">
                            $
                            <AbbrNumber
                              props={{
                                number:
                                  userWithdraws?.length > 0
                                    ? totalAmount(userWithdraws, "Amount")
                                    : 0,
                                decPlaces: 2,
                              }}
                            />
                          </h3>
                          <Link
                            to={"/withdrawal-history"}
                            className="btn btn-info inf-rounded mt-1"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 px-1 col-md-3 col-6 col-sm mb-3">
                      <div
                        className="card card-background"
                        style={{
                          borderRadius: 15,
                        }}
                      >
                        <div className="card-body py-2 px-4">
                          <p className="p-0 mb-2">Commission</p>
                          <h3 className="p-0 m-0">
                            $
                            <AbbrNumber
                              props={{
                                number:
                                  users?.commission_balance &&
                                  users?.commission_balance?.toFixed(2),
                                decPlaces: 2,
                              }}
                            />
                          </h3>
                          <Link
                            to={"/commission"}
                            className="btn btn-info inf-rounded mt-1"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-12 col-sm col-12 dash-right-side"
                style={{marginTop: "-14px"}}
              >
                <div className="row commission-tab ">
                  <div className="mb-2">
                    <ul
                      className="nav nav-pills "
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className={"btn btn-sm px-3 py-1 nav-link active"}
                          id="pills-deposit-commission-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-deposit-commission"
                          type="button"
                          aria-controls="pills-deposit-commission"
                        >
                          Ticket List
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={"btn btn-sm px-3 py-1 nav-link"}
                          id="pills-lottery-commission-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-lottery-commission"
                          type="button"
                          aria-controls="pills-lottery-commission"
                        >
                          Scratch List
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
                            <div className="row">
                              <div className="col-lg-4">
                                <h5 className="mb-0 fs-5">Ticket List</h5>
                              </div>
                              <div className="col-lg-8 ">
                                <div className="row d-flex justify-content-end">
                                  <div className="col-lg-6 col-md-6 pe-lg-1">
                                    <select
                                      className="form-select form-select-sm w-100 rounded-pill border-0"
                                      onChange={(e) =>
                                        setLotteryName(e.target.value)
                                      }
                                      value={lotteryName}
                                    >
                                      <option value={""}>
                                        Select the Lottery
                                      </option>
                                      {uniqueLotteryArray.length &&
                                        uniqueLotteryArray.map(
                                          (item, index) => (
                                            <option
                                              key={index}
                                              value={
                                                item.gameInformation.gameName
                                              }
                                            >
                                              {item.gameInformation.gameName}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card-body p-0 table-responsive table-space ">
                            <table className="table table-bordered withdraw-table">
                              <thead>
                                <tr>
                                  <th>S.No.</th>
                                  <th>Lottery</th>
                                  <th>Phase No.</th>
                                  <th>No of tickets</th>
                                  <th>Total Won</th>
                                  <th>Frequency</th>
                                  <th>Next Draws</th>
                                  <th>Winnings</th>
                                  <th>View</th>
                                </tr>
                              </thead>
                              <tbody className=" py-3">
                                {currentPageData1.length > 0 &&
                                  currentPageData1.map((ticket, idx) => {
                                    let gamePhaseData =
                                      ticket?.gamePhase?.gameData;
                                    let totalTktPrize = checkTicketNumber(
                                      userWinners,
                                      ticket?.tickets
                                    );
                                    return (
                                      <tr key={idx}>
                                        <td>
                                          {(page1 - 1) * PER_PAGE1 + idx + 1}
                                        </td>

                                        <td
                                          className="text-capitalize text-truncate text-start"
                                          style={{position: "relative"}}
                                        >
                                          <img
                                            src={ticket?.gameInformation?.image}
                                            className="lotteriesImg img-fluid "
                                          />
                                          &ensp;
                                          {ticket?.gameInformation?.gameName}
                                          <span
                                            style={{
                                              fontSize: "11px",
                                              position: "absolute",
                                              right: 0,
                                              top: "23px",
                                              left: "49px",
                                            }}
                                          >
                                            <div className=" badge bg-success rounded-pill">
                                              {ticket?.gameInformation?.draw?.replace(
                                                "-",
                                                " "
                                              )}
                                            </div>
                                          </span>
                                        </td>
                                        <td className="align-items-center">
                                          {ticket?.gamePhase?.game}
                                        </td>
                                        <td>{ticket?.tickets.length}</td>
                                        <td>
                                          $
                                          {totalTktPrize ? (
                                            <AbbrNumber
                                              props={{
                                                number: totalTktPrize,
                                                decPlaces: 2,
                                              }}
                                            />
                                          ) : (
                                            0
                                          )}
                                        </td>
                                        <td style={{textAlign: "left"}}>
                                          {ticket?.draw === "multi-draw" &&
                                            gamePhaseData &&
                                            (() => {
                                              const frequencyLabels = {
                                                1: "Daily",
                                                2: "Weekly",
                                                3: "Monthly",
                                              };

                                              const uniqueFrequencies = [];
                                              JSON.parse(gamePhaseData).forEach(
                                                (o) => {
                                                  const frequencyLabel =
                                                    frequencyLabels[
                                                      o.frequency
                                                    ];
                                                  if (
                                                    frequencyLabel &&
                                                    !uniqueFrequencies.includes(
                                                      frequencyLabel
                                                    )
                                                  ) {
                                                    uniqueFrequencies.push(
                                                      frequencyLabel
                                                    );
                                                  }
                                                }
                                              );

                                              return uniqueFrequencies.join(
                                                ", "
                                              );
                                            })()}
                                          {ticket?.draw === "single-draw" &&
                                            convertUTCToLocalDateTime(
                                              ticket?.drawTime,
                                              "MMM Do YYYY,\nHH:mm"
                                            )}
                                        </td>
                                        <td id="draw">
                                          <div
                                            style={{
                                              marginTop: "7px",
                                            }}
                                          >
                                            {handleTimer(ticket, ticket?.draw)}
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          <Link
                                            to={
                                              "/total-wins/" +
                                              encrypt(
                                                ticket?.gameInformation
                                                  ?.gameName
                                              )
                                            }
                                            state={
                                              ticket?.gameInformation?.gameName
                                            }
                                            className="btn btn-info inf-rounded btn-sm px-3 pt-sm w-100"
                                          >
                                            View
                                          </Link>
                                        </td>
                                        <td>
                                          <Link
                                            to={
                                              "/ticket/" +
                                              encrypt(ticket?.id.toString()) +
                                              "/" +
                                              encrypt(ticket?.tickets[0])
                                            }
                                            state={ticket}
                                            className="btn btn-info inf-rounded btn-sm px-3 pt-sm"
                                            style={{
                                              width: "104px",
                                            }}
                                          >
                                            {/* <p className="m-0 p-0"> */}
                                            View Ticket
                                            {/* </p> */}
                                          </Link>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                            {lotteryBuyDataLoading && (
                              <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                  <span className="sr-only"></span>
                                </div>
                              </div>
                            )}

                            <div
                              className="row mb-2"
                              hidden={selectedLottery.length ? false : true}
                            >
                              <div className="col-lg-4 col-md-4 col-sm-5">
                                <div className="d-flex ms-4">
                                  <label>Rows per page:</label>
                                  <select
                                    className="form-select form-select-sm w-25 ms-3"
                                    onChange={(e) => {
                                      setPageRange1(e.target.value);
                                      setPage1(1);
                                    }}
                                    value={pageRange1}
                                  >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-7">
                                <div className="d-flex justify-content-end">
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
                      </div>

                      <div
                        className="tab-pane fade"
                        id="pills-lottery-commission"
                        role="tabpanel"
                        aria-labelledby="pills-lottery-commission-tab"
                      >
                        <div className="card card-table p-0">
                          <div className="card-header py-3 px-4">
                            <div className="row">
                              <div className="col-lg-4">
                                <h5 className="mb-0 fs-5">Scratch Card List</h5>
                              </div>
                              <div className="col-lg-8 ">
                                <div className="row d-flex justify-content-end">
                                  <div className="col-lg-6 col-md-6 pe-lg-1">
                                    <select
                                      className="form-select form-select-sm w-100 rounded-pill border-0"
                                      onChange={(e) =>
                                        setScratchCardName(e.target.value)
                                      }
                                      value={scratchCardName}
                                    >
                                      <option value={""}>
                                        Select ScratchCard
                                      </option>
                                      {latestScratchCard.length &&
                                        latestScratchCard.map((item, index) => (
                                          <option
                                            key={index}
                                            value={item.scratchCard.card_name}
                                          >
                                            {item.scratchCard.card_name}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card-body p-0 table-responsive">
                            <table className="table table-bordered withdraw-table">
                              <thead>
                                <tr>
                                  <th>S.No.</th>
                                  <th className="text-start">
                                    ScratchCard Name
                                  </th>
                                  {/* <th>Card Type</th> */}
                                  <th className="text-start">Total Paid</th>
                                  <th className="text-start">Plays</th>
                                  <th className="text-start">Total Won</th>
                                  <th>Winnings</th>
                                  <th>Play Now</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentPageData2?.map((item, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      className="align-items-center"
                                    >
                                      <td>
                                        {(page2 - 1) * PER_PAGE2 + index + 1}
                                      </td>

                                      <td
                                        style={{
                                          textAlign: "left",
                                          alignItems: "center",
                                          position: "relative",
                                        }}
                                        className="d-flex text-capitalize"
                                      >
                                        <img
                                          src={item?.scratchCard?.image}
                                          className="lotteriesImg img-fluid"
                                        />
                                        &ensp;
                                        <div className="p-0 m-0 text-truncate">
                                          {item?.scratchCard?.card_name}
                                          <span
                                            style={{
                                              fontSize: "11px",
                                              position: "absolute",
                                              right: 0,
                                              top: "23px",
                                              left: "49px",
                                            }}
                                          >
                                            <div className="badge bg-success rounded-pill">
                                              {item?.scratchCard?.card_type?.replace(
                                                "-",
                                                " "
                                              )}
                                            </div>
                                          </span>
                                        </div>
                                      </td>
                                      {/* <td className="text-capitalize">
                                        {item?.scratchCard?.card_type?.replace(
                                          "-",
                                          " "
                                        )}
                                      </td> */}
                                      <td className="text-start ">
                                        $
                                        {Number(
                                          item?.totalPriceSum
                                        )?.toLocaleString()}
                                      </td>
                                      <td className="text-start">
                                        {item?.scratchDrawSum}
                                        {item?.scratchCard?.card_type ===
                                          "multi-scratch" &&
                                          (() => {
                                            try {
                                              const parsedData = JSON.parse(
                                                item?.scratchCard?.frequency
                                              );
                                              return (
                                                "/" + parsedData?.[0]?.frequency
                                              );
                                            } catch (error) {}
                                          })()}
                                      </td>
                                      <td className="text-start">
                                        ${item?.won?.toLocaleString()}
                                      </td>
                                      <td>
                                        <Link
                                          to={"/total-wins"}
                                          state={{
                                            card_name:
                                              item?.scratchCard?.card_name,
                                            type: "handleScratch",
                                          }}
                                          className="btn btn-info inf-rounded btn-sm px-3 pt-sm"
                                        >
                                          View
                                        </Link>
                                      </td>
                                      <td>
                                        <Link
                                          to={
                                            item.newDataLength
                                              ? `/scratch-cards-play/${handleName(
                                                  item.scratchCard.card_name
                                                )}/${encrypt(
                                                  item?.scratchCardId?.toString()
                                                )}`
                                              : `/scratch-cards-buy/${handleName(
                                                  item.scratchCard.card_name
                                                )}/${encrypt(
                                                  item?.scratchCardId?.toString()
                                                )}`
                                          }
                                          className="btn btn-info inf-rounded btn-sm px-3 pt-sm"
                                        >
                                          Play Now
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>{" "}
                            <div
                              className="row mb-2"
                              hidden={selectedScratchCard.length ? false : true}
                            >
                              <div className="col-lg-4 col-md-4 col-sm-5">
                                <div className="d-flex ms-4">
                                  <label>Rows per page:</label>
                                  <select
                                    className="form-select form-select-sm w-25 ms-3"
                                    onChange={(e) => {
                                      setPageRange2(e.target.value);
                                      setPage2(1);
                                    }}
                                    value={pageRange2}
                                  >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-7">
                                <div className="d-flex justify-content-end">
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
          </div>
        </div>
      </section>

      <Footer props={""} />
    </>
  );
}
