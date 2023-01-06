import create from "../styles/create.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateForm } from "../components/CreateForm";

export const Create = () => {
  const [created, setCreated] = useState("");

  const navigate = useNavigate(); //navigate route

  const navtoDash = () => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <div className={create.main}>
      <div className={create.topbar}>
        <p>Bookly</p>
        {created ? (
          null
        ) : (
          <Link to="/dashboard" onClick={() => { sessionStorage.removeItem("eventId"); }}>Back to Dashboard</Link>
        )}
      </div>
      {created ? (
        <div className={create.alertContainer}>
          <img src="\assets\images\check.png" alt="" />
          <h1>{created === "created" ? 'Event Created Successfully' : 'Event Updated Successfully'}</h1>
          <p>
            {created === "created" ? 'Your event was created successfully and it is now available to the cutomers for booking.' : 'Your event was updated successfully and it is now available to the cutomers for booking.'}
          </p>
          <span>You will be automatically redirect to dashboard.</span>
          {navtoDash()}
        </div>
      ) : (
        <CreateForm setCreated={setCreated} />
      )}
    </div>
  );
};
