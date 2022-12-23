import { useNavigate } from "react-router-dom";
import dashboard from "../styles/dashboard.module.css";

export const Welcome = () => {
  const navigate = useNavigate(); //navigate router
  //navigate to create page
  const toCreate = () => {
    navigate("/create");
  };

  return (
    <div className={dashboard.openingCon}>
      <img src="assets\images\calendar.png" alt="" />
      <h2>Welcome to Bookly</h2>
      <p>You don't have any events yet.</p>
      <span>Create your event by clicking the create button below.</span>
      <button onClick={toCreate}>Create</button>
    </div>
  );
};
