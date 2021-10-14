import { useHistory } from "react-router";
import { clearAuthInfo } from "../helpers";
import style from "./navbar.module.css";

const NavBar = () => {
  const history = useHistory();
  const handleLogout = () => {
    clearAuthInfo();
    history.push("/landing");
  };

  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.head}>Economics 101</div>
        <div className={style.logout} onClick={() => handleLogout()}>
          Logout
        </div>
      </div>
    </>
  );
};

export default NavBar;
