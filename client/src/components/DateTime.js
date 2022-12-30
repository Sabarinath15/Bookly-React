import style from "../styles/booking.module.css";

import { useState } from "react";

export const DateTime = ({ handleStep }) => {
  const [date, onDateChange] = useState(new Date());

  return (
    <div className={style.outer}>
      <div className={style.DateTime}>
        <div className={style.calendarContainer}></div>
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
