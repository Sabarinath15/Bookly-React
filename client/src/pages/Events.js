import event from "../styles/event.module.css";

import { Link } from "react-router-dom";

export const Events = () => {
  return (
    <div className={event.main}>
      <div className={event.topbar}>
        <p>Bookly</p>
        <Link to="/">Back to Home</Link>
      </div>
      <div className={event.container}></div>
    </div>
  );
};
