import eventStyle from "../styles/event.module.css";

import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import { FiSearch } from "react-icons/fi";

import { Event } from "../components/Event";
import { useEffect, useState } from "react";

export const Events = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  //fetch events
  const fetchEvents = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setError(false);
    }, 0);
  };

  //handle inputs of the search box
  const handleSearch = (e) => {
    console.log(e.target.value);
  };

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
              <>
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
