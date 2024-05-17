import "./feedList.css";

import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { useState } from "react";
import Comment from "../comment/Comment";

function Feed({ feed }) {
  const [openComment, setOpenComment] = useState(false);

  const CommentHandle = () => {
    setOpenComment(!openComment);
  };

  return (
    <div className="feed" key={feed.id}>
      <div className="top-content">
        <Link to="/profile/id">
          <div className="user">
            <img src={feed.feedProfile} alt={feed.name} />
            <div>
              <h5>{feed.name}</h5>
              <small>1 Minutes Ago</small>
            </div>
          </div>
        </Link>
        <span>
          <FaList />
        </span>
      </div>

      <div className="mid-content">
        <p>{feed.desc}</p>
        <img src={feed.feedImage} alt={feed.name} />
      </div>

      <div className="bottom-content">
        <div className="action-item">
          <FaHeart />
          <span>14 Like</span>
        </div>
        <div className="action-item" onClick={CommentHandle}>
          <FaComment />
          <span>4 comment</span>
        </div>
        <div className="action-item">
          <FaShare />
          <span>1 share</span>
        </div>
      </div>
      {openComment && <Comment />}
    </div>
  );
}

export default Feed;
