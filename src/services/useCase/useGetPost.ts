import { useQuery } from "@tanstack/react-query";
import { fetchPost, type Post } from "../postService";

const useGetPost = (id: number) => {
  return useQuery<Post>({
    queryKey: ["useGetPost", id],
    queryFn: async () => {
      return await fetchPost(id);
    },
  });
};

export default useGetPost;
