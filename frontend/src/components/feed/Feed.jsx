import "./feedList.css";

import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Comment from "../comment/Comment";
import AuthUser from "../auth/AuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function Feed({ feed }) {
  const [openComment, setOpenComment] = useState(false);
  const { data: authUser } = AuthUser();
  const postUser = feed.user;
  const isMyPost = authUser._id === feed.user._id;
  const queryClient = useQueryClient();
  const CommentHandle = () => {
    setOpenComment(!openComment);
  };

  const { mutate: deletPost, isPending } = useMutation({
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

  const handleDeletePost = () => {
    deletPost();
  };

  return (
    <div className="feed" key={feed._id}>
      <div className="top-content">
        <Link to="/profile/id">
          <div className="user">
            <img
              src={postUser?.profileImg || "avartar.png"}
              alt={feed.username}
            />

            <div>
              <h5>{postUser.username}</h5>
              <small>1 Minutes Ago</small>
            </div>
          </div>
        </Link>
        {isMyPost && (
          <button>
            <MdDelete onClick={handleDeletePost} />
          </button>
        )}
      </div>

      <div className="mid-content">
        <p>{feed.text}</p>
        <img src={feed.feedImage} alt={feed.name} />
      </div>

      <div className="bottom-content">
        <div className="action-item">
          <FaHeart />
          <span>14 Like</span>
        </div>
        <div className="action-item" onClick={CommentHandle}>
          <FaComment />
          <span>4 comment</span>
        </div>
        <div className="action-item">
          <FaShare />
          <span>1 share</span>
        </div>
      </div>
      {openComment && <Comment />}
    </div>
  );
}

export default Feed;
