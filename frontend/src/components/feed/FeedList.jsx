import { useEffect } from "react";
import Feeds from "../../FackApis/HomeFeedData";
import PostSkeleton from "../skeletons/PostSkeleton";
import Feed from "./Feed";
import "./feedList.css";
import { useQuery } from "@tanstack/react-query";

function FeedList() {
  const {
    data: feed,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/posts/all");
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
  }, [refetch]);
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
