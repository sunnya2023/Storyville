import { Link } from "react-router-dom";
import "./nav.css";
import { FaHome, FaUser, FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FaBars } from "react-icons/fa6";
import DarkMode from "../darkmode/DarkMode";
import AuthUser from "../auth/AuthUser";

function Nav() {
  const { data: authUser } = AuthUser();
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/">
            <h3 className="logo">Storyville</h3>
          </Link>
          <Link to="/">
            <FaHome />
          </Link>
          <Link to="/profile/id">
            <FaUser />
          </Link>
          <div className="nav-searchbar">
            <FaSearch />
            <input type="search" />
          </div>
        </div>

        <div className="nav-right">
          <Link to="/chatbox/id">
            <IoChatbubbleEllipsesOutline />
          </Link>
          <Link to="/notification">
            <BsBell />
          </Link>

          <DarkMode />

          <Link to="/">
            <FaBars />
          </Link>
          <Link to={`/profile/${authUser.username}`} className="user">
            <img
              src={authUser.ProfieImage || "/avatar.png"}
              alt={authUser.username}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
