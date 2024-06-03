import FriendReq from "../friendRequest/FriendReq";
import SuggestFreind from "../friendRequest/SuggestFreind";
import Message from "../message/Message";
import "./rightBar.css";

function RightBar() {
  return (
    <div className="rightBar">
      <div className="rightBar-container">
        <Message />
        <SuggestFreind />
        {/* <FriendReq /> */}
      </div>
    </div>
  );
}

export default RightBar;
