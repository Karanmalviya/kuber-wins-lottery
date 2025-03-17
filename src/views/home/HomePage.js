import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Slider from "../components/Slider";
import LotteryCard from "../components/LotteryCard";
import ScratchCard from "../components/ScratchCard";
import AbbrNumber from "../components/AbbrNumber";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination, A11y, Parallax } from "swiper";
import SwiperCore, { Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/less";
import "swiper/less/navigation";
import "swiper/less/pagination";
import "swiper/less/parallax";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import usePagination from "../../hooks/usePaginate";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLottery,
  fetchRecentWinner,
  fetchScratchCard,
  fetchUsers,
  fetchWinnerTickets,
} from "../../features/apiSlice";
import Timer from "../components/Timer";
import { Link } from "react-router-dom";
import RecentWinners from "../components/RecentWinners";
import { BsPerson } from "react-icons/bs";

export default function HomePage() {
  const dispatch = useDispatch();
  SwiperCore.use([Autoplay, Pagination, Navigation, Parallax]);
  const userId = localStorage.getItem("userId");

  const [lotteryTickets, setLotteryTickets] = useState([]);
  const [scratchCards, setScratchCards] = useState([]);
  const [winnerTicketsCount, setWinnerTicketsCount] = useState(0);
  const [winnerTicketsPayout, setWinnerTicketsPayout] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [pageSize, setPageSize] = useState("1");

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchLottery());
    dispatch(fetchScratchCard());
    dispatch(fetchWinnerTickets());
    dispatch(fetchRecentWinner());
  }, [dispatch]);

  const lotteryData = useSelector((state) => state.api.lotteryData);
  const lotteryDataLoading = useSelector(
    (state) => state.api.lotteryDataLoading
  );
  const scratchCardData = useSelector((state) => state.api.scratchCardData);
  const scratchCardloading = useSelector(
    (state) => state.api.scratchCardLoading
  );
  const winnerTicketData = useSelector((state) => state.api.winnerTicketData);

  const users = useSelector((state) => state.api.users);
  const { recentWinnersData } = useSelector((state) => state.api);

  useEffect(() => {
    window.addEventListener("resize", () => setCurrentWidth(window.innerWidth));
  });

  useEffect(() => {
    if (lotteryData.length) {
      const filteredTickets = lotteryData.filter((res) => {
        const activePhases = res.gamePhases.filter(
          (phase) => phase.status === 1
        );
        return (
          res.gameDuration !== "null" &&
          activePhases.length > 0 &&
          res.status === 1
        );
      });
      setLotteryTickets(filteredTickets);
    }
  }, [lotteryData]);

  useEffect(() => {
    if (scratchCardData?.length) {
      const filterStatus = scratchCardData.filter((item) => item.status);
      setScratchCards(filterStatus);
    }
  }, [scratchCardData]);

  useEffect(() => {
    if (Object.keys(winnerTicketData).length > 0) {
      setWinnerTicketsCount(winnerTicketData.count);
      const totalWinnerPrize = winnerTicketData.data.reduce(
        (sum, obj) => sum + obj.price,
        0
      );
      setWinnerTicketsPayout(totalWinnerPrize);
    }
  }, [winnerTicketData]);

  useEffect(() => {
    if (currentWidth > 576) {
      setPageSize(4);
    } else setPageSize(2);
  }, [currentWidth]);

  const { currentPage, handlePageChange, getCurrentPageData, pageCount } =
    usePagination(lotteryTickets, pageSize);
  const { currentPageData } = getCurrentPageData();

  return (
    <div>
      <title>Home - Kuber Wins</title>
      <Navbar props={{ mainPage: "home", subPage: "" }} />
      <section className="sec-slider pb-lg-4">
        <div className="container">
          <div className="col-lg-12">
            <Slider />
            <div className="container sec-banner-text mt-4">
              <div className="text-center">
                <h4 className="mb-4">
                  <i className="gradient-text">
                    <span
                    // style={{
                    //   color: "#EE015F",
                    // }}
                    >
                      Play Kuber Wins,
                    </span>{" "}
                    <span
                    // style={{
                    //   color: "#4E5FED",
                    // }}
                    >
                      {" "}
                      Where your Ticket Never Expire
                    </span>
                  </i>
                </h4>
              </div>
              <div className="row px-lg-5 mx-lg-2 mt-3">
                <div className="col-lg-9 col-md-10">
                  <p className="text-start">
                    Join Kuber Wins and enjoy endless chances to win-your ticket
                    never expires! Play now and experience nonstop excitement
                    with every game!{" "}
                  </p>
                </div>
                <div className="col-lg-3 col-md-2 text-lg-end text-md-end text-center">
                  <Link
                    to={userId ? "/lotteries" : "/registration"}
                    className="btn btn-default bg-dark text-light w-100"
                  >
                    {userId ? "Buy Now" : "Join Now"}
                  </Link>
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-3">
            <div className="col-lg-3 col-md-4 col-10 col-sm px-lg-0 card curr-timer">
              <div className="card-body p-1">
                <Timer />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-first">
        <div className="container pt-3 pb-0">
          <div className="row px-lg-5 px-4 mb-5">
            <div
              className="col-lg-4 col-md-6 px-4 mb-3"
              data-aos-delay="100"
              data-aos="fade-up"
              data-aos-easing="ease"
              transition-delay="1.5s"
              opacity="1"
              transform="translateZ(0)"
            >
              <div
                className="card border-0"
                style={{
                  backgroundImage:
                    "url('assets/images/imgpsh_fullsize_anim.png')",
                }}
              >
                <div className="card-body py-0">
                  <div className="row s-r-f">
                    <div className="col-lg-2 col-md-2 col-sm col-2">
                      <div className="crd-lft">
                        <div className="crd-icon">
                          <img
                            className="icon-img img-fluid"
                            src={"assets/images/users.png"}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm col-2 ps-4">
                      <img
                        className="img-fluid line"
                        src={"assets/images/Line-1.png"}
                        alt=""
                      />
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm col-7">
                      <div className="cntr-row text-center">
                        <div className="row">
                          <div className="col-lg-12 col-sm col-12">
                            {/* {users?.count ? users?.count : 0}  */}
                            10000 +
                          </div>
                        </div>
                        <p className="py-0 my-0">Total Users</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 px-4 mb-3"
              data-aos-delay="200"
              data-aos="fade-up"
              data-aos-easing="ease"
              transition-delay="2s"
              opacity="1"
              transform="translateZ(0)"
            >
              <div
                className="card border-0"
                style={{
                  backgroundImage:
                    "url('assets/images/imgpsh_fullsize_anim.png')",
                }}
              >
                <div className="card-body py-0">
                  <div className="row s-r-f">
                    <div className="col-lg-2 col-sm col-2">
                      <div className="crd-lft">
                        <div className="crd-icon">
                          <img
                            className="icon-img img-fluid"
                            src={"assets/images/winners.png"}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm col-2 ps-4">
                      <img
                        className="img-fluid line"
                        src={"assets/images/Line-1.png"}
                        alt=""
                      />
                    </div>
                    <div className="col-lg-7 col-sm col-7">
                      <div className="cntr-row text-center">
                        <div className="row">
                          <div className="col-lg-12 col-sm col-12">
                            {/* {winnerTicketsCount ? winnerTicketsCount : 0} */}
                            100 +
                          </div>
                        </div>
                        <p className="py-0 my-0">Total Winners </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 px-4 mb-3"
              data-aos-delay="300"
              data-aos="fade-up"
              data-aos-easing="ease"
              transition-delay="2.5s"
              opacity="1"
              transform="translateZ(0)"
            >
              <div
                className="card border-0"
                style={{
                  backgroundImage:
                    "url('assets/images/imgpsh_fullsize_anim.png')",
                }}
              >
                <div className="card-body py-0">
                  <div className="row s-r-f">
                    <div className="col-lg-2 col-sm col-2">
                      <div className="crd-lft">
                        <div className="crd-icon">
                          <img
                            className="icon-img img-fluid"
                            src={"assets/images/eye.png"}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm col-2 ps-4">
                      <img
                        className="img-fluid line"
                        src={"assets/images/Line-1.png"}
                        alt=""
                      />
                    </div>
                    <div className="col-lg-7 col-sm col-7">
                      <div className="cntr-row text-center">
                        <div className="row">
                          <div className="col-lg-12 col-sm col-12">
                            {/* <AbbrNumber
                              props={{
                                number: winnerTicketsPayout,
                                decPlaces: 2,
                              }}
                            /> */}
                            2 Cr +
                          </div>
                        </div>
                        <p className="py-0 my-0">Total Rs. Payout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="sec-second pb-4"
        style={{ backgroundColor: "#f5f6ff" }}
      >
        <div className="container">
          <h2 className="mt-4 mb-4 sec-heading">Lotteries</h2>
          {lotteryDataLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <div className="row">
              {lotteryTickets.length ? (
                currentPageData.map((ticket, index) => {
                  const fadeDirection = index % 2 === 1 ? "left" : "right";
                  const delay = index % 2 === 1 ? 100 : 200;

                  return (
                    <div
                      key={index}
                      className="col-lg-6 col-md-10 mb-4"
                      data-aos={`fade-${fadeDirection}`}
                      data-aos-easing="ease"
                      data-aos-delay={delay}
                      transition-delay="1s"
                      opacity="1"
                      transform="translateZ(0)"
                    >
                      <LotteryCard props={ticket} />
                    </div>
                  );
                })
              ) : (
                <p>No Lotteries Available...</p>
              )}
            </div>
          )}

          <div
            className="container"
            hidden={lotteryTickets.length > pageSize ? false : true}
          >
            <ReactPaginate
              previousLabel={
                <IoIosArrowBack
                  className={currentPage === 0 && "text-muted disabled"}
                />
              }
              nextLabel={
                <IoIosArrowForward
                  className={
                    currentPage === pageCount - 1 && "text-muted disabled"
                  }
                />
              }
              breakLabel="..."
              breakClassName="break-me"
              pageCount={Math.ceil(lotteryData?.length / pageSize)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      </section>

      <section
        className="sec-scratch-cards pt-1 pb-4"
        style={{ backgroundColor: "#f5f6ff" }}
      >
        <div className="container">
          <h2 className="mt-3 mb-4 sec-heading">Scratch Cards</h2>
          {scratchCardloading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : scratchCards.length ? (
            <div className="d-flex">
              {scratchCards.length > 3 && (
                <div
                  className="d-none d-lg-block d-md-block ms-1 me-1 customPrevBtnn swiper-button-prev"
                  style={{ marginTop: "234px" }}
                >
                  <i className="fa fa-arrow-left" />
                </div>
              )}

              <Swiper
                className="w-100 swiper"
                modules={[Navigation, Pagination, Scrollbar, A11y, Parallax]}
                loop={Boolean(scratchCards.length > 3)}
                watchOverflow={true}
                observer={true}
                observeParents={true}
                parallax={true}
                spaceBetween={20}
                breakpoints={{
                  1400: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  512: {
                    slidesPerView: 2,
                  },
                  425: {
                    slidesPerView: 1,
                  },
                  320: {
                    slidesPerView: 1,
                  },
                  240: {
                    slidesPerView: 1,
                  },
                }}
                slidesPerView={3}
                pagination={{ clickable: true, el: ".swiper-pagination" }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                scrollbar={{ draggable: true }}
                grabCursor={true}
                effect={false}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
              >
                {scratchCards.length &&
                  scratchCards.map((scratchCard, index) => (
                    <SwiperSlide key={index} className="mb-4">
                      <div
                        key={index}
                        // style={{ width: "400px" }}
                        data-aos-delay="100"
                        data-aos="fade-up"
                        data-aos-easing="ease"
                        transition-delay="1s"
                        opacity="1"
                        transform="translateZ(0)"
                      >
                        <ScratchCard props={scratchCard} />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              {scratchCards.length > 3 && (
                <div
                  className="d-none d-lg-block d-md-block ms-1 me-1 customNextBtnn swiper-button-next"
                  style={{ marginTop: "234px" }}
                >
                  <i className="fa fa-arrow-right" />
                </div>
              )}
            </div>
          ) : (
            <p>No Scratch Card Available...</p>
          )}
        </div>
      </section>

      <section className="sec-four">
        <div className="container pb-5">
          <h2 className="mt-5 mb-0 sec-heading">Recent Winners</h2>
          <OwlCarousel
            className="owl-theme"
            // loop
            margin={10}
            items={3}
            autoplay={true}
            nav={false}
            dots={false}
            responsive={{
              0: {
                items: 1,
              },
              768: {
                items: 2,
              },
              1024: {
                items: 3,
              },
            }}
          >
            {recentWinnersData.length ? (
              recentWinnersData.map((winner, index) => (
                <div
                  className=" first-w mt-5 pt-5 item"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-easing="ease"
                  data-aos-delay={200}
                >
                  <div
                    className="card"
                    style={{
                      backgroundImage: 'url("assets/images/winner-bg.png")',
                      backgroundPosition: "center",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12 win-div justify-content-center align-items-center d-flex">
                          <img
                            className="fa-solid_crown w-auto"
                            src="assets/images/fa-solid_crown.png"
                          />
                          <img
                            className="p-b-14 w-auto"
                            src="assets/images/p-b-14.png"
                          />
                          {winner?.image ? (
                            <img
                              className="pro-m-pic img-fluid w-auto"
                              src={winner?.image}
                            />
                          ) : (
                            <BsPerson className="profileIcons me-2" />
                          )}
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-lg-12 text-center">
                          <h4>
                            {winner?.fname} {winner?.lname}
                          </h4>
                          {/* <h5>10 August 2022</h5> */}
                          <h1 className="mb-5">
                            Won Rs.{" "}
                            <AbbrNumber
                              props={{
                                number: winner?.prize ?? 0,
                                decPlaces: 2,
                              }}
                            />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Winners Available...</p>
            )}
          </OwlCarousel>

          {/* </div> */}
        </div>
      </section>

      <section className="sec-five" style={{ backgroundColor: "#f5f6ff" }}>
        <div className="container pt-5 pb-5">
          <h2 className="sec-heading text-center">What Sets Us Apart</h2>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-7">
              <p className="text-center p-sub">
                Traditional lotteries payout 25% of the prize pool with the bulk
                going to governments in the form of taxes. They punish players
                for taking immediate payouts. Our model rewards players with
                thousands of draws and 100% prize payouts.
              </p>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-lg-12">
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                items={3}
                autoplay={true}
                nav={false}
                dots={false}
                responsive={{
                  0: {
                    items: 1,
                  },
                  768: {
                    items: 2,
                  },
                  1024: {
                    items: 3,
                  },
                }}
              >
                <div className="item">
                  <div className="card">
                    <div className="card-body shadow">
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <p>
                            At Kuber Wins, a portion of ticket sales go
                            immediately to the prize pool to be paid out.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="card">
                    <div className="card-body shadow">
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <p>
                            The remainder is placed in top performing hedge
                            funds that contain traditional and digital assets
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="card">
                    <div className="card-body shadow">
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <p>
                            Every quarter the returns from the funds are used as
                            prizes for the next quarter.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>

      <Footer props={"home"} />
    </div>
  );
}

// export default BackgroundRefresh(HomePage);
