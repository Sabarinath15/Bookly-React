import style from "../styles/booking.module.css";

export const ConfirmBooking = ({ customerDetails, dateTime }) => {
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

  var date = new Date(dateTime.date);
  return (
    <>
      <div className={style.confirmtitle}>
        <h2>Booking confirmation</h2>
        <p>check your details and confirm booking.</p>
      </div>
      <div className={style.ticketContainer}>
        <div className={style.customerinfo}>
          <h3>Your Details</h3>
          <div>
            <p>Name</p>
            <h4>{customerDetails.name}</h4>
          </div>
          <div>
            <p>Email</p>
            <h4>{customerDetails.email}</h4>
          </div>
          <div>
            <p>Mobile number</p>
            <h4>{customerDetails.mobileNumber}</h4>
          </div>
        </div>
        <div className={style.slotinfo}>
          <h3>Slot Details</h3>
          <div>
            <p>Time</p>
            <h4>{dateTime.time}</h4>
          </div>
          <div>
            <p>Date</p>
            <h4>{`${date.getDate()} ${
              months[date.getMonth()]
            } ${date.getFullYear()}`}</h4>
          </div>
        </div>
      </div>
    </>
  );
};
