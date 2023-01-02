import style from "../styles/booking.module.css";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const DateTime = ({ handleStep, event }) => {
  //console.log(event);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novmber",
    "December",
  ];

  useEffect(() => {
    generateCalendar();
    getEndDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [date, setDate] = useState(new Date()); //date state
  const [dateArray, setDateArray] = useState([]); //month date array for generate calendar
  const [endDate, setEndDate] = useState(new Date()); //end date of the event
  const [selectedDate, setSelectedDate] = useState(0); //selected date of the calendar

  //generate date
  const generateCalendar = () => {
    var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var arrayOfDate = [];
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      arrayOfDate.push("");
    }
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      arrayOfDate.push(i);
    }
    setDateArray(arrayOfDate);
  };

  //get end date
  const getEndDate = () => {
    var startDate = new Date(event.date);
    startDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    var milisec = parseInt(event.days) * 1000 * 3600 * 24 + startDate.getTime();
    var endDate = new Date(milisec);
    setEndDate(endDate);
  };

  //navigation between the months
  const navigateCalendar = (direction) => {
    var temp = date;
    if (direction === "prev" && temp.getMonth() - 1 >= new Date().getMonth()) {
      setDate(new Date(temp.setMonth(temp.getMonth() - 1)));
      generateCalendar();
    }
    if (direction === "next" && temp.getMonth() + 1 <= endDate.getMonth()) {
      setDate(new Date(temp.setMonth(temp.getMonth() + 1)));
      generateCalendar();
    }
  };

  //costomize the week days in the data passed
  const availableDays = event.weekDays.map((item) => {
    var temp = item.substring(0, 3);
    temp = temp[0].toUpperCase() + temp.substring(1);
    return temp;
  });

  //checking the dates is available and return a date element
  const createDateElement = (value) => {
    var isAvailable = false;
    var thatDay = new Date(date.getFullYear(), date.getMonth(), value);

    if (
      thatDay <= endDate &&
      (thatDay > new Date(event.date) ||
        thatDay.toDateString() === new Date(event.date).toDateString())
    ) {
      if (availableDays.includes(thatDay.toDateString().substring(0, 3))) {
        isAvailable = true;
      }
    }

    if (isAvailable) {
      return (
        <li
          key={value}
          style={
            selectedDate === value
              ? {
                  color: "#2962ff",
                  cursor: "pointer",
                  fontWeight: "600",
                  backgroundColor: "#E3F2FD",
                }
              : { color: "#2962ff", cursor: "pointer", fontWeight: "500" }
          }
          onClick={() => {
            setSelectedDate(value);
          }}
        >
          {value}
        </li>
      );
    } else {
      return <li key={value}>{value}</li>;
    }
  };

  //create the dates using map\
  const DateElement = dateArray.map((item) => {
    if (item === "") {
      return <li key={uuidv4()}></li>;
    } else {
      return createDateElement(item);
    }
  });

  return (
    <div className={style.outer}>
      <div className={style.DateTime}>
        <div className={style.calendarContainer}>
          <div className={style.helptext}>
            <p>Select a Date</p>
          </div>
          <div className={style.navigation}>
            <button onClick={() => navigateCalendar("prev")}>
              <FaAngleLeft />
            </button>
            <p>{`${months[date.getMonth()]} ${date.getFullYear()}`}</p>
            <button onClick={() => navigateCalendar("next")}>
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
          <div className={style.days}>{DateElement}</div>
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
