import { useState } from "react";
import AddPost from "../../components/addPost/AddPost";
import FeedList from "../../components/feed/FeedList";
import UserProfile from "./userProfile";
import "./profile.css";

function Profile() {
  return (
    <>
      <UserProfile />
      {/* <AddPost /> */}

      <FeedList feedType={feedType} username={username} userId={userId} />
    </>
  );
}

export default Profile;
