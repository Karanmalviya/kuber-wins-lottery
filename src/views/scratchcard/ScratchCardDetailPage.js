import React, { useEffect, useRef, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { decrypt } from "../../utils/encryptdecrypt";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buyScratchCard, coinbasePayment } from "../../utils/index";
import { walletPayment } from "../../utils/index";
import LoadingSpinner from "../components/LoadingSpinner";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/less";
import "swiper/less/navigation";
import "swiper/less/pagination";
import "swiper/css/scrollbar";
import ScratchCoutDown from "./ScratchCoutDown";
import HtmlToFormattedText from "../../utils/htmltoFormattedText";
import { useAuth } from "../../utils/auth";
import Skeleton from "@mui/material/Skeleton";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import CustomModalAlert from "../../utils/CustomModalAlert";
import { generateTransactionId } from "../../utils/generateTransactionId";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearScratchCardData,
  fetchAllPurchasedScratchCard,
  fetchScratchCardBuyNumbers,
  fetchScratchCardsById,
  fetchUser,
} from "../../features/apiSlice";
import LoadingBar from "react-top-loading-bar";
import { Modal } from "react-bootstrap";
import TermAndConditionDialog from "../components/TermAndConditionDialog";

export default function ScratchCardDetailPage() {
  const termsAndConditonRef = useRef();
  const dispatch = useDispatch();
  const ref = useRef();
  const refLoading = useRef(false);
  const users = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const scratch_card_id = decrypt(id);
  const [scratchCardData, setScratchCardsData] = useState([]);
  const [scratchCardNumbers, setScratchCardNumbers] = useState([]);
  const [scratchCardWin, setScratchCardsWin] = useState([]);
  const [scratchCardLose, setScratchCardsLose] = useState([]);
  const [loading, setLoading] = useState(false);
  const [multiDraw, setMultiDraw] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [frequencySchedule, setFrequencySchedule] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [calculateDiscount, setCalculateDiscount] = useState({
    discountPercent: 0,
  });
  const [scratchCardsSold, setScratchCardsSold] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    message: "",
    primaryButtonText: "",
    link: "",
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchScratchCardsById(scratch_card_id));
    dispatch(fetchAllPurchasedScratchCard());
    return () => {
      dispatch(clearScratchCardData());
    };
  }, [userId, scratch_card_id]);

  const user = useSelector((state) => state.api.user);
  const scratchCardById = useSelector((state) => state.api.scratchCardById);
  const scratchCardByIdLoading = useSelector(
    (state) => state.api.scratchCardByIdLoading
  );
  const AllPurchasedScratchCard = useSelector(
    (state) => state.api.AllPurchasedScratchCard
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Object.keys(scratchCardById).length) {
      setScratchCardsData(scratchCardById);
    }
    if (AllPurchasedScratchCard.length) {
      setScratchCardsSold(AllPurchasedScratchCard);
    }
  }, [scratchCardById, AllPurchasedScratchCard]);

  useEffect(() => {
    if (!refLoading.current && scratchCardByIdLoading) {
      ref.current.continuousStart();
    } else {
      ref.current.complete();
      refLoading.current = true;
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (scratchCardData.status == 0) {
      navigate("/scratch-cards");
    }
  }, [id, scratchCardData]);

  const filteredSold = scratchCardsSold.filter(
    (item) => item.UserId == +userId && item.scratchCardId == +scratch_card_id
  );

  useEffect(() => {
    const handleNumberScratchNumberGenerate = () => {
      dispatch(
        fetchScratchCardBuyNumbers({
          scratchCardId: scratch_card_id,
          number: multiDraw,
          oddsOfWin: scratchCardData.odds_of_win,
        })
      );
    };
    handleNumberScratchNumberGenerate();
  }, [multiDraw]);

  const scratchCardBuyNumber = useSelector(
    (state) => state.api.scratchCardBuyNumber
  );

  useEffect(() => {
    if (multiDraw) {
      setScratchCardsWin(scratchCardBuyNumber.scratchCardWin);
      setScratchCardsLose(scratchCardBuyNumber.scratchCardLoss);
      setScratchCardNumbers(scratchCardBuyNumber.scratchCardNumbers);
    }
  }, [scratchCardBuyNumber]);

  const handlePaymentDialog = () => {
    setShow(true);
  };

  const paymentWithWallet = async () => {
    setLoading(true);

    var transactionId = generateTransactionId();
    const res = await walletPayment(
      {
        scratchCardId: scratch_card_id,
        tansactionId: transactionId,
        type: "wallet",
        amount: grandTotal.toString(),
        currency: "usd",
        sender: user?.userName,
        description: `${multiDraw} Scratches of ${scratchCardData.card_name.toString()} Scratch Card are purchased`,
        transactionType: "Card_Purchase",
      },
      { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      userId
    );
    if (res.message === "Success") {
      handlebuyScratchCard(transactionId);
    }
  };

  const handlebuyScratchCard = async (transactionId) => {
    const body = {
      scratchCardId: scratch_card_id,
      userId: userId,
      scratchCardPrice: scratchCardData.ticketPrize.toString(),
      scratchDraw: scratchCardNumbers.length.toString(),
      scratchCards: scratchCardNumbers,
      totalPrice: grandTotal.toString(),
      cardType: scratchCardData.card_type,
      transactionId: transactionId,
      scratchCardsWin: scratchCardWin,
      scratchCardsLoss: scratchCardLose,
    };
    const res = await buyScratchCard(body);
    if (res.message === "Success") {
      dispatch(fetchUser(userId));
      setLoading(false);
      setShow(false);
      navigate(
        `/payment/${`type=scratchcard&transaction_id=${transactionId}&status=success&amount=${grandTotal}`}`,
        {
          state: {
            type: "scratchcard",
            wallet: user?.balance,
            gameName: scratchCardData.card_name,
            tickets: multiDraw,
          },
        }
      );
    }
  };
  useEffect(() => {
    if (scratchCardData) {
      try {
        const parsedData = JSON.parse(scratchCardData?.discountTicket);
        if (Object.keys(parsedData[0]).length) {
          setDiscount(JSON.parse(scratchCardData?.discountTicket));
        }
      } catch (error) {}
    }
  }, [scratchCardData]);

  useEffect(() => {
    const multiDrawCount = multiDraw;
    var discountPercent = 0;
    var discountTicket = 0;
    var discountAmount = 0;
    var amountAfterDiscount = 0;
    var ticketPrize = scratchCardData?.ticketPrize;
    var amountBeforeDiscount = multiDrawCount * ticketPrize;
    if (discount !== null && discount.length > 0) {
      const discountSorted = discount.sort(
        (a, b) => parseInt(a.discountTicket) - parseInt(b.discountTicket)
      );

      for (var i = 0; i < discountSorted.length; i++) {
        if (multiDrawCount >= discountSorted[i].discountTicket) {
          discountPercent = discountSorted[i].discountPercent;
          discountTicket = discountSorted[i].discountTicket;
        } else {
          break;
        }
      }

      var discountAmount = (amountBeforeDiscount * discountPercent) / 100;
      var amountAfterDiscount = amountBeforeDiscount - discountAmount;
      setCalculateDiscount({
        discountAmount,
        discountPercent,
        discountTicket,
        ticketPrize,
        amountBeforeDiscount,
        amountAfterDiscount,
      });
      if (multiDrawCount < +discountSorted[0]?.discountTicket) {
        setGrandTotal(amountBeforeDiscount);
      } else if (multiDrawCount >= +discountSorted[0]?.discountTicket) {
        setGrandTotal(amountAfterDiscount);
      } else {
        setGrandTotal(ticketPrize);
      }
    } else {
      setCalculateDiscount({
        discountAmount,
        discountPercent,
        discountTicket,
        ticketPrize,
        amountBeforeDiscount,
        amountAfterDiscount,
      });
      setGrandTotal(amountBeforeDiscount);
    }
  }, [multiDraw, scratchCardData]);

  useEffect(() => {
    const frequency = () => {
      try {
        const parsedData = JSON.parse(scratchCardData.frequency);
        return parsedData?.[0].frequency;
      } catch (error) {}
    };
    const schedule = () => {
      try {
        const parsedData = JSON.parse(scratchCardData.frequency);

        return (
          parsedData?.[0].schedule.charAt(0).toUpperCase() +
          parsedData?.[0].schedule.slice(1)
        );
      } catch (error) {}
    };
    const day = () => {
      try {
        const parsedData = JSON.parse(scratchCardData.frequency);
        return parsedData?.[0].schedule;
      } catch (error) {}
    };
    setFrequencySchedule({
      frequency: frequency(),
      schedule: schedule(),
      day: day(),
    });
  }, [scratchCardData]);

  const handleDepositeKYC = () => {
    const isProfileComplete =
      user.address !== "" &&
      user.city !== "" &&
      user.state !== "" &&
      user.emailVerified &&
      user.sms_verify &&
      user.zip !== "" &&
      user.country !== "" &&
      user.email !== "" &&
      user.mobileNo !== "";

    if (isProfileComplete) {
      if (grandTotal <= 3000) {
        handleCoinbasePayment();
      } else if (grandTotal > 3000 && user.twofa_verification) {
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
      amount: grandTotal,
      currency: "USD",
      description: scratchCardData?.card_name,
    });
    const url = res?.Payment_Url;
    window.location.href = url;
  };

  const handleLoginToContinue = () => {};
  function convertUTCToLocal(utcTimeStr) {
    const utcTime = moment.utc(utcTimeStr, "HH:mm");
    const localTime = utcTime.local();
    return localTime.format("HH:mm");
  }

  function getOrdinal(number) {
    if (/\d/.test(number)) {
      const suffixes = ["th", "st", "nd", "rd"];
      const lastDigit = number % 10;
      const suffix =
        number >= 11 && number <= 13 ? "th" : suffixes[lastDigit] || "th";
      return number + suffix;
    } else {
      return number;
    }
  }

  const updateMultiDraw = (newValue) => {
    if (scratchCardData?.countStatus1) {
      if (newValue === 0) {
        setMultiDraw("");
        return;
      }

      const maxValue =
        +scratchCardData?.buyTicketLimit -
        (filteredSold.length > 0 ? +filteredSold?.[0]?.buyLimit : 0);

      if (maxValue === multiDraw) {
        const errorMessage = `You can buy ${
          scratchCardData?.buyTicketLimit
        } plays in ${
          scratchCardData?.card_type === "single-scratch"
            ? "single scratch"
            : frequencySchedule?.frequency === "Monthly"
            ? "a Month"
            : frequencySchedule?.frequency === "Weekly"
            ? "a Week"
            : "Daily"
        }`;
        setErrorMessage(errorMessage);
        setTimeout(() => {
          setErrorMessage("");
        }, 1500);
      }
      const inputValue = Math.min(Math.max(newValue, 0), maxValue);
      const numericValue = parseInt(inputValue);
      if (!isNaN(numericValue)) {
        if (
          scratchCardData.card_type === "multi-scratch" &&
          numericValue > 100
        ) {
          setAlertMessage({
            title: "Multi Scratch Purchase Limit",
            message:
              "Please note that the maximum quantity for a Multi Scratch purchase is 100 scratch cards at a time",
            primaryButtonText: "Ok",
          });
          setShowModal(true);
          return;
        }
        setMultiDraw(numericValue);
      }
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <title>{scratchCardData.card_name} - Kuber Wins</title>
      <LoadingBar ref={ref} color="rgb(245, 246, 255)" />

      <Navbar props={{ mainPage: "scratchcard", subPage: "details" }} />
      <section className="sec-scratch-cards-details bg-white pb-4">
        <div className="container">
          <div className="row pt-5 mb-4">
            <div className="col-lg-6 mb-4" style={{ userSelect: "none" }}>
              {scratchCardData?.image ? (
                <>
                  <div className="card card-img">
                    <p
                      className="p-label-lotto text-capitalize"
                      style={{ overflow: "visible" }}
                    >
                      {scratchCardData?.card_type?.replace("-", " ")}
                    </p>
                    <img
                      draggable={false}
                      className="img-fluid"
                      src="./assets/images/imgpsh_fullsize_anim-12.png"
                      style={{
                        position: "absolute",
                        width: "135%",
                        maxWidth: "135%",
                        bottom: "0",
                        left: "-42px",
                      }}
                    />

                    <img src={scratchCardData?.image} />
                  </div>
                  {scratchCardData.card_type === "multi-scratch" ? (
                    <ScratchCoutDown
                      frequency={frequencySchedule.frequency}
                      targetDay={frequencySchedule.day}
                      targetDate={frequencySchedule.schedule}
                      startTimeDate={scratchCardData.startTime}
                      type="scratchCard"
                    />
                  ) : (
                    <div
                      className="row  time-row mb-lg-5"
                      style={{ marginBottom: "40px" }}
                    />
                  )}

                  <div className="card-footer scratch-card-shadow-play">
                    <h5>
                      Top Prize : Rs.
                      {scratchCardData?.topPrize?.toLocaleString()}
                    </h5>
                  </div>
                </>
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={590}
                  height={350}
                  className="card card-img"
                />
              )}
            </div>
            <div className="col-lg-6 mb-4 ps-lg-5">
              <h4>{scratchCardData?.card_name}</h4>
              <p className="sub-h mb-2">{scratchCardData?.game_slogan}</p>
              <h5 className="actual-p mb-4">
                Price :{" "}
                <span>
                  Rs.{scratchCardData?.ticketPrize?.toLocaleString()}/Play
                </span>
              </h5>
              <div className="card multiple-crd col-lg-12 mb-3">
                {/* <div className="ribbon ribbon-top-left">
                  <span>ribbon</span>
                </div> */}

                {users?.user?.isLoggedIn ? (
                  <>
                    {" "}
                    <div className="card-header">
                      <p className="pb-0 mb-0">
                        {calculateDiscount?.discountPercent !== 0 &&
                        calculateDiscount?.discountPercent !== ""
                          ? ` Buy ${calculateDiscount?.discountTicket} or more plays to get
                    ${calculateDiscount?.discountPercent}% instant discount on
                    total`
                          : `Buy more play and get exiciting prizes`}
                      </p>
                    </div>
                    <div className="card-body pb-4">
                      <p className="text-center">
                        Type How many draws you want to Buy
                      </p>
                      <div className="d-flex justify-content-center align-items-center px-5 pb-2">
                        <div>
                          <div className="d-flex justify-content-center">
                            <div
                              className="d-flex mulitDraw"
                              style={{ width: "160px" }}
                            >
                              <AiOutlineMinusCircle
                                className="multiDraw-icon"
                                style={{
                                  fontSize: "25px",
                                  cursor: "pointer",
                                  marginTop: "1.5px",
                                }}
                                // onClick={handleDecrease}
                                onClick={() => updateMultiDraw(multiDraw - 1)}
                              />

                              <input
                                type="number"
                                className="ms-2 me-2 text-center"
                                style={{
                                  maxWidth: "90px",
                                  border: "none",
                                  outline: "none",
                                }}
                                value={multiDraw}
                                onChange={(e) =>
                                  updateMultiDraw(+e.target.value)
                                }
                              />

                              <AiOutlinePlusCircle
                                className="multiDraw-icon "
                                style={{
                                  fontSize: "25px",
                                  cursor: "pointer",
                                  marginTop: "1.5px",
                                }}
                                // onClick={handleIncrease}
                                onClick={() => updateMultiDraw(multiDraw + 1)}
                              />
                            </div>
                          </div>
                          {errorMessage && (
                            <div
                              className="text-danger text-enter"
                              id="multiDraw-error"
                              style={{ fontSize: "13px" }}
                            >
                              {errorMessage}
                            </div>
                          )}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-center">
                      <p className="pb-0 mb-0">
                        {scratchCardData?.card_type === "multi-scratch" ? (
                          <>
                            {" "}
                            Schedule : Every{" "}
                            {frequencySchedule.schedule === "Daily"
                              ? "Day"
                              : getOrdinal(frequencySchedule.schedule)}{" "}
                            at{" "}
                            {scratchCardData?.startTime &&
                              convertUTCToLocal(
                                scratchCardData?.startTime
                              )}{" "}
                          </>
                        ) : (
                          "One Time Scratcher"
                        )}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="col-lg-12 ">
                    <div
                      className="card"
                      style={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      }}
                    >
                      <div className="card-body ps-0 py-5">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm col-12 py-lg-4 text-center">
                            Login to continue{" "}
                            <Link to={"/login"}>click here</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="row mt-4">
                <div className="col-lg-5">
                  {scratchCardData?.card_type === "single-scratch" ? (
                    <h6>
                      Total Plays :{" "}
                      <span className="fw-bold">{multiDraw ?? 1}</span>
                    </h6>
                  ) : (
                    <h6>
                      Play Schedule :{" "}
                      <span className="fw-bold">
                        {multiDraw ?? 1}/{frequencySchedule.frequency}
                      </span>
                    </h6>
                  )}
                  {/* <h6>
                    Play Schedule :{" "}
                    <span className="fw-bold">
                      {multiDraw ?? 1}/{frequencySchedule.frequency}
                    </span>
                  </h6> */}
                  <h6 className="mt-4 mb-1">
                    Total Price :{" "}
                    <span className="fw-bold price-d">
                      Rs.{grandTotal?.toLocaleString()}
                    </span>
                  </h6>
                  <p
                    className="discount-p"
                    hidden={
                      calculateDiscount?.discountPercent === 0 ||
                      calculateDiscount?.discountPercent === ""
                        ? true
                        : false
                    }
                  >
                    {calculateDiscount?.discountPercent}% discount applied
                  </p>
                </div>
                <div className="col-lg-7">
                  {/* <CoinbasePay /> */}
                  <button
                    onClick={() => {
                      if (users?.user?.isLoggedIn) {
                        if (user.term_condition) {
                          handlePaymentDialog();
                        } else {
                          termsAndConditonRef.current.handleClickOpen();
                        }
                      } else {
                        handleLoginToContinue();
                      }

                      // users?.user?.isLoggedIn
                      //   ? handlePaymentDialog
                      //   : handleLoginToContinue;
                    }}
                    className="btn btn-outline-info px-5 mt-4 w-100"
                    disabled={
                      multiDraw === 0 || multiDraw === "" ? true : false
                    }
                  >
                    Pay Rs.{grandTotal?.toLocaleString()}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card card-feature">
                <div className="card-header">
                  <h3>Game Features</h3>
                </div>
                <div className="card-body">
                  <figure className="media">
                    <oembed url="https://www.youtube.com/watch?v=bGzanfKVFeU"></oembed>
                  </figure>
                  <HtmlToFormattedText
                    htmlString={scratchCardData?.game_Features}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="OTP-modal">
          <Modal.Title>Buy Scratch Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <span className="mb-0">
              Scratch Card Name :{" "}
              <span className="fw-bold text-black">
                {scratchCardData?.card_name}
              </span>
            </span>
          </div>
          <div className="mt-2 px-3 card py-3">
            <span className="float-end fw-bold">
              {multiDraw}x{calculateDiscount?.ticketPrize} ={" "}
              {calculateDiscount?.amountBeforeDiscount?.toLocaleString()}
            </span>
            <span
              className="float-end fw-bold"
              hidden={!calculateDiscount?.discountPercent}
            >
              Discount({calculateDiscount?.discountPercent}%):{" "}
              {calculateDiscount?.discountAmount?.toLocaleString()}
            </span>
            <span className="float-end fw-bold">
              Total Payable: Rs.
              {calculateDiscount?.amountAfterDiscount?.toLocaleString()}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-inline" style={{ lineHeight: "9px" }}>
          <div className="mb-3">
            <span className="">
              Total Draws :{" "}
              <span className="fw-bold text-black">{multiDraw}</span>
            </span>
            <span className="float-end">
              Total Amount :{" "}
              <span className="fw-bold text-black">
                Rs.{grandTotal?.toLocaleString()}
              </span>
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={() => paymentWithWallet()}
              className={
                user?.balance >= grandTotal
                  ? "btn btn-primary px-3 btn-sm w-100"
                  : "btn btn-primary px-3 btn-sm w-100 not-allowed disabled"
              }
              disabled={user?.balance >= grandTotal ? false : true}
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
          <span id="err" className="text-danger"></span>
          {/* {buy?.balance <= ticket?.ticketPrice && (
            <div id="err" className="text-danger pt-2">
              Insufficient balance to buy this ticket
              <Link className="btn btn-sm btn-primary">Deposit Now</Link>
            </div>
          )} */}
        </Modal.Footer>
      </Modal>
      {/* React BootStrap alert */}
      <CustomModalAlert
        show={showModal}
        handleClose={handleCloseModal}
        modalTitle={alertMessage.title}
        modalBody={alertMessage.message}
        primaryButtonText={alertMessage.primaryButtonText}
        link={alertMessage.link}
      />
      <Footer props={""} />
      <TermAndConditionDialog ref={termsAndConditonRef} />
    </>
  );
}
