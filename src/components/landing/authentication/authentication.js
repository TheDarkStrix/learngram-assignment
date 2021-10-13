import { useState } from "react";
import Login from "./login/login";
import SignUp from "./signup/signup";

const Authentication = () => {
  // [1 , 2] = ["Login" , "Register"]
  const [tab, setTab] = useState(true);

  const handleTabs = () => {
    setTab((prev) => !prev);
  };

  return (
    <>
      <div>LearnGram</div>
      <div>
        <div>
          <div onClick={() => handleTabs()}>Login</div>
          <div onClick={() => handleTabs()}>Sign Up</div>
        </div>
      </div>
      <div>{tab ? <Login /> : <SignUp />}</div>
    </>
  );
};
export default Authentication;
