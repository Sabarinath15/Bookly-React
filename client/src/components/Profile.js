import style from "../styles/dashboard.module.css";

export const Profile = () => {
  return (
    <div className={style.profileContainer}>
      <img src="\assets\images\user.png" alt="" />
      <h1>User name</h1>
      <p>email@gamil.com</p>
    </div>
  );
};
