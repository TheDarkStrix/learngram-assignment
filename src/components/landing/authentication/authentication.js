import { useState } from "react";
import Login from "./login/login";
import SignUp from "./signup/signup";
import style from "./authentication.module.css";
const Authentication = () => {
  // [1 , 2] = ["Login" , "Register"]
  const [tab, setTab] = useState(true);

  const handleTabs = () => {
    setTab((prev) => !prev);
  };

  return (
    <div className={style.authContainer}>
      <div className={style.heading}>LearnGram</div>
      <div className={style.tabs}>
        <div className={style.tabsContainer}>
          <div
            className={[!tab ? style.notActiveTab : ""].join(" ")}
            onClick={() => handleTabs()}
          >
            Login
          </div>
          <div
            className={[tab ? style.notActiveTab : ""].join(" ")}
            onClick={() => handleTabs()}
          >
            Sign Up
          </div>
        </div>
        <div className={style.content}>{tab ? <Login /> : <SignUp />}</div>
      </div>
    </div>
  );
};
export default Authentication;
