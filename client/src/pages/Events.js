import eventStyle from "../styles/event.module.css";

//icons and processing spinner
import { TailSpin } from "react-loader-spinner";
import { FiSearch } from "react-icons/fi";

import { Link } from "react-router-dom";
import { Event } from "../components/Event";
import { useEffect, useState } from "react";
import axios from "axios";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [serachResult, setSearchResult] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //fetch events
  const fetchEvents = () => {
    setProcessing(true);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("eventId");
    try {
      axios.get("/api/events/").then((res) => {
        filterEvents(res.data.data.Items);
        setProcessing(false);
        setError(false);
      });
    } catch (error) {
      console.log(error);
      setProcessing(false);
      setError(true);
    }
  };

  //get end date
  const getEndDate = (date, days) => {
    var startDate = new Date(date);
    startDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    var milisec =
      parseInt(days) * 1000 * 3600 * 24 + startDate.getTime();
    var endDate = new Date(milisec);
    return endDate;
  };

  //filter the events by remove finished events
  const filterEvents = (events) => {
    var filtered = events.filter(item => {
      var endDate = getEndDate(item.date, item.days);
      return endDate > new Date();
    });
    setEvents(filtered);
  }

  //handle inputs of the search box
  const handleSearch = (e) => {
    var keyword = e.target.value;
    if (keyword !== "") {
      var temp = events.filter((item) =>
        item.name.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setSearchResult(temp);
    } else {
      setSearchResult([]);
    }
  };

  //generating the events
  const EventTile =
    serachResult.length > 0
      ? serachResult.map((event) => {
        return <Event key={event.id} event={event} />;
      })
      : events.map((event) => {
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
