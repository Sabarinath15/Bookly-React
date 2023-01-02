import style from "../styles/booking.module.css";

export const ConfirmBooking = ({ customerDetails, dateTime }) => {
  return (
    <>
      <div className={style.confirmtitle}>
        <h2>Booking confirmation</h2>
        <p>check your details and confirm booking.</p>
      </div>
    </>
  );
};
