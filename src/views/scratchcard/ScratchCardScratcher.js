import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { scratchLossUpdateStatus, scratchWinUpdateStatus } from "../../utils";
import { decrypt } from "../../utils/encryptdecrypt";
import { useParams } from "react-router-dom";
import { generateTransactionId } from "../../utils/generateTransactionId";
import confetti from "canvas-confetti";
import { fetchScratchCardsById } from "../../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import ScratchCard from "react-scratchcard-v4";
import { v4 as uuidv4 } from "uuid";
import GameLoading from "../components/gameLoading";

const ScratchCardScratcher = forwardRef(
  (
    {
      refresh,
      play,
      setShowMessage,
      handlePlayAgain,
      setScratchMessage,
      setShowCongrats,
      handleMobileScratchCardClose,
      handleMobileScratchCard,
      startPlay,
    },
    ref
  ) => {
    const refS = useRef(null);
    const refS2 = useRef(null);
    const dispatch = useDispatch();
    const flagRef = useRef(false);
    const { id } = useParams();
    const userId = localStorage.getItem("userId");
    const scratch_card_id = decrypt(id);
    const [playCard, setPlayCard] = useState([]);
    const [highlighted, setHighlighted] = useState(false);
    const [scratchedCard, setScratchedCard] = useState({});
    const [highlightedGreen, setHighlightedGreen] = useState(false);
    const [scratchedCardDetail, setScratchCardDetail] = useState({});
    const [canvasHeight, setCanvasHeight] = useState(0);
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [onReset, setOnReset] = useState(false);
    const [isScratching, setIsScratching] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);
    const [isBlur, setIsBlur] = useState(false);
    const [canvasLoad, setCanvasLoad] = useState(false);

    useEffect(() => {
      if (scratch_card_id) {
        dispatch(fetchScratchCardsById(scratch_card_id));
      }
      return () => {
        (isScratching || startPlay) && handleMobileScratchCardClose();
      };
    }, [dispatch, scratch_card_id]);

    useImperativeHandle(ref, () => ({
      handleScratchStartPlay,
      onClickReset,
      handleAutoPlay,
    }));

    const handleAutoPlay = () => {
      if (!autoPlay) {
        setAutoPlay(true);
        handelScratchCard();
      } else {
        flagRef.current = false;
        setAutoPlay(false);
        setIsVisible(false);
        setShowMessage(false);
        setShowCongrats(false);
      }
    };
    const handleScratchStartPlay = () => {};

    const scratchCardById = useSelector((state) => state.api.scratchCardById);

    useEffect(() => {
      if (scratchCardById) {
        setScratchCardDetail(scratchCardById);
      }
    }, [scratchCardById]);

    useEffect(() => {
      if (play && !flagRef.current) {
        const randomIndex = Math.floor(Math.random() * play.length);
        const plays = play[randomIndex];
        setScratchedCard(plays);
        const shuffledNumbers = plays?.nine_numbers ?? [];
        setPlayCard(shuffledNumbers);
        setHighlighted(plays.win);
        flagRef.current = true;
      }
    }, [play, onReset, autoPlay]);

    const handelScratchCard = async () => {
      setTimeout(() => {
        handleMobileScratchCardClose();
      }, 1000);
      setIsVisible(true);
      setIsScratching(false);
      setIsBlur(true);
      setTimeout(() => {
        setIsBlur(false);
      }, 5000);
      if (scratchedCard.win) {
        setHighlightedGreen(true);
        setShowMessage(true);
        setShowCongrats(true);
        starsEffect();
        const resWin = await scratchWinUpdateStatus(scratchedCard.scratched, {
          UserId: userId,
          tansactionId: generateTransactionId(),
          amount: scratchedCard.prize?.toString(),
          transactionType: "Card_Won",
          scratchCardId: +scratch_card_id,
          description: `Win from ${
            scratchedCardDetail?.card_name
          } of Rs.${scratchedCard?.prize?.toString()}`,
        });
        if (resWin) {
          refresh();
        }
        handlePlayAgain();
      } else {
        const losser = await scratchLossUpdateStatus(scratchedCard.scratched);
        handlePlayAgain();
        if (losser) {
          refresh();
        }
      }
    };

    var starsEffect = function () {
      var defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["star"],
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
      };

      function shoot() {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ["star"],
        });

        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ["circle"],
        });
      }

      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
    };

    const onClickReset = () => {
      if (refS.current) refS.current && refS.current.reset();
      flagRef.current = false;
      setHighlightedGreen(false);
      setTimeout(() => {
        setOnReset((prev) => !prev);
      }, 1000);
      setIsVisible(false);
      setAutoPlay(false);
      setShowMessage(false);
      setIsBlur(false);
      setShowCongrats(false);
    };

    useEffect(() => {
      function updateCanvasDimensions() {
        const canvas = refS.current;
        const canvasP = refS2.current;
        if (canvas && canvasP) {
          const newCanvasWidth = canvasP.clientWidth;
          const newCanvasHeight = canvasP.clientHeight;
          setCanvasWidth(newCanvasWidth);
          setCanvasHeight(newCanvasHeight);
          // onClickReset();
        }
      }
      updateCanvasDimensions();
      window.addEventListener("resize", updateCanvasDimensions);
      return () => {
        window.removeEventListener("resize", updateCanvasDimensions);
        setOnReset((prev) => !prev);
        // flagRef.current = false;
      };
    }, []);

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (isScratching) {
          const canvas = refS.current;
          if (canvas) {
            setScratchMessage(!canvas.isDrawing);
          }
        } else {
          clearInterval(intervalId);
        }
      }, 500);

      return () => {
        clearInterval(intervalId);
      };
    }, [isScratching]);

    const handleStartSScratching = () => {
      setIsScratching(true);
    };

    useEffect(() => {
      if (!canvasLoad) {
        const intervalId = setInterval(() => {
          const canvas = refS.current;
          if (canvas) {
            setCanvasLoad(canvas.state.loaded);
          }
        }, 100);
        if (canvasLoad) {
          clearInterval(intervalId);
        }
        return () => {
          clearInterval(intervalId);
        };
      }
    }, [isScratching, canvasLoad]);

    return (
      <div>
        {autoPlay ? (
          <div className="card card-img card-play ">
            <div
              className="card card-scratch p-0 position-relative d-flex align-items-center text-center"
              style={{
                backgroundImage: `url(${
                  scratchedCardDetail.image2 !== "null" &&
                  scratchedCardDetail.image2 !== null
                    ? scratchedCardDetail.image2
                    : "./assets/img/bg-card-img.png"
                })`,
              }}
            >
              <div
                className={`card-body px-0 pt-2 ${
                  isBlur && !highlighted && `backGround-blur`
                }`}
              >
                <div className="row">
                  {playCard.length > 0 &&
                    playCard?.map((item) => {
                      const itemOccurrences = playCard.filter(
                        (x) => x === item
                      ).length;
                      const isHighlighted =
                        scratchedCard.win && itemOccurrences >= 3;

                      return (
                        <div
                          key={uuidv4() + generateTransactionId()}
                          className={`col-4 d-flex justify-content-center align-items-center ${
                            isHighlighted
                              ? highlightedGreen
                                ? "beats"
                                : ""
                              : ""
                          }`}
                        >
                          <div
                            className="dv-bg"
                            style={{
                              border: "4px solid",
                              borderColor:
                                isHighlighted &&
                                highlightedGreen &&
                                scratchedCardDetail.fontColor
                                  ? "transparent"
                                  : scratchedCardDetail.fontColor,
                              background:
                                isHighlighted && highlightedGreen
                                  ? 'url("./assets/img/nn-2.png")'
                                  : scratchedCardDetail.circle_bg,
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <span
                              className={`scratch-btn ${
                                isHighlighted
                                  ? highlightedGreen && "active"
                                  : ""
                              }`}
                            >
                              <div
                                style={
                                  itemOccurrences >= 3 && highlightedGreen
                                    ? { zIndex: "0" }
                                    : {
                                        zIndex: "0",
                                        color: scratchedCardDetail.fontColor,
                                      }
                                }
                              >
                                Rs.&nbsp;
                                {Number.isInteger(item)
                                  ? item.toLocaleString()
                                  : item.toFixed(2)}
                              </div>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>{" "}
              {isBlur && !highlighted && (
                <div className="overlay-after">
                  <p className="p-0 m-0 better-luck-text">
                    {scratchedCardDetail?.unmatchedMessage === null ||
                    scratchedCardDetail?.unmatchedMessage === "null"
                      ? null
                      : `${scratchedCardDetail?.unmatchedMessage}`}
                  </p>
                  <img
                    src="./assets/img/lose.svg"
                    style={{ height: "70px", width: "70px" }}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="card card-img card-play"
            ref={refS2}
            onClick={!isVisible && !autoPlay ? handleStartSScratching : null}
            onTouchMove={() => {
              if (!isVisible && !autoPlay) {
                window.scrollTo(0, 0);
                handleStartSScratching();
                handleMobileScratchCard();
              }
            }}
          >
            <ScratchCard
              key={canvasWidth || canvasHeight}
              ref={refS}
              width={canvasWidth}
              height={canvasHeight}
              image={
                scratchedCardDetail.image1 !== "null" &&
                scratchedCardDetail.image1 !== null
                  ? scratchedCardDetail.image1
                  : "./assets/img/scratch-cards-scratch.png"
              }
              finishPercent={70}
              fadeOutOnComplete
              onComplete={() => handelScratchCard()}
            >
              <div
                hidden={!canvasLoad}
                className={`card card-scratch p-0 position-relative d-flex align-items-center text-center`}
                style={{
                  backgroundImage: `url(${
                    scratchedCardDetail.image2 !== "null" &&
                    scratchedCardDetail.image2 !== null
                      ? scratchedCardDetail.image2
                      : "./assets/img/bg-card-img.png"
                  })`,
                }}
              >
                <div
                  className={`card-body px-0 pt-2 ${
                    isBlur && !highlighted && `backGround-blur`
                  }`}
                >
                  <div className="row">
                    {playCard.length > 0 &&
                      playCard?.map((item) => {
                        const itemOccurrences = playCard.filter(
                          (x) => x === item
                        ).length;
                        const isHighlighted =
                          scratchedCard.win && itemOccurrences >= 3;

                        return (
                          <div
                            key={uuidv4() + generateTransactionId()}
                            className={`col-4 d-flex justify-content-center align-items-center ${
                              isHighlighted
                                ? highlightedGreen
                                  ? "beats"
                                  : ""
                                : ""
                            }`}
                          >
                            <div
                              className="dv-bg"
                              style={{
                                border: "4px solid",
                                borderColor:
                                  isHighlighted &&
                                  highlightedGreen &&
                                  scratchedCardDetail.fontColor
                                    ? "transparent"
                                    : scratchedCardDetail.fontColor,
                                background:
                                  isHighlighted && highlightedGreen
                                    ? 'url("./assets/img/nn-2.png")'
                                    : scratchedCardDetail.circle_bg,
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                              <span
                                className={`scratch-btn ${
                                  isHighlighted
                                    ? highlightedGreen && "active"
                                    : ""
                                }`}
                              >
                                <div
                                  style={
                                    itemOccurrences >= 3 && highlightedGreen
                                      ? { zIndex: "0" }
                                      : {
                                          zIndex: "0",
                                          color: scratchedCardDetail.fontColor,
                                        }
                                  }
                                >
                                  Rs.&nbsp;
                                  {Number.isInteger(item)
                                    ? item.toLocaleString()
                                    : item.toFixed(2)}
                                </div>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>{" "}
                {isBlur && !highlighted && (
                  <div className="overlay-after">
                    <p className="p-0 m-0 better-luck-text">
                      {scratchedCardDetail?.unmatchedMessage === null ||
                      scratchedCardDetail?.unmatchedMessage === "null"
                        ? null
                        : `${scratchedCardDetail?.unmatchedMessage}`}
                    </p>
                    <img
                      src="./assets/img/lose.svg"
                      style={{ height: "70px", width: "70px" }}
                    />
                  </div>
                )}
              </div>
            </ScratchCard>
            <div className="overlay-after-canvas-loaded" hidden={canvasLoad}>
              {/* <GameLoading /> */}

              <p
                className="p-0 m-0 better-luck-text"
                style={{ width: "max-content" }}
              >
                Please wait...
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ScratchCardScratcher;
