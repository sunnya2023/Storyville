import Comments from "../../FackApis/CommetData";
import CurrentUser from "../../FackApis/CurrentUserData";
import "./comment.css";

import { Link } from "react-router-dom";

function Comment() {
  return (
    <div className="comments">
      <div className="writebox">
        <form action="#">
          <div className="user">
            <img
              src={CurrentUser.map((user) => user.ProfieImage)}
              alt="프로필"
            />
            <input type="text" placeholder="Write a comment" />
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </div>

      {Comments.map((comment) => (
        <Link to="/profile/id">
          <div className="user" key={comment.id}>
            <img src={comment.commentProfile} alt={comment.name} />
            <div>
              <h5>{comment.name}</h5>
              <p>{comment.CommeText}</p>
            </div>
            <small>1h</small>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Comment;
