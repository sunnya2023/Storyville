import "./comment.css";

import { Link } from "react-router-dom";
import useComment from "../hooks/useComment";
import AuthUser from "../auth/AuthUser";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FaList } from "react-icons/fa";
import Modal from "../common/modal/Modal";
import { formatDistanceToNow } from "date-fns";

function Comment({ feed }) {
  const { data: authUser } = AuthUser();
  const { commentPost, isCommenting, text, setText } = useComment(feed);
  const textRef = useRef(null);
  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  const queryClient = useQueryClient();

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    if (text) {
      commentPost();
    } else {
      toast("댓글을 작성해 주세요", {
        icon: "✏️",
      });
    }
  };

  const { mutate: deleteComment } = useMutation({
    mutationFn: async (commentId) => {
      try {
        const res = await fetch(`/api/posts/comment/${commentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // 추가: 요청 헤더에 Content-Type 추가
          },
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
    onSuccess: (result) => {
      toast.success("댓글이 삭제되었습니다");
      queryClient.setQueryData(["feed"], (oldData) => {
        return oldData.map((post) => (post._id === result._id ? result : post));
      });
    },
    onError: (error) => {
      toast.error(`댓글 삭제중 오류 발생:${error.message}`);
    },
  });

  return (
    <div className="comments">
      <div className="writebox">
        <form onSubmit={onSubmitHandle}>
          <div className="user">
            <img src={authUser.profileImg || "/avatar.png"} alt="프로필" />
            <input
              type="text"
              placeholder="Write a comment"
              value={text}
              ref={textRef}
              onChange={onChangeText}
            />
            <button className="btn btn-primary">
              {isCommenting ? "sending" : "Send"}
            </button>
          </div>
        </form>
      </div>

      {feed.comments.map((comment) => {
        const isMyComment = authUser._id === comment.user._id;
        return (
          <>
            <div key={comment._id} className="comment">
              <div className="user">
                <Link to={`/profile/${comment.user._id}`}>
                  <img
                    src={comment.user.profileImg || "/avatar.png"}
                    alt={comment.user.username}
                  />
                </Link>
                <h5>{comment.user.username}</h5>
                <small>{formatDate(feed.updatedAt)}</small>
              </div>
              {isMyComment && (
                <MdDelete onClick={() => deleteComment(comment._id)} />
              )}
            </div>
            <p className="reply">{comment.text}</p>
          </>
        );
      })}
    </div>
  );
}

export default Comment;
