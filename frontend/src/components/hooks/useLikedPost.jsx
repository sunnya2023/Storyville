import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useLikedPost = (feed) => {
  const queryClient = useQueryClient();

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/like/${feed._id}`, {
          method: "POST",
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
    onSuccess: (updatedLikes) => {
      toast.success("Post liked successfully");
      //좋아요만 업데이트하기
      queryClient.setQueryData(["feed"], (oldData) => {
        return oldData.map((post) => {
          if (post._id === feed._id) {
            return { ...post, likes: updatedLikes };
          }
          return post;
        });
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { likePost, isLiking };
};

export default useLikedPost;
