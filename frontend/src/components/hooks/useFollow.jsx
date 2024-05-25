import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: follow } = useMutation({
    mutationFn: async (userId) => {
      try {
        const res = await fetch(`/api/users/follow/${userId}`, {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      //   Promise.all([
      //     queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
      //     queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      //   ]);
      queryClient.invalidateQueries("suggestedUsers");
      queryClient.invalidateQueries("authUser");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { follow };
};

export default useFollow;
