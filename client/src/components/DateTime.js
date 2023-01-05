import style from "../styles/booking.module.css";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const DateTime = ({ handleStep, eventDetails, saveDateTime }) => {
  var event = eventDetails.event;
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
  const [timeArray, setTimeArray] = useState([]); //slots time array for gen. slots
  const [selectedTime, setSelectedTime] = useState(""); //seleced time of the slots
  const [bookedSlots, setBookedSlots] = useState([]); //booked slots of the selected day

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
      setSelectedDate(0);
      generateCalendar();
    }
    if (direction === "next" && temp.getMonth() + 1 <= endDate.getMonth()) {
      setDate(new Date(temp.setMonth(temp.getMonth() + 1)));
      setSelectedTime("");
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
      thatDay > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
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
            generateSlots(value);
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

  //time
  //generating the time slots
  const generateSlots = async (value) => {
    var pickedDate = new Date(date.getFullYear(), date.getMonth(), value);
    var startString =
      event.timing[pickedDate.toString().substring(0, 3).toLowerCase()].start;
    var endString =
      event.timing[pickedDate.toString().substring(0, 3).toLowerCase()].end;
    var startTime =
      parseInt(startString.split(":")[0]) * 60 +
      parseInt(startString.split(":")[1]);
    var endTime =
      parseInt(endString.split(":")[0]) * 60 +
      parseInt(endString.split(":")[1]);
    var duartion = parseInt(event.duration);
    var timeArray = [];
    for (let i = startTime; i < endTime; i += duartion) {
      timeArray.push(i);
    }
    await fetchBookedSlots(value)
    setTimeArray(timeArray);
  };

  //fetch the booked slots
  const fetchBookedSlots = async (dateValue) => {
    var tempDate = new Date(date.getFullYear(), date.getMonth(), dateValue);
    var tempArray = [];
    axios.get(`/api/slots/${eventDetails.id}`).then(res => {
      tempArray = res.data.data.Items.map(item => {
        if (tempDate.toDateString() === new Date(item.slot.date).toDateString()) {
          return item.slot.time;
        } else {
          return null;
        }
      });
      setBookedSlots(tempArray);
    })
  }

  //create the time slot
  const createSlot = (time) => {
    var hour =
      Math.trunc(time / 60) > 12
        ? Math.trunc(time / 60) - 12
        : Math.trunc(time / 60);
    hour = hour < 10 ? "0" + hour : hour;
    var minutes = time % 60 === 0 ? "0" + (time % 60) : time % 60;
    if (bookedSlots.includes(`${hour}:${minutes} ${time < 720 ? "AM" : "PM"}`)) {
      return (
        <li
          key={time}
          style={{
            color: "#2962ff",
            fontWeight: "400",
            backgroundColor: "#F5F5F5",
            pointerEvents: "none"
          }}
        >
          {`${hour}:${minutes}`}
          <span>{time < 720 ? "AM" : "PM"}</span>
        </li>
      );
    } else {
      return (
        <li
          key={time}
          style={
            selectedTime === `${hour}:${minutes} ${time < 720 ? "AM" : "PM"}`
              ? {
                color: "#2962ff",
                cursor: "pointer",
                fontWeight: "600",
                backgroundColor: "#E3F2FD",
              }
              : {}
          }
          onClick={() => {
            setSelectedTime(`${hour}:${minutes} ${time < 720 ? "AM" : "PM"}`);
          }}
        >
          {`${hour}:${minutes}`}
          <span>{time < 720 ? "AM" : "PM"}</span>
        </li>
      );
    }
  };

  //generating the elements by map
  const TimeElements = timeArray.map((item) => createSlot(item));

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
        <div className={style.timeContainer}>
          {selectedDate ? (
            <>
              <div className={style.helptext}>
                <p>Select a slot</p>
              </div>
              <div className={style.slots}>{TimeElements}</div>
            </>
          ) : (
            <div className={style.timehelp}>
              <p>Select a date to view time slots.</p>
            </div>
          )}
        </div>
      </div>
      <div className={style.buttons}>
        <button
          className={style.nextBtn}
          disabled={selectedDate === 0 || selectedTime === "" ? true : false}
          onClick={() => {
            saveDateTime(
              new Date(date.getFullYear(), date.getMonth(), selectedDate),
              selectedTime
            );
            handleStep("CustomerDetails");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
