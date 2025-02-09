import React, { useState, useEffect } from "react";
import moment from "moment";

function ScratchCoutDown({
  frequency,
  targetDate,
  targetDay,
  startTimeDate,
  type,
}) {
  const [countdown, setCountdown] = useState("");
  const [startTime, setStartTime] = useState("00:00");

  function convertUTCToLocal(utcTimeStr) {
    const utcTime = moment.utc(utcTimeStr, "HH:mm");
    const localTime = utcTime.local();
    return localTime.format("HH:mm");
  }

  useEffect(() => {
    if (startTimeDate) {
      setStartTime(convertUTCToLocal(startTimeDate));
    }
  }, [startTimeDate]);


  

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      let target = new Date();

      if (frequency === "Daily") {
        target.setDate(target.getDate() + 1);
      } else if (frequency === "Weekly") {
        const targetDayIndex = [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ].indexOf(targetDay);
        const currentDayIndex = now.getDay();
        let daysUntilTarget = 0;

        if (targetDayIndex > currentDayIndex) {
          daysUntilTarget = targetDayIndex - currentDayIndex;
        } else if (targetDayIndex < currentDayIndex) {
          daysUntilTarget = 7 - currentDayIndex + targetDayIndex;
        } else if (targetDayIndex === currentDayIndex) {
          const currentTime = now.getHours() * 60 + now.getMinutes();
          const targetTime =
            parseInt(startTime.split(":")[0]) * 60 +
            parseInt(startTime.split(":")[1]);

          if (currentTime < targetTime) {
            daysUntilTarget = 0;
          } else {
            daysUntilTarget = 7;
          }
        }

        target.setDate(now.getDate() + daysUntilTarget);
      } else if (frequency === "Monthly") {
        target.setMonth(now.getMonth());
        target.setDate(targetDate);
      }
      if (target.getTime() < now.getTime()) {
        target.setMonth(now.getMonth() + 1);
      }
      const targetTime = new Date(`${target.toDateString()} ${startTime}`);
      const timeDiff = targetTime.getTime() - now.getTime();

      if (timeDiff > 0) {
        const days =
          frequency === "Daily"
            ? 0
            : Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          setTimeout(() => {
            window.location.reload();
          }, 80);
        }

        setCountdown(
          // type === "scratchCard" || type === "scratchPlay" ? (
          <div className="row d-flex justify-content-center align-items-center time-row">
            <div className="col-4 text-center">
              <h5 className="m-0 p-0">Reschedules in :</h5>
            </div>
            <div className="col-2 text-center ps-1 border-r">
              <h6 className="m-0 p-0">{days}</h6>
              <p className="m-0 p-0">Days</p>
            </div>
            <div className="col-2 text-center ps-1 border-r">
              <h6 className="m-0 p-0">{hours}</h6>
              <p className="m-0 p-0">Hours</p>
            </div>
            <div className="col-2 text-center ps-1 border-r">
              <h6 className="m-0 p-0">{minutes}</h6>
              <p className="m-0 p-0">Minutes</p>
            </div>
            <div className="col-2 text-center ps-1 border-r border-0">
              <h6 className="m-0 p-0">{seconds}</h6>
              <p className="m-0 p-0">Seconds</p>
            </div>
          </div>
          // ) : (
          //   `${days}:${hours}:${minutes}:${seconds}`
          // )
        );
      } else {
        setCountdown(
          <div className="row d-flex justify-content-center align-items-center time-row">
            <div className="col-4 text-center">
              <h5 className="m-0 p-0">Reschedules in :</h5>
            </div>
            <div className="col-2 text-center ps-1 border-r">
              <h6 className="m-0 p-0">0</h6>
              <p className="m-0 p-0">Days</p>
            </div>
            <div className="col-2 text-center ps-1 border-r">
              <h6 className="m-0 p-0">0</h6>
              <p className="m-0 p-0">Hours</p>
            </div>
            <div className="col-2 text-center ps-1 border-r">
              <h6 className="m-0 p-0">0</h6>
              <p className="m-0 p-0">Minutes</p>
            </div>
            <div className="col-2 text-center ps-1 border-r border-0">
              <h6 className="m-0 p-0">0</h6>
              <p className="m-0 p-0">Seconds</p>
            </div>
          </div>
        );
      }
    };

    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [frequency, targetDay, targetDate, startTime, type]);

  return <div>{countdown}</div>;
}

export default ScratchCoutDown;
