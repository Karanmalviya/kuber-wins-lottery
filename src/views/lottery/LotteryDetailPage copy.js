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
  generateLotteryNumber,
} from "../../utils/index";
import { useAuth } from "../../utils/auth";
import $ from "jquery";
import CountDown from "../components/CountDown";
import StripComponent from "../../utils/stripPayment/StripComponent";
import "../../styles/paymentModal.css";
import LoadingSpinner from "../components/LoadingSpinner";
import AbbrNumber from "../components/AbbrNumber";
import { generateTransactionId } from "../../utils/generateTransactionId";
import CustomModalAlert from "../../utils/CustomModalAlert";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import {
  clearLotteryTicketDetails,
  fetchCommissionPercent,
  fetchLotteryTicketDetails,
  fetchReferedUser,
  fetchUser,
  fetchUserBuyLotteryTicket,
} from "../../features/apiSlice";
import { useRef } from "react";

export default function LotteryDetailPage({ props }) {
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
  const [serviceList, setServiceList] = useState([
    { number: "0000000000", price: ticket?.ticketPrice },
  ]);
  const [paymentModal, setPaymentModal] = useState(null);
  const [paymentConfirmation, setPaymentConfirmation] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [confirmPaymentStatus, setConfirmPaymentStatus] = useState(false);
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
  const [lotteryNumber, setLotteryNumber] = useState([]);
  const [callGenerator, setCallGenerator] = useState(false);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
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
    dispatch(fetchUser(userId));
    dispatch(fetchCommissionPercent());
    dispatch(fetchReferedUser(userId));
    dispatch(fetchLotteryTicketDetails(id));
    dispatch(fetchUserBuyLotteryTicket(userId));
    return () => {
      dispatch(clearLotteryTicketDetails());
    };
  }, [dispatch, userId, id]);

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
        (item) => item?.gameInformation?.id === id
      );

      const allowTicketSum = filteredTickets.reduce(
        (sum, item) => sum + item?.tickets?.split(",")?.length || 0,
        0
      );
      setAllowTicketSum(allowTicketSum);
      setBuyTicketLength(userBuyLotteryTicket.length);
    }
  }, [userBuyLotteryTicket, id]);

  const handleServiceRemove = (idx) => {
    const list = [...serviceList];
    list.splice(idx, 1);
    localStorage.setItem("lotteryTicketList", JSON.stringify(list));
    setServiceList(JSON.parse(localStorage.getItem("lotteryTicketList")));
  };

  const handleServiceAdd = (ticket) => {
    if (allowTicketSum < +ticket.buyTicketLimit && availableTickets) {
      const maxTickets = Number(ticket?.maxNumberTickets) - ticket?.sold;
      const buyTicketLimit = Number(ticket?.buyTicketLimit);

      if (serviceList.some((o) => o.number === "0000000000")) {
        setAlertMessage({
          title: "Generate Lottery Number",
          message: "Please generate lottery number first",
        });
        setShowModal(true);
        return;
      }

      if (serviceList.length >= maxTickets) {
        setAlertMessage({
          title: "Limit exceed",
          message: "Limit exceed",
        });
        setShowModal(true);
        return;
      }

      if (serviceList.length >= buyTicketLimit) {
        setAlertMessage({
          title: "Limit exceed",
          message: "Limit exceed",
        });
        setShowModal(true);
        return;
      }

      setServiceList([
        ...serviceList,
        { number: "0000000000", price: `${ticket?.ticketPrice}` },
      ]);
    } else {
      setAlertMessage({
        title: "Limit exceeded",
        message: ticket.sold ? (
          <>
            You have exceeded your maximum number of buy tickets.
            <br /> Only {ticket?.buyTicketLimit} are ticket allowed on 1
            customer.
          </>
        ) : (
          "No Ticket Available"
        ),
      });
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (availableTickets) {
      const fetchingLotteryNumber = async () => {
        try {
          const lotteryNo = await generateLotteryNumber(id);
          const newNumbers = new Set([
            ...lotteryNumber,
            ...lotteryNo.randomNumbers,
          ]);
          const uniqueNumbersArray = Array.from(newNumbers);
          setLotteryNumber(uniqueNumbersArray);
        } catch (error) {}
      };
      fetchingLotteryNumber();
    }
  }, [availableTickets, callGenerator]);

  const generateNo = async (idx, ticketPrice) => {
    const existingNumbers = serviceList.map((item) => item.number);
    const availableNumbers = lotteryNumber.filter(
      (item) => !existingNumbers.includes(item.randomNumber)
    );
    if (availableNumbers.length === 1) {
      setCallGenerator((prev) => !prev);
    }
    if (availableNumbers.length) {
      const selectedNumberIndex = Math.floor(
        Math.random() * availableNumbers.length
      );
      const selectedNumber = availableNumbers[selectedNumberIndex].randomNumber;
      const updatedServiceList = [...serviceList];
      updatedServiceList[idx] = { number: selectedNumber, price: ticketPrice };
      setServiceList(updatedServiceList);

      // Trigger the animation
      setClickedButtonIndex(idx);
      setTimeout(() => {
        setClickedButtonIndex(null);
      }, 300);
    }
  };

  const buyTicket = (list) => {
    if (allowTicketSum < +ticket?.buyTicketLimit) {
      let obj = list.find((o) => o.number === "0000000000");
      if (obj) {
        setAlertMessage({
          title: "Generate Lottery Number",
          message: "Please generate lottery number first",
        });
        setShowModal(true);
      } else {
        $("body").addClass("modal-open");
        $("body").css({ overflow: "hidden", "padding-right": "15px" });
        $("#buy-now-modal").addClass("show");
        $("#buy-now-modal").css("display", "block");
        $("#buy-now-modal-bg").addClass(" fade show");
        localStorage.setItem("lotteryTicketList", JSON.stringify(list));
        setServiceList(JSON.parse(localStorage.getItem("lotteryTicketList")));
      }
    } else {
      setAlertMessage({
        title: "Limit exceeded",
        message: ticket.sold ? (
          <>
            You have exceeded your maximum number of buy tickets.
            <br /> Only {ticket?.buyTicketLimit} are ticket allowed on 1
            customer.
          </>
        ) : (
          "No Ticket Available"
        ),
      });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    $("body").removeClass("modal-open");
    $("body").removeAttr("style");
    $("#buy-now-modal").removeClass("show");
    $("#buy-now-modal").removeAttr("style");
    $("#buy-now-modal-bg").removeClass("modal-backdrop fade show");
    document.getElementById("err").innerText = "";
  };

  useEffect(() => {
    const lotteryTicketLocalStorage = JSON.parse(
      localStorage.getItem("lotteryTicketList")
    );
    if (lotteryTicketLocalStorage) setServiceList(lotteryTicketLocalStorage);
  }, []);

  const payTicket = (list, status, transactionid) => {
    if (!user?.isLoggedIn) {
      closeModal();
      navigate("/login");
    } else {
      const listArray = [];
      $.each(list, function (index, value) {
        listArray[index] = { ticketNumber: `${value?.number}` };
      });
      const buyLottery = async () => {
        const lotteryId = id;
        const totalPrice = Number(ticket?.ticketPrice) * Number(list?.length);
        const body = {
          lotteryId: lotteryId,
          userId: userId,
          ticketPrice: ticket?.ticketPrice,
          tickets: listArray,
          totalPrice: totalPrice.toString(),
          transactionId: transactionid.toString(),
          paymentStatus: status,
          gamePhaseId: ticket?.gamePhases[0]?.id,
          ticketsCount: listArray.length,
        };
        const response = await buyLotteryTickets(body, {
          "Content-Type": "application/json",
        });
        if (response.message === "Success") {
          setLoading(false);
          listArray.forEach((item) => {
            updateLotteryGeneratedNumber(
              { "Content-Type": "application/json" },
              item?.ticketNumber,
              lotteryId
            );
          });
          closeModal();
          localStorage.setItem(
            "lotteryTicketList",
            JSON.stringify([
              { number: "0000000000", price: ticket?.ticketPrice },
            ])
          );
          if (referByValue !== 0 && buyStatus[0] !== 0) {
            handleCommission(totalPrice);
          }
          navigate(
            `/payment/${`type=lottery&transaction_id=${transactionid}&status=success&amount=${totalPrice}`}`,
            {
              state: {
                type: "lottery",
                wallet: buy?.balance,
                gameName: ticket?.gameName,
                tickets: listArray.length,
              },
            }
          );
        }
      };
      buyLottery();
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
    if (paymentStatus) {
      setConfirmPaymentStatus(true);
    }
    if (confirmPaymentStatus) {
      closeModal();
      setTimeout(() => {
        setPaymentModal(false);
        payTicket(
          serviceList,
          paymentConfirmation.paymentMethod.id,
          paymentStatus
        );
      }, 3000);
    }
    return () => {};
  }, [paymentStatus, confirmPaymentStatus]);

  const handleLoginToContinue = () => {
    setAlertMessage({
      title: "Login to continue",
      message: "Login to Buy Tickets",
      primaryButtonText: "Login",
      link: "/login",
    });
    setShowModal(true);
  };

  useEffect(() => {
    if (ticket?.gamePhases) {
      const parsedData =
        typeof ticket?.gamePhases?.[0]?.gameData === "string"
          ? JSON.parse(ticket?.gamePhases?.[0]?.gameData)
          : ticket?.gamePhases?.[0]?.gameData;
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

  let payTicketCalled = false;

  const paymentWithWallet = async (
    amount,
    currency,
    token,
    transactionId,
    tickets
  ) => {
    if (amount <= buy.balance) {
      setLoading(true);
      const response = await walletPayment(
        {
          tansactionId: transactionId.toString(),
          type: "wallet",
          amount: amount,
          currency: "inr",
          sender: `${buy.fname}${buy.lname}`,
          receiver: "admin",
          description: `Payment from user balance for ${tickets?.length} ticket of ${ticket?.gameName}`,
          status: "1",
          transactionType: "Purchase",
          lotteryId: id,
          tickets: tickets.toString(),
        },
        { Authorization: `Bearer ${token}` },
        userId
      );
      if (response) {
        if (response.message === "Success") {
          closeModal();
          if (!payTicketCalled) {
            payTicketCalled = true;
            payTicket(serviceList, "1", generateTransactionId());
          }
        } else {
          setLoading(false);
          closeModal();
          setAlertMessage({
            title: "Try again after login",
            message: `Something went wrong. Please login again.`,
          });
          setShowModal(true);
        }
      }
    } else {
      setAlertMessage({
        title: "Insufficient balance",
        message: "Insufficient Wallet Balance",
      });
      setShowModal(true);

      setShowModal(true);
      document.getElementById("err").innerText = "Insufficient balance";
    }
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
                          "url('../assets/images/imgpsh_fullsize_anim-14.jpg')",
                      }
                }
              >
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
          {/* {Number(ticket?.minPrizePool)/Number(ticket?.ticketPrice) >= Number(ticket?.sold) ?
                        <div className="float-start mt-6 min-prize">
                            <h6 className="mb-0">Lottery is <span className="text-success h4">Running</span> minimum prize pool reached.</h6>
                        </div>
                    : ""} */}
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
                            src="../assets/images/material-symbols_account-balance-wallet-2.png"
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
                      <button
                        disabled={
                          serviceList?.length <=
                          Number(ticket?.maxNumberTickets) - ticket?.sold
                            ? false
                            : true
                        }
                        className="btn-add-ticket pull-start"
                        onClick={(e) => {
                          user?.isLoggedIn
                            ? handleServiceAdd(ticket)
                            : handleLoginToContinue();
                        }}
                      >
                        <i className="fa fa-plus-circle"></i> Add Ticket
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <section className="sec-second">
                    <div className="row">
                      {user?.isLoggedIn ? (
                        availableTickets > 0 &&
                        serviceList?.length <=
                          +ticket?.maxNumberTickets - ticket?.sold ? (
                          serviceList.map((singleService, index) => (
                            <div
                              key={index}
                              className="col-lg-4 col-md-6 col-sm mb-4"
                            >
                              <div className="card">
                                <div className="card-body ps-0 py-0">
                                  <div className="row">
                                    <div
                                      className="col-lg-3 col-md-2 col-sm col-3 img-cnt"
                                      style={{
                                        backgroundImage:
                                          "url('../assets/images/imgpsh_fullsize_anim-5.png')",
                                      }}
                                    >
                                      <div className="text-center mt-5">
                                        <h3 className="text-white mb-0">
                                          {index + 1}
                                          <sup
                                            className="fs-6"
                                            style={{ fontSize: "0.7rem" }}
                                          >
                                            {index === 0
                                              ? "st"
                                              : index === 1
                                              ? "nd"
                                              : index === 2
                                              ? "rd"
                                              : "th"}
                                          </sup>
                                        </h3>
                                        <h5
                                          className="text-yellow fs-6"
                                          style={{ fontSize: "0.7rem" }}
                                        >
                                          Ticket
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="col-lg-9 ps-lg-0 pe-lg-2 col-md-10 col-sm col-9 py-lg-4">
                                      <h6 className=" ps-1 pt-1">
                                        Price :{" "}
                                        <span className="fw-bold price-d">
                                          {currencySymbol}
                                          {
                                            // singleService.price ? <AbbrNumber props={{ "number": singleService.price, decPlaces: 2 }} /> :
                                            <AbbrNumber
                                              props={{
                                                number: ticket?.ticketPrice,
                                                decPlaces: 2,
                                              }}
                                            />
                                          }
                                        </span>{" "}
                                        <span
                                          className="float-end ps-1"
                                          style={{ marginTop: "-10px" }}
                                          onClick={(e) =>
                                            handleServiceRemove(index)
                                          }
                                        >
                                          <i className="fa-solid fa-circle-xmark fs-5 text-danger"></i>
                                        </span>
                                      </h6>
                                      <div className="row bg-dark mt-1 ms-1">
                                        <div className="col-lg-12 d-flex justify-content-center text-white align-items-center">
                                          <h1 id={"numbers" + index}>
                                            {singleService.number}
                                          </h1>
                                        </div>
                                      </div>
                                      <button
                                        // className="btn btn-outline-primary w-100 py-sm-1 mt-lg-3 mt-1"

                                        className={`btn btn-outline-primary w-100 py-sm-1 mt-lg-3 mt-1 ${
                                          clickedButtonIndex === index
                                            ? "clicked"
                                            : ""
                                        }`}
                                        onClick={(e) =>
                                          generateNo(index, ticket?.ticketPrice)
                                        }
                                      >
                                        Generate No
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-lg-12 mb-4">
                            <div
                              className="card"
                              style={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                              }}
                            >
                              <div className="card-body ps-0 py-0">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12 col-sm col-12 py-lg-4 text-center">
                                    No ticket available.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="col-lg-12 mb-4">
                          <div
                            className="card"
                            style={{
                              backgroundColor: "transparent",
                              boxShadow: "none",
                            }}
                          >
                            <div className="card-body ps-0 py-0">
                              <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm col-12 py-lg-4 text-center">
                                  Login to continue add tickets{" "}
                                  <Link to={"/login"}>click here</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
                <div className="card-footer">
                  {user?.isLoggedIn ? (
                    <div className="row">
                      <div className="col-lg-9 co-sm col-5 ps-4">
                        <h6>Total Tickets :</h6>
                        <div className="d-flex align-items-center">
                          <img
                            src="../assets/images/fa-solid_ticket-alt.png"
                            className="img-fluid"
                            width="30"
                            alt=""
                          />
                          <h5 className="m-0 ps-2 fw-bold">
                            {availableTickets > 0 ? serviceList.length : 0}
                          </h5>
                        </div>
                      </div>
                      <div className="col-lg-3 co-sm col-7">
                        <h6>Total Price :</h6>
                        <div className="d-flex align-items-center">
                          <img
                            src="../assets/images/fa6-solid_money-bill-1.png"
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
                                    ticket?.ticketPrice * serviceList.length,
                                  decPlaces: 2,
                                }}
                              />
                            ) : (
                              0
                            )}
                          </h5>
                          {serviceList?.length <=
                          Number(ticket?.maxNumberTickets) - ticket?.sold ? (
                            <button
                              disabled={
                                serviceList.length > 0 &&
                                +ticket?.maxNumberTickets - ticket?.sold
                                  ? false
                                  : true
                              }
                              className="btn btn-info text-white btn-sm ms-lg-5 ms-2 px-3"
                              onClick={() => buyTicket(serviceList)}
                            >
                              Buy Now
                            </button>
                          ) : (
                            ""
                          )}
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
                          __html: ticket?.instruction,
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
                        style={{ background: "#F5F5F5" }}
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
                      {frequency?.daily?.length > 0
                        ? frequency?.daily.map((data, index) => {
                            return (
                              <div key={index} className="row m-0 pt-2 pb-1">
                                <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                  Daily
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                  {data?.winners}
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                  {currencySymbol}
                                  <AbbrNumber
                                    props={{
                                      number: data?.prize,
                                      decPlaces: 2,
                                    }}
                                  />
                                  /winner
                                </div>
                              </div>
                            );
                          })
                        : ""}
                      {frequency?.weekly?.length > 0
                        ? frequency?.weekly.map((data, index) => (
                            <div key={index} className="row m-0 pt-2 pb-1">
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                Weekly
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                {data?.winners}
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                {currencySymbol}
                                <AbbrNumber
                                  props={{ number: data?.prize, decPlaces: 2 }}
                                />
                                /winner
                              </div>
                            </div>
                          ))
                        : ""}
                      {frequency?.monthly?.length > 0
                        ? frequency?.monthly.map((data, index) => (
                            <div key={index} className="row m-0 pt-2 pb-1">
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                Monthly
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                {data?.winners}
                              </div>
                              <div className="col-lg-4 col-md-4 col-sm col-4 text-center fw-bold">
                                {currencySymbol}
                                <AbbrNumber
                                  props={{ number: data?.prize, decPlaces: 2 }}
                                />
                                /winner
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
      <div
        className="modal fade"
        id="buy-now-modal"
        tabIndex="-1"
        aria-labelledby="authentication-modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header OTP-modal">
              <h5 className="modal-title" id="authentication-modal">
                Buy Ticket
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={(e) => closeModal()}
              ></button>
              {/* data-bs-dismiss="modal" aria-label="Close" */}
            </div>
            <div className="modal-body">
              <div className="">
                <span className="mb-0">
                  Ticket Name :{" "}
                  <span className="fw-bold text-black">{ticket?.gameName}</span>
                </span>
                <span className="mb-0 float-end">
                  Phase No. :{" "}
                  <span className="fw-bold text-black">
                    {ticket?.gamePhases?.[0]?.game}
                  </span>
                </span>
              </div>
              <div className="mt-2 px-3 card py-3">
                <ol className="mb-0 " style={{ paddingInlineStart: 14 }}>
                  {serviceList.map((singleService, index) => (
                    <li
                      key={index}
                      className="fs-6"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {singleService?.number}{" "}
                      <span className="float-end fw-bold">
                        {currencySymbol + singleService?.price}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="modal-footer d-inline">
              <div className="mb-3">
                <span className="">
                  Total Tickets :{" "}
                  <span className="fw-bold text-black">
                    {serviceList.length}
                  </span>
                </span>
                <span className="float-end">
                  Total Amount :{" "}
                  <span className="fw-bold text-black">
                    {currencySymbol + ticket?.ticketPrice * serviceList.length}
                  </span>
                </span>
              </div>
              {/* <div>
                                <button type="button" className="btn btn-primary px-3 w-100" onClick={() => payTicket(serviceList)}>Pay</button>
                            </div> */}
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  onClick={() =>
                    paymentWithWallet(
                      ticket?.ticketPrice * serviceList.length,
                      ticket?.Currency?.code,
                      token,
                      generateTransactionId(),
                      serviceList.map((singleService) => singleService?.number)
                    )
                  }
                  className={
                    buy?.balance >= ticket?.ticketPrice
                      ? "btn btn-primary px-3 btn-sm w-50"
                      : "btn btn-primary px-3 btn-sm w-50 not-allowed disabled"
                  }
                  disabled={buy?.balance >= ticket?.ticketPrice ? false : true}
                >
                  Pay By Wallet
                </button>
                {/* <button
                  className="btn btn-primary px-3 btn-sm w-50 ms-1"
                  onClick={() => {
                    // payTicket(serviceList);
                    setPaymentModal({
                      buy,
                      currency: ticket?.Currency?.code,
                      amount: ticket?.ticketPrice * serviceList.length,
                    });
                  }}
                >
                  Pay With Card
                </button>{" "} */}
                <button
                  className="btn btn-primary px-3 btn-sm w-50 ms-1 "
                  // onClick={() => setPaymentModal(user)}
                  onClick={() => handleDepositeKYC()}
                >
                  Pay With Coinbase
                </button>
              </div>
              <span id="err" className="text-danger"></span>
            </div>
          </div>
        </div>
      </div>
      {paymentModal && (
        <div className="modal_modal">
          <div className="overlay_modal">
            <div className="modal-content_modal-payment">
              <div className="d-flex justify-content-between bg-modal">
                <h2 className="p-3 text-light fs-4 ">Payment with Card</h2>
                <div
                  className="close-modal_modal btn-close btn-close-white"
                  onClick={() => setPaymentModal(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="d-flex flex-column justify-content-center bg-light">
                <StripComponent
                  user={paymentModal}
                  setPaymentConfirmation={setPaymentConfirmation}
                  setPaymentStatus={setPaymentStatus}
                  type="buyticket"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <CustomModalAlert
        show={showModal}
        handleClose={handleCloseModal}
        modalTitle={alertMessage.title}
        modalBody={alertMessage.message}
        primaryButtonText={alertMessage.primaryButtonText}
        link={alertMessage.link}
      />
      <div id="buy-now-modal-bg"></div>
      <Footer props={""} />
    </div>
  );
}
