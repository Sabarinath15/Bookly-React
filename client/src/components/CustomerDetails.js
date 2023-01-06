import style from "../styles/booking.module.css";

import { useState } from "react";

export const CustomerDetails = ({ handleStep, saveCustomerDetails, details }) => {
  const [inputs, setInputs] = useState({
    email: details.email || "",
    name: details.name || "",
    mobileNumber: details.mobileNumber || "",
  }); //input state
  const [errors, setErrors] = useState({}); //error state

  //input handling function
  const handleInputs = (e) => {
    const keyName = e.target.name;
    const value = e.target.value;

    if (keyName === "email") {
      setErrors((prev) => {
        delete prev.emailError;
        return prev;
      });
    } else if (keyName === "mobileNumber") {
      setErrors((prev) => {
        delete prev.mobileNumberError;
        return prev;
      });
    } else {
      setErrors((prev) => {
        delete prev.nameError;
        return prev;
      });
    }

    setInputs((prev) => ({ ...prev, [keyName]: value }));
  };

  const validate = () => {
    var err = {};

    var emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var nameRegex = /^[A-Za-z]+$/;
    var numberRegex = /^\d{10}$/;

    //email validation
    if (inputs.email === "") {
      err = { ...err, emailError: "Please enter a value." };
    } else if (!inputs.email.match(emailRegex)) {
      err = { ...err, emailError: "Please enter a valid email." };
    } else {
      delete err.emailError;
    }

    //name validation
    if (inputs.name === "") {
      err = { ...err, nameError: "Please enter a value." };
    } else if (!inputs.name.match(nameRegex)) {
      err = { ...err, nameError: "Name must be alphabets." };
    } else {
      delete err.nameError;
    }

    //password validation
    if (inputs.mobileNumber === "") {
      err = { ...err, mobileNumberError: "Please enter a value." };
    } else if (inputs.mobileNumber.length < 10) {
      err = {
        ...err,
        mobileNumberError: "Contact number length must be 10 or more.",
      };
    } else if (!inputs.mobileNumber.match(numberRegex)) {
      err = {
        ...err,
        mobileNumberError: "contact number only contains number",
      };
    } else {
      delete err.mobileNumberError;
    }

    setErrors(err);

    return Object.keys(err).length < 1;
  };

  return (
    <div className={style.outer}>
      <div className={style.Customer}>
        <div className={style.formtitle}>
          <h2>Customer Details</h2>
          <p>Enter your details to book the selected slot.</p>
        </div>
        <div className={style.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={inputs.name || ""}
            onChange={handleInputs}
          />
          <span>{errors.nameError || ""}</span>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            value={inputs.email || ""}
            onChange={handleInputs}
          />
          <span>{errors.emailError || ""}</span>
          <input
            type="text"
            name="mobileNumber"
            placeholder="Contact number"
            value={inputs.mobileNumber || ""}
            onChange={handleInputs}
          />
          <span>{errors.mobileNumberError || ""}</span>
        </div>
      </div>
      <div className={style.buttons}>
        <button
          onClick={() => {
            handleStep("DateTime");
          }}
          className={style.backBtn}
        >
          Back
        </button>
        <button
          className={style.nextBtn}
          onClick={() => {
            if (validate()) {
              saveCustomerDetails(inputs);
              handleStep("Confirm");
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
