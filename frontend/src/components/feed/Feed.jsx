import "./feedList.css";

import { Link } from "react-router-dom";
// import { FaList } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Comment from "../comment/Comment";
import AuthUser from "../auth/AuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useLikedPost from "../hooks/useLikedPost";
import { formatDistance, sub } from "date-fns";
import formatDate from "../../utils/date";

function Feed({ feed }) {
  const [openComment, setOpenComment] = useState(false);
  const { data: authUser } = AuthUser();
  const postUser = feed.user;
  const isMyPost = authUser._id === feed.user._id;
  const queryClient = useQueryClient();
  //delete Modal
  const [modalOpen, setModalOpen] = useState(false);

  const { mutate: deletPost } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${feed._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("게시글이 삭제되었습니다");
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const handleOpenModal = () => {
    setModalOpen((prev) => !prev);
  };

  const handleDeletePost = () => {
    setModalOpen(false);
    deletPost();
  };
  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  // 좋아요
  const isLiked = feed.likes.includes(authUser._id);
  const { likePost, isLiking } = useLikedPost(feed);
  const handleLikePost = () => {
    if (isLiking) return;
    likePost();
  };

  const handleComment = () => {
    setOpenComment(!openComment);
  };

  return (
    <div className="feed" key={feed._id}>
      <div className="top-content">
        <Link to={`/profile/${feed.user.username}`}>
          <div className="user">
            <img
              src={postUser?.profileImg || "/avatar.png"}
              alt={feed.username}
            />

            <div>
              <h5>{postUser.username}</h5>
              <small>{formatDate(feed.createdAt)}</small>
            </div>
          </div>
        </Link>
        {isMyPost && (
          <button>
            <MdDelete onClick={handleOpenModal} />
          </button>
        )}
        {modalOpen && (
          <div className="modal-wrapper">
            <div className="modal-contents">
              <p>삭제하시겠습니까?</p>
              <div className="modalBtn ">
                <button onClick={handleDeletePost} className="active">
                  확인
                </button>
                <button onClick={handleCancelDelete}>취소</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mid-content">
        {feed.text && <p>{feed.text}</p>}
        {feed.img && <img src={feed.img} alt="post" />}
      </div>

      <div className="bottom-content">
        <div className="action-item">
          <FaHeart
            onClick={handleLikePost}
            className={isLiked ? "select" : ""}
          />
          <span>{feed.likes.length} Like</span>
        </div>
        <div className="action-item" onClick={handleComment}>
          <FaComment />
          <span>{feed.comments.length} comment</span>
        </div>
        <div className="action-item">
          <FaShare />
          <span>1 share</span>
        </div>
      </div>
      {openComment && <Comment feed={feed} />}
    </div>
  );
}

export default Feed;
