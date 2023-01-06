import style from "../styles/booking.module.css";

import { BiBuildings } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { DateTime } from "./DateTime";
import { CustomerDetails } from "./CustomerDetails";
import { ConfirmBooking } from "./ConfirmBooking";

export const BookingProcess = ({ event }) => {
  const details = event.event;
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

  const navigate = useNavigate(); //navigate router

  const [steps, setSteps] = useState("DateTime");
  const [dateTime, setDateTime] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});
  const [processing, setProcessing] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState("");

  //setting the step
  const handleStep = (value) => {
    setSteps(value);
  };

  //get end date
  const getEndDate = () => {
    var startDate = new Date(details.date);
    startDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    var milisec =
      parseInt(details.days) * 1000 * 3600 * 24 + startDate.getTime();
    var endDate = new Date(milisec);
    return `${new Date(endDate).getDate()} ${months[new Date(endDate).getMonth()]
      } ${new Date(endDate).getFullYear()}`;
  };

  //save the date and time get form the DateTime
  const saveDateTime = (date, time) => {
    setDateTime({
      date: date,
      time: time,
    })
  }

  //save the customer details
  const saveCustomerDetails = (value) => {
    setCustomerDetails(value);
  }

  //confirm booking
  const confirmBooking = () => {
    setProcessing(true);
    axios.post('/api/slots/create', {
      "eventId": event.id,
      "userId": event.userId,
      "name": customerDetails.name,
      "email": customerDetails.email,
      "mobileNumber": customerDetails.mobileNumber,
      "date": dateTime.date,
      "time": dateTime.time,
    }).then(res => {
      setConfirmStatus("success");
      setProcessing(false);
      setTimeout(() => {
        navigate('/events');
      }, 2000)
    }).catch(err => {
      setConfirmStatus("error");
    });
  }

  return (
    <div className={style.bookingContainer}>
      <div className={style.detail}>
        <div className={style.title}>
          <p>Bookly</p>
          <h2>{details.name}</h2>
        </div>
        <div className={style.mode}>
          {details.meetType === "online" ? (
            <p style={{ color: "#00c853" }}>Online</p>
          ) : (
            <p style={{ color: "#FF3D00" }}>Offline</p>
          )}
        </div>
        {details.description && (
          <div className={style.about}>
            <h4>About</h4>
            <p>{details.description}</p>
          </div>
        )}
        <div className={style.others}>
          <div>
            <h4>Duration</h4>
            <p>{`${details.duration} ${details.durationFormat}`}</p>
          </div>
          <div>
            <h4>Available till</h4>
            <p>{getEndDate()}</p>
          </div>
        </div>
        <div className={style.admin}>
          <p>
            <span>
              <BiBuildings />
            </span>
            {details.orgName || ""}
          </p>
        </div>
      </div>

      {/* Process of the booking */}
      <div className={style.process}>
        <div className={style.processbar}>
          <div className={steps === "DateTime" ? style.onStep : style.step}>
            <span>1</span>
            <p>Confirm Date & Time</p>
          </div>
          <div
            className={steps === "CustomerDetails" ? style.onStep : style.step}
          >
            <span>2</span>
            <p>Customer Details</p>
          </div>
          <div className={steps === "Confirm" ? style.onStep : style.step}>
            <span>3</span>
            <p>Confirm Booking</p>
          </div>
        </div>
        <div className={style.mainContainer}>
          {steps === "DateTime" && <DateTime eventDetails={event} handleStep={handleStep} saveDateTime={saveDateTime} dateTime={dateTime} />}
          {steps === "CustomerDetails" && <CustomerDetails handleStep={handleStep} saveCustomerDetails={saveCustomerDetails} details={customerDetails} />}
          {steps === "Confirm" && (
            <div className={style.outer}>
              <div className={style.Confirm}>{confirmStatus === "" ? <ConfirmBooking dateTime={dateTime} customerDetails={customerDetails} /> : confirmStatus === "success" ? (<div className={style.success}>
                <img src="\assets\images\booked.png" alt="Booked" />
                <h2>Appiontment has been booked successfully.</h2>
                <p>You will redirect to the home page automatically.</p>
              </div>) : (<div className={style.error}>
                <h2>Oops!...</h2>
                <p>Something went wrong. Please try again.</p>
              </div>)}</div>
              {confirmStatus !== "success" && <div className={style.buttons}>
                <button
                  onClick={() => {
                    handleStep("CustomerDetails");
                  }}
                  className={style.backBtn}
                >
                  Back
                </button>
                <button className={style.nextBtn} onClick={confirmBooking} >{processing ? <TailSpin
                  height="25"
                  width="25"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                /> : "Confirm"}</button>
              </div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
