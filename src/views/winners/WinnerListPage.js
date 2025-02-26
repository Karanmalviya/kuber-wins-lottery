import React, { useState, useEffect } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import CountDown from "../components/CountDown";
import { decrypt } from "../../utils/encryptdecrypt";
import moment from "moment";

export default function WinnerListPage({ props }) {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const [winnerListByLottery, setWinnerListByLottery] = useState([]);
  const getLotteryId = decrypt(id);

  useEffect(() => {
    if (state) {
      const filtered = state.filter((item) => item.lotteryId === +getLotteryId);
      setWinnerListByLottery(filtered);
    }
  }, [state]);

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
    <div style={{ backgroundColor: "#f5f6ff" }}>
      <title>Winners - Kuber Wins</title>

      <Navbar props={{ mainPage: "winners", subPage: "" }} />

      <section className="sec-ticket-dtls mb-5 mt-5 pb-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12">
              <div
                className="card crd-img-dtls border-0"
                style={{
                  background: `url(./assets/images/imgpsh_fullsize_anim-14.jpg) no-repeat center center / cover`,
                }}
              >
                <div className="card-body p-0 text-center">
                  <div className="ltr-name">
                    <h4 className="fw-bold">Result</h4>
                    <p className="text-white pt-3">
                      {winnerListByLottery?.[0]?.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
      <section className="buy-ticket-dtls pb-4">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center mt-4">
            <div className="col-lg-12">
              {winnerListByLottery?.length > 0 ? (
                winnerListByLottery.map((val, index) => {
                  var valData = val?.data.filter(
                    (value) => Object.keys(value).length !== 0
                  );
                  return valData.length > 0 ? (
                    <div
                      className="panel panel-default mb-3"
                      aria-expanded="false"
                      id={"collapseExample" + (index + 1)}
                      key={index}
                    >
                      <div
                        className="panel-heading mb-3"
                        style={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        {val.title}
                      </div>
                      <div className="panel-body">
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th style={{ borderTopLeftRadius: 15 }}></th>
                                <th>Draw Date/Time</th>
                                <th>Currency</th>
                                <th>Prize Amount</th>
                                <th>Name</th>
                                <th>Ticket No.</th>
                                <th>Frequency</th>
                                <th>Next Draw</th>
                                <th style={{ borderTopRightRadius: 15 }}>
                                  Nationality
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {valData.map((item, idx) => {
                                return (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                      {moment(item.createdAt).format(
                                        "DD/MM/YYYY, HH:mm:ss"
                                      )}
                                    </td>
                                    <td>RS</td>
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
                              })}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="9">
                                  <Link to={"/winners"}>Back to winners</Link>
                                </td>
                              </tr>
                            </tfoot>
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
                  className="panel panel-default mb-3"
                  aria-expanded="false"
                  id="collapseExample1"
                >
                  <div className="panel-body text-center">No result found</div>
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
