import eventStyle from "../styles/event.module.css";

import { BiBuildings } from "react-icons/bi";

export const Event = ({ event }) => {
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
          </span>{" "}
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
            <p>{`${new Date(details.date).getDate()} ${
              months[new Date(details.date).getMonth()]
            } ${new Date(details.date).getFullYear()}`}</p>
          </div>
        </div>
        <div className={eventStyle.button}>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  );
};
