import dashboard from "../styles/dashboard.module.css";

import { HiPlus } from "react-icons/hi";
import { TailSpin } from "react-loader-spinner";

import { EventDetails } from "./EventDetails";

import { AdminEvents } from "./AdminEvent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Slots } from "./Slots";

export const DashboardEvents = () => {
  //useeffect for fetch data
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [processing, setProcessing] = useState(true); //processing state
  const [eventsData, setEventsData] = useState([]); //events data  state
  const [popup, showPopup] = useState(false); //popup showing state
  const [eventId, setEventId] = useState(""); //set the eventId
  const [deleteProcess, setDeleteProcess] = useState(false); //detele processing state
  const [deleteStatus, setDeleteStatus] = useState({}); //delete status state
  const [details, setDetails] = useState(false); //details show state
  const [detailsProcess, setDetailsProcess] = useState(true); //details processing state
  const [eventDetials, setEventDetails] = useState({}); //event details state
  const [slotsDetails, setSlotDetails] = useState([]); //slots details state

  const navigate = useNavigate(); //navigate router

  //fetching the events by api
  const fetchEvents = async () => {
    var userId = await JSON.parse(sessionStorage.getItem("userId"));
    axios
      .get(`/api/events/${userId}`)
      .then((res) => {
        sortEvent(res.data.data.Items);
      })
      .catch((err) => {
        setProcessing(false);
        console.log(err);
      });
  };

  //sort the events
  const sortEvent = (items) => {
    var events = items.sort((val1, val2) =>
      val1.event.date > val2.event.date
        ? 1
        : val1.event.date < val2.event.date
          ? -1
          : 0
    );
    setTimeout(() => {
      setProcessing(false);
      setEventsData(events);
    }, 1000);
  };

  //hide popups
  const hidePopup = () => {
    showPopup(false);
    setDeleteStatus({});
    setProcessing(true);
    setEventId("");
    fetchEvents();
  };

  //delete function popup
  const showDelete = (eventId) => {
    showPopup(true);
    setEventId(eventId);
  };

  //delete event
  const deleteEvent = () => {
    setDeleteProcess(true);
    try {
      axios.get(`/api/slots/${eventId}`).then(async (res) => {
        if (res.data.data.Count === 0) {
          var userId = await JSON.parse(sessionStorage.getItem("userId"));
          axios.delete(`/api/events/event/${eventId}&${userId}`).then((res) => {
            setDeleteProcess(false);
            setDeleteStatus({
              main: "Event deleted successfully",
              sub: "This event can no more accessible.",
            });
            setDetails(false);
            setEventId("");
          });
        } else {
          setDeleteProcess(false);
          setEventId("");
          setDeleteStatus({
            main: "Can't delete this event.",
            sub: "This event Have some Booked slots, so can't delete this.",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //show details of the event
  const showDetails = async (eventId) => {
    setEventId(eventId);
    setDetails(true);
    setDetailsProcess(true);
    var userId = await JSON.parse(sessionStorage.getItem("userId"));
    try {
      axios.get(`/api/events/event/${eventId}&${userId}`).then((res) => {
        setEventDetails(res.data.data.Item);
      });
      axios.get(`/api/slots/${eventId}`).then((res) => {
        var slots = res.data.data.Items.sort((val1, val2) =>
          new Date(val1.slot.date) > new Date(val2.slot.date)
            ? 1
            : new Date(val1.slot.date) < new Date(val2.slot.date)
              ? -1
              : 0
        );
        setSlotDetails(slots);
      });
      setTimeout(() => {
        setDetailsProcess(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  //hideDetails
  const hideDetails = () => {
    setDetails(false);
    setEventId("");
  };

  //Generating the list of events
  const Events = eventsData.map((event) => (
    <AdminEvents
      key={event.id}
      event={event}
      showDelete={showDelete}
      showDetails={showDetails}
      clicked={eventId === event.id}
    />
  ));

  //generate the list of slots
  const SlotsElement = slotsDetails.map(item => (
    <Slots key={item.id} details={item} />
  ));

  return (
    // dashboard top content and create button
    <div className={dashboard.dashboardEvents}>
      <div className={dashboard.title}>
        <div className={dashboard.text}>
          <h2>Secheduled events</h2>
          <p>Manage and view the bookings by clicking the view booking.</p>
        </div>
        <button
          onClick={() => {
            navigate("/create");
          }}
        >
          <span>
            <HiPlus />
          </span>
          New event
        </button>
      </div>

      {/* events of the user */}
      <div className={dashboard.eventsContainer}>
        {processing ? (
          <div className={dashboard.processingCon}>
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
          <>
            <div
              className={dashboard.events}
              style={details ? { width: "360px" } : { width: "100%" }}
            >
              {Events}
            </div>
            {details ? (
              <div className={dashboard.detailsContainer}>
                {detailsProcess ? (
                  <div className={dashboard.processingCon}>
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
                  <>
                    <EventDetails
                      eventDetails={eventDetials}
                      hideDetails={hideDetails}
                    />
                    <div className={dashboard.slotsContainer}>
                      {slotsDetails.length === 0 ? (
                        <div className={dashboard.emptySlots}>
                          <h2>No booked slots!</h2>
                          <p>No slots are booked in this event.</p>
                        </div>
                      ) :
                        SlotsElement
                      }
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>
      {popup ? (
        <div className={dashboard.popupbg}>
          <div className={dashboard.popup}>
            <div className={dashboard.deleteContainer}>
              {deleteStatus.main ? null : (
                <img src="\assets\images\warning.png" alt="Alert" />
              )}
              <div>
                {deleteProcess ? (
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
                ) : deleteStatus.main ? (
                  <>
                    <h2>{deleteStatus.main || ""}</h2>
                    <p>{deleteStatus.sub || ""}</p>
                  </>
                ) : (
                  <>
                    <h3>Are you sure want to delete this event?</h3>
                    <p>This process can't be undone.</p>
                  </>
                )}
              </div>
              <div className={dashboard.buttons}>
                <button className={dashboard.cancelbtn} onClick={hidePopup}>
                  {deleteStatus.main ? "Ok" : "Cancel"}
                </button>
                {deleteStatus.main ? null : (
                  <button className={dashboard.deletebtn} onClick={deleteEvent}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
