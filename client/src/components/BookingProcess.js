import style from "../styles/booking.module.css";

import { BiBuildings } from "react-icons/bi";
import { useState } from "react";

import { DateTime } from "./DateTime";

export const BookingProcess = ({ event }) => {
  const details = event.event;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [steps, setSteps] = useState("DateTime");

  //setting the step
  const handleStep = (value) => {
    setSteps(value);
  };

  //get end date
  const getEndDate = () => {
    var startDate = new Date(details.date);
    startDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    var milisec =
      parseInt(details.days) * 1000 * 3600 * 24 + startDate.getTime();
    var endDate = new Date(milisec);
    return `${new Date(endDate).getDate()} ${months[new Date(endDate).getMonth()]
      } ${new Date(endDate).getFullYear()}`;
  };

  return (
    <div className={style.bookingContainer}>
      <div className={style.detail}>
        <div className={style.title}>
          <p>Bookly</p>
          <h2>{details.name}</h2>
        </div>
        <div className={style.mode}>
          {details.meetType === "online" ? (
            <p style={{ color: "#00c853" }}>Online</p>
          ) : (
            <p style={{ color: "#FF3D00" }}>Offline</p>
          )}
        </div>
        {details.description && (
          <div className={style.about}>
            <h4>About</h4>
            <p>{details.description}</p>
          </div>
        )}
        <div className={style.others}>
          <div>
            <h4>Duration</h4>
            <p>{`${details.duration} ${details.durationFormat}`}</p>
          </div>
          <div>
            <h4>Available till</h4>
            <p>{getEndDate()}</p>
          </div>
        </div>
        <div className={style.admin}>
          <p>
            <span>
              <BiBuildings />
            </span>
            {details.orgName || ""}
          </p>
        </div>
      </div>

      {/* Process of the booking */}
      <div className={style.process}>
        <div className={style.processbar}>
          <div className={steps === "DateTime" ? style.onStep : style.step}>
            <span>1</span>
            <p>Confirm Date & Time</p>
          </div>
          <div
            className={steps === "CustomerDetails" ? style.onStep : style.step}
          >
            <span>2</span>
            <p>Customer Details</p>
          </div>
          <div className={steps === "Confirm" ? style.onStep : style.step}>
            <span>3</span>
            <p>Confirm Appointment</p>
          </div>
        </div>
        <div className={style.mainContainer}>
          {steps === "DateTime" && <DateTime handleStep={handleStep} />}
          {steps === "CustomerDetails" && (
            <div className={style.outer}>
              <div className={style.Customer}>Customer details</div>
              <div className={style.buttons}>
                <button
                  onClick={() => {
                    handleStep("DateTime");
                  }}
                  className={style.backBtn}
                >
                  Back
                </button>
                <button
                  className={style.nextBtn}
                  onClick={() => {
                    handleStep("Confirm");
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {steps === "Confirm" && (
            <div className={style.outer}>
              <div className={style.Confirm}>Confirm</div>
              <div className={style.buttons}>
                <button
                  onClick={() => {
                    handleStep("CustomerDetails");
                  }}
                  className={style.backBtn}
                >
                  Back
                </button>
                <button className={style.nextBtn}>Confirm</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
