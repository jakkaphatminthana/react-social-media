import { useQuery } from "@tanstack/react-query";
import { fetchPosts, type Post } from "../postService";

const useListPost = () => {
  return useQuery<Post[]>({
    queryKey: ["useListPost"],
    queryFn: async () => {
      return await fetchPosts();
    },
  });
};

export default useListPost;
