import React, {useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Slider from "../components/Slider";
import ScratchCard from "../components/ScratchCard";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import usePagination from "../../hooks/usePaginate";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {fetchScratchCard} from "../../features/apiSlice";
import MiniLoader from "../components/MiniLoader";

export default function ScratchCardPage({props}) {
  const [scratchCards, setScratchCards] = useState([]);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [pageSize, setPageSize] = useState("1");

  const dispatch = useDispatch();
  const scratchCardData = useSelector((state) => state.api.scratchCardData);
  const scratchCardloading = useSelector(
    (state) => state.api.scratchCardLoading
  );

  useEffect(() => {
    dispatch(fetchScratchCard());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("resize", () => setCurrentWidth(window.innerWidth));
  });

  useEffect(() => {
    const fetchScratchCards = async () => {
      if (scratchCardData.length) {
        const filtedStatus = scratchCardData.filter(
          (item) => item.status === 1
        );
        setScratchCards(filtedStatus);
      }
    };
    fetchScratchCards();
  }, [scratchCardData]);

  useEffect(() => {
    if (currentWidth > 576) {
      setPageSize(6);
    } else setPageSize(2);
  }, [currentWidth]);

  const {currentPage, handlePageChange, getCurrentPageData, pageCount} =
    usePagination(scratchCards, pageSize);
  const {currentPageData} = getCurrentPageData();

  return (
    <div style={{backgroundColor: "#f5f6ff"}}>
      <title>Scratch Card - Kuber Wins</title>

      <Navbar props={{mainPage: "scratchcard", subPage: ""}} />

      <section className="sec-slider pb-4">
        <div className="container">
          <div className="col-lg-12">
            <Slider />
          </div>
        </div>
      </section>
      <section className="sec-scratch-cards pb-4">
        <div className="container">
          <h2 className="mt-5 mb-4 sec-heading">Scratch Cards</h2>
          <div className="row">
            {scratchCardloading ? (
              <MiniLoader />
            ) : currentPageData.length ? (
              currentPageData.map((scratchCard, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 mb-4"
                  data-aos-delay="200"
                  data-aos="fade-up"
                  data-aos-easing="ease"
                  transition-delay="1s"
                  opacity="1"
                  transform="translateZ(0)"
                >
                  <ScratchCard props={scratchCard} />
                </div>
              ))
            ) : (
              <p>No Scratch Card Available...</p>
            )}
          </div>
          <div
            className="container"
            hidden={scratchCards.length > pageSize ? false : true}
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
              pageCount={Math.ceil(scratchCards.length / pageSize)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      </section>

      <Footer props={""} />
    </div>
  );
}
