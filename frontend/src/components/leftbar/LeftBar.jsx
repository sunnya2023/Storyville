import CurrentUser from "../../FackApis/CurrentUserData";
import "./leftBar.css";
import { Link } from "react-router-dom";

import Friend from "../../assets/icon/1.png";
import Groups from "../../assets/icon/2.png";
import Market from "../../assets/icon/3.png";
import Watch from "../../assets/icon/4.png";
import Gallery from "../../assets/icon/5.png";
import Videos from "../../assets/icon/6.png";
import Message from "../../assets/icon/7.png";

function LeftBar() {
  return (
    <div className="leftBar">
      <div className="leftContainer">
        <div className="menu">
          <Link to="/">
            <div className="user">
              {CurrentUser.map((user) => (
                <>
                  <img src={user.ProfieImage} alt={user.name} />
                  <h4>{user.name}</h4>
                </>
              ))}
            </div>
          </Link>
          <Link to={"/"}>
            <div className="item">
              <img src={Friend} />
              <h4>Friend</h4>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="item">
              <img src={Groups} />
              <h4>Groups</h4>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="item">
              <img src={Market} />
              <h4>Market</h4>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="item">
              <img src={Watch} />
              <h4>Watch</h4>
            </div>
          </Link>
        </div>

        <hr />

        <div className="menu">
          <h4 className="others">Your shortcuts</h4>
          <Link to={"/"}>
            <div className="item">
              <img src={Gallery} />
              <h4>Gallery</h4>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="item">
              <img src={Videos} />
              <h4>Videos</h4>
            </div>
          </Link>
          <Link to={"/chatbox/id"}>
            <div className="item">
              <img src={Message} />
              <h4>Message</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
