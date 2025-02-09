import React, {useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Slider from "../components/Slider";
import LotteryCard from "../components/LotteryCard";
import ReactPaginate from "react-paginate";
import usePagination from "../../hooks/usePaginate";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {fetchLottery} from "../../features/apiSlice";

export default function LotteryPage() {
  const dispatch = useDispatch();
  const [lotteryTickets, setLotteryTickets] = useState([]);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [pageSize, setPageSize] = useState("1");

  useEffect(() => {
    window.addEventListener("resize", () => setCurrentWidth(window.innerWidth));
  });

  useEffect(() => {
    dispatch(fetchLottery());
  }, [dispatch]);

  const lotteryData = useSelector((state) => state.api.lotteryData);
  const lotteryDataLoading = useSelector(
    (state) => state.api.lotteryDataLoading
  );

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
    if (currentWidth > 576) {
      setPageSize(4);
    } else setPageSize(2);
  }, [currentWidth]);

  const {currentPage, handlePageChange, getCurrentPageData, pageCount} =
    usePagination(lotteryTickets, pageSize);
  const {currentPageData} = getCurrentPageData();

  return (
    <div style={{backgroundColor: "#f5f6ff"}}>
      <title>Lotteries - Kuber Wins</title>
      <Navbar props={{mainPage: "lotteries", subPage: ""}} />
      <section className="sec-slider pb-4">
        <div className="container">
          <div className="col-lg-12">
            <Slider />
          </div>
        </div>
      </section>

      <section className="sec-second pb-4">
        <div className="container">
          <h2 className="mt-4 mb-4 sec-heading">Lotteries</h2>
          <div className="row">
            {lotteryDataLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            ) : currentPageData.length ? (
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
          <div className="container">
            <div
              className="container"
              hidden={lotteryTickets.length > pageSize ? false : true}
            >
              <ReactPaginate
                previousLabel={
                  <IoIosArrowBack
                    className={currentPage === 0 && "text-muted "}
                  />
                }
                nextLabel={
                  <IoIosArrowForward
                    className={currentPage === pageCount - 1 && "text-muted "}
                  />
                }
                breakLabel="..."
                breakClassName="break-me"
                pageCount={Math.ceil(lotteryTickets.length / pageSize)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer props={""} />
    </div>
  );
}
