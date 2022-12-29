import eventStyle from "../styles/event.module.css";

import { BiBuildings } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

export const Event = ({ event }) => {
  const navigate = useNavigate(); //navigate router

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
    return `${new Date(endDate).getDate()} ${
      months[new Date(endDate).getMonth()]
    } ${new Date(endDate).getFullYear()}`;
  };

  //navigate to booking page
  const navToBooking = () => {
    sessionStorage.setItem("eventId", JSON.stringify(event.id));
    sessionStorage.setItem("userId", JSON.stringify(event.userId));
    navigate("/booking");
  };

  return (
    <div className={eventStyle.event}>
      <div className={eventStyle.title}>
        <div>
          <span>Event on</span>
          <h2>{details.name || ""}</h2>
        </div>
        <p>
          <span>
            <BiBuildings />
          </span>
          {details.orgName || ""}
        </p>
      </div>
      <div className={eventStyle.content}>
        {details.meetType === "online" ? (
          <p style={{ color: "#00c853" }}>Online</p>
        ) : (
          <p style={{ color: "#FF3D00" }}>Offline</p>
        )}
        <div className={eventStyle.details}>
          <div>
            <h4>Duration</h4>
            <p>{`${details.duration} ${details.durationFormat}`}</p>
          </div>
          <div>
            <h4>Available till</h4>
            <p>{getEndDate()}</p>
          </div>
        </div>
        <div className={eventStyle.button}>
          <button onClick={navToBooking}>Book Now</button>
        </div>
      </div>
    </div>
  );
};
