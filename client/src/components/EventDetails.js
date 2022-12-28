import dashboard from "../styles/dashboard.module.css";

import { IoClose } from "react-icons/io5";
import {
  BsFillClockFill,
  BsFillCalendarEventFill,
  BsCalendar2Fill,
} from "react-icons/bs";

export const EventDetails = ({ eventDetails, hideDetails }) => {
  var details = eventDetails.event;
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

  //generate days and timing
  const DaysTiming = details.weekDays.map((item) => {
    return (
      <div className={dashboard.day} key={item}>
        <p>{item.substring(0, 3)}</p>
        <span className={dashboard.time}>{`${
          details.timing[item.substring(0, 3)].start
        } - ${details.timing[item.substring(0, 3)].end}`}</span>
      </div>
    );
  });

  return (
    <div className={dashboard.container1}>
      <div className={dashboard.detail1}>
        <div>
          <h3>{details.name}</h3>
          <p>{details.meetType}</p>
        </div>
        <button
          onClick={() => {
            hideDetails();
          }}
        >
          <IoClose />
        </button>
      </div>
      <div className={dashboard.detail2}>
        <div className={dashboard.othersdetails}>
          <p>
            <span>
              <BsFillCalendarEventFill />
            </span>
            {`${new Date(details.date).getDate()} ${
              months[new Date(details.date).getMonth()]
            } ${new Date(details.date).getFullYear()}`}
          </p>
          <p>
            <span>
              <BsFillClockFill />
            </span>
            {`${details.duration} ${details.durationFormat}`}
          </p>
          <p>
            <span>
              <BsCalendar2Fill />
            </span>
            {`${details.days} Days`}
          </p>
        </div>
        <div className={dashboard.description}>
          <h4>About</h4>
          <p>
            {details.description || "There is no descriptions about the event."}
          </p>
        </div>
        <div className={dashboard.venue}>
          <h4>{details.meetType === "online" ? "Meet Link" : "Address"}</h4>
          <p>
            {details.meetType === "online"
              ? details.meetlink
              : `${details.address1}, ${details.address2}, ${details.address3}, ${details.address4}, ${details.address5}.`}
          </p>
        </div>
      </div>
      <div className={dashboard.detail3}>{DaysTiming}</div>
    </div>
  );
};
