import { useQuery } from "@tanstack/react-query";

const useFeed = () => {
  const { data: useFeed } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      try {
        const res = await fetch();
      } catch (error) {
        throw new Error(error);
      }
    },
  });
  return <div>useFeed</div>;
};

export default useFeed;
