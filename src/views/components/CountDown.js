import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment-timezone";

export default function CountDown({ props }) {
  function convertUTCToLocalDateTime(utcTimeString) {
    const userTimezone = moment.tz.guess();
    const localTime = moment.utc(utcTimeString).tz(userTimezone);
    const formattedLocalTime = localTime.format("YYYY-MM-DD HH:mm");
    return formattedLocalTime;
  }

  const useCountdown = (targetDate, frequency) => {
    const countDownDate = new Date(targetDate).getTime();
    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    );
    useEffect(() => {
      const interval = setInterval(() => {
        const remainingTime = countDownDate - new Date().getTime();
        setCountDown(remainingTime);
      }, 1000);

      return () => clearInterval(interval);
    }, [countDownDate, frequency, targetDate]);

    return getReturnValues(countDown);
  };

  const getReturnValues = (countDown) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  };

  const [days, hours, minutes, seconds] = useCountdown(
    convertUTCToLocalDateTime(props.dateTime),
    props.frequency
  );

  useEffect(() => {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 80);

      return () => clearTimeout(timeout);
    }
  }, [days, hours, minutes, seconds]);

  return props?.type === "ticket" ? (
    <div className="btn-timer d-flex justify-content-center">
      <span>
        {days === "NaN" || days <= 0
          ? ""
          : days === 1
          ? isNaN(days)
            ? 0 + ":"
            : days + "day "
          : isNaN(days)
          ? 0 + ":"
          : days + "days "}
      </span>
      &nbsp;
      {(hours === "NaN" || hours <= 0
        ? 0
        : hours.toString().length === 1
        ? "0" + hours
        : isNaN(hours)
        ? 0
        : hours) +
        ":" +
        (minutes === "NaN" || minutes <= 0
          ? 0
          : minutes.toString().length === 1
          ? "0" + minutes
          : isNaN(minutes)
          ? 0
          : minutes) +
        ":" +
        (seconds === "NaN" || seconds <= 0
          ? 0
          : seconds.toString().length === 1
          ? "0" + seconds
          : isNaN(seconds)
          ? 0
          : seconds)}
    </div>
  ) : props?.type === "winner" ? (
    <span>
      {days === "NaN" || days <= 0
        ? ""
        : days === 1
        ? isNaN(days)
          ? 0 + ":"
          : days + "day "
        : isNaN(days)
        ? 0 + ":"
        : days + "days "}
      {(hours === "NaN" || hours <= 0
        ? 0
        : hours.toString().length === 1
        ? "0" + hours
        : isNaN(hours)
        ? 0
        : hours) +
        ":" +
        (minutes === "NaN" || minutes <= 0
          ? 0
          : minutes.toString().length === 1
          ? "0" + minutes
          : isNaN(minutes)
          ? 0
          : minutes) +
        ":" +
        (seconds === "NaN" || seconds <= 0
          ? 0
          : seconds.toString().length === 1
          ? "0" + seconds
          : isNaN(seconds)
          ? 0
          : seconds)}
    </span>
  ) : (
    <div className="row">
      <div className="col-3 border-end brd-yellow">
        <h1 className="fw-bold m-0">
          {days === "NaN" || days <= 0 ? 0 : isNaN(days) ? 0 : days}
        </h1>
        <p className="p-0 m-0">{days === 1 || days === 0 ? "Day" : "Days"}</p>
      </div>
      <div className="col-3 border-end brd-yellow">
        <h1 className="fw-bold m-0">
          {hours === "NaN" || hours <= 0 ? 0 : isNaN(hours) ? 0 : hours}
        </h1>
        <p className="p-0 m-0">
          {hours === 1 || hours === 0 ? "Hour" : "Hours"}
        </p>
      </div>
      <div className="col-3 border-end brd-yellow">
        <h1 className="fw-bold m-0">
          {minutes === "NaN" || minutes <= 0 ? 0 : isNaN(minutes) ? 0 : minutes}
        </h1>
        <p className="p-0 m-0">
          {minutes === 1 || minutes === 0 ? "Minute" : "Minutes"}
        </p>
      </div>
      <div className="col-3">
        <h1 className="fw-bold m-0">
          {seconds === "NaN" || seconds <= 0 ? 0 : isNaN(seconds) ? 0 : seconds}
        </h1>
        <p className="p-0 m-0">
          {seconds === 1 || seconds === 0 ? "Second" : "Seconds"}
        </p>
      </div>
    </div>
  );
}
