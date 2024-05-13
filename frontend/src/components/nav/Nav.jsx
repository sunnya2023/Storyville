import { Link } from "react-router-dom";
import "./nav.css";
import { FaHome, FaUser, FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FaBars } from "react-icons/fa6";
import CurrentUser from "../../FackApis/CurrentUserData";
function Nav() {
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
          <Link to="/">
            <BsBell />
          </Link>
          <Link to="/">
            <FaBars />
          </Link>
          <div className="user">
            {CurrentUser.map((user) => (
              <img key={user.id} src={user.ProfieImage} alt={user.name} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
