import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import moment from "moment";

export default function ScratchCardWinnerList() {
  const location = useLocation();
  const [winner, setWinner] = useState([]);

  useEffect(() => {
    setWinner(location.state);
  }, [location]);

  return (
    <div style={{ backgroundColor: "#f5f6ff" }}>
      <title>Winners - Kuber Wins</title>

      <Navbar props={{ mainPage: "winners", subPage: "" }} />

      <section className="sec-ticket-dtls mb-2 mt-5 pb-5">
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
                    <p className="text-white pt-3">{winner?.[0]?.card_name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="buy-ticket-dtls pb-4">
        <div className="container">
          {winner.length &&
            winner?.map((wonItem, index) => (
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
                  {wonItem?.card_name}
                </div>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ borderTopLeftRadius: 15 }}>S.No.</th>
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
                          <th style={{ borderTopRightRadius: 15 }}>
                            Date & time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {wonItem?.wons?.length > 0 &&
                          wonItem?.wons?.map((item, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td> {wonItem?.card_name}</td>{" "}
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
                                        item?.frequency?.[0].schedule?.slice(1)}
                                    </td>
                                  </>
                                )}
                                <td>Rs.{item?.won_amount?.toLocaleString()}</td>
                                {/* <td>${item?.post_balance}</td> */}
                                <td>
                                  {" "}
                                  {moment(item?.date).format(
                                    "DD/MM/YYYY, HH:mm:ss"
                                  )}{" "}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>{" "}
                      <tfoot>
                        <tr>
                          <td colSpan="9">
                            <Link to={"/winners-scratch-card"}>
                              Back to winners
                            </Link>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <Footer props={""} />
    </div>
  );
}
