import eventStyle from "../styles/event.module.css";

import { TailSpin } from "react-loader-spinner";
import { FiSearch } from "react-icons/fi";

import { Link } from "react-router-dom";
import { Event } from "../components/Event";
import { useEffect, useState } from "react";
import axios from "axios";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  //fetch events
  const fetchEvents = () => {
    setProcessing(true);
    try {
      axios.get("/api/events/").then((res) => {
        setEvents(res.data.data.Items);
      });
      setTimeout(() => {
        setProcessing(false);
        setError(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setProcessing(false);
      setError(true);
    }
  };

  //handle inputs of the search box
  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  //generating the events
  const EventTile = events.map((event) => {
    return <Event key={event.id} event={event} />;
  });

  return (
    <div className={eventStyle.main}>
      <div className={eventStyle.topbar}>
        <p>Bookly</p>
        <Link to="/">Back to Home</Link>
      </div>
      <div className={eventStyle.container}>
        <div className={eventStyle.head}>
          <div className={eventStyle.text}>
            <h2>Available events for you</h2>
            <p>Select any available event and book your slots.</p>
          </div>
          <div className={eventStyle.search}>
            <span>
              <FiSearch />
            </span>
            <input
              type="search"
              name="search"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </div>
        {processing ? (
          <div className={eventStyle.process}>
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
        ) : (
          <div className={eventStyle.eventsContainer}>
            {error ? (
              <div className={eventStyle.error}>
                <div>
                  <h1>Oops!...</h1>
                  <p>Something went wrong. Please tray again.</p>
                </div>
              </div>
            ) : (
              <>{EventTile}</>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
