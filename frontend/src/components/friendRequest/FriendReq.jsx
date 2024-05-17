import Firends from "../../FackApis/FirendReqData";
import "./friendReq.css";
import { Link } from "react-router-dom";

function FriendReq() {
  return (
    <div className="Friend-Req">
      <h4>Friend Reqests</h4>

      {Firends.map((friend) => (
        <div className="request" key={friend.id}>
          <Link to={"/profile/id"}>
            <div className="info">
              <div className="user">
                <img src={friend.img} alt={friend.name} />
                <h5>{friend.name}</h5>
              </div>
              <div className="info-name">
                <p>{friend.info}</p>
              </div>
            </div>
          </Link>

          <div className="action">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-red">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendReq;
