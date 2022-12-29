import eventStyle from "../styles/event.module.css";

import { BsFillClockFill, BsFillCalendarEventFill } from "react-icons/bs";

export const Event = () => {
  return <div className={eventStyle.event}></div>;
};

// eslint-disable-next-line no-lone-blocks
{
  /* <div className={eventStyle.mode}>
        <p>Online</p>
      </div>
      <div className={eventStyle.title}>
        <h3>Event name</h3>
        <p>Organisation name</p>
      </div>
      <div className={eventStyle.details}>
        <p>
          <span>
            <BsFillClockFill />
          </span>
          30 Minutes
        </p>
        <p>
          <span>
            <BsFillCalendarEventFill />
          </span>
          <div>
            <h5>Available till</h5>
            <p>29 Dec 2022</p>
          </div>
        </p>
      </div>
      <button>Book Now</button> */
}
