import dashboard from "../styles/dashboard.module.css";

import { Welcome } from "../components/Welcome";

export const Dashboard = () => {
  return (
    <div className={dashboard.main}>
      <div className={dashboard.topbar}>
        <p>Bookly</p>
        <div className={dashboard.userprofile}></div>
      </div>
      <div className={dashboard.container}>
        <Welcome />
      </div>
    </div>
  );
};
