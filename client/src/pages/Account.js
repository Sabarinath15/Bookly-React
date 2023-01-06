import accountCss from "../styles/accountPage.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import { Login } from "../components/Login";
import { Signup } from "../components/Signup";

export const Account = () => {
  const [isLogin, setform] = useState(true);

  const changeform = () => {
    setform((prev) => !prev);
  };

  return (
    <>
      <div className={accountCss.main}>
        <div className={accountCss.content}>
          <div className={accountCss.top}>
            <p>Bookly</p>
            <Link to="/">Back to home</Link>
          </div>
          {isLogin ? (
            <Login changeform={changeform} />
          ) : (
            <Signup changeform={changeform} />
          )}
        </div>
        <div className={accountCss.image}>
          <img src="assets\images\account_img.jpg" alt="" />
        </div>
      </div>
    </>
  );
};
