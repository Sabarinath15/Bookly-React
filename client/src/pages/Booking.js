import style from "../styles/booking.module.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//processing spinner
import { TailSpin } from "react-loader-spinner";

import { BookingProcess } from "../components/BookingProcess";

export const Booking = () => {
  const [event, setEvent] = useState({});
  const [process, setProcess] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  //fetching the event details from server
  const fetchEventDetails = async () => {
    setProcess(true);
    var eventId = await JSON.parse(sessionStorage.getItem("eventId"));
    var userId = await JSON.parse(sessionStorage.getItem("userId"));
    try {
      axios.get(`/api/events/event/${eventId}&${userId}`).then((res) => {
        setEvent(res.data.data.Item);
        setError(false);
        setProcess(false);
      });
    } catch (error) {
      setProcess(false);
      setError(true);
    }
  };

  //remove the id's form the storage
  const removeId = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("eventId");
  };
  return (
    <div className={style.main}>
      <div className={style.topbar}>
        <p>Bookly</p>
        <Link to="/events" onClick={removeId}>
          Back to Home
        </Link>
      </div>
      <div className={style.container}>
        {process ? (
          <div className={style.warnContainer}>
            <TailSpin
              height="60"
              width="60"
              color="#2962ff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : error ? (
          <div className={style.warnContainer}>
            <h1>Oops!...</h1>
            <p>something went wrong. Please try again.</p>
            <Link to="/events" onClick={removeId}>
              Go Back
            </Link>
          </div>
        ) : (
          <BookingProcess event={event} />
        )}
      </div>
    </div>
  );
};
