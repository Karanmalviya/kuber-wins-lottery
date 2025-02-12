import React, {useState, useEffect} from "react";
import {useLocation, Link, useNavigate, useParams} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import CountDown from "../components/CountDown";
import {decrypt, encrypt} from "../../utils/encryptdecrypt";
import {fetchLottery, fetchLotteryWinnerList} from "../../features/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import MiniLoader from "../components/MiniLoader";

export default function Winner({props}) {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lotteryTickets, setLotteryTickets] = useState([]);
  const [lotteryIdVal, setLotteryIdVal] = useState("");
  const [dateVal, setDateVal] = useState("");
  const [numberVal, setNumberVal] = useState("");
  const [winnerListByLottery, setWinnerListByLottery] = useState([]);
  const userId = localStorage.getItem("userId");
  const [searchWinnerListByLottery, setSearchWinnerListByLottery] = useState(
    []
  );
  const [expandedId, setExpandedId] = useState(-1);
  const [search, setSearch] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketName, setTicketName] = useState("");

  useEffect(() => {
    if (typeof id !== "undefined") {
      setTicketNumber(location.state);
      if (!isNaN(decrypt(id))) {
        setTicketName(decrypt(id));
      }
    }
  }, [id]);

  useEffect(() => {
    dispatch(fetchLottery());
    dispatch(fetchLotteryWinnerList());
  }, [dispatch]);

  const lotteryWinnerList = useSelector((state) => state.api.lotteryWinnerList);
  const lotteryWinnerListLoading = useSelector(
    (state) => state.api.lotteryWinnerListLoading
  );
  const lotteryData = useSelector((state) => state.api.lotteryData);

  useEffect(() => {
    if (lotteryData.length) {
      const resArr = lotteryData.filter(
        (res) =>
          res.gameDuration !== null &&
          res.gamePhases.some((res1) => res1.status === 1) &&
          res.status === 1
      );

      setLotteryTickets(resArr);
    }
  }, [lotteryData]);

  useEffect(() => {
    if (lotteryWinnerList.length) {
      const winnerListArr = lotteryWinnerList.filter(
        (item) =>
          (ticketNumber &&
            item.gameInformation.gameName === ticketNumber &&
            item.UserId === +userId) ||
          (ticketName &&
            item.ticketNumber === ticketName &&
            item.UserId === +userId) ||
          (!ticketNumber && !ticketName && item.UserId)
      );

      const winnerListArrGrouped = winnerListArr.reduce((acc, obj) => {
        const key = obj.gameInformationId + "_" + obj.gameInformation?.gameName;
        if (!acc[key]) {
          acc[key] = {
            lotteryId: obj.gameInformationId,
            title: obj.gameInformation?.gameName,
            data: [],
          };
        }
        acc[key].data.push(obj);
        return acc;
      }, {});

      const winnerListArrResult = Object.values(winnerListArrGrouped);
      setWinnerListByLottery(winnerListArrResult);
    }
  }, [lotteryWinnerList, ticketNumber]);

  const handleChange = (val, type) => {
    if (type === "lotteryId") {
      setLotteryIdVal(Number(val));
    } else if (type === "date") {
      setDateVal(val);
    } else if (type === "number") {
      setNumberVal(val);
    }
  };

  const handleSearch = () => {
    setSearch(true);
    const winners = winnerListByLottery
      .filter((item) => lotteryIdVal <= 0 || item.lotteryId === lotteryIdVal)
      .map((item) => {
        const winnersItem = item.data.filter((item1) => {
          const createdAt = item1.createdAt.split("T")[0];
          return (
            (!dateVal || createdAt === dateVal) &&
            (!numberVal || item1.ticketNumber === numberVal)
          );
        });

        return winnersItem.length > 0
          ? {
              lotteryId: item.lotteryId,
              title: item.title,
              data: winnersItem,
            }
          : null;
      })
      .filter(Boolean);

    setSearchWinnerListByLottery(winners);
  };

  function convertUTCToLocalDateTime(utcTimeString, type) {
    const userTimezone = moment.tz.guess();
    const localTime = moment.utc(utcTimeString).tz(userTimezone);
    const formattedLocalTime = localTime.format(type);
    return formattedLocalTime;
  }

  const handleTimer = (ticket, type) => {
    const drawTime = moment(ticket?.createdAt);
    const currentDrawTime = moment();
    if (type === "single-draw") {
      if (
        drawTime.isAfter(currentDrawTime) &&
        ticket?.gamePhase?.status === 1
      ) {
        return (
          <CountDown
            props={{
              type: "winner",
              dateTime:
                ticket?.gameInformation?.gameDuration +
                " " +
                ticket?.gameInformation?.startTime,
            }}
          />
        );
      } else if (
        drawTime.isBefore(currentDrawTime) &&
        !ticket?.gamePhase?.status
      ) {
        return (
          <div className="btn-timer-inactive d-flex justify-content-center">
            Inactive
          </div>
        );
      } else {
        return (
          <div className="btn-timer-inactive d-flex justify-content-center">
            Drawn
          </div>
        );
      }
    } else {
      if (ticket?.gamePhase?.status === 1) {
        return (
          <CountDown
            props={{
              type: "winner",
              dateTime:
                ticket?.gameInformation?.gameDuration +
                " " +
                ticket?.gameInformation?.startTime,
            }}
          />
        );
      } else {
        return (
          <div className="btn-timer-disabled d-flex justify-content-center">
            Inactive
          </div>
        );
      }
    }
  };

  return (
    <div style={{backgroundColor: "#f5f6ff"}}>
      <title>Winners - Kuber Wins</title>
      <Navbar props={{mainPage: "winners", subPage: ""}} />
      <section
        className="sec-ticket-dtls mb-lg-5 mt-5 pb-5"
        style={{backgroundColor: "#f5f6ff"}}
      >
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12">
              <div
                className="card crd-img-dtls border-0"
                style={{
                  background: `url(assets/images/imgpsh_fullsize_anim-14.jpg) no-repeat center center / cover`,
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
                className={
                  location.pathname === "/winners" || id
                    ? "active nav-link"
                    : "nav-link"
                }
                id="pills-lottery-winners-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-lottery-winners"
                type="button"
                role="tab"
                aria-controls="pills-lottery-winners"
                aria-selected="true"
                onClick={() => navigate("/winners")}
              >
                Lottery Winners
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-lottery-commission-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-lottery-commission"
                type="button"
                role="tab"
                aria-controls="pills-lottery-commission"
                aria-selected="false"
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
        id="pills-lottery-winners"
        role="tabpanel"
        aria-labelledby="pills-lottery-winners-tab"
      >
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center mb-2">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header bg-primary">
                  <h6 className="text-white mb-0">Select lottery</h6>
                </div>
                <div className="card-body">
                  <select
                    className="form-select"
                    onChange={(e) => handleChange(e.target.value, "lotteryId")}
                  >
                    <option value="">
                      {ticketNumber ? ticketNumber : "Select lottery"}
                    </option>
                    {lotteryTickets.map((item, idx) => {
                      return (
                        <option key={idx} value={item?.id}>
                          {item?.gameName}
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
                    onChange={(e) => handleChange(e.target.value, "date")}
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header bg-primary">
                  <h6 className="text-white mb-0">Enter Ticket Number</h6>
                </div>
                <div className="card-body">
                  <input
                    maxLength="10"
                    className="form-control lottery-generated-number"
                    onChange={(e) => handleChange(e.target.value, "number")}
                    defaultValue={ticketName ? ticketName : ""}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-12">
              <button
                type="button"
                className="btn btn-primary float-end px-5"
                onClick={() => handleSearch()}
              >
                Search
              </button>
            </div>
          </div>{" "}
          {lotteryWinnerListLoading && <MiniLoader />}
          <div className="row d-flex justify-content-center align-items-center mt-4">
            <div className="col-lg-12">
              {search && searchWinnerListByLottery?.length > 0 ? (
                searchWinnerListByLottery.map((val, index) => {
                  var valData = val?.data.filter(
                    (value) => Object.keys(value).length !== 0
                  );
                  let dataForDisplay =
                    expandedId === index ? valData : valData.slice(0, 3);
                  dataForDisplay = dataForDisplay.slice(0, 10);
                  return dataForDisplay.length ? (
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
                        {val.title}
                      </div>
                      <div className="panel-body">
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th style={{borderTopLeftRadius: 15}}>#</th>
                                <th>Draw Date/Time</th>
                                <th>Currency</th>
                                <th>Prize Amount</th>
                                <th>Name</th>
                                <th>Ticket No.</th>
                                <th>Frequency</th>
                                <th>Next Draw</th>
                                <th style={{borderTopRightRadius: 15}}>
                                  Nationality
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataForDisplay ? (
                                dataForDisplay.map((item, idx) => {
                                  return (
                                    <tr key={idx}>
                                      <td>{idx + 1}</td>
                                      <td>
                                        {moment(item.createdAt).format(
                                          "DD/MM/YYYY, HH:mm:ss"
                                        )}
                                      </td>
                                      <td>USD</td>
                                      <td>Rs.{item?.price}</td>
                                      <td>
                                        {item?.User?.fname} {item?.User?.lname}
                                      </td>
                                      <td>{item?.ticketNumber}</td>
                                      <td className="text-capitalize">
                                        {item.frequency === 1
                                          ? "Daily"
                                          : item.frequency === 2
                                          ? "Weekly"
                                          : item.frequency === 3
                                          ? "Monthly"
                                          : null}
                                      </td>
                                      <td>
                                        {handleTimer(
                                          item,
                                          item?.gameInformation?.draw
                                        )}

                                        {/* <CountDown
                                          props={{
                                            type: "winner",
                                            dateTime:
                                              item?.gameInformation
                                                ?.gameDuration +
                                              " " +
                                              item?.gameInformation?.startTime,
                                          }}
                                        /> */}
                                      </td>
                                      <td>{item?.User?.country}</td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <div className="text-center">
                                  No winners found for data you entered
                                </div>
                              )}
                              {dataForDisplay.length > 2 &&
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
                              ) : (
                                ""
                              )}
                              {dataForDisplay.length === 10 ? (
                                <tr>
                                  <td colSpan="9" style={{textAlign: "left"}}>
                                    <Link
                                      to={
                                        "/winnerlist/" +
                                        encrypt(val?.lotteryId.toString())
                                      }
                                      state={searchWinnerListByLottery}
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
                  ) : (
                    <div className="text-center">
                      No winners found for data you entered
                    </div>
                  );
                })
              ) : (
                <div
                  className="panel panel-default mb-3"
                  aria-expanded="false"
                  id="collapseExample1"
                >
                  <div className="panel-body text-center">
                    {search && searchWinnerListByLottery && "No result found"}
                  </div>
                </div>
              )}

              {!search && winnerListByLottery?.length > 0 ? (
                winnerListByLottery.map((val, index) => {
                  var valData = val?.data.filter(
                    (value) => Object.keys(value).length !== 0
                  );
                  let dataForDisplay =
                    expandedId === index ? valData : valData.slice(0, 3);
                  dataForDisplay = dataForDisplay.slice(0, 10);
                  return dataForDisplay.length > 0 ? (
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
                        {val.title}
                      </div>
                      <div className="panel-body">
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th style={{borderTopLeftRadius: 15}}>#</th>
                                <th>Draw Date/Time</th>
                                <th>Currency</th>
                                <th>Prize Amount</th>
                                <th>Name</th>
                                <th>Ticket No.</th>
                                <th>Frequency</th>
                                <th>Next Draw</th>
                                <th style={{borderTopRightRadius: 15}}>
                                  Nationality
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataForDisplay
                                ? dataForDisplay.map((item, idx) => {
                                    return (
                                      <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>
                                          {moment(item.createdAt).format(
                                            "DD/MM/YYYY, HH:mm:ss"
                                          )}
                                        </td>
                                        <td>USD</td>
                                        <td>Rs.{item?.price}</td>
                                        <td>
                                          {item?.User?.fname}{" "}
                                          {item?.User?.lname}
                                        </td>
                                        <td>{item?.ticketNumber}</td>
                                        <td className="text-capitalize">
                                          {item.frequency === 1
                                            ? "Daily"
                                            : item.frequency === 2
                                            ? "Weekly"
                                            : item.frequency === 3
                                            ? "Monthly"
                                            : null}
                                        </td>
                                        <td>
                                          {handleTimer(
                                            item,
                                            item?.gameInformation?.draw
                                          )}

                                          {/* <CountDown
                                            props={{
                                              type: "winner",
                                              dateTime:
                                                item?.gameInformation
                                                  ?.gameDuration +
                                                " " +
                                                item?.gameInformation
                                                  ?.startTime,
                                            }}
                                          /> */}
                                        </td>
                                        <td>{item?.User?.country}</td>
                                      </tr>
                                    );
                                  })
                                : "No results found"}
                              {dataForDisplay.length > 2 &&
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
                              ) : (
                                ""
                              )}
                              {dataForDisplay.length === 10 ? (
                                <tr>
                                  <td colSpan="9" style={{textAlign: "left"}}>
                                    <Link
                                      to={
                                        "/winnerlist/" +
                                        encrypt(val?.lotteryId.toString())
                                      }
                                      state={winnerListByLottery}
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
                  ) : (
                    ""
                  );
                })
              ) : (
                <div
                  className="panel panel-default mb-3 text-center"
                  aria-expanded="false"
                  id="collapseExample1"
                >
                  No Winner Found
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer props={""} />
    </div>
  );
}
