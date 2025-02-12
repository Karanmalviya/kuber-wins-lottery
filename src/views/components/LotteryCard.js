import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import CountDown from "./CountDown";
import { encrypt } from "../../utils/encryptdecrypt";

export default function LotteryCard({ props }) {
  const defaultImage = "../assets/images/scratch-cards/scratch-cards-5.jpg";
  let daily = [];
  let monthly = [];
  let weekly = [];
  const [frequency, setFrequency] = useState([]);
  const [soldPercentage, setSoldPercentage] = useState([]);

  useEffect(() => {
    setSoldPercentage((props.sold / props.maxNumberTickets) * 100);
    const setWinBonuses = (ticketGamePhases) => {
      ticketGamePhases?.length > 0 &&
        ticketGamePhases.map(
          (gamePhase) =>
            gamePhase.status &&
            JSON.parse(gamePhase?.gameData)?.length > 0 &&
            JSON.parse(gamePhase?.gameData).map((gamePhaseData) => (
              <>
                {gamePhaseData?.frequency === "1"
                  ? daily.push(gamePhaseData)
                  : []}
                {gamePhaseData?.frequency === "2"
                  ? weekly.push(gamePhaseData)
                  : []}
                {gamePhaseData?.frequency === "3"
                  ? monthly.push(gamePhaseData)
                  : []}
              </>
            ))
        );
    };
    setWinBonuses(props?.gamePhases);
    setFrequency({ daily, weekly, monthly });
  }, props?.gamePhases);

  return (
    <div
      className="card mb-3 bg-white time-row-three pointer"
      style={{ userSelect: "none" }}
    >
      <div className="row">
        <div className="col-lg-3 col-3">
          <div className="border-ticket">
            <img
              src={
                props?.image
                  ? props?.image !== "null"
                    ? props?.image
                    : defaultImage
                  : defaultImage
              }
              loading="lazy"
              className="img-fluid ticket-img"
              alt={props?.gameName}
              height="228px !important"
            />
            <img
              src="../assets/images/Union (2).png"
              className="img-fluid ticket-punch"
              alt={props?.gameName}
              width="155px"
              height="250px"
            />
            <img
              src="../assets/images/circle-Union.png"
              className="img-fluid ticket-circle"
              alt={props?.gameName}
              width="155px"
              height="250px"
            />
          </div>
        </div>
        <div className="col-lg-9 col-9">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-12 col-sm col-12 py-lg-3 py-2 px-lg-3 p-right-2 px-3 ">
                <div className="row">
                  <div className="col-lg-12 col-sm col-12">
                    <h4 className="text-truncate">{props?.gameName}</h4>
                    <p
                      className="p-label-lotto text-capitalize"
                      style={{ overflow: "visible" }}
                    >
                      {props?.draw?.replace("-", " ")}
                    </p>
                    <p
                      className="font-xs mb-0 text-truncate"
                      title={
                        props?.gameSlogan?.length > 74 ? props?.gameSlogan : ""
                      }
                    >
                      {props?.gameSlogan?.length > 74
                        ? props?.gameSlogan?.substring(0, 74) + "..."
                        : props?.gameSlogan}
                    </p>
                  </div>
                </div>
                <div className="row mt-lg-2 mt-1">
                  <div className="col-lg-8 col-sm col-8 d-flex justify-content-left align-items-center">
                    <Icon
                      icon={"bxs:badge-" + props?.Currency?.name}
                      style={{ fontSize: 40 }}
                    />
                    <Icon icon={"bxs:badge-dollar"} style={{ fontSize: 40 }} />
                    <h2 className="p-rs">
                      Rs.{(+props?.ticketPrice)?.toLocaleString()}
                    </h2>
                  </div>
                  <div className="col-lg-4 col-sm col-4">
                    <div className="time-row">
                      <p className="p-one-t text-end">
                        {Number(props?.sold) * Number(props?.ticketPrice) >=
                          Number(props?.minPrizePool) ||
                        new Date() === new Date(props.gameDuration) ||
                        props.totalDraw
                          ? "Next Draw"
                          : "Draw Starts"}
                        {/* {props?.nextDraw === 0 ? "Draw Starts " : "Next Draw"} */}{" "}
                        In :
                      </p>
                      <p className="p-two-t text-end">
                        {props?.sold === 0 ? (
                          <CountDown
                            props={{
                              type: "winner",
                              dateTime:
                                props?.gameDuration + " " + props?.startTime,
                            }}
                          />
                        ) : (
                          <CountDown
                            props={{
                              type: "winner",
                              dateTime:
                                props?.gameDuration + " " + props?.startTime,
                            }}
                          />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row mt-lg-2 mt-1">
                  <div className="col-lg-3 col-sm col-3 pe-0">
                    <div className="time-row">
                      <p className="p-one-t text-start">Sold :</p>
                      <div className="display-inline">
                        <p
                          className="p-two-t text-start"
                          style={{ width: "50%", float: "left" }}
                        >
                          {Math.floor(soldPercentage)}%
                        </p>
                        <div
                          className="progress"
                          style={{
                            width: "50%",
                            float: "right",
                            marginTop: "5px",
                          }}
                        >
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: Math.floor(soldPercentage) + "%" }}
                            aria-valuenow="0"
                            aria-valuemin="0"
                            // aria-valuemax="100"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm col-6 time-row px-0 ">
                    <p className="p-one-t text-center">Frequency :</p>
                    <p className="p-two-t text-center">
                      {frequency?.daily?.length > 0 ? (
                        <span
                          className={
                            frequency?.weekly?.length > 0
                              ? "border-end pe-2"
                              : "pe-2"
                          }
                        >
                          Daily
                        </span>
                      ) : (
                        ""
                      )}
                      {frequency?.weekly?.length > 0 ? (
                        <span className="px-2">Weekly</span>
                      ) : (
                        ""
                      )}
                      {frequency?.monthly?.length > 0 ? (
                        <span
                          className={
                            frequency?.weekly?.length > 0 ||
                            frequency?.daily?.length > 0
                              ? "border-start ps-2"
                              : "ps-2"
                          }
                        >
                          Monthly
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <div className="col-lg-3 col-sm col-3 ps-0">
                    <div className="time-row">
                      <p className="p-one-t text-end">Status :</p>
                      {/* <p className="p-two-t text-end"> */}
                      {Number(props?.sold) * Number(props?.ticketPrice) >=
                        Number(props?.minPrizePool) ||
                      new Date() === new Date(props.gameDuration) ||
                      props.totalDraw ? (
                        <p className="p-two-t text-end">Running</p>
                      ) : (
                        <p
                          className="p-two-t text-start "
                          style={{ width: "100px" }}
                        >
                          Waiting For Draw
                        </p>
                      )}
                      {/* </p> */}
                    </div>
                  </div>
                </div>
                <Link
                  to={
                    "/lotteries/" +
                    props?.gameName
                      .toLowerCase()
                      .trim()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/[\s_-]+/g, "-")
                      .replace(/^-+|-+$/g, "") +
                    "?" +
                    encrypt(props?.id.toString())
                  }
                  state={{ id: props?.id, ticket: props }}
                  className="btn btn-outline-primary w-100 py-sm-1 mt-lg-3 mt-1"
                  onClick={() => localStorage.removeItem("lotteryTicketList")}
                >
                  Buy Ticket
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // <div className="card">
  //     <div className="card-body p-0">
  //         <div className="row">
  //             <div className="col-lg-3 col-sm col-3 pe-0" style={props.image ? {backgroundImage: "url('"+props.image+"')", backgroundSize: "cover", backgroundClip: "content-box"} : {backgroundImage: "url('assets/images/Mask-group.png')", backgroundSize: "cover", backgroundClip: "content-box"}}></div>
  //             <div className="col-lg-9 col-sm col-9 pylg-4 py-lg-3 py-2" style={{backgroundColor: "#ffffff"}}>
  //                 <div className="row">
  //                     <div className="col-lg-9 col-sm col-8">
  //                         <h5 className="fw-bold">{props.gameName}</h5>
  //                         <p className="font-xs mb-0">{props.gameSlogan}</p>
  //                     </div>
  //                     <div className="col-lg-3 col-sm col-4 time-row">
  //                         <p className="p-one-t">End Date</p>
  //                         <p className="p-two-t">{props.gameDuration}</p>
  //                     </div>
  //                 </div>
  //                 <div className="row mt-lg-2 mt-1">
  //                     <div className="col-lg-10 col-sm col-8 d-flex justify-content-left align-items-center">
  //                         <Icon icon={"bxs:badge-"+props.Currency.name} style={{fontSize: 40}} />
  //                         <h2 className="p-rs">{props.Currency.code}{props.ticketPrice}</h2>
  //                     </div>
  //                     <div className="col-lg-2 col-sm col-4">
  //                         <div className="time-row">
  //                             <p className="p-one-t text-end">Sold :</p>
  //                             <p className="p-two-t text-end">{props.sold && props.sold !== "null" ? (Number(props.sold)/Number(props.maxNumberTickets))*100 : 0}%</p>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <div className="row mt-lg-2 mt-1">
  //                     <div className="col-lg-4 col-sm col-4 pe-0">
  //                         <div className="time-row">
  //                             <p className="p-one-t text-start">Min Prize Pool :</p>
  //                             <p className="p-two-t text-start">{props.Currency.code}{props.minPrizePool}</p>
  //                         </div>
  //                     </div>
  //                     <div className="col-lg-8 col-sm col-8">
  //                         <div className="row">
  //                             <div className="col-lg-7 col-sm col-4 time-row px-0 ">
  //                                 <p className="p-one-t text-center">Frequency :</p>
  //                                 <p className="p-two-t text-center"><span className="border-end pe-2">Daily</span><span className="px-2 text-muted ">Weekly</span><span className="text-muted border-start ps-2">Monthly</span></p>
  //                             </div>
  //                             <div className="col-lg-5 col-sm col-8 ps-0">
  //                                 <div className="time-row">
  //                                     <p className="p-one-t text-end">Status :</p>
  //                                     <p className="p-two-t text-end">{Number(props.minPrizePool)/Number(props.ticketPrice) === Number(props.sold) ? "Running" : "Waiting For Draw"}</p>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <Link to={"/lotteries/"+props.gameName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')} state={{ id: props.id }} className="btn btn-outline-primary w-100 py-sm-1 mt-lg-3 mt-1">Buy Ticket</Link>
  //             </div>
  //         </div>
  //     </div>
  // </div>

  // <div className="card" style={props.image ? {backgroundImage: "url('"+props.image+"')"} : {backgroundImage: "url('assets/images/Mask-group.png')"}}>
  //     <div className="card-body p-0">
  //         <div className="row">
  //             <div className="col-lg-3 col-sm col-3"></div>
  //             <div className="col-lg-9 col-sm col-9 pylg-4 py-lg-3 py-2 px-lg-5 px-3" style={{backgroundColor: "#ffffff"}}>
  //                 <div className="row">
  //                     <div className="col-lg-12 col-sm col-12">
  //                         <h4>{props.gameName}</h4>
  //                     </div>
  //                 </div>
  //                 <div className="row mt-lg-3 mt-1">
  //                     <div
  //                         className="col-lg-9 col-sm col-8 d-flex justify-content-left align-items-center">
  //                         <img className="img-fluid" src={"assets/images/Vector-5.png"} alt="" />
  //                         <h2 className="p-rs">{props.ticketPrice}</h2>
  //                     </div>
  //                     <div className="col-lg-3 col-sm col-4 time-row">
  //                         <p className="p-one-t">Duration</p>
  //                         <p className="p-two-t">{props.gameDuration}</p>
  //                     </div>
  //                 </div>
  //                 <div className="row mt-lg-3 mt-1">
  //                     <div className="col-lg-4 col-sm col-4">
  //                         <div className="time-row">
  //                             <p className="p-one-t text-start">Start Time</p>
  //                             <p className="p-two-t text-start">{props.startTime}</p>
  //                         </div>
  //                     </div>
  //                     <div className="col-lg-8 col-sm col-8">
  //                         <div className="row">
  //                             <div className="col-lg-3 col-sm col-4">
  //                                 <div className="time-row">
  //                                     <p className="p-one-t text-start">Sold :</p>
  //                                     <p className="p-two-t text-start">0%</p>
  //                                 </div>
  //                             </div>
  //                             <div className="col-lg-9 col-sm col-8">
  //                                 <div className="progress mt-4">
  //                                     <div className="progress-bar bg-warning" role="progressbar"
  //                                         style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0"
  //                                         aria-valuemax="100"></div>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <Link to={"/lotteries/"+props.gameName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')+"-"+props.id} className="btn btn-outline-primary w-100 py-sm-1 mt-lg-3 mt-1">Buy Ticket</Link>
  //             </div>
  //         </div>
  //     </div>
  // </div>
}
