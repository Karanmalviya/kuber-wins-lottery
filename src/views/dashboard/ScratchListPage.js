import React, {useState, useEffect, useMemo} from "react";
import {Link} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import {encrypt} from "../../utils/encryptdecrypt";
import usePagination from "../../hooks/usePaginate";
import ReactPaginate from "react-paginate";
import {Pagination, Skeleton} from "@mui/material";
import {fetchTotalAmountScratchCardWins} from "../../features/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import MiniLoader from "../components/MiniLoader";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

export default function ScratchListPage({props}) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [soldScratchData, setSoldScratchData] = useState([]);
  const [scratchCardName, setScratchCardName] = useState("");
  const [pageRange, setPageRange] = useState(10);
  const [selectedScratchCard, setSelectedScratchCard] = useState([]);
  const [latestScratchCard, setLatestScratchCard] = useState([]);

  useEffect(() => {
    dispatch(fetchTotalAmountScratchCardWins(userId));
  }, [dispatch, userId]);

  const totalAmountScratchCardWins = useSelector(
    (state) => state.api.totalAmountScratchCardWins
  );
  const totalAmountScratchCardWinsLoading = useSelector(
    (state) => state.api.totalAmountScratchCardWinsLoading
  );

  useEffect(() => {
    if (Object.keys(totalAmountScratchCardWins).length) {
      setSoldScratchData(totalAmountScratchCardWins.scratchCardPlays);
    }
  }, [totalAmountScratchCardWins]);

  useEffect(() => {
    const filterData = () => {
      const latestEntriesMap = new Map();
      const totalPriceSumMap = new Map();
      const wonAmountMap = new Map();
      const scratchDrawSumMap = new Map();

      soldScratchData.forEach((entry) => {
        const {scratchCardId, createdAt, totalPrice, won, scratchDraw} = entry;

        if (
          !latestEntriesMap.has(scratchCardId) ||
          createdAt > latestEntriesMap.get(scratchCardId).createdAt
        ) {
          latestEntriesMap.set(scratchCardId, {...entry});
        }

        totalPriceSumMap.set(
          scratchCardId,
          (totalPriceSumMap.get(scratchCardId) || 0) + parseFloat(totalPrice)
        );
        wonAmountMap.set(
          scratchCardId,
          wonAmountMap.get(scratchCardId) || won || 0
        );
        scratchDrawSumMap.set(
          scratchCardId,
          (scratchDrawSumMap.get(scratchCardId) || 0) + scratchDraw
        );
      });

      const latestEntriesArray = Array.from(latestEntriesMap.values())
        .map((entry) => ({
          ...entry,
          totalPriceSum: totalPriceSumMap.get(entry.scratchCardId),
          won: wonAmountMap.get(entry.scratchCardId),
          scratchDrawSum: scratchDrawSumMap.get(entry.scratchCardId),
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLatestScratchCard(latestEntriesArray);
    };
    filterData();
  }, [soldScratchData]);

  useEffect(() => {
    if (latestScratchCard.length) {
      if (scratchCardName) {
        const filter = latestScratchCard.filter(
          (item) => item.scratchCard.card_name === scratchCardName
        );
        setSelectedScratchCard(filter);
      } else {
        setSelectedScratchCard(latestScratchCard);
      }
    }
  }, [latestScratchCard, scratchCardName]);

  const [page, setPage] = useState(1);
  const PER_PAGE = pageRange;
  const maxPage = Math.ceil(selectedScratchCard.length / PER_PAGE);
  const currentPageData = selectedScratchCard.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const handleChange = (e, p) => {
    setPage(p);
  };
  const handleName = (item) => {
    return item
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  return (
    <>
      <title>Ticket List - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"scratch-list"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-table p-0">
                    <div className="card-header py-3 px-4">
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                          <h5 className="mb-0 fs-5">Scratch Card List</h5>
                        </div>
                        <div className="col-lg-8 col-md-6 col-sm-6">
                          <div className="row d-flex justify-content-end">
                            <div className="col-lg-6 col-md-6 pe-lg-1">
                              <select
                                className="form-select form-select-sm w-100 rounded-pill border-0"
                                onChange={(e) =>
                                  setScratchCardName(e.target.value)
                                }
                              >
                                <option selected value="">
                                  <em>Select ScratchCard</em>
                                </option>
                                {latestScratchCard.length &&
                                  latestScratchCard.map((item) => (
                                    <option value={item.scratchCard.card_name}>
                                      {item.scratchCard.card_name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-0 table-responsive">
                      <table className="table table-bordered withdraw-table">
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th className="text-start">ScratchCard Name</th>
                            <th className="text-start">Total Paid</th>
                            <th className="text-start">Plays</th>
                            <th className="text-start">Total Won</th>
                            <th>Winnings</th>
                            <th>Play Now</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPageData &&
                            currentPageData?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{(page - 1) * PER_PAGE + index + 1}</td>
                                  <td className="text-start">
                                    {item?.scratchCard?.card_name}
                                  </td>
                                  <td className="text-start">
                                  Rs.
                                    {Number(
                                      item?.totalPriceSum
                                    )?.toLocaleString()}
                                  </td>

                                  <td className="text-start">
                                    {item?.scratchDrawSum}
                                    {item?.scratchCard?.card_type ===
                                      "multi-scratch" &&
                                      (() => {
                                        try {
                                          const parsedData = JSON.parse(
                                            item?.scratchCard?.frequency
                                          );
                                          return (
                                            "/" + parsedData?.[0]?.frequency
                                          );
                                        } catch (error) {}
                                      })()}
                                  </td>
                                  <td className="text-start">
                                  Rs.{item?.won?.toLocaleString()}
                                  </td>

                                  <td>
                                    <Link
                                      // to={
                                      //   "/winners-scratch-card/" +
                                      //   encrypt(item?.scratchCardId.toString())
                                      // }

                                      to={"/total-wins"}
                                      state={{
                                        card_name: item?.scratchCard?.card_name,
                                        type: "handleScratch",
                                      }}
                                      className="btn btn-info inf-rounded btn-sm px-3 pt-sm"
                                    >
                                      View
                                    </Link>
                                  </td>
                                  <td>
                                    <Link
                                      to={
                                        item.newDataLength
                                          ? `/scratch-cards-play/${handleName(
                                              item.scratchCard.card_name
                                            )}/${encrypt(
                                              item?.scratchCardId?.toString()
                                            )}`
                                          : `/scratch-cards-buy/${handleName(
                                              item.scratchCard.card_name
                                            )}/${encrypt(
                                              item?.scratchCardId?.toString()
                                            )}`
                                      }
                                      className="btn btn-info inf-rounded btn-sm px-3 pt-sm"
                                    >
                                      Play Now
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>

                        {/* {loading && (
                          <tbody>
                            {Array.from({ length: 10 }).map(
                              (_, index) => (
                                <tr key={index}>
                                  <td>
                                    <Skeleton animation="wave" variant="text" />
                                  </td>
                                  <td>
                                    <Skeleton animation="wave" variant="text" />
                                  </td>
                                  <td>
                                    <Skeleton animation="wave" variant="text" />
                                  </td>
                                  <td>
                                    <Skeleton animation="wave" variant="text" />
                                  </td>
                                  <td>
                                    <Skeleton animation="wave" variant="text" />
                                  </td>
                                  <td>
                                    <Skeleton animation="wave" variant="text" />
                                  </td>
                                  <td>
                                    <Skeleton animation="wave" variant="text" />
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        )} */}
                      </table>
                      {totalAmountScratchCardWinsLoading && <MiniLoader />}

                      <div
                        className="row mb-2"
                        hidden={selectedScratchCard.length ? false : true}
                      >
                        <div className="col-lg-4 col-md-4 col-sm-5">
                          <div className="d-flex ms-4">
                            <label>Rows per page:</label>
                            <select
                              className="form-select form-select-sm w-25 ms-3"
                              onChange={(e) => {
                                setPageRange(e.target.value);
                                setPage(1);
                              }}
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-7">
                          <div className="d-flex justify-content-end">
                            <Pagination
                              count={maxPage}
                              page={page}
                              onChange={handleChange}
                              showFirstButton
                              showLastButton
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
