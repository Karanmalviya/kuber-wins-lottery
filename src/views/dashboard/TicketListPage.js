import React, {useState, useEffect, useMemo} from "react";
import {Link} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import CountDown from "../components/CountDown";
import AbbrNumber from "../components/AbbrNumber";
import {encrypt} from "../../utils/encryptdecrypt";
import ReactPaginate from "react-paginate";
import usePagination from "../../hooks/usePaginate";
import {
  fetchBuyLotteryTicket,
  fetchUserBuyLotteryTicket,
  fetchUserLotteryWinner,
} from "../../features/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import MiniLoader from "../components/MiniLoader";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Pagination} from "@mui/material";
import moment from "moment";

export default function DashboardPage({props}) {
  const dispatch = useDispatch();
  const [buyTickets, setBuyTickets] = useState([]);
  const [userWinners, setUserWinners] = useState([]);
  const userId = localStorage.getItem("userId");
  const [uniqueLotteryName, setUniqueLotteryName] = useState([]);
  const [lotteryName, setLotteryName] = useState("");
  const [pageRange, setPageRange] = useState(10);
  const [selectedLottery, setSelectedLottery] = useState([]);

  useEffect(() => {
    dispatch(fetchBuyLotteryTicket());
    dispatch(fetchUserLotteryWinner(userId));
    dispatch(fetchUserBuyLotteryTicket(userId));
  }, [dispatch, userId]);

  const lotteryBuyData = useSelector((state) => state.api.lotteryBuyData);
  const lotteryBuyDataLoading = useSelector(
    (state) => state.api.lotteryBuyDataLoading
  );
  const UserLotteryWinner = useSelector((state) => state.api.UserLotteryWinner);

  const userBuyLotteryTicket = useSelector(
    (state) => state.api.userBuyLotteryTicket
  );

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
    if (UserLotteryWinner.length) {
      setUserWinners(UserLotteryWinner);
    }
  }, [lotteryBuyData, userId]);
  // useEffect(() => {
  //   if (userBuyLotteryTicket.length > 0) {
  //     const allTickets = userBuyLotteryTicket.reduce((acc, item) => {
  //       const key = `${item.gameInformation.id}-${item.gameInformation.draw}-${item.drawTime}`;
  //       const existingTicket = acc.find((t) => t.key === key);

  //       if (existingTicket) {
  //         existingTicket.tickets.push(...item.tickets.split(","));
  //       } else {
  //         acc.push({
  //           lotteryId: item.gameInformation.id,
  //           draw: item.gameInformation.draw,
  //           drawTime: item.drawTime,
  //           ...item,
  //           tickets: item.tickets.split(","),
  //           key,
  //         });
  //       }

  //       return acc;
  //     }, []);

  //     const filterLatest = allTickets.sort(
  //       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //     );
  //     setBuyTickets(filterLatest);
  //   }
  //   if (UserLotteryWinner.length) {
  //     setUserWinners(UserLotteryWinner);
  //   }
  // }, [lotteryBuyData, userId]);

  // useEffect(() => {
  //   if (lotteryBuyData.length > 0) {
  //     const groupedData = lotteryBuyData.reduce((groups, item) => {
  //       if (item?.UserId === +userId) {
  //         const tickets = item.tickets
  //           .split(",")
  //           .map((ticket) => ticket.trim());

  //         if (!groups[item.lotteryId]) {
  //           groups[item.lotteryId] = {
  //             ...item,
  //             tickets: [...tickets],
  //           };
  //         } else {
  //           groups[item.lotteryId].tickets.push(...tickets);
  //         }
  //       }

  //       return groups;
  //     }, {});

  //     const result = Object.values(groupedData);

  //     setBuyTickets(result);
  //   }
  //   if (UserLotteryWinner.length) {
  //     setUserWinners(UserLotteryWinner);
  //   }
  // }, [lotteryBuyData, userId, UserLotteryWinner]);

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

  const prizeSum = (items, prop) => {
    return items.reduce(function (a, b) {
      return Number(a) + Number(b[prop]);
    }, 0);
  };

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

  useEffect(() => {
    if (buyTickets.length) {
      const uniqueGameNames = new Set();
      const uniqueLotteryArray = buyTickets.filter((lottery) =>
        uniqueGameNames.has(lottery.gameInformation.gameName)
          ? false
          : (uniqueGameNames.add(lottery.gameInformation.gameName), true)
      );

      setUniqueLotteryName(uniqueLotteryArray);
    }
  }, [buyTickets]);

  const [page, setPage] = useState(1);
  const PER_PAGE = pageRange;
  const maxPage = Math.ceil(selectedLottery.length / PER_PAGE);
  const currentPageData = selectedLottery.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const handleChange = (e, p) => {
    setPage(p);
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
  return (
    <>
      <title>Ticket List - Kuber Wins</title>
      <Navbar props={{mainPage: "dashboard", subPage: ""}} />
      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"ticketlist"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-table p-0">
                    {/* <div
                      className="card-header pb-1 pt-2 px-4"
                      style={{ backgroundColor: "#d63384", color: "#fff" }}
                    >
                      <h5>Ticket List</h5>
                    </div> */}
                    <div className="card-header py-3 px-4">
                      <div className="row">
                        <div className="col-lg-4">
                          <h5 className="mb-0 fs-5">Lottery Winners</h5>
                        </div>
                        <div className="col-lg-8 ">
                          <div className="row d-flex justify-content-end">
                            <div className="col-lg-6 col-md-6 pe-lg-1">
                              <select
                                className="form-select form-select-sm w-100 rounded-pill border-0"
                                onChange={(e) => setLotteryName(e.target.value)}
                              >
                                <option selected value="">
                                  Select the Lottery
                                </option>
                                {uniqueLotteryName.length &&
                                  uniqueLotteryName.map((item) => (
                                    <option
                                      value={item.gameInformation.gameName}
                                    >
                                      {item.gameInformation.gameName}
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
                            <th className="text-start">Lottery</th>
                            <th className="text-start">Phase No.</th>
                            <th className="text-start">Total Won</th>
                            <th className="text-start">Frequency</th>
                            <th>Next Draws</th>
                            <th>Winnings</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPageData.length > 0 &&
                            currentPageData.map((ticket, idx) => {
                              let gamePhaseData = ticket?.gamePhase?.gameData;
                              let totalTktPrize = checkTicketNumber(
                                userWinners,
                                ticket?.tickets
                              );
                              return (
                                <>
                                  <tr key={idx}>
                                    <td style={{verticalAlign: "middle"}}>
                                      {(page - 1) * PER_PAGE + idx + 1}
                                    </td>
                                    <td className="text-capitalize text-start">
                                      {ticket?.gameInformation?.gameName}
                                    </td>
                                    <td className="text-start">
                                      {ticket?.gamePhase?.game}
                                    </td>
                                    <td className="text-start">
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
                                    <td className="text-start">
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
                                                frequencyLabels[o.frequency];
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

                                          return uniqueFrequencies.join(", ");
                                        })()}{" "}
                                      {ticket?.draw === "single-draw" &&
                                        convertUTCToLocalDateTime(
                                          ticket?.drawTime,
                                          "MMM Do YYYY, h:mm:ss a"
                                        )}
                                    </td>

                                    <td>
                                      {" "}
                                      <div
                                        style={{
                                          marginTop: "7px",
                                        }}
                                      >
                                        {handleTimer(ticket, ticket?.draw)}
                                      </div>
                                      {/* {ticket?.gamePhase?.status === 1 ? (
                                        <CountDown
                                          props={{
                                            type: "ticket",
                                            dateTime:
                                              ticket?.gameInformation
                                                ?.gameDuration +
                                              " " +
                                              ticket?.gameInformation
                                                ?.startTime,
                                          }}
                                        />
                                      ) : (
                                        <div className="btn-timer-inactive">
                                          Inactive
                                        </div>
                                      )} */}
                                    </td>
                                    <td>
                                      <Link
                                        // to={
                                        //   "/winners/" +
                                        //   encrypt(ticket?.tickets[0])
                                        // }
                                        to={
                                          "/total-wins/" +
                                          encrypt(
                                            ticket?.gameInformation?.gameName
                                          )
                                        }
                                        state={
                                          ticket?.gameInformation?.gameName
                                        }
                                        className="btn btn-info inf-rounded btn-sm px-3 pt-sm"
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
                                        View Ticket
                                      </Link>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                      <div>{lotteryBuyDataLoading && <MiniLoader />}</div>

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
                        <div className="col-lg-8 col-md-8 col-sm-7">
                          {" "}
                          <div className="d-flex justify-content-end">
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
                    {/* <Pagination
                      className=""
                      currentPage={currentPage}
                      totalCount={buyTickets.length}
                      pageSize={pageSize}
                      onPageChange={(page) => setCurrentPage(page)}
                    /> */}
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
