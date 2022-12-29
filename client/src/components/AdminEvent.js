import dashboard from "../styles/dashboard.module.css";

import { SlOptions } from "react-icons/sl";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import {
  BsFillPersonFill,
  BsFillClockFill,
  BsFillCalendarEventFill,
} from "react-icons/bs";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminEvents = ({ event, showDelete, showDetails, clicked }) => {
  const details = event.event; //assigning the events to details
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

  const [options, setOptions] = useState(false);
  const [slotsCount, setCount] = useState(0);
  const [status, setStatus] = useState("");

  const navigate = useNavigate(); //navigate router

  useEffect(() => {
    fetchCount();
    eventStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //fetch the count of slots
  const fetchCount = () => {
    try {
      axios.get(`/api/slots/${event.id}`).then((res) => {
        setCount(res.data.data.Count);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //show the event details for the event
  const eventStatus = () => {
    var startDate = new Date(details.date);
    startDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    var milisec =
      parseInt(details.days) * 1000 * 3600 * 24 + startDate.getTime();
    var endDate = new Date(milisec);

    if (startDate > new Date()) {
      setStatus(
        <p style={{ color: "#FF9800" }}>
          Upcomming
        </p>
      );
    } else if (endDate > new Date()) {
      setStatus(
        <p style={{ color: "#4CAF50" }}>
          Active
        </p>
      );
    } else {
      setStatus(
        <p style={{ color: "#F44336" }}>
          Completed
        </p>
      );
    }
  };

  //edit event
  const editEvent = () => {
    sessionStorage.setItem("eventId", JSON.stringify(event.id));
    navigate("/create");
  };

  //show details of the event
  const detailsTrigger = () => {
    showDetails(event.id);

  }

  return (
    <div className={dashboard.event} style={clicked ? { backgroundColor: "#F5F5F5", boxShadow: "none" } : {}}>
      <div className={dashboard.top}>
        <div className={dashboard.titleinfo}>
          <h3>{details.name}</h3>
          {details.meetType === "online" ? <p>Online</p> : <p>Offline</p>}
        </div>
        <div className={dashboard.options}>
          <button
            onClick={() => {
              setOptions((prev) => !prev);
            }}
          >
            <SlOptions />
          </button>
          {options ? (
            <div className={dashboard.option}>
              <button onClick={editEvent}>
                <span>
                  <FiEdit />
                </span>
                Edit
              </button>
              <button
                onClick={() => {
                  showDelete(event.id);
                }}
              >
                <span>
                  <MdDeleteOutline />
                </span>
                Delete
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className={dashboard.content}>
        <div className={dashboard.info1}>
          <p>
            <span>
              <BsFillClockFill />
            </span>
            {`${details.duration} ${details.durationFormat}`}
          </p>
          <p>
            <span>
              <BsFillCalendarEventFill />
            </span>
            {`${new Date(details.date).getDate()} ${months[new Date(details.date).getMonth()]
              } ${new Date(details.date).getFullYear()}`}
          </p>
          <p>
            <span>
              <BsFillPersonFill />
            </span>
            {`${slotsCount} Booking`}
          </p>
        </div>
        <div className={dashboard.info2}>{status}</div>
        <button onClick={detailsTrigger}>View Booking</button>
      </div>
    </div>
  );
};
