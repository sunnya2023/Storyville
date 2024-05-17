import CurrentUser from "../../FackApis/CurrentUserData";

import Story from "../../components/stories/Story";
import "./chatbox.css";

import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

function ChatBox() {
  return (
    <>
      <Story />
      <div className="chat-box">
        <div className="chat-box-top">
          {CurrentUser.map((user) => (
            <>
              <img src={user.ProfieImage} alt={user.name} />
              <div className="user-name">
                <h3>{user.name}</h3>
                <h5>{user.username}</h5>
              </div>
            </>
          ))}
        </div>

        <div className="chat-box-bottom">
          <form action="#">
            <input type="text" placeholder="Write Something" />
            <button type="submit" className="btn btn-primary">
              <FaArrowAltCircleRight />
            </button>
            <label htmlFor="CFile" className="btn btn-primary">
              <FaFileAlt />
              <input type="file" id="CFile" />
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
