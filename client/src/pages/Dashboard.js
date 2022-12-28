import dashboard from "../styles/dashboard.module.css";

import { FiLogOut } from "react-icons/fi";
import { TbCalendarEvent } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Welcome } from "../components/Welcome";
import { DashboardEvents } from "../components/DashboardEvents";
import { Profile } from "../components/Profile";

export const Dashboard = () => {
  const [navigation, setNavigate] = useState("events"); //navigate state for change components
  const [showWelcome, setShowWelcome] = useState(true); //welcome state
  const [popup, showPopup] = useState(false); //popup state

  const navigate = useNavigate(); //navigate router

  //useeffect
  useEffect(() => {
    showPage();
  }, []);

  //to change components between events & profiles
  const handleNavigate = (e) => {
    setNavigate(e.target.value);
  };

  //change the page
  const showPage = async () => {
    var userId = await JSON.parse(sessionStorage.getItem("userId"));
    axios
      .get(`/api/events/${userId}`)
      .then((res) => {
        if (res.data.data.Items.length !== 0) {
          setShowWelcome(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //hide popups
  const hidePopup = () => {
    showPopup(false);
  };

  //logout function
  const logout = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className={dashboard.main}>
      {showWelcome ? (
        <div className={dashboard.welcomeContainer}>
          <div className={dashboard.topbar}>
            <p>Bookly</p>
            <button
              onClick={() => {
                showPopup(true);
              }}
            >
              Logout <FiLogOut />
            </button>
          </div>
          <div className={dashboard.welcome}>
            <Welcome />
          </div>
        </div>
      ) : (
        <>
          <div className={dashboard.navContainer}>
            <div className={dashboard.logo}>
              <p>Bookly</p>
            </div>
            <div className={dashboard.nav}>
              <input
                type="radio"
                name="navigation"
                id="events"
                value="events"
                defaultChecked
                onChange={handleNavigate}
              />
              <label htmlFor="events">
                Events <TbCalendarEvent />
              </label>
              <input
                type="radio"
                name="navigation"
                id="profile"
                value="profile"
                onChange={handleNavigate}
              />
              <label htmlFor="profile">
                Profile <CgProfile />
              </label>
            </div>
            <button
              onClick={() => {
                showPopup(true);
              }}
            >
              Logout <FiLogOut />
            </button>
          </div>
          <div className={dashboard.container}>
            {navigation === "events" ? <DashboardEvents /> : <Profile />}
          </div>
        </>
      )}
      {popup ? (
        <div className={dashboard.popupbg}>
          <div className={dashboard.popup}>
            <div className={dashboard.logoutContainer}>
              <img src="\assets\images\logout.png" alt="Alert" />
              <div>
                <h3>Are you sure want to logout?</h3>
              </div>
              <div className={dashboard.buttons}>
                <button className={dashboard.cancelbtn} onClick={hidePopup}>
                  Cancel
                </button>
                <button className={dashboard.logoutbtn} onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
