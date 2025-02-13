import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import CountDown from "../components/CountDown";
import { decrypt, encrypt } from "../../utils/encryptdecrypt";
import AbbrNumber from "../components/AbbrNumber";
import {
  fetchBuyLotteryTicket,
  fetchLotteryTicketDetails,
  fetchUserBuyLottery,
  fetchUserLotteryWinner,
} from "../../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import moment from "moment";
import "moment-timezone";

export default function TicketDetailPage({ props }) {
  const location = useLocation();
  const ref = useRef();
  const dispatch = useDispatch();
  const { id: ticketId, number: ticketNumber } = useParams();
  const [buyTickets, setBuyTickets] = useState([]);
  const [buyTicket, setBuyTicket] = useState({});
  const [totalGenTickets, setTotalGenTickets] = useState([]);
  const [availableTickets, setAvailableTickets] = useState([]);
  const [buyTotal, setBuyTotal] = useState({});
  const [userWinners, setUserWinners] = useState([]);
  const [totalWon, setTotalWon] = useState(0);
  const [lotteryId, setLotteryId] = useState();
  const [frequency, setFrequency] = useState([]);
  const userId = localStorage.getItem("userId");
  const id = decrypt(ticketId);
  const buyLotteryTicketById = useSelector(
    (state) => state.api.buyLotteryTicketById
  );
  const buyLotteryTicketByIdLoading = useSelector(
    (state) => state.api.buyLotteryTicketByIdLoading
  );
  const lotteryTicketDetails = useSelector(
    (state) => state.api.lotteryTicketDetails
  );
  const UserLotteryWinner = useSelector((state) => state.api.UserLotteryWinner);
  const lotteryBuyData = useSelector((state) => state.api.lotteryBuyData);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserBuyLottery(id));
    }
    if (userId) {
      dispatch(fetchUserLotteryWinner(userId));
    }
    dispatch(fetchBuyLotteryTicket());
  }, [dispatch, id, userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Object.keys(buyLotteryTicketById).length) {
      const { lotteryId } = buyLotteryTicketById;
      dispatch(fetchLotteryTicketDetails(lotteryId));
      setLotteryId(lotteryId);
    }
  }, [dispatch, buyLotteryTicketById]);

  useEffect(() => {
    if (Object.keys(buyLotteryTicketById).length) {
      setBuyTicket(buyLotteryTicketById);
    }
    if (Object.keys(lotteryTicketDetails).length) {
      const { maxNumberTickets, sold } = lotteryTicketDetails;
      setTotalGenTickets(+maxNumberTickets);
      setAvailableTickets(+maxNumberTickets - sold);
    }
    if (UserLotteryWinner.length) {
      setUserWinners(UserLotteryWinner);
    }
  }, [
    lotteryTicketDetails,
    buyLotteryTicketById,
    UserLotteryWinner,
    location.state,
  ]);

  useEffect(() => {
    if (!lotteryId) return;

    const dateTimeDraw = convertUTCToLocalDateTime(
      buyTicket?.drawTime,
      "YYYY-MM-DD HH:mm"
    );

    const filteredWinners = userWinners.filter((item) => {
      return (
        item.gameInformationId === lotteryId &&
        (item.gameInformation.draw === "single-draw"
          ? moment(item.createdAt).format("YYYY-MM-DD HH:mm") === dateTimeDraw
          : true)
      );
    });

    const totalWon = filteredWinners.reduce(
      (partialSum, wdata) => partialSum + Number(wdata.price),
      0
    );
    setTotalWon(totalWon);
  }, [lotteryId, userWinners, buyTicket?.drawTime]);

  useEffect(() => {
    if (!lotteryBuyData) return;
    const userTickets = lotteryBuyData
      .filter(
        (item) => item?.UserId === +userId && item?.lotteryId === lotteryId
      )
      .flatMap((item) =>
        item.tickets.split(",").map((number) => ({
          createdAt: item.createdAt,
          buyId: item.id,
          ticketPrice: item.ticketPrice,
          totalPrice: item.totalPrice,
          number,
          lotteryId: item.lotteryId,
          drawTime: item.drawTime,
          ticketType: item.paymentStatus,
        }))
      );

    const drawTimeFilter = userTickets.filter((item) =>
      buyTicket.gameInformation.draw === "single-draw"
        ? item.drawTime === buyTicket.drawTime
        : true
    );
    const filteredTickets = drawTimeFilter.filter((item) =>
      location.state.tickets.includes(item.number)
    );
    const totalTicketsPrice = filteredTickets.reduce(
      (acc, item) => acc + +item.ticketPrice,
      0
    );
    const totalTickets = filteredTickets.length;

    setBuyTickets(filteredTickets);
    setBuyTotal({ totalTickets, totalTicketsPrice });
  }, [
    userId,
    lotteryId,
    lotteryBuyData,
    buyTicket.drawTime,
    location.state.tickets,
  ]);

  useEffect(() => {
    if (buyTicket) {
      let daily = [];
      let monthly = [];
      let weekly = [];
      if (buyTicket?.gamePhase?.gameData) {
        JSON.parse(buyTicket?.gamePhase?.gameData)?.length > 0 &&
          JSON.parse(buyTicket?.gamePhase?.gameData).forEach(
            (gamePhaseData) => {
              if (gamePhaseData?.frequency === "1") daily.push(gamePhaseData);
              if (gamePhaseData?.frequency === "2") weekly.push(gamePhaseData);
              if (gamePhaseData?.frequency === "3") monthly.push(gamePhaseData);
            }
          );
        setFrequency({
          daily: daily,
          weekly: weekly,
          monthly: monthly,
        });
      }
    }
  }, [buyTicket]);

  const sum = (items, prop) => {
    return items.reduce(function (a, b) {
      return Number(a) + Number(b[prop]);
    }, 0);
  };

  const checkTicketNumber = (items, prop) => {
    let checkTicket = [];
    items.forEach((item) => {
      if (item?.ticketNumber === prop) {
        checkTicket.push(item);
      }
    });
    if (checkTicket.length > 0) return sum(checkTicket, "price");
  };

  useEffect(() => {
    if (buyLotteryTicketByIdLoading) {
      ref.current.continuousStart();
    } else {
      ref.current.complete();
    }
  }, [buyLotteryTicketByIdLoading]);

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
              type: "detail",
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
          <div className="row">
            <div className="col-12 brd-yellow">
              <h1 className="fw-bold m-0">Inactive</h1>
            </div>
          </div>
        );
      } else {
        return (
          <div className="row">
            <div className="col-12 brd-yellow">
              <h1 className="fw-bold m-0">Drawn</h1>
            </div>
          </div>
        );
      }
    } else {
      if (ticket?.gamePhase?.status === 1) {
        return (
          <CountDown
            props={{
              type: "detail",
              dateTime:
                ticket?.gameInformation?.gameDuration +
                " " +
                ticket?.gameInformation?.startTime,
            }}
          />
        );
      } else {
        return <div className="btn-timer-inactive">Inactive</div>;
      }
    }
  };

  const isShowFrequency = ticket?.gamePhases?.find(
    (game) => game.status === 1 && game.showStatus === 1
  );

  return (
    <div style={{ backgroundColor: "#f5f6ff" }}>
      <title>Dashboard - Kuber Wins</title>
      <LoadingBar ref={ref} color="rgb(245, 246, 255)" id="bar" />

      <Navbar props={{ mainPage: "dashboard", subPage: "ticketDetail" }} />
      <section className="sec-ticket-dtls mb-5 mt-5 pb-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-7">
              <div
                className="card crd-img-dtls border-0 bg-transparent"
                style={
                  buyTicket?.gameInformation?.image
                    ? {
                        backgroundImage:
                          "url('" + buyTicket?.gameInformation?.image + "')",
                        backgroundSize: "cover",
                      }
                    : {
                        backgroundImage:
                          "url('../assets/images/imgpsh_fullsize_anim-14.jpg')",
                      }
                }
              >
                <p
                  className="p-label-lotto text-capitalize"
                  style={{ overflow: "visible" }}
                >
                  {buyTicket?.gameInformation?.draw?.replace("-", " ")}
                </p>
                <div className="card-body p-0 text-center">
                  <div className="ltr-name">
                    <h4 className="fw-bold">
                      {buyTicket?.gameInformation?.gameName}
                    </h4>
                    <p className="text-white ">
                      {buyTicket?.gameInformation?.gameSlogan}
                    </p>
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-lg-8">
                        <p
                          className="text-white"
                          style={{ textAlign: "left", marginBottom: 0 }}
                        >
                          {buyTicket?.gameInformation?.nextDraw === 0
                            ? "Draw Starts "
                            : "Next Draw "}
                          In:
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-8">
                      <div className="card">
                        <div className="card-body">
                          {handleTimer(
                            buyTicket,
                            buyTicket?.gameInformation?.draw
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="float-end mt-6 min-prize">
            <h6 className="mb-0">
              Minimum Prize Pool:{" "}
              <span className="text-success h4">
                Rs.
                {(+buyTicket?.gameInformation?.minPrizePool).toLocaleString()}
              </span>
            </h6>
          </div>
        </div>
      </section>

      <section className="buy-ticket-dtls pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <div className="card card-ticket-details">
                <div className="card-header">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6>
                        <img
                          src="../../../assets/images/material-symbols_account-balance-wallet-2.png"
                          className="img-fluid pe-2"
                          alt=""
                        />
                        Wallet
                      </h6>

                      <h3 className="text-success">
                        Rs.{buyTicket?.User?.balance?.toLocaleString()}
                      </h3>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6>Total Tickets :</h6>
                      <h3 className="text-dark fw-bold">{totalGenTickets}</h3>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6>Available Tickets :</h6>
                      <h3 className="text-dark fw-bold">{availableTickets}</h3>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6>Ticket Price :</h6>
                      <h3 className="text-dark fw-bold">
                        Rs.
                        {(+buyTicket?.gameInformation
                          ?.ticketPrice).toLocaleString()}
                        <span className="fw-light">/Ticket</span>
                      </h3>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6 className="mb-3">Frequency</h6>
                      <h3 className="text-dark fw-light fs-6">
                        {buyTicket?.gameInformation?.draw === "multi-draw" &&
                          [
                            frequency.daily?.length > 0 && "Daily",
                            frequency.weekly?.length > 0 && "Weekly",
                            frequency.monthly?.length > 0 && "Monthly",
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        {buyTicket?.gameInformation?.draw === "single-draw" &&
                          convertUTCToLocalDateTime(
                            buyTicket?.drawTime,
                            "MMM Do YYYY, HH:mm"
                          )}
                      </h3>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6>Total Won :</h6>
                      <h3 className="text-dark fw-bold">
                        Rs.{totalWon.toLocaleString()}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <section className="sec-second">
                    <div
                      className="panel panel-default mb-3"
                      aria-expanded="false"
                    >
                      <div className="panel-body py-0">
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th style={{ borderTopLeftRadius: 15 }}>
                                  S.No.
                                </th>
                                <th>Ticket Number</th>
                                <th>Total Won</th>
                                <th>Date and Time</th>
                                <th style={{ borderTopRightRadius: 15 }}>
                                  View Winning
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {buyTickets?.length &&
                                buyTickets.map((item, index) => {
                                  let restTicketWonPrize = checkTicketNumber(
                                    userWinners,
                                    item?.number
                                  );
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {item?.number}
                                        {item?.ticketType === "Free Ticket" && (
                                          <div className="badge bg-primary rounded-pill">
                                            Free
                                          </div>
                                        )}
                                      </td>
                                      <td>
                                        Rs.
                                        {restTicketWonPrize ? (
                                          <AbbrNumber
                                            props={{
                                              number: restTicketWonPrize,
                                              decPlaces: 2,
                                            }}
                                          />
                                        ) : (
                                          0
                                        )}
                                      </td>
                                      <td>
                                        {moment(item.createdAt).format(
                                          "DD/MM/YYYY, HH:mm:ss"
                                        )}
                                      </td>
                                      <td>
                                        {" "}
                                        <Link
                                          to={
                                            "/winners/" + encrypt(item?.number)
                                          }
                                          className="btn btn-info inf-rounded btn-sm px-3 pt-sm border-0 text-white fw-light font-sm"
                                        >
                                          Winnings
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="card-footer px-5">
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <h6>Total Tickets :</h6>
                      <div className="d-flex align-items-center">
                        <img
                          src="../../../assets/images/fa-solid_ticket-alt.png"
                          className="img-fluid"
                          width="30"
                          alt=""
                        />
                        <h5 className="m-0 ps-2 fw-bold">
                          {buyTotal?.totalTickets}
                        </h5>
                      </div>
                    </div>
                    <div className="">
                      <h6>Total Price :</h6>
                      <div className="d-flex align-items-center">
                        <img
                          src="../../../assets/images/fa6-solid_money-bill-1.png"
                          className="img-fluid"
                          width="30"
                          alt=""
                        />
                        <h5 className="m-0 ps-2 fw-bold">
                          Rs.{buyTotal?.totalTicketsPrice?.toLocaleString()}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row instructions-row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <ul className="nav nav-pills" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Instructions
                      </button>
                    </li>
                    {isShowFrequency && Object.keys(isShowFrequency).length && (
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#profile"
                          type="button"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          Win Bonuses
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="card-body pt-0 pb-3 px-0">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div
                        className="p-4"
                        dangerouslySetInnerHTML={{
                          __html: buyTicket?.gameInformation?.instruction,
                        }}
                      ></div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div
                        className="row m-0 pt-2 pb-1"
                        style={{ background: "#F5F5F5" }}
                      >
                        <div className="col-lg-4 col-md-4 col-sm col-4 text-center">
                          <h6>Frequency</h6>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm col-4 text-center">
                          <h6>Odds of Winners</h6>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm col-4 text-center">
                          <h6>Total WInning Prize</h6>
                        </div>
                      </div>

                      {["daily", "weekly", "monthly"].map(
                        (period) =>
                          frequency[period]?.length > 0 && (
                            <div key={period}>
                              {frequency[period].map((data, index) => (
                                <div key={index} className="row m-0 pt-2 pb-1">
                                  <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                    {period.charAt(0).toUpperCase() +
                                      period.slice(1)}
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                    {data?.odds_of_win}%
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                    Rs.
                                    {data.table
                                      .reduce(
                                        (acc, item) => acc + +item.prize,
                                        0
                                      )
                                      .toLocaleString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer props={""} />
    </div>
  );
}
