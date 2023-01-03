import style from "../styles/dashboard.module.css";

import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

export const Slots = ({ details }) => {
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
  var date = new Date(details.slot.date);

  return (
    <div className={style.slot}>
      <div className={style.user}>
        <div className={style.name}>
          <p>{details.slot.name}</p>
        </div>
        <div className={style.contact}>
          <a href={`tel:+${details.slot.mobileNumber}`}>
            <IoIosCall />
          </a>
          <a href={`mailto:${details.slot.email}`}>
            <MdEmail />
          </a>
        </div>
      </div>
      <div className={style.usertime}>
        <h2>{details.slot.time}</h2>
        <h4>{`${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`}</h4>
      </div>
    </div>
  );
};
