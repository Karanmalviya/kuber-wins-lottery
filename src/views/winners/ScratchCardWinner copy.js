import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {decrypt} from "../../utils/encryptdecrypt";
import {useDispatch, useSelector} from "react-redux";
import {fetchScratchCardWinners} from "../../features/apiSlice";
import moment from "moment";
import MiniLoader from "../components/MiniLoader";

export default function ScratchCardWinner() {
  const ref = useRef(null);
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scratch_card_id = id && decrypt(id);
  const [scratchCard, setScratchCard] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);
  const [scratchCardDate, setScratchCardDate] = useState("");
  const [scratchCardWonData, setScratchCardWonData] = useState([]);
  const [expandedId, setExpandedId] = useState(-1);
  const [filteredTransaction, setFilteredTransaction] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchFilter, setSearchFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const scratchCardWinnersData = useSelector(
    (state) => state.api.scratchCardWinnersData
  );
  const scratchCardWinnersLoading = useSelector(
    (state) => state.api.scratchCardWinnersLoading
  );

  useLayoutEffect(() => {
    dispatch(fetchScratchCardWinners());
  }, [dispatch]);

  useEffect(() => {
    if (scratchCardWinnersData) {
      setLoading(true);
      const result = scratchCardWinnersData.reduce((acc, obj) => {
        if (
          obj.scratchCard &&
          !acc.some((item) => item.id === obj.scratchCardId)
        ) {
          const matchingObjects = scratchCardWinnersData.filter(
            (item) =>
              item.scratchCardId === obj.scratchCardId && item.scratchCard
          );
          acc.push({
            id: obj.scratchCardId,
            UserId: obj.UserId,
            card_name: obj.scratchCard.card_name,
            card_type: obj.scratchCard.card_type,
            createdAt: obj.createdAt,
            wons: matchingObjects.map((item) => ({
              userName: item.User.fname + " " + item.User.lname,
              UserId: item.UserId,
              date: item.createdAt,
              won_amount: item.amount,
              frequency: JSON.parse(item.scratchCard.frequency),
            })),
          });
        }
        return acc;
      }, []);

      setSearchFilter(result);
    }
  }, [scratchCardWinnersData, id]);

  useEffect(() => {
    if (scratchCard && searchFilter) {
      const filtered = searchFilter.filter((item) => item.id === +scratchCard);
      setFilteredItem(filtered);
    } else if (id && scratchCard === "") {
      const filtered = searchFilter.filter(
        (item) => item.id === +scratch_card_id && item.UserId === +userId
      );
      setFilteredItem(filtered);
    } else {
      setFilteredItem(searchFilter);
    }
  }, [search, scratchCard, scratch_card_id, searchFilter, id]);

  useEffect(() => {
    if (scratchCardDate) {
      const filteredByDate = filteredItem.filter((item) =>
        item.wons.some((item1) => {
          const itemDate = item1.date.split("T")[0];
          const filterDate = scratchCardDate;
          return itemDate === filterDate;
        })
      );
      ref.current = true;
      setFilteredTransaction(filteredByDate);
    } else {
      ref.current = true;
      setFilteredTransaction(filteredItem);
    }
  }, [filteredItem, scratchCardDate, search]);

  useEffect(() => {
    if (ref.current) {
      setScratchCardWonData(filteredTransaction);
      setLoading(false);
      ref.current = false;
    }
  }, [filteredItem, filteredTransaction]);

  const handleSearch = () => {
    setScratchCardWonData(filteredTransaction);
    setLoading(false);
    setSearch((prev) => !prev);
  };

  return (
    <div style={{backgroundColor: "#f5f6ff"}}>
      <title>Winners - Kuber Wins</title>
      <Navbar props={{mainPage: "winners", subPage: ""}} />
      <section className="sec-ticket-dtls mb-lg-5 mt-5 pb-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12">
              <div
                className="card crd-img-dtls border-0"
                style={{
                  background: `url(../assets/images/imgpsh_fullsize_anim-14.jpg) no-repeat center center / cover`,
                }}
              >
                <div className="card-body p-0 text-center">
                  <div className="ltr-name">
                    <h4 className="fw-bold">Result</h4>
                    <p className="text-white pt-3">All Games Winners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="row commission-tab ">
        <div className="mb-4 ">
          <ul
            className="nav nav-pills justify-content-center"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className={"nav-link"}
                id="pills-scratch-card-win-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-scratch-card-win"
                type="button"
                role="tab"
                aria-controls="pills-scratch-card-win"
                onClick={() => navigate("/winners")}
              >
                Lottery Winners
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={
                  location.pathname === "/winners-scratch-card/" + id ||
                  location.pathname === "/winners-scratch-card"
                    ? "active nav-link"
                    : "nav-link"
                }
                id="pills-scratch-card-win-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-scratch-card-win"
                type="button"
                role="tab"
                aria-controls="pills-scratch-card-win"
                onClick={() => navigate("/winners-scratch-card")}
              >
                Scratch Card Winnes
              </button>
            </li>
          </ul>
        </div>
      </div>{" "}
      <section
        className="buy-ticket-dtls pb-4 "
        id="pills-scratch-card-win"
        role="tabpanel"
        aria-labelledby="pills-scratch-card-win-tab"
      >
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center mb-2">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header bg-primary">
                  <h6 className="text-white mb-0">Select Scratch Card</h6>
                </div>
                <div className="card-body">
                  <select
                    className="form-select"
                    onChange={(e) => setScratchCard(e.target.value)}
                    value={id && scratch_card_id}
                  >
                    <option value="">Select Scratch Card</option>

                    {[
                      ...new Set(
                        scratchCardWinnersData?.map(
                          (item) => item.scratchCardId
                        )
                      ),
                    ].map((scratchCardId, idx) => {
                      const selectedItem = scratchCardWinnersData?.find(
                        (item) => item.scratchCardId === scratchCardId
                      );
                      return (
                        <option key={idx} value={selectedItem.scratchCardId}>
                          {selectedItem?.scratchCard?.card_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header bg-primary">
                  <h6 className="text-white mb-0">Date</h6>
                </div>
                <div className="card-body">
                  <input
                    className="form-control"
                    type="date"
                    onChange={(e) => setScratchCardDate(e.target.value)}
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>{" "}
            <div className="row mt-3 px-lg-5">
              {/* <div className="col-lg-4"></div> */}
              <div className="col-lg-12 ">
                <button
                  type="button"
                  className="btn btn-primary float-end px-5"
                  onClick={() => handleSearch()}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {scratchCardWinnersLoading ? (
        <MiniLoader />
      ) : (
        <div className="container">
          {scratchCardWonData.length > 0 ? (
            scratchCardWonData
              ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .map((wonItem, index) => {
                let dataForDisplay =
                  expandedId === index
                    ? wonItem?.wons
                    : wonItem?.wons?.slice(0, 3);
                dataForDisplay = dataForDisplay?.slice(0, 10);
                return (
                  <div
                    className="panel panel-default mb-3"
                    aria-expanded="false"
                    id={"collapseExample" + (index + 1)}
                    key={index}
                  >
                    <div
                      className="panel-heading mb-3"
                      style={{textAlign: "center", fontWeight: "bold"}}
                    >
                      {wonItem?.card_name}
                    </div>
                    <div className="panel-body">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th style={{borderTopLeftRadius: 15}}>S.No.</th>
                              <th>Scratch Card Name</th>
                              <th>Scratch Card Type</th>
                              <th> Name</th>
                              {wonItem.card_type === "single-scratch" ? null : (
                                <>
                                  <th>Frequency</th>
                                  <th>Schedule</th>
                                </>
                              )}
                              <th>Win Bonus</th>
                              {/* <th>Post Balance</th> */}
                              <th style={{borderTopRightRadius: 15}}>
                                Date & time
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {wonItem?.wons?.length > 0 ? (
                              dataForDisplay
                                ?.sort(
                                  (a, b) => new Date(b.date) - new Date(a.date)
                                )
                                ?.map((item, idx) => {
                                  return (
                                    <tr key={idx}>
                                      <td>{idx + 1}</td>
                                      <td> {wonItem?.card_name}</td>
                                      <td className="text-capitalize">
                                        {wonItem?.card_type?.replace("-", " ")}
                                      </td>
                                      <td> {item?.userName}</td>
                                      {wonItem.card_type ===
                                      "single-scratch" ? null : (
                                        <>
                                          <td>
                                            {item?.frequency?.[0].frequency
                                              ?.charAt(0)
                                              .toUpperCase() +
                                              item?.frequency?.[0].frequency?.slice(
                                                1
                                              )}
                                          </td>
                                          <td>
                                            {item?.frequency?.[0].schedule
                                              ?.charAt(0)
                                              .toUpperCase() +
                                              item?.frequency?.[0].schedule?.slice(
                                                1
                                              )}
                                          </td>
                                        </>
                                      )}
                                      <td>
                                        ${item?.won_amount?.toLocaleString()}
                                      </td>

                                      <td>
                                        {moment(item?.date).format(
                                          "DD/MM/YYYY, HH:mm:ss"
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })
                            ) : (
                              <tr>
                                <td colSpan={6}> No Record Found</td>
                              </tr>
                            )}
                            {wonItem?.wons?.length > 3 &&
                            expandedId !== index ? (
                              <tr>
                                <td colSpan="9" style={{textAlign: "left"}}>
                                  <Link
                                    to={"#"}
                                    onClick={() => {
                                      setExpandedId(index);
                                    }}
                                  >
                                    Show More
                                  </Link>
                                </td>
                              </tr>
                            ) : wonItem?.wons?.length > 10 ? (
                              <tr>
                                <td colSpan="9" style={{textAlign: "left"}}>
                                  <Link
                                    to={
                                      "/winners-scratch-card-list"
                                      //  +encrypt(val?.lotteryId.toString())
                                    }
                                    state={[
                                      {
                                        card_name: wonItem?.card_name,
                                        card_type: wonItem?.card_type,
                                        wons: wonItem?.wons,
                                      },
                                    ]}
                                  >
                                    View More
                                  </Link>
                                </td>
                              </tr>
                            ) : (
                              ""
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="text-center">
              No winners found for data you entered
            </div>
          )}
        </div>
      )}
      <Footer props={""} />
    </div>
  );
}
