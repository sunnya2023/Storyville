import AddPost from "../../components/addPost/AddPost";

import FeedList from "../../components/feed/FeedList";
import Story from "../../components/stories/Story";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <Story />
      <AddPost />
      <FeedList />
    </div>
  );
}

export default Home;
