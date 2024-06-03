import "./userProfile.css";
import { Link, useParams } from "react-router-dom";
import CurrentUser from "../../FackApis/CurrentUserData";
import { FaMessage } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { MdRssFeed } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import AuthUser from "../../components/auth/AuthUser";
import { useEffect, useState } from "react";
import useFollow from "../../components/hooks/useFollow";
import FeedList from "../../components/feed/FeedList";

function UserProfile() {
  const { data: authUser } = AuthUser();
  const [feedType, setFeedType] = useState("posts");
  const { username } = useParams();
  const { follow, isPending } = useFollow();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
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
  }, [username, refetch]);

  const amIFollowing = authUser?.following.includes(user?._id);
  const isMyProfile = authUser?._id === user?._id;

  return (
    <>
      <div className="userProfile">
        {isLoading && <div>로딩중</div>}

        {!isLoading && user && (
          <div className="profile-info">
            <div className="cover-photos">
              <img
                src={
                  user.coverImg ||
                  "https://cdn.pixabay.com/photo/2021/05/23/05/02/origami-6275164_640.jpg"
                }
                alt="배경 이미지"
              />
            </div>

            <img src={user.ProfileImg || "/avatar.png"} alt={user.username} />
            <div className="user-name">
              <h3>{user.username}</h3>
              <h5>{user.email}</h5>

              {isMyProfile && <button className="editBtn">프로필 편집</button>}
            </div>
            <div className="profile-button">
              <button className="link-btn">
                <span>{user?.following.length}</span>
                <span>팔로윙</span>
              </button>
              <button className="link-btn">
                <span>{user?.followers.length}</span>
                <span>팔로워</span>
              </button>
              <button className="link-btn" onClick={() => setFeedType("likes")}>
                <span>{user?.likedPosts.length}</span>
                <span>좋아요</span>
              </button>

              {/* <Link to="/chatbox/id">
                <FaMessage />
              </Link> */}

              {!isMyProfile && (
                <button
                  className="btn btn-primary"
                  onClick={() => follow(user._id)}
                >
                  {isPending && "로딩중"}
                  {amIFollowing && " Unfollow"}
                  {!amIFollowing && "Follow"}
                </button>
              )}
            </div>
            <p className="bio">
              {user.bio
                ? UserProfile.bio
                : "당신만의 특별한 메시지를 남겨보세요"}
            </p>
          </div>
        )}
      </div>
      <div className="tab">
        <button className="tab-my" onClick={() => setFeedType("posts")}>
          My
        </button>
        {feedType === "posts" && <div className="my-underline"></div>}
        <button className="tab-like" onClick={() => setFeedType("likes")}>
          Likes
        </button>
        {feedType === "likes" && <div className="likes-underline"></div>}
      </div>
      <FeedList feedType={feedType} username={username} userId={user?._id} />
    </>
  );
}

export default UserProfile;
