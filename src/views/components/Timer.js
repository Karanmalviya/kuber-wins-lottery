import React, { useState, useEffect } from "react";
import moment from "moment";

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    // Clear interval on unmount to avoid memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="row text-center">
      <div className="col-12 m-0 p-0 mt-0 mb-2">
        <p className="m-0 p-0">Current Time</p>
      </div>
      <div className="col-4 border-end brd-yellow justify-content-center curr-inside">
        <h1 className="fw-bold m-0">{currentTime.format("HH")} </h1>
        <p className="p-0 m-0">Hour</p>
      </div>
      <div className="col-4 border-end brd-yellow justify-content-center curr-inside">
        <h1 className="fw-bold m-0">{currentTime.format("mm")}</h1>{" "}
        <p className="p-0 m-0">Minutes</p>
      </div>
      <div className="col-4 justify-content-center curr-inside">
        <h1 className="fw-bold m-0">{currentTime.format("ss")}</h1>{" "}
        <p className="p-0 m-0">Seconds</p>
      </div>
      <div className="col-12 d-inline-flex mt-2 justify-content-center">
        <p className="p-0 m-0">{currentTime.format("Do MMM, YYYY")}</p>
      </div>
    </div>
  );
};

export default Timer;
