import React, {useState, useEffect, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import CountDown from "../components/CountDown";
import {decrypt, encrypt} from "../../utils/encryptdecrypt";
import AbbrNumber from "../components/AbbrNumber";
import {
  fetchBuyLotteryTicket,
  fetchLotteryTicketDetails,
  fetchUserBuyLottery,
  fetchUserLotteryWinner,
} from "../../features/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import LoadingBar from "react-top-loading-bar";

export default function TicketDetailPage({props}) {
  const ref = useRef();
  const dispatch = useDispatch();
  const {id: ticketId, number: ticketNumber} = useParams();
  const [activeTicket, setActiveTicket] = useState({});
  const [buyTickets, setBuyTickets] = useState([]);
  const [buyTicket, setBuyTicket] = useState({});
  const [totalGenTickets, setTotalGenTickets] = useState([]);
  const [availableTickets, setAvailableTickets] = useState([]);
  const [dailyFrequency, setDailyFrequency] = useState([]);
  const [weeklyFrequency, setWeeklyFrequency] = useState([]);
  const [monthlyFrequency, setMonthlyFrequency] = useState([]);
  const [buyTotal, setBuyTotal] = useState({});
  const [userWinners, setUserWinners] = useState([]);
  const [totalWon, setTotalWon] = useState(0);
  const [lotteryId, setLotteryId] = useState();
  const userId = localStorage.getItem("userId");
  const [color, setColor] = useState("rgb(245, 246, 255)");
  const id = decrypt(ticketId);
  const number = decrypt(ticketNumber);
  let daily = [];
  let monthly = [];
  let weekly = [];

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
    dispatch(fetchUserBuyLottery(id));
    dispatch(fetchUserLotteryWinner(userId));
    dispatch(fetchBuyLotteryTicket());
  }, [dispatch, id, userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Object.keys(buyLotteryTicketById).length) {
      const {lotteryId} = buyLotteryTicketById;
      dispatch(fetchLotteryTicketDetails(lotteryId));
      setLotteryId(lotteryId);
    }
  }, [dispatch, buyLotteryTicketById]);

  useEffect(() => {
    if (Object.keys(buyLotteryTicketById).length) {
      setBuyTicket(buyLotteryTicketById);
    }
    if (Object.keys(lotteryTicketDetails).length) {
      const {maxNumberTickets, sold} = lotteryTicketDetails;
      setTotalGenTickets(+maxNumberTickets);
      setAvailableTickets(+maxNumberTickets - sold);
    }
    if (UserLotteryWinner.length) {
      setUserWinners(UserLotteryWinner);
    }
  }, [lotteryTicketDetails, buyLotteryTicketById, UserLotteryWinner]);

  useEffect(() => {
    if (lotteryId) {
      const winnerDataArr = userWinners
        .filter((wdata) => lotteryId === wdata?.gameInformationId)
        .map((wdata) => Number(wdata.price));

      setTotalWon(winnerDataArr.reduce((partialSum, a) => partialSum + a, 0));
    }
  }, [lotteryId]);

  useEffect(() => {
    if (!lotteryBuyData) {
      return;
    }

    const userLotteryData = lotteryBuyData.filter(
      (item) => item?.UserId === +userId && item?.lotteryId === lotteryId
    );

    const newData1 = [];
    const newData2 = [];
    let activeTicket = null;
    let totalTicketsPrice = 0;

    for (const item1 of userLotteryData) {
      const ticketNumbers = item1?.tickets.split(",");
      for (const item2 of ticketNumbers) {
        const newData = {
          buyId: item1?.id,
          ticketPrice: item1?.ticketPrice,
          totalPrice: item1?.totalPrice,
          number: item2,
          lotteryId: item1?.lotteryId,
        };

        newData1.push(newData);

        if (item2 === number) {
          activeTicket = newData;
        } else {
          newData2.push(newData);
        }

        totalTicketsPrice += +item1.ticketPrice;
      }
    }

    const totalTickets = newData1.length;

    setBuyTickets(newData2);
    setActiveTicket(activeTicket);
    setBuyTotal({
      totalTickets: totalTickets,
      totalTicketsPrice: totalTicketsPrice,
    });
  }, [userId, lotteryId, lotteryBuyData, number]);

  useEffect(() => {
    if (buyTicket) {
      if (buyTicket?.gamePhase?.gameData) {
        JSON.parse(buyTicket?.gamePhase?.gameData)?.length > 0 &&
          JSON.parse(buyTicket?.gamePhase?.gameData).forEach(
            (gamePhaseData) => {
              if (gamePhaseData?.frequency === "1") daily.push(gamePhaseData);
              if (gamePhaseData?.frequency === "2") weekly.push(gamePhaseData);
              if (gamePhaseData?.frequency === "3") monthly.push(gamePhaseData);
            }
          );
        setDailyFrequency(daily);
        setWeeklyFrequency(weekly);
        setMonthlyFrequency(monthly);
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

  let activeTicketWonPrize = checkTicketNumber(
    userWinners,
    activeTicket?.number
  );

  useEffect(() => {
    if (buyLotteryTicketByIdLoading) {
      ref.current.continuousStart();
    } else {
      ref.current.complete();
    }
  }, [buyLotteryTicketByIdLoading]);

  return (
    <div style={{backgroundColor: "#f5f6ff"}}>
      <title>Dashboard - Kuber Wins</title>
      <LoadingBar ref={ref} color={color} id="bar" />

      <Navbar props={{mainPage: "dashboard", subPage: "ticketDetail"}} />
      <section className="sec-ticket-dtls mb-5 mt-5 pb-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-7">
              <div
                className="card crd-img-dtls border-0 bg-transparent"
                style={{
                  backgroundImage:
                    "url('../../../assets/images/imgpsh_fullsize_anim-14.jpg')",
                }}
              >
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
                          style={{textAlign: "left", marginBottom: 0}}
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
                          <CountDown
                            props={{
                              type: "detail",
                              dateTime:
                                buyTicket?.gameInformation?.gameDuration +
                                " " +
                                buyTicket?.gameInformation?.startTime,
                            }}
                          />
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
                ${buyTicket?.gameInformation?.minPrizePool}
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
                        ${buyTicket?.User?.balance?.toLocaleString()}
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
                        $
                        {buyTicket?.gameInformation?.ticketPrice?.toLocaleString()}{" "}
                        <span className="fw-light">/Ticket</span>
                      </h3>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6 className="mb-3">Frequency</h6>
                      <h3 className="text-dark fw-light fs-6">
                        {dailyFrequency?.length > 0 ? "Daily" : ""}
                        {weeklyFrequency?.length > 0 &&
                        dailyFrequency?.length > 0
                          ? ", "
                          : ""}
                        {weeklyFrequency?.length > 0 ? "Weekly" : ""}
                        {monthlyFrequency?.length > 0 &&
                        weeklyFrequency?.length > 0
                          ? ", "
                          : ""}
                        {monthlyFrequency?.length > 0 ? "Monthly" : ""}
                      </h3>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6>Total Won :</h6>
                      <h3 className="text-dark fw-bold">
                        ${totalWon.toLocaleString()}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <section className="sec-second">
                    <div className="row d-flex justify-content-center">
                      <div className="col-lg-4 mb-4">
                        <div className="card">
                          <div className="card-body ps-0 py-0">
                            <div className="row">
                              <div
                                className="col-lg-3 col-md-2 col-sm col-3 img-cnt"
                                style={{
                                  backgroundImage:
                                    "url('../../../assets/images/imgpsh_fullsize_anim-5.png')",
                                }}
                              >
                                <div className="text-center mt-5">
                                  <h3 className="text-white mb-0">
                                    1<sup className="fs-6">st</sup>
                                  </h3>
                                  <h5 className="text-yellow fs-6">Ticket</h5>
                                </div>
                              </div>
                              <div className="col-lg-9 ps-lg-1 pe-lg-2 col-md-10 col-sm col-9 py-lg-4 pb-lg-1">
                                <div className="d-flex justify-content-between align-items-center">
                                  <h6 className="ps-1">
                                    Price :{" "}
                                    <span className="fw-bold price-d">
                                      ${activeTicket?.ticketPrice}
                                    </span>
                                  </h6>
                                </div>

                                <div className="row bg-dark mt-1 ms-1">
                                  <div className="col-lg-12 d-flex justify-content-center text-white align-items-center">
                                    <h1>{activeTicket?.number}</h1>
                                  </div>
                                </div>
                                <div className="row d-flex align-items-center mt-3">
                                  <div className="col-lg-6 col-md-6 col-sm col-7 px-lg-4 px-1">
                                    <Link
                                      to={"/winners/" + encrypt(number)}
                                      className="btn btn-info inf-rounded btn-sm px-3 pt-sm border-0 text-white fw-light font-sm"
                                    >
                                      Winnings
                                    </Link>
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm col-5 text-end">
                                    <h6 className="">
                                      Total Won : <br />{" "}
                                      <span className="fw-bold highlighted-text">
                                        $
                                        {activeTicketWonPrize ? (
                                          <AbbrNumber
                                            props={{
                                              number: activeTicketWonPrize,
                                              decPlaces: 2,
                                            }}
                                          />
                                        ) : (
                                          0
                                        )}
                                      </span>
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {buyTickets?.length > 0 ? (
                      <>
                        <hr />
                        <div className="row">
                          <h4 className="fw-bold mb-4">
                            More Ticktes In The Lottery
                          </h4>
                          {buyTickets.map((item, idx) => {
                            let restTicketWonPrize = checkTicketNumber(
                              userWinners,
                              item?.number
                            );
                            return (
                              <div key={idx} className="col-lg-4 mb-4">
                                <div className="card">
                                  <div className="card-body ps-0 py-0">
                                    <div className="row">
                                      <div
                                        className="col-lg-3 col-md-2 col-sm col-3 img-cnt"
                                        style={{
                                          backgroundImage:
                                            "url('../../../assets/images/imgpsh_fullsize_anim-5.png')",
                                        }}
                                      >
                                        <div className="text-center mt-5">
                                          <h3 className="text-white mb-0">
                                            {idx + 2}
                                            <sup className="fs-6">
                                              {idx === 0
                                                ? "nd"
                                                : idx === 1
                                                ? "rd"
                                                : "th"}
                                            </sup>
                                          </h3>
                                          <h5 className="text-yellow fs-6">
                                            Ticket
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="col-lg-9 ps-lg-1 pe-lg-2 col-md-10 col-sm col-9 py-lg-4 pb-lg-1">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <h6 className="ps-1">
                                            Price :{" "}
                                            <span className="fw-bold price-d">
                                              ${item?.ticketPrice}
                                            </span>
                                          </h6>
                                          {/* <h6>Last Won : <span className="fw-bold price-d">$250</span></h6> */}
                                        </div>

                                        <div className="row bg-dark mt-1 ms-1">
                                          <div className="col-lg-12 d-flex justify-content-center text-white align-items-center">
                                            <h1>{item?.number}</h1>
                                          </div>
                                        </div>
                                        <div className="row d-flex align-items-center mt-3">
                                          <div className="col-lg-6 col-md-6 col-sm col-7 px-lg-4 px-1">
                                            <Link
                                              to={
                                                "/winners/" +
                                                encrypt(item?.number)
                                              }
                                              className="btn btn-info inf-rounded btn-sm px-3 pt-sm border-0 text-white fw-light font-sm"
                                            >
                                              Winnings
                                            </Link>
                                          </div>
                                          <div className="col-lg-6 col-md-6 col-sm col-5 text-end">
                                            <h6 className="">
                                              Total Won : <br />{" "}
                                              <span className="fw-bold highlighted-text">
                                                $
                                                {restTicketWonPrize ? (
                                                  <AbbrNumber
                                                    props={{
                                                      number:
                                                        restTicketWonPrize,
                                                      decPlaces: 2,
                                                    }}
                                                  />
                                                ) : (
                                                  0
                                                )}
                                              </span>
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
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
                          ${buyTotal?.totalTicketsPrice}
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
                        className="nav-link"
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
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
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
                  </ul>
                </div>
                <div className="card-body pt-0 pb-3 px-0">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade"
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
                      className="tab-pane fade show active"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div
                        className="row m-0 pt-2 pb-1"
                        style={{background: "#F5F5F5"}}
                      >
                        <div className="col-lg-4 col-md-4 col-sm col-4 text-center">
                          <h6>Frequency</h6>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm col-4 text-center">
                          <h6>Winners</h6>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm col-4 text-center">
                          <h6>Winning Prize</h6>
                        </div>
                      </div>
                      {dailyFrequency?.length > 0
                        ? dailyFrequency.map((data, index) => {
                            return (
                              <div key={index} className="row m-0 pt-2 pb-1">
                                <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                  Daily
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                  {data?.winners}
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                  ${data?.prize}/winner
                                </div>
                              </div>
                            );
                          })
                        : ""}
                      {weeklyFrequency?.length > 0
                        ? weeklyFrequency.map((data, index) => (
                            <div key={index} className="row m-0 pt-2 pb-1">
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                Weekly
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                {data?.winners}
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                ${data?.prize}/winner
                              </div>
                            </div>
                          ))
                        : ""}
                      {monthlyFrequency?.length > 0
                        ? monthlyFrequency.map((data, index) => (
                            <div key={index} className="row m-0 pt-2 pb-1">
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                Monthly
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                {data?.winners}
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                ${data?.prize}/winner
                              </div>
                            </div>
                          ))
                        : ""}
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
