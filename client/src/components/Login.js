import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import accountCss from "../styles/accountPage.module.css";

export const Login = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  }); //input state

  const [errors, setErrors] = useState({}); //error state
  const [warning, setWarning] = useState({});
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate(); //navigate route

  //input handler function
  const handleInputs = (e) => {
    const keyName = e.target.name;
    const value = e.target.value;

    if (keyName === "email") {
      setErrors((prev) => {
        delete prev.emailError;
        return prev;
      });
    } else {
      setErrors((prev) => {
        delete prev.passwordError;
        return prev;
      });
    }
    setWarning({});
    setInputs((prev) => ({ ...prev, [keyName]: value }));
  };

  const validate = () => {
    var err = {};

    var emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    //email validation
    if (inputs.email === "") {
      err = { ...err, emailError: "Please enter a value." };
    } else if (!inputs.email.match(emailRegex)) {
      err = { ...err, emailError: "Please enter a valid email." };
    } else {
      delete err.emailError;
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
        if (haveAcc) {
          axios.get(`/api/account/user/${inputs.email}`).then((res) => {
            var getPassword = res.data.data.Items[0].password;
            if (inputs.password === getPassword) {
              sessionStorage.setItem('userId', JSON.stringify(res.data.data.Items[0].id));
              setWarning({});
              navigate("/dashboard");
            } else {
              setWarning({ warnMsg: "Wrong password. Please try again." });
            }
            setProcessing(false);
          }).catch(err => {
            setWarning({ warnMsg: "Something went wrong please try again." });
            setProcessing(false);
            console.log(err);
          });
          setWarning({});
        } else {
          setProcessing(false);
          setWarning({ warnMsg: "You are not registered. Please signup to continue." });
        }
      } catch (error) {
        setWarning({ warnMsg: "Something went wrong please try again." });
        setProcessing(false);
        console.log(error);
      }
    }
  };

  return (
    <div className={accountCss.login}>
      <h2>LogIn</h2>
      <p>Welcome back, Please login to your account.</p>
      <div className={accountCss.helptext}>
        <span>{warning.warnMsg || ""}</span>
      </div>
      <form className={accountCss.form} onSubmit={formSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email address"
          onChange={handleInputs}
          value={inputs.email || ""}
        />
        <span>{errors.emailError || ""}</span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputs}
          value={inputs.password || ""}
        />
        <span>{errors.passwordError || ""}</span>
        <div className={accountCss.buttons}>
          <button onClick={props.changeform}>Signup</button>
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
              "LogIn"
            )}
          </button>
        </div>
      </form>
      <div className={accountCss.helptext}>
        <p>New here? Click the Signup and Register</p>
      </div>
    </div>
  );
};
