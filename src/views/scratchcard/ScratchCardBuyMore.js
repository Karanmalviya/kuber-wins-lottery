import React, { useLayoutEffect } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { decrypt } from "../../utils/encryptdecrypt";
import AbbrNumber from "../components/AbbrNumber";
import HtmlToFormattedText from "../../utils/htmltoFormattedText";
import ScratchCoutDown from "./ScratchCoutDown";
import {
  fetchAllPurchasedScratchCard,
  fetchScratchCardNumbers,
  fetchScratchCardsById,
  fetchUser,
} from "../../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { Tooltip } from "@mui/material";

export default function ScratchCardBuyMore() {
  const location = useLocation();
  const dispatch = useDispatch();
  const refLoading = useRef(false);
  const ref = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const scratch_card_id = decrypt(id);
  const [scratchCardData, setScratchCardsData] = useState([]);
  const [user, setUser] = useState([]);
  const [scratchCardTotalWon, setScratchCardTotalWon] = useState([]);
  const [frequencySchedule, setFrequencySchedule] = useState([]);
  const [scratchRefresh, setScratchRefresh] = useState(false);
  const [playAllData, setPlayAllData] = useState({});

  useLayoutEffect(() => {
    dispatch(fetchAllPurchasedScratchCard());
    if (scratch_card_id && userId) {
      dispatch(
        fetchScratchCardNumbers({
          scratchCardId: scratch_card_id,
          id: userId,
        })
      );
    }
  }, [dispatch, scratch_card_id, userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUser(userId));
    dispatch(fetchScratchCardsById(scratch_card_id));
    return () => {
      // dispatch(clearScratchCardData());
      // dispatch(clearScratchCardNumber());
    };
  }, [dispatch, userId, scratch_card_id, scratchRefresh]);

  const AllPurchasedScratchCard = useSelector(
    (state) => state.api.AllPurchasedScratchCard
  );

  const filteredSold = AllPurchasedScratchCard?.filter(
    (item) => item.UserId == +userId && item.scratchCardId == +scratch_card_id
  );

  const scratchCardNumber = useSelector((state) => state.api.scratchCardNumber);
  const scratchCardNumberLoading = useSelector(
    (state) => state.api.scratchCardNumberLoading
  );
  const userDetails = useSelector((state) => state.api.user);
  const scratchCardById = useSelector((state) => state.api.scratchCardById);
  const scratchCardByIdLoading = useSelector(
    (state) => state.api.scratchCardByIdLoading
  );

  useEffect(() => {
    setScratchCardsData(scratchCardById);
    if (Object.keys(scratchCardNumber).length) {
      setScratchCardTotalWon(scratchCardNumber.userPlay);
    }
  }, [scratchCardById]);

  useEffect(() => {
    if (
      Object.keys(scratchCardNumber).length &&
      Object.keys(scratchCardData).length
    ) {
      setScratchCardTotalWon(scratchCardNumber.userPlay);

      if (scratchCardNumber.data.length > 0) {
        return navigate(
          `/scratch-cards-play/${scratchCardData.card_name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "")}/${id}`
        );
      }
      setScratchCardTotalWon(scratchCardNumber.userPlay);
    }
  }, [scratchCardNumber]);

  useEffect(() => {
    if (userDetails) {
      setUser(userDetails);
    }
  }, [userDetails]);

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

  useEffect(() => {
    if (location.state) {
      setPlayAllData(location.state.playAllData);
    }
  }, [location.state]);

  return (
    <>
      <title>{scratchCardData.card_name} - Kuber Wins</title>
      <LoadingBar ref={ref} color="rgb(245, 246, 255)" />
      <Navbar props={{ mainPage: "scratchcard", subPage: "details" }} />
      <section className="sec-scratch-cards-details scratch-cards-scratch bg-white pb-4">
        <div className="container">
          <div className="row d-flex justify-content-center align-item-center pt-5 mb-4">
            <div className="col-lg-6 col-md-12 ">
              {Object.keys(playAllData).length ? (
                <>
                  <div className="card-img card-play">
                    <div
                      className="card card-scratch"
                      draggable={false}
                      style={{
                        backgroundImage: 'url("assets/img/bg-card-img.png")',
                      }}
                    >
                      <div className="card-body px-0 py-4 d-flex justify-content-center align-items-center">
                        <div className="row">
                          <div className="col-12 ">
                            <div
                              className=" ticket-cardd"
                              style={{ backgroundColor: "transparent" }}
                            >
                              <div
                                className=" ticket-cardd card-body text-center"
                                style={{
                                  backgroundImage:
                                    'url("assets/img/scratch-ticket.svg")',
                                }}
                              >
                                <div className="pt-lg-3 pt-2">
                                  <h4 className="text-center text-dark ticket-h4">
                                    You Have Used{" "}
                                  </h4>
                                  <h4 className="text-center  text-dark ticket-h4">
                                    All The Available{" "}
                                    <span className="text-success">
                                      {playAllData?.availableScratchedCard}
                                    </span>
                                  </h4>
                                  <h4 className="text-dark ticket-h4 mb-2">
                                    Scratches And Won In{" "}
                                    <span className="text-success">
                                      {playAllData?.playAllWin}
                                    </span>
                                  </h4>
                                  <p className="text-dark ticket-click">
                                    <a
                                      onClick={() =>
                                        navigate("/total-wins", {
                                          state: {
                                            card_name:
                                              scratchCardData.card_name,
                                            type: "handleScratch",
                                          },
                                        })
                                      }
                                      className="text-dark"
                                      style={{ cursor: "pointer" }}
                                    >
                                      Click Here
                                    </a>{" "}
                                    To See
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="row time-row mb-5" />
                </>
              ) : (
                <div className="card card-img">
                  <p
                    className="p-label-lotto text-capitalize"
                    style={{ overflow: "visible" }}
                  >
                    {scratchCardData?.card_type?.replace("-", " ")}
                  </p>
                  <img
                    className="img-fluid"
                    src="./assets/images/imgpsh_fullsize_anim-12.png"
                    draggable={false}
                    style={{
                      position: "absolute",
                      width: "135%",
                      maxWidth: "135%",
                      bottom: "0",
                      left: "-42px",
                    }}
                  />{" "}
                  <img
                    src={scratchCardData?.image}
                    alt="images"
                    draggable={false}
                  />
                </div>
              )}

              {Object.keys(playAllData).length ? (
                ""
              ) : scratchCardData.card_type === "multi-scratch" ? (
                <ScratchCoutDown
                  frequency={frequencySchedule.frequency}
                  targetDay={frequencySchedule.day}
                  targetDate={frequencySchedule.schedule}
                  startTimeDate={scratchCardData.startTime}
                  type="scratchCard"
                />
              ) : (
                <div className="row time-row mb-5" />
              )}

              <div className="card-footer scratch-card-shadow-play ">
                <h5 className="">
                  Top Prize : Rs.{scratchCardData?.topPrize?.toLocaleString()}
                </h5>
              </div>
            </div>
            <div className="col-lg-6 mb-4 ps-lg-5">
              <h4 className="mb-0">{scratchCardData?.card_name}</h4>
              <p className="sub-h mb-2">{scratchCardData?.game_slogan}</p>

              {scratchCardData?.card_type === "single-scratch" ? (
                <h6 className="mt-3">
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
                style={
                  scratchCardData?.card_type === "single-scratch"
                    ? { visibility: "hidden" }
                    : {}
                }
              >
                Total{" "}
                {frequencySchedule.frequency === "Weekly"
                  ? "Week"
                  : frequencySchedule.frequency === "Monthly"
                  ? "Month"
                  : "Day"}{" "}
                : <b>{scratchCardTotalWon?.rescheduleTime}</b>
              </h6>
              <div className="row row-won">
                <div className="col-lg-6 col-md-6 col-sm-6 text-start">
                  <p className="pb-0 mb-3">
                    <img
                      src="./assets/images/ph_trophy-fill.png"
                      className="img-fluid me-2"
                    />{" "}
                    Won{" "}
                    <Tooltip
                      placement="top"
                      title={`Rs.${scratchCardTotalWon?.won?.toLocaleString()}`}
                    >
                      Rs.
                      <AbbrNumber
                        props={{
                          number: Number(scratchCardTotalWon?.won),
                          decPlaces: 2,
                        }}
                      />
                    </Tooltip>
                  </p>
                </div>
                <div className="col-lg-6 col-md-6  col-sm-6 text-end wallet-colmn">
                  <p className="justify-content-end pb-0 mb-3">
                    <img
                      src="./assets/images/material-symbols_account-balance-wallet.png"
                      className="img-fluid me-2"
                    />{" "}
                    Wallet{" "}
                    <Tooltip
                      placement="top"
                      title={`Rs.${user?.balance?.toLocaleString()}`}
                    >
                      Rs.
                      <AbbrNumber
                        props={{
                          number: Number(user?.balance),
                          decPlaces: 2,
                        }}
                      />
                    </Tooltip>
                  </p>
                </div>
              </div>
              <div className="card multiple-crd-play mb-3">
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-lg-6">
                      <p className="m-0 p-0">
                        Total Plays : {scratchCardTotalWon?.totalPlay}
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <p className="m-0 p-0">
                        Winnings : {scratchCardTotalWon?.winCount}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <p className="m-0 p-0">
                        Scratched : {scratchCardTotalWon?.scratchedCard}
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <p className="m-0 p-0">
                        Available Scratches :{" "}
                        {scratchCardTotalWon?.availableScratchedCard}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-danger mt-4">
                  {scratchCardData?.card_type === "single-scratch"
                    ? "You have scratched all available plays, please buy more plays to play again"
                    : "You have scratched all available plays, please buy more plays to play again or wait for next reschedule!!"}
                </h5>
                <div className="row mt-3">
                  <div className="col-lg-12">
                    <button
                      disabled={
                        !(
                          +scratchCardData?.buyTicketLimit >
                          filteredSold?.[0]?.buyLimit
                        )
                      }
                      className="btn btn-buy px-5 mt-0 py-3 w-100"
                      onClick={() => {
                        if (
                          +scratchCardData?.buyTicketLimit >
                          filteredSold?.[0]?.buyLimit
                        )
                          return navigate(
                            `/scratch-cards/${scratchCardData?.card_name
                              ?.toLowerCase()
                              .trim()
                              .replace(/[^\w\s-]/g, "")
                              .replace(/[\s_-]+/g, "-")
                              .replace(/^-+|-+$/g, "")}/${id}`
                          );
                      }}
                    >
                      Buy Now : Rs.
                      {scratchCardData?.ticketPrize?.toLocaleString()}/Play
                    </button>
                  </div>
                </div>{" "}
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
                  <p>
                    <HtmlToFormattedText
                      htmlString={scratchCardData?.game_Features}
                    />
                  </p>
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
