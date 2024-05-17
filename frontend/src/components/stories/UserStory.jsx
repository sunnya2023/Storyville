import React from "react";
import CurrentUser from "../../FackApis/CurrentUserData";
import { IoAdd } from "react-icons/io5";
import "./story.css";
function UserStory() {
  return (
    <div className="story userStroy">
      {CurrentUser.map((user) => (
        <>
          <div className="user" key={user.id}>
            <img src={user.ProfieImage} alt={user.name} />
          </div>
          <img src={user.CoverPhoto} alt={user.name} />
        </>
      ))}

      <label htmlFor="storyFiles">
        <IoAdd />
        <input type="file" id="storyFiles" />
      </label>
      <h5>Add Story</h5>
    </div>
  );
}

export default UserStory;
