import style from "../styles/booking.module.css";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

//import { useState } from "react";

export const DateTime = ({ handleStep }) => {
  //const [date, onDateChange] = useState(new Date());

  return (
    <div className={style.outer}>
      <div className={style.DateTime}>
        <div className={style.calendarContainer}>
          <div className={style.helptext}>
            <p>Select a Date</p>
          </div>
          <div className={style.navigation}>
            <button>
              <FaAngleLeft />
            </button>
            <p>Dec 2023</p>
            <button>
              <FaAngleRight />
            </button>
          </div>
          <div className={style.weekDays}>
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </div>
          <div className={style.days}></div>
        </div>
      </div>
      <div className={style.buttons}>
        <button
          className={style.nextBtn}
          onClick={() => {
            handleStep("CustomerDetails");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
