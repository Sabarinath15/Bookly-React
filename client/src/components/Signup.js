import accountCss from "../styles/accountPage.module.css";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
  }); //input state
  const [errors, setErrors] = useState({}); //error state
  const [warning, setWarning] = useState({});
  const [processing, setProcessing] = useState(false); //processing state

  const navigate = useNavigate(); //navigate route

  //input handling function
  const handleInputs = (e) => {
    const keyName = e.target.name;
    const value = e.target.value;

    if (keyName === "email") {
      setErrors((prev) => {
        delete prev.emailError;
        return prev;
      });
    } else if (keyName === "password") {
      setErrors((prev) => {
        delete prev.passwordError;
        return prev;
      });
    } else {
      setErrors((prev) => {
        delete prev.nameError;
        return prev;
      });
    }

    setWarning({});
    setInputs((prev) => ({ ...prev, [keyName]: value }));
  };

  const validate = () => {
    var err = {};

    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var nameRegex = /^[A-Za-z]+$/;

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
    if (inputs.password === "") {
      err = { ...err, passwordError: "Please enter a value." };
    } else if (inputs.password.length < 8) {
      err = { ...err, passwordError: "Password length must be 8 or more." };
    } else {
      delete err.passwordError;
    }

    setErrors(err);

    return Object.keys(err).length < 1;
  };


  //form submission
  const formSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setProcessing(true);
      try {
        var haveAcc = await axios.get(`/api/account/check/${inputs.email}`);
        if (!haveAcc) {
          axios.post('/api/account/create', {
            "name": inputs.name,
            "email": inputs.email,
            "password": inputs.password,
          }).then((res) => {
            sessionStorage.setItem('userId', JSON.stringify(res.data.data.Items[0].id));
            sessionStorage.setItem('email', JSON.stringify(res.data.data.Items[0].email));
            setProcessing(false);
            setWarning({});
            navigate("/dashboard");
          }).catch(err => {
            setWarning({ warnMsg: "Something went wrong please try again." });
            setProcessing(false);
            console.log(err);
          });
          setWarning({});
        } else {
          setProcessing(false);
          setWarning({ warnMsg: "You are already a part of us. Please login to continue." });
        }
      } catch (error) {
        setWarning({ warnMsg: "Something went wrong please try again." });
        setProcessing(false);
        console.log(error);
      }
    }
  };
  return (
    <div className={accountCss.signup}>
      <h2>Sign Up</h2>
      <p>Welcome to Bookly, You can start here</p>
      <div className={accountCss.helptext}>
        <span>{warning.warnMsg || ""}</span>
      </div>
      <form className={accountCss.form} onSubmit={formSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputs}
        />
        <span>{errors.nameError || ""}</span>
        <input
          type="text"
          name="email"
          placeholder="Email address"
          onChange={handleInputs}
        />
        <span>{errors.emailError || ""}</span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputs}
        />
        <span>{errors.passwordError || ""}</span>
        <div className={accountCss.buttons}>
          <button onClick={props.changeform}>Login</button>
          <button type="submit">
            {processing ? (
              <TailSpin
                height="30"
                width="30"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Signup"
            )}
          </button>
        </div>
      </form>
      <div className={accountCss.helptext}>
        <p>Already have an account? please Login</p>
      </div>
    </div>
  );
};
