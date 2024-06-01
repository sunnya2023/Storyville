import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const useComment = (feed) => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/comment/${feed._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
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
    onSuccess: (updatedPost) => {
      toast.success("comment is posted");
      setText("");
      queryClient.setQueryData(["feed"], (oldData) => {
        return oldData.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { commentPost, isCommenting, text, setText };
};

export default useComment;
