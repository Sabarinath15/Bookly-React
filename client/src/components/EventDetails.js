import dashboard from "../styles/dashboard.module.css";

import { IoClose } from "react-icons/io5";
import {
  BsFillClockFill,
  BsFillCalendarEventFill,
  BsCalendar2Fill,
} from "react-icons/bs";

export const EventDetails = ({ eventDetails, hideDetails }) => {

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
  const DaysTiming = eventDetails.weekDays.map((item) => {
    return (
      <div className={dashboard.day} key={item}>
        <p>{item.substring(0, 3)}</p>
        <span className={dashboard.time}>{`${eventDetails.timing[item.substring(0, 3)].start
          } - ${eventDetails.timing[item.substring(0, 3)].end}`}</span>
      </div>
    );
  });

  return (
    <div className={dashboard.container1}>
      <div className={dashboard.detail1}>
        <div>
          <h3>{eventDetails.name}</h3>
          <p>{eventDetails.meetType}</p>
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
            {`${new Date(eventDetails.date).getDate()} ${months[new Date(eventDetails.date).getMonth()]
              } ${new Date(eventDetails.date).getFullYear()}`}
          </p>
          <p>
            <span>
              <BsFillClockFill />
            </span>
            {`${eventDetails.duration} ${eventDetails.durationFormat}`}
          </p>
          <p>
            <span>
              <BsCalendar2Fill />
            </span>
            {`${eventDetails.days} Days`}
          </p>
        </div>
        <div className={dashboard.description}>
          <h4>About</h4>
          <p>
            {eventDetails.description || "There is no descriptions about the event."}
          </p>
        </div>
        <div className={dashboard.venue}>
          <h4>{eventDetails.meetType === "online" ? "Meet Link" : "Address"}</h4>
          <p>
            {eventDetails.meetType === "online"
              ? eventDetails.meetlink
              : `${eventDetails.address1}, ${eventDetails.address2}, ${eventDetails.address3}, ${eventDetails.address4}, ${eventDetails.address5}.`}
          </p>
        </div>
      </div>
      <div className={dashboard.detail3}>{DaysTiming}</div>
    </div>
  );
};
