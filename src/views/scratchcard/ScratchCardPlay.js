import React, { useRef, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { decrypt } from "../../utils/encryptdecrypt";
import AbbrNumber from "../components/AbbrNumber";
import HtmlToFormattedText from "../../utils/htmltoFormattedText";
import ScratchCardScratcher from "./ScratchCardScratcher";
import Tooltip from "@mui/material/Tooltip";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import {
  clearScratchCardData,
  fetchScratchCardNumberData,
  fetchScratchCardNumbers,
  fetchScratchCardsById,
  fetchUser,
} from "../../features/apiSlice";
import LoadingBar from "react-top-loading-bar";
import { playAllScratchCard } from "../../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { Backdrop } from "@mui/material";

export default function ScratchCardPlay() {
  const childRef = useRef(null);
  const mobileChildRef = useRef(null);
  const refLoading = useRef(false);
  const ref = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const scratch_card_id = decrypt(id);
  const [scratchCardData, setScratchCardsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [scratchCardTotalWon, setScratchCardTotalWon] = useState([]);
  const [play, setPlay] = useState([]);
  const [startPlay, setStartPlay] = useState(false);
  const [frequencySchedule, setFrequencySchedule] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [scratchMessage, setScratchMessage] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [playAllLoading, setPlayAllLoading] = useState(false);
  const scratchCardAll = useSelector((state) => state.api.scratchCardAll);
  const scratchCardAllLoading = useSelector(
    (state) => state.api.scratchCardAllLoading
  );

  const refresh = () => {
    setShowMessage("null");
    if (play.length === 0) {
      setTimeout(() => {
        dispatch(
          fetchScratchCardNumbers({
            scratchCardId: scratch_card_id,
            id: userId,
          })
        );
      }, 5000);
    } else {
      dispatch(
        fetchScratchCardNumbers({
          scratchCardId: scratch_card_id,
          id: userId,
        })
      );
    }
    const playAllWin = scratchCardNumber.data.filter((item) => item.win);
    dispatch(
      fetchScratchCardNumberData({
        ...scratchCardNumber.userPlay,
        playAllWin: playAllWin.length,
      })
    );
  };

  useEffect(() => {
    if (scratch_card_id && userId) {
      dispatch(
        fetchScratchCardNumbers({
          scratchCardId: scratch_card_id,
          id: userId,
        })
      );
    }
  }, [dispatch, scratch_card_id, userId, scratchCardAll]);

  const scratchCardNumber = useSelector((state) => state.api.scratchCardNumber);
  const scratchCardNumberLoading = useSelector(
    (state) => state.api.scratchCardNumberLoading
  );
  const user = useSelector((state) => state.api.user);
  const scratchCardById = useSelector((state) => state.api.scratchCardById);
  const scratchCardByIdLoading = useSelector(
    (state) => state.api.scratchCardByIdLoading
  );
  const playAllData = useSelector((state) => state.api.scratchCardNumberData);

  const handleButtonClickInParent = () => {
    setIsFlipped(false);
    setStartPlay(true);
    if (startPlay) {
      if (childRef.current) {
        childRef.current.handleScratchStartPlay();
      }
    }
  };

  const handleAutoPlay = () => {
    setIsFlipped(false);
    setStartPlay(true);
    if (childRef.current) {
      if (startPlay) {
        childRef.current.handleAutoPlay();
      }
    }
  };

  const handleResetScratchCard = () => {
    if (childRef.current) {
      childRef.current.onClickReset();
      setPlayAgain(false);
    }
  };

  const handlePlayAgain = () => {
    setPlayAgain(true);
  };

  useEffect(() => {
    if (Object.keys(scratchCardNumber).length) {
      setPlay(scratchCardNumber.data);
      setScratchCardTotalWon(scratchCardNumber.userPlay);
    }
  }, [scratchCardNumber]);

  useEffect(() => {
    if (
      Object.keys(scratchCardNumber).length &&
      Object.keys(scratchCardData).length
    ) {
      const playAllWin = scratchCardNumber.data.filter((item) => item.win);
      dispatch(
        fetchScratchCardNumberData({
          ...scratchCardNumber.userPlay,
          playAllWin: playAllWin.length,
        })
      );
    }
  }, [scratchCardNumber, scratchCardData]);

  const handleNavigate = () => {
    return navigate(
      `/scratch-cards-buy/${scratchCardData.card_name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")}/${id}`,
      { state: { playAllData: {}, type: scratchCardData.card_type } }
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUser(userId));
    dispatch(fetchScratchCardsById(scratch_card_id));
  }, [dispatch, userId, scratch_card_id]);

  useEffect(() => {
    setScratchCardsData(scratchCardById);
  }, [scratchCardById]);

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

        return parsedData?.[0].schedule;
      } catch (error) {}
    };
    setFrequencySchedule({ frequency: frequency(), schedule: schedule() });
  }, [scratchCardData]);

  const allDataLoaded = scratchCardByIdLoading && scratchCardNumberLoading;

  useEffect(() => {
    if (!refLoading.current && allDataLoaded) {
      ref.current.continuousStart();
    } else {
      ref.current.complete();
      refLoading.current = true;
    }
  }, []);

  const handleScratchAll = async () => {
    setPlayAllLoading(true);
    setLoading(true);
    if (playAllData) {
      const res = await playAllScratchCard({
        scratchCardId: scratch_card_id,
        id: userId,
      });
      if (res?.message === "Success") {
        const cardName = scratchCardData.card_name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");
        const path = `/scratch-cards-buy/${cardName}/${id}`;
        const state = { playAllData, type: scratchCardData.card_type };
        setPlayAllLoading(true);
        setLoading(false);
        return navigate(path, { state });
      }
    }

    dispatch(clearScratchCardData);
  };

  const [show, setShow] = useState(false);

  const openModal = () => {
    $("body").addClass("modal-open");
    $("body").css({
      overflow: "hidden",
      "overflow-behavior": "none",
    });
    $("html").css({
      overflow: "hidden",
      "overflow-behavior": "none",
    });
  };

  const closeModal = () => {
    $("body").removeClass("modal-open");
    $("body").removeAttr("style");
    $("html").removeAttr("style");
  };

  const handleMobileScratchCard = () => {
    window.scrollTo(0, 0);
    setIsMobileDevice(true);
    // if (isMobileDevice && mobileChildRef.current) {
    //   mobileChildRef.current.handleOpen();
    openModal();
    // }
  };

  const handleMobileScratchCardClose = () => {
    setIsMobileDevice(false);
    closeModal();
  };

  // useEffect(() => {
  //   // Prompt confirmation when reload page is triggered
  //   window.onmouseleave = () => {
  //     alert("Please wait...");
  //   };

  //   // Unmount the window.onbeforeunload event
  //   return () => {
  //     window.onmouseleave = null;
  //   };
  // }, []);

  return (
    <div>
      {loading && <LoadingSpinner />}
      <title>{scratchCardData.card_name} - Kuber Wins</title>
      <Navbar props={{ mainPage: "scratchcard", subPage: "details" }} />
      <LoadingBar ref={ref} color="rgb(245, 246, 255)" />

      {isMobileDevice && <Backdrop open={true} sx={{ zIndex: 99 }} />}
      <section
        className={`sec-scratch-cards-details scratch-cards-scratch bg-white pb-4 ${
          isMobileDevice && `bg-backdrop bg-disable`
        }`}
      >
        <div className="container px-md-0">
          <div className="row pt-5 mb-5 ">
            <div
              className={`col-lg-6 col-md-12 pb-3 `}
              style={{ userSelect: "none", zIndex: 99, position: "relative" }}
            >
              {isMobileDevice && (
                <span
                  className="fa-times-wrapper"
                  onClick={handleMobileScratchCardClose}
                >
                  <i className="fa fa-times " />
                </span>
              )}
              <div style={{ height: "400px" }}>
                <div>
                  {startPlay ? (
                    <ScratchCardScratcher
                      startPlay={startPlay}
                      handleMobileScratchCard={handleMobileScratchCard}
                      handleMobileScratchCardClose={
                        handleMobileScratchCardClose
                      }
                      handlePlayAgain={handlePlayAgain}
                      setScratchMessage={setScratchMessage}
                      ref={childRef}
                      refresh={refresh}
                      play={play}
                      setShowMessage={setShowMessage}
                      setShowCongrats={setShowCongrats}
                    />
                  ) : (
                    <div className="card card-img">
                      <p
                        className="p-label-lotto text-capitalize"
                        style={{ overflow: "visible" }}
                      >
                        {scratchCardData?.card_type?.replace("-", " ")}
                      </p>
                      <img
                        draggable={false}
                        loading="lazy"
                        alt="images"
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
                      <img
                        draggable={false}
                        src={scratchCardData?.image}
                        alt="images"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="row time-row-two"></div>
                  <div
                    className={`card-footer`}
                    style={{
                      backgroundImage: 'url("./assets/img/footer.png")',
                      position: "relative",
                      top: "34px",
                    }}
                  >
                    <h5>
                      {showMessage === "null"
                        ? "Top Prize: " +
                          "Rs." +
                          (scratchCardData?.topPrize?.toLocaleString() || "N/A")
                        : scratchMessage
                        ? "Keep on Scratching"
                        : startPlay && scratchMessage !== "null"
                        ? "Good Luck 👍🏼"
                        : "Top Prize: " +
                          "Rs." +
                          (scratchCardData?.topPrize?.toLocaleString() ||
                            "N/A")}
                      {scratchMessage && (
                        <img
                          src="./assets/img/scratch-line.svg"
                          style={{ height: "23px", width: "60px" }}
                        />
                      )}
                    </h5>
                  </div>
                </div>
              </div>

              {showCongrats && scratchCardData?.matchMessage !== "null" && (
                <div className="message mt-5">
                  🎉{scratchCardData?.matchMessage}
                </div>
              )}
            </div>
            <div
              className="col-lg-6 col-md-12 mb-4 ps-lg-5 mt-lg-0 mt-4"
              // onTouchMove={handleClickClass}
              // onScrollCapture={handleClickClass}
            >
              <h4 className="mb-0">{scratchCardData?.card_name}</h4>
              <p className="sub-h">{scratchCardData?.game_slogan}</p>

              {scratchCardData?.card_type === "single-scratch" ? (
                <h6 className="mt-4">
                  Total Plays : <b>{scratchCardTotalWon?.multiDrawLen}</b>
                </h6>
              ) : (
                <h6 className="mt-4">
                  Play Schedule :{" "}
                  <b>
                    {scratchCardTotalWon?.multiDrawLen}/
                    {(() => {
                      try {
                        const parsedData =
                          scratchCardData.frequency &&
                          JSON.parse(scratchCardData.frequency);
                        return parsedData?.[0].frequency;
                      } catch (error) {}
                    })()}
                  </b>
                </h6>
              )}

              <h6
                className="mt-3"
                style={
                  scratchCardData?.card_type === "single-scratch"
                    ? { visibility: "hidden" }
                    : {}
                }
              >
                Total{" "}
                {frequencySchedule?.frequency === "Weekly"
                  ? "Week"
                  : frequencySchedule?.frequency === "Monthly"
                  ? "Month"
                  : "Day"}{" "}
                : <b>{scratchCardTotalWon?.rescheduleTime}</b>
              </h6>
              <div className="row d-flex align-items-center row-won mt-lg-4">
                <div className="col-6 text-start">
                  <div className="pb-0 mb-1">
                    <img
                      src="./assets/images/ph_trophy-fill.png"
                      className="img-fluid me-2"
                    />{" "}
                    Won{" "}
                    <Tooltip
                      placement="top"
                      title={`Rs.${scratchCardTotalWon?.won?.toLocaleString()}`}
                    >
                      Rs.{scratchCardTotalWon?.won?.toLocaleString()}
                    </Tooltip>
                  </div>
                </div>
                <div className="col-6 text-end wallet-colmn">
                  <div className="justify-content-end pb-0 mb-1">
                    <img
                      src="assets/images/material-symbols_account-balance-wallet.png"
                      className="img-fluid me-2"
                    />
                    Wallet{" "}
                    <Tooltip
                      placement="top"
                      title={`Rs.${user?.balance?.toLocaleString()}`}
                    >
                      Rs.
                      <AbbrNumber
                        props={{
                          number: user?.balance,
                          decPlaces: 2,
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="card multiple-crd-play mb-3">
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-5">
                      <p className="m-0 p-0">
                        {" "}
                        Total Plays : {scratchCardTotalWon?.totalPlay}
                      </p>
                    </div>
                    <div className="col-7">
                      <p className="m-0 p-0">
                        {" "}
                        Winnings : {scratchCardTotalWon?.winCount}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <p className="m-0 p-0">
                        Scratched : {scratchCardTotalWon?.scratchedCard}
                      </p>
                    </div>
                    <div className="col-7">
                      <p className="m-0 p-0">
                        {" "}
                        Available Scratches :{" "}
                        {scratchCardTotalWon?.availableScratchedCard}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-12">
                  <button
                    onTouchStart={() => {
                      // handleClickClass1();
                      handleMobileScratchCard();
                      if (scratchCardNumber.data.length === 0) {
                        handleNavigate();
                      } else {
                        window.scrollTo(0, 0);
                        if (playAgain) {
                          handleResetScratchCard();
                        } else {
                          handleButtonClickInParent();
                        }
                      }
                    }}
                    disabled={allDataLoaded || playAllLoading ? true : false}
                    className="btn btn-outline-info px-5 mt-2 w-100"
                    onClick={() => {
                      // handleClickClass1();
                      if (scratchCardNumber.data.length === 0) {
                        handleNavigate();
                      } else {
                        window.scrollTo(0, 0);
                        if (playAgain) {
                          handleResetScratchCard();
                        } else {
                          handleButtonClickInParent();
                        }
                      }
                    }}
                  >
                    {playAgain ? "Play Again" : "Play"}
                  </button>
                  <div className="row">
                    <div className="col-6 pe-1">
                      <button
                        disabled={
                          allDataLoaded || playAllLoading ? true : false
                        }
                        className="btn btn-outline-info px-5 mt-2 w-100"
                        onClick={() => {
                          if (scratchCardNumber.data.length === 0) {
                            handleNavigate();
                          } else {
                            handleAutoPlay();
                          }
                        }}
                      >
                        Auto
                      </button>
                    </div>
                    <div
                      className={`col-6 ps-1 flip-container ${
                        isFlipped ? "flipped" : ""
                      }`}
                    >
                      <div className="flipper">
                        <div className="front">
                          <button
                            disabled={
                              allDataLoaded || playAllLoading ? true : false
                            }
                            className="btn btn-outline-info px-5 mt-2 w-100"
                            onClick={() => {
                              if (scratchCardNumber.data.length === 0) {
                                handleNavigate();
                              } else {
                                setIsFlipped(true);
                              }
                            }}
                          >
                            Play All
                          </button>
                        </div>

                        <div className="back row w-100">
                          {scratchCardAllLoading ? (
                            <div
                              className="spinner-border text-info spinner-border-sm text-light"
                              role="status"
                            ></div>
                          ) : (
                            <>
                              <div className="col-12 text-center">
                                <p className="p-0 m-0">Want to play all ?</p>
                              </div>
                              <div className="col-6 mb-1 text-end ps-lg-0 pe-lg-1">
                                <button
                                  id="okButton"
                                  className="btn btn-success"
                                  onClick={handleScratchAll}
                                >
                                  Yes
                                </button>
                              </div>
                              <div className="col-6 mb-1 ps-lg-1">
                                <button
                                  id="cancelButton"
                                  className="btn btn-danger"
                                  onClick={() => setIsFlipped(false)}
                                >
                                  No
                                </button>
                              </div>
                            </>
                          )}
                        </div>

                        {/* <div className="back row w-100">
                          <div className="col-6 ps-lg-0 pe-lg-1">
                            <button
                              className="btn btn-outline-info w-100 mt-2"
                              onClick={handleScratchAll}
                            >
                              {scratchCardAllLoading ? (
                                <div
                                  style={{ color: "#F73BB1" }}
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                ></div>
                              ) : (
                                "Ok"
                              )}
                            </button>
                          </div>
                          <div className="col-6 ps-lg-1">
                            <button
                              className="btn btn-outline-info w-100 mt-2"
                              onClick={handleCancelButtonClick}
                            >
                              Cancel
                            </button>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="card card-feature">
                <div className="card-header">
                  <h3>Game Features</h3>
                </div>
                <div className="card-body">
                  <HtmlToFormattedText
                    htmlString={scratchCardData?.game_Features}
                  />
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
