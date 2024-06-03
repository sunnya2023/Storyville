import { useEffect } from "react";
import Feeds from "../../FackApis/HomeFeedData";
import PostSkeleton from "../skeletons/PostSkeleton";
import Feed from "./Feed";
import "./feedList.css";
import { useQuery } from "@tanstack/react-query";

function FeedList({ feedType, username, userId }) {
  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return "/api/posts/all";
      case "following":
        return "/api/posts/following";
      case "posts":
        return `/api/posts/user/${username}`;
      case "likes":
        return `/api/posts/likes/${userId}`;
      default:
        return "/api/posts/all";
    }
  };

  const END_POINT = getPostEndpoint();

  const {
    data: feed,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      try {
        const res = await fetch(END_POINT);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, username, userId, feedType]);
  return (
    <>
      {isLoading && "로딩중"}
      {!isLoading && !isRefetching && feed.length === 0 && (
        <div>게시글이 없습니다.</div>
      )}
      {!isLoading && !isRefetching && feed && (
        <div className="feeds">
          {feed.map((feed) => (
            <Feed key={feed._id} feed={feed} />
          ))}
        </div>
      )}
    </>
  );
}

export default FeedList;
