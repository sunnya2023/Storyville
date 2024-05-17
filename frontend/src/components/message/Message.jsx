import "./message.css";
import { RiEdit2Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import Messages from "../../FackApis/MessageData";

import { Link } from "react-router-dom";
function Message() {
  return (
    <div className="Message">
      <div className="message-top">
        <h4>Message</h4>
        <RiEdit2Line />
      </div>
      <div className="message-search">
        <IoSearch />
        <input type="search" placeholder="Search Message" />
      </div>

      <div className="border-div"></div>

      {Messages.map((mess) => (
        <Link to="/chatbox/id" key={mess.key} className="message">
          <div className="user">
            <img src={mess.img} alt={mess.name} />
            <div className="green-active"></div>
          </div>
          <div className="message-body">
            <h5>{mess.name}</h5>
            <p>{mess.mText}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Message;
