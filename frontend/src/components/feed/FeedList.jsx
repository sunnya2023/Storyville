import Feeds from "../../FackApis/HomeFeedData";
import Feed from "./Feed";
import "./feedList.css";

function FeedList() {
  return (
    <div className="feeds">
      {Feeds.map((feed) => (
        <Feed key={feed.id} feed={feed} />
      ))}
    </div>
  );
}

export default FeedList;
