import "./addPost.css";

import CurrentUser from "../../FackApis/CurrentUserData";
import { IoMdPhotos } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";

function AddPost() {
  return (
    <form className="postForm">
      {CurrentUser.map((user) => (
        <div className="user form-top">
          <img src={user.ProfieImage} alt={user.name} />
          <input type="text" placeholder="What's on your mind?" />
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </div>
      ))}

      <div className="post-categories">
        <label htmlFor="file">
          <input type="file" id="file" />
          <div>
            <IoMdPhotos />
            <span> Photos</span>
          </div>
        </label>
        <label htmlFor="file">
          <input type="file" id="file" />
          <div>
            <FaVideo />
            <span> Videos</span>
          </div>
        </label>
        <div>
          <FaTags />
          <span> Tag</span>
        </div>
        <div>
          <BsEmojiSmile />
          <span> Feelings</span>
        </div>
      </div>
    </form>
  );
}

export default AddPost;
