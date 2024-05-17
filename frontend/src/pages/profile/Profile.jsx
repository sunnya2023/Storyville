import AddPost from "../../components/addPost/AddPost";
import FeedList from "../../components/feed/FeedList";
import UserProfile from "../../components/userProfile/userProfile";
import "./profile.css";

function Profile() {
  return (
    <>
      <UserProfile />
      <AddPost />
      <FeedList />
    </>
  );
}

export default Profile;
