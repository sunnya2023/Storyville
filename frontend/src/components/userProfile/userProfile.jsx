import "./userProfile.css";
import { Link } from "react-router-dom";
import CurrentUser from "../../FackApis/CurrentUserData";
import { FaMessage } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { MdRssFeed } from "react-icons/md";

function UserProfile() {
  return (
    <div className="userProfile">
      <div className="cover-photos">
        <img src={CurrentUser.map((user) => user.CoverPhoto)} alt="프로필" />
      </div>

      <div className="profile-info">
        <img src={CurrentUser.map((user) => user.ProfieImage)} alt="프로필" />
        <div className="user-name">
          <h3>{CurrentUser.map((user) => user.name)}</h3>
          <h5>{CurrentUser.map((user) => user.username)}</h5>
        </div>
        <div className="profile-button">
          <Link to="/chatbox/id">
            <button className="btn btn-primary">
              <FaMessage />
            </button>
          </Link>
          <button className="btn btn-primary">
            <span>
              <MdRssFeed /> Follow Me
            </span>
          </button>
          <button className="btn">
            <FaLink />
          </button>
        </div>
        <p className="bio">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sed
          minus et beatae culpa veniam fugiat laborum assumenda quasi veritatis.
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
