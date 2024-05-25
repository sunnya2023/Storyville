import "./addPost.css";

import CurrentUser from "../../FackApis/CurrentUserData";
import { IoMdPhotos } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import AuthUser from "../auth/AuthUser";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import toast from "react-hot-toast";

function AddPost() {
  const { data: authUser } = AuthUser();
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const imgRef = useRef(null);
  const textRef = useRef(null);

  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }) => {
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, img }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      setText("");
      setImg("");
      toast.success("게시글이 등록 되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const onChangeText = (e) => {
    setText(e.target.value);
    adjustTextArearSize();
  };

  const adjustTextArearSize = () => {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  const onChangeImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    if (text || img) {
      createPost({ text, img });
    } else {
      // toast.error("Post must have text or image");
      toast("업로드 할 게시글을 작성해주세요", {
        icon: "😂",
      });
    }
  };

  useEffect(() => {
    adjustTextArearSize();
  }, [text]);

  console.log("Creating post with:", { text, img });
  return (
    <form className="postForm" onSubmit={onSubmitHandle}>
      <div className="user form-top">
        <img
          src={authUser.profileImg || "/avatar.png"}
          alt={authUser.username}
        />

        <div className="postBox">
          <textarea
            ref={textRef}
            placeholder="What's on your mind?"
            value={text}
            onChange={onChangeText}
            rows={1}
          />
          {img && (
            <div className="postedImg">
              <img src={img} alt="post" />
              <FaXmark
                onClick={() => {
                  setImg(""); //이미지 상태 초기화
                  imgRef.current.value = null; //input값 비우기
                }}
              />
            </div>
          )}
        </div>
      </div>
      {isError && <div>{error.message}</div>}

      <div className="post-categories">
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            accept="image/*"
            ref={imgRef}
            onChange={onChangeImg}
          />
          <div>
            <IoMdPhotos />
            <span> Photos</span>
          </div>
        </label>
        {/* <label htmlFor="file">
          <input type="file" id="file" />
          <div>
            <FaVideo />
            <span> Videos</span>
          </div>
        </label>
        <div>
          <FaTags />
          <span> Tag</span>
        </div>
        <div>
          <BsEmojiSmile />
          <span> Feelings</span>
        </div> */}
        <button type="submit" className="btn btn-primary">
          {isPending ? "posting" : " Post"}
        </button>
      </div>
    </form>
  );
}

export default AddPost;
