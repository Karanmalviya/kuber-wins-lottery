import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {
  buyLotteryTickets,
  updateLotteryGeneratedNumber,
  walletPayment,
  CreateCommissionLog,
  coinbasePayment,
  commissionTransaction,
} from "../../utils/index";
import { useAuth } from "../../utils/auth";
import CountDown from "../components/CountDown";
import "../../styles/paymentModal.css";
import LoadingSpinner from "../components/LoadingSpinner";
import AbbrNumber from "../components/AbbrNumber";
import { generateTransactionId } from "../../utils/generateTransactionId";
import CustomModalAlert from "../../utils/CustomModalAlert";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoadingBar from "react-top-loading-bar";
import {
  clearLotteryTicketDetails,
  clearLotteryTicketNumber,
  fetchCommissionPercent,
  fetchLotteryNumber,
  fetchLotteryTicketDetails,
  fetchReferedUser,
  fetchUser,
  fetchUserBuyLotteryTicket,
} from "../../features/apiSlice";
import { useRef } from "react";
import "../../styles/input.css";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import TermAndConditionDialog from "../components/TermAndConditionDialog";
import toast from "react-hot-toast";

export default function LotteryDetailPage({ props }) {
  const termsAndConditonRef = useRef();
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState({});
  const location = useLocation();
  const { id } = location.state ? location.state : "";
  const userId = localStorage.getItem("userId");
  const currencySymbol = "Rs.";
  const [frequency, setFrequency] = useState([]);
  const [availableTickets, setAvailableTickets] = useState();
  const [serviceList, setServiceList] = useState([]);
  const [allowTicketSum, setAllowTicketSum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [referredData, setReferredData] = useState([]);
  const [referByValue, setReferByValue] = useState("");
  const [percent, setPercent] = useState(null);
  const [level, setLevel] = useState([]);
  const [buyStatus, setBuyStatus] = useState("");
  const [buyTicketLength, setBuyTicketLength] = useState([]);
  const token = localStorage.getItem("accessToken");
  const [parsedGameData, setParsedGameData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState("");
  const [showError, setShowError] = useState(false);
  const [show, setShow] = useState(false);

  const [alertMessage, setAlertMessage] = useState({
    title: "",
    message: "",
    primaryButtonText: "",
    link: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchUser(userId));
      dispatch(fetchReferedUser(userId));
      dispatch(fetchUserBuyLotteryTicket(userId));
    }
    if (id) {
      dispatch(fetchLotteryTicketDetails(id));
    }
    dispatch(fetchCommissionPercent());
    return () => {
      dispatch(clearLotteryTicketDetails());
    };
  }, [dispatch, userId, id]);

  useEffect(() => {
    dispatch(fetchLotteryNumber({ id, ticketQuantity }));
  }, [id, ticketQuantity]);

  const commissionPercent = useSelector((state) => state.api.commissionPercent);
  const referedUser = useSelector((state) => state.api.referedUser);
  const buy = useSelector((state) => state.api.user);
  const lotteryTicketDetails = useSelector(
    (state) => state.api.lotteryTicketDetails
  );
  const lotteryTicketDetailsLoading = useSelector(
    (state) => state.api.lotteryTicketDetailsLoading
  );
  const userBuyLotteryTicket = useSelector(
    (state) => state.api.userBuyLotteryTicket
  );
  const lotteryTicketNumber = useSelector((state) => state.api.lotteryNumber);

  useEffect(() => {
    if (Object.keys(lotteryTicketDetails).length) {
      setTicket(lotteryTicketDetails);
      setAvailableTickets(
        lotteryTicketDetails.maxNumberTickets - lotteryTicketDetails.sold
      );
    }
    if (commissionPercent.length) {
      setReferredData(commissionPercent);
    }
    if (Object.keys(referedUser).length) {
      setReferByValue(referedUser.user.refer_by);
    }
  }, [commissionPercent, lotteryTicketDetails, referedUser]);

  useEffect(() => {
    const filtered = referredData.filter((per) => {
      return per.commission_type === "buy";
    });
    setPercent(filtered?.map((per) => per.percent));
    setLevel(filtered?.map((per) => per.level));
    setBuyStatus(filtered?.map((per) => per.status));
  }, [referredData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userBuyLotteryTicket.length) {
      const filteredTickets = userBuyLotteryTicket.filter(
        (item) => item?.gameInformation?.id === id && item.status
      );

      const allowTicketSum = filteredTickets.reduce(
        (sum, item) => sum + item?.tickets?.split(",")?.length || 0,
        0
      );
      setAllowTicketSum(allowTicketSum);
      setBuyTicketLength(userBuyLotteryTicket.length);
    }
  }, [userBuyLotteryTicket, id]);

  const payTicket = async (list, status, transactionid) => {
    setLoading(true);
    if (!user?.isLoggedIn) {
      setShow(false);
      navigate("/login");
      return;
    }
    const { balance } = buy;
    const { id, ticketPrice, gamePhases, gameName } = ticket;
    const lotteryId = id;
    const totalPrice = Number(ticketPrice) * list.length;
    const listArray = list.map((value) => ({
      ticketNumber: value.number.toString(),
    }));
    if (totalPrice <= balance) {
      const body = {
        lotteryId,
        userId,
        ticketPrice,
        tickets: listArray,
        totalPrice: totalPrice.toString(),
        transactionId: transactionid.toString(),
        paymentStatus: status,
        gamePhaseId: gamePhases[0]?.id,
        ticketsCount: listArray.length,
      };
      try {
        const response = await buyLotteryTickets(body, {
          "Content-Type": "application/json",
        });
        if (response.message === "Success") {
          const PayWalletRes = await paymentWithWallet(
            totalPrice,
            token,
            transactionid,
            list.map((singleService) => singleService?.number)
          );

          if (referByValue !== 0 && buyStatus[0] !== 0) {
            handleCommission(totalPrice);
          }
          if (PayWalletRes === "Success") {
            dispatch(fetchUser(userId));
            setLoading(false);
            const queryParams = `type=lottery&transaction_id=${transactionid}&status=success&amount=${totalPrice}`;
            navigate(`/payment/${queryParams}`, {
              state: {
                type: "lottery",
                wallet: balance,
                gameName,
                tickets: listArray.length,
              },
            });
          }
        }
      } catch (error) {
        // setAlertMessage({
        //   title: "Lottery ticket reach out of limit",
        //   message: error.response.data.message,
        // });
        toast.error(
          <div>
            <div>Lottery ticket reach out of limit</div>
            <div>{error.response.data.message}</div>
          </div>,
          { id: "clipboard" }
        );

        // setShowModal(true);
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("Insufficient balance", { id: "clipboard" });
    }
  };
  let count = 0;
  const handleCommission = async (totalPrice) => {
    if (buyTicketLength < level.length && count === 0) {
      const body = {
        to_id: Number(userId),
        from_id: Number(referByValue),
        UserName: buy?.userName,
        level: level[buyTicketLength],
        percent: percent[buyTicketLength],
        main_amount: totalPrice.toString(),
        commission_type: "buy",
      };

      const res3 = await CreateCommissionLog(body, userId);
      const commissionAmount = parseFloat(
        (percent[buyTicketLength] / 100) * totalPrice
      ).toFixed(2);

      if (res3) {
        const combody = {
          transactionType: "Commission",
          amount: commissionAmount.toString(),
          userId: +referByValue,
          sender: "Commission",
          receiver: "User",
          description: "Lottery Purchase Commission",
        };
        await commissionTransaction(combody);
      }
      count++;
    }
  };

  useEffect(() => {
    if (ticket?.gamePhases) {
      const phase = ticket.gamePhases;
      const activePhase = phase.find((item) => item.status);
      const parsedData =
        typeof activePhase.gameData === "string"
          ? JSON.parse(activePhase.gameData)
          : activePhase.gameData;
      setParsedGameData(parsedData);
    }
  }, [ticket?.gamePhases]);

  useEffect(() => {
    const setWinBonuses = (ticketGamePhases, parsedData) => {
      const dailyData = [];
      const weeklyData = [];
      const monthlyData = [];

      ticketGamePhases?.forEach((gamePhase) => {
        if (gamePhase?.status === 1) {
          parsedData?.forEach((gamePhaseData) => {
            if (gamePhaseData.frequency === "1") {
              dailyData.push(gamePhaseData);
            } else if (gamePhaseData.frequency === "2") {
              weeklyData.push(gamePhaseData);
            } else if (gamePhaseData.frequency === "3") {
              monthlyData.push(gamePhaseData);
            }
          });
        }
      });

      setFrequency({
        daily: dailyData,
        weekly: weeklyData,
        monthly: monthlyData,
      });
    };

    setWinBonuses(ticket?.gamePhases, parsedGameData);
  }, [ticket?.gamePhases, parsedGameData]);

  const paymentWithWallet = async (amount, token, transactionId, tickets) => {
    const sender = `${buy.fname}${buy.lname}`;
    const description = `Payment from user balance for ${tickets?.length} ticket of ${ticket?.gameName}`;

    const response = await walletPayment(
      {
        tansactionId: transactionId.toString(),
        type: "wallet",
        amount,
        currency: "usd",
        sender,
        receiver: "admin",
        description,
        status: "1",
        transactionType: "Purchase",
        lotteryId: id,
        tickets: tickets.toString(),
      },
      { Authorization: `Bearer ${token}` },
      userId
    );
    return response.message;
  };

  const handleDepositeKYC = () => {
    const isProfileComplete =
      buy.address !== "" &&
      buy.city !== "" &&
      buy.state !== "" &&
      buy.emailVerified &&
      buy.sms_verify &&
      buy.zip !== "" &&
      buy.country !== "" &&
      buy.email !== "" &&
      buy.mobileNo !== "";

    if (isProfileComplete) {
      if (ticket?.ticketPrice * serviceList.length <= 3000) {
        handleCoinbasePayment();
      } else if (
        ticket?.ticketPrice * serviceList.length > 3000 &&
        buy.twofa_verification
      ) {
        handleCoinbasePayment();
      } else {
        setAlertMessage({
          title: "Complete Your KYC",
          message:
            "Your total amount exceeds Rs.3000!! In order to make a transaction, Please complete your KYC",
          primaryButtonText: "Complete Your KYC",
          link: "/kyc",
        });
        setShowModal(true);
      }
    } else {
      setAlertMessage({
        title: "Complete Your Profile",
        message: "In order to buy a scratch card, please complete your Profile",
        primaryButtonText: "Complete Your Profile",
        link: "/profile",
      });
      setShowModal(true);
    }
  };

  const handleCoinbasePayment = async () => {
    setLoading(true);
    const res = await coinbasePayment({
      amount: ticket?.ticketPrice * serviceList.length,
      currency: "USD",
      description: ticket?.gameName,
    });
    const url = res?.Payment_Url;
    window.location.replace(url);
  };

  useEffect(() => {
    if (lotteryTicketDetailsLoading) {
      ref.current.continuousStart();
    } else {
      ref.current.complete();
    }
  }, [lotteryTicketDetailsLoading]);

  useEffect(() => {
    if (lotteryTicketNumber) {
      const numbers = lotteryTicketNumber.map((item) => ({
        number: item.randomNumber,
        price: ticket.ticketPrice,
      }));
      setServiceList(numbers);
    }
    return () => {
      clearLotteryTicketNumber();
    };
  }, [lotteryTicketNumber, ticketQuantity]);

  const handleQuantityChange = (newQuantity) => {
    const newValue = Math.floor(newQuantity);
    const available = +ticket.buyTicketLimit - allowTicketSum;
    const availableTickets = +ticket?.maxNumberTickets - ticket?.sold;
    if (user?.isLoggedIn) {
      if (available > 0 && availableTickets) {
        if (newValue === 0) {
          setTicketQuantity("");
        } else {
          const numericValue = parseInt(newValue);
          if (!isNaN(numericValue)) {
            setTicketQuantity(Math.min(Math.max(numericValue, 0), available));
          }
        }
      } else {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1500);
      }
    } else {
      setAlertMessage({
        title: "Login ",
        message: "Please login to continue",
        primaryButtonText: "Login",
        link: "/login",
      });
      setShowModal(true);
    }
    if (ticketQuantity >= available) setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 1500);
  };

  const isShowFrequency = ticket?.gamePhases?.find(
    (game) => game.status === 1 && game.showStatus === 1
  );

  return (
    <div style={{ backgroundColor: "#f5f6ff" }}>
      {loading && <LoadingSpinner />}
      <title>{ticket?.gameName} - Kuber Wins</title>
      <LoadingBar ref={ref} color="rgb(245, 246, 255)" />
      <Navbar props={{ mainPage: "lotteries", subPage: "details" }} />
      <section className="sec-ticket-dtls mb-5 mt-5 pb-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-7">
              <div
                className="card crd-img-dtls border-0 bg-transparent"
                style={
                  ticket?.image
                    ? {
                        backgroundImage: "url('" + ticket?.image + "')",
                        backgroundSize: "cover",
                      }
                    : {
                        backgroundImage:
                          "url('./assets/images/imgpsh_fullsize_anim-14.jpg')",
                      }
                }
              >
                <p
                  className="p-label-lotto text-capitalize"
                  style={{ overflow: "visible" }}
                >
                  {ticket?.draw?.replace("-", " ")}
                </p>
                <div className="card-body p-0 text-center">
                  <div className="ltr-name">
                    <h4 className="fw-bold text-capitalize">
                      {ticket?.gameName}
                    </h4>
                    <p className="text-white">{ticket?.gameSlogan}</p>
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-lg-8">
                        <p
                          className="text-white"
                          style={{ textAlign: "left", marginBottom: 0 }}
                        >
                          {ticket?.nextDraw === 0
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
                                ticket?.gameDuration + " " + ticket?.startTime,
                              frequency:
                                frequency?.daily?.length > 0
                                  ? "Daily"
                                  : "" || frequency?.weekly?.length > 0
                                  ? "Weekly"
                                  : "" || frequency?.monthly?.length > 0
                                  ? "Monthly"
                                  : "",
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
                {currencySymbol}
                <AbbrNumber
                  props={{ number: ticket?.minPrizePool, decPlaces: 2 }}
                />
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
                    {user?.isLoggedIn ? (
                      <div className="col-lg-2 col-md-2 col-sm col-6">
                        <h6>
                          <img
                            src="./assets/images/material-symbols_account-balance-wallet-2.png"
                            className="img-fluid pe-2"
                            alt=""
                          />
                          Wallet
                        </h6>

                        <h3
                          className="text-success"
                          title={buy?.balance?.toLocaleString()}
                        >
                          {currencySymbol}
                          <AbbrNumber
                            props={{
                              number: buy?.balance,
                              decPlaces: 2,
                            }}
                          />
                        </h3>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6>Available Tickets :</h6>
                      <h3 className="text-dark fw-bold">{availableTickets}</h3>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6>Ticket Price :</h6>
                      <h3 className="text-dark fw-bold">
                        {currencySymbol}
                        <AbbrNumber
                          props={{ number: ticket?.ticketPrice, decPlaces: 2 }}
                        />{" "}
                        <span className="fw-light">/Ticket</span>
                      </h3>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm col-6">
                      <h6 className="mb-3">Frequency</h6>
                      <h3
                        className="text-dark fw-light fs-6"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {frequency?.daily?.length > 0 ? "Daily" : ""}
                        {frequency?.weekly?.length > 0 &&
                        frequency?.daily?.length > 0
                          ? ", "
                          : ""}
                        {frequency?.weekly?.length > 0 ? "Weekly" : ""}
                        {frequency?.monthly?.length > 0 &&
                        frequency?.weekly?.length > 0
                          ? ", "
                          : ""}
                        {frequency?.monthly?.length > 0 ? "Monthly" : ""}
                      </h3>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm col-12">
                      <h6>No. of Tickets :</h6>
                      <button
                        className="btn-add-ticket pull-start"
                        disabled={!user?.isLoggedIn}
                      >
                        <AiFillMinusCircle
                          className="fs-2 plusMinus"
                          onClick={() =>
                            handleQuantityChange(ticketQuantity - 1)
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <input
                          type="number"
                          className="text-center ms-1 me-1"
                          style={{
                            width: "60%",
                            height: "30px",
                            border: "none",
                            borderRadius: "5px",
                            outline: "none",
                          }}
                          placeholder="0"
                          value={ticketQuantity}
                          onChange={(e) =>
                            handleQuantityChange(+e.target.value)
                          }
                        />
                        <AiFillPlusCircle
                          className="fs-2 plusMinus"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleQuantityChange(ticketQuantity + 1)
                          }
                        />
                      </button>
                      {showError && (
                        <h6 className="text-danger">
                          only {ticket?.buyTicketLimit} ticket tickets allowed
                          per customer
                        </h6>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  {user?.isLoggedIn ? (
                    <div className="row">
                      <div className="col-lg-6 col-sm col-5 ps-4">
                        <h6>Total Tickets :</h6>
                        <div className="d-flex align-items-center">
                          <img
                            src="./assets/images/fa-solid_ticket-alt.png"
                            className="img-fluid"
                            width="30"
                            alt=""
                          />
                          <h5 className="m-0 ps-2 fw-bold">
                            {availableTickets > 0 ? serviceList.length : 0}
                          </h5>
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm col-7">
                        <div className="d-flex justify-content-end">
                          <div>
                            <h6>Total Price :</h6>
                            <div className="d-flex align-items-center">
                              <img
                                src="./assets/images/fa6-solid_money-bill-1.png"
                                className="img-fluid"
                                width="30"
                                alt=""
                              />
                              <h5 className="m-0 ps-2 fw-bold">
                                {currencySymbol}
                                {availableTickets > 0 ? (
                                  <AbbrNumber
                                    props={{
                                      number:
                                        ticket?.ticketPrice *
                                        serviceList.length,
                                      decPlaces: 2,
                                    }}
                                  />
                                ) : (
                                  0
                                )}
                              </h5>
                              {serviceList?.length <=
                              Number(ticket?.maxNumberTickets) -
                                ticket?.sold ? (
                                <button
                                  disabled={
                                    serviceList.length > 0 &&
                                    +ticket?.maxNumberTickets - ticket?.sold
                                      ? false
                                      : true
                                  }
                                  className="btn btn-info text-white btn-sm ms-lg-5 ms-2 px-3"
                                  onClick={() => {
                                    if (buy.term_condition) {
                                      setShow(true);
                                    } else {
                                      termsAndConditonRef.current.handleClickOpen();
                                    }
                                  }}
                                >
                                  Buy Now
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
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
                          __html: ticket?.instruction,
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
                                    {currencySymbol}
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
        </div>{" "}
      </section>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="OTP-modal">
          <Modal.Title> Buy Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              Ticket Name :{" "}
              <span className="fw-bold text-black">{ticket?.gameName}</span>
            </div>
            <div className="col-6 text-end">
              Phase No. :{" "}
              <span className="fw-bold text-black">
                {ticket?.gamePhases?.[0]?.game}
              </span>
            </div>
          </div>
          <div
            className="mt-2 px-3 card py-3"
            style={{ overflow: "auto", height: "100px" }}
          >
            <ol className="mb-0 " style={{ paddingInlineStart: 14 }}>
              {serviceList.length &&
                serviceList.map((singleService, index) => (
                  <li
                    key={index}
                    className="fs-6"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {singleService?.number}{" "}
                    <span className="float-end fw-bold">
                      {currencySymbol +
                        (+singleService?.price)?.toLocaleString()}
                    </span>
                  </li>
                ))}
            </ol>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-inline" style={{ lineHeight: "9px" }}>
          <div className="d-inline">
            <div className="mb-3">
              <span className="">
                Total Tickets :{" "}
                <span className="fw-bold text-black">{serviceList.length}</span>
              </span>
              <span className="float-end">
                Total Amount :{" "}
                <span className="fw-bold text-black">
                  {currencySymbol +
                    (ticket?.ticketPrice * serviceList.length).toLocaleString()}
                </span>
              </span>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                onClick={() => {
                  payTicket(serviceList, "1", generateTransactionId());

                  // paymentWithWallet(
                  //   ticket?.ticketPrice * serviceList.length,
                  //   token,
                  //   generateTransactionId(),
                  //   serviceList.map((singleService) => singleService?.number)
                  // );
                }}
                className={
                  buy?.balance >= ticket?.ticketPrice
                    ? "btn btn-primary px-3 btn-sm w-100"
                    : "btn btn-primary px-3 btn-sm w-100 not-allowed disabled"
                }
                disabled={buy?.balance >= ticket?.ticketPrice ? false : true}
              >
                Pay By Wallet
              </button>

              {/* <button
                className="btn btn-primary px-3 btn-sm w-50 ms-1 "
                onClick={() => handleDepositeKYC()}
              >
                Pay With Coinbase
              </button> */}
            </div>
            {buy?.balance <= ticket?.ticketPrice && (
              // <div className="d-flex justify-content-between mt-1">
              //   <div id="err" className="text-danger pt-2">
              //     Insufficient balance to buy this ticket
              //   </div>
              //   <div className="p-0 m-0">
              //     <Link className="btn btn-sm btn-primary">Deposit Now</Link>
              //   </div>
              // </div>
              <div className="mt-1">
                <div id="err" className="text-danger pt-2">
                  Insufficient balance to buy this ticket
                </div>
                <div className="p-0 m-0 mt-2">
                  <Link className="btn btn-sm btn-primary" to="/deposit">
                    Deposit Now
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Modal.Footer>
      </Modal>

      <CustomModalAlert
        show={showModal}
        handleClose={handleCloseModal}
        modalTitle={alertMessage.title}
        modalBody={alertMessage.message}
        primaryButtonText={alertMessage.primaryButtonText}
        link={alertMessage.link}
      />
      <TermAndConditionDialog ref={termsAndConditonRef} />
      <div id="buy-now-modal-bg"></div>
      <Footer props={""} />
    </div>
  );
}
