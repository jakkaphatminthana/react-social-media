import { useQuery } from "@tanstack/react-query";
import { fetchPosts, type Post } from "../postService";

const useGetPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["useGetPosts"],
    queryFn: async () => {
      return await fetchPosts();
    },
  });
};

export default useGetPosts;
