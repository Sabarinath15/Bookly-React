import "../styles/homePage.css";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export const Home = () => {
  return (
    <>
      <header>
        <p>Bookly</p>
        <nav>
          <a href="#service">Service</a>
          <a href="#contact">Contact</a>
          <Link to="/account">Account</Link>
        </nav>
        <Link to="/events">Book Now</Link>
      </header>
      <main>
        <h1>
          Bookly helps you grap appiontment of organizations in easy and quick
          way
        </h1>
        <div className="start-btn">
          <Link to="/events">
            <p>Get Started</p>
            <FiArrowRight />
          </Link>
          <p>Click the button and book your slot.</p>
        </div>
        <div className="image">
          <img src="\assets\images\booklyImage.png" alt="" />
        </div>
      </main>
      <div className="service" id="service">
        <div className="custom-shape-divider-top-1671252443">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <h2>How it works?</h2>
        <div className="flex-con">
          <div className="image-con">
            <img src="assets\images\booking_img.png" alt="" />
          </div>
          <div className="service-content">
            <div className="steps">
              <h4>Get start</h4>
              <p>
                Just by clicking the Get start button you can able to view the
                secheduled meetings
              </p>
            </div>
            <div className="steps">
              <h4>Select meet</h4>
              <p>
                Select any meet available from different organizations to grap
                your slot
              </p>
            </div>
            <div className="steps">
              <h4>Book the slot</h4>
              <p>
                Select the date and time of the slot from the calender and
                confirm the booking
              </p>
            </div>
            <div className="steps">
              <h4>Personal details</h4>
              <p>Enter your personal details and grap the slot</p>
            </div>
          </div>
        </div>
      </div>
      <div className="contact" id="contact">
        <div className="logo">
          <h2>Bookly</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            dicta ratione facilis neque commodi reiciendis, labore harum laborum
            nobis officia. Voluptatem architecto saepe, laborum sit nihil
            officia itaque assumenda perspiciatis.
          </p>
        </div>
        <div className="contact-info">
          <h4>Contact</h4>
          <li>
            <a href="mailto:support@bookly.com">support@bookly.com</a>
          </li>
          <li>
            <a href="tel:+0421-23231">0421-23231</a>
          </li>
          <li>
            <a href="##">www.bookly.com</a>
          </li>
        </div>
        <div className="account">
          <h4>
            <Link to="/account">Business Account</Link>
          </h4>
          <p>
            The Business account is the way to be a admin in bookly. By using
            this feature you can sechedule and manage the appointment meets.
          </p>
        </div>
      </div>
      <hr />
      <footer>
        <p>Copyrights Bookly@2022</p>
        <p>Terms/policy</p>
      </footer>
    </>
  );
};
