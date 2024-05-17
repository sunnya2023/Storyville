import FriendReq from "../friendRequest/FriendReq";
import Message from "../message/Message";
import "./rightBar.css";

function RightBar() {
  return (
    <div className="rightBar">
      <div className="rightBar-container">
        <Message />
        <FriendReq />
      </div>
    </div>
  );
}

export default RightBar;
