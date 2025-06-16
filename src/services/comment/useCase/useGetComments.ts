import { useQuery } from "@tanstack/react-query";
import { getCommentsByPostId, type Comment } from "../commentService";

const useGetComments = (postId: number) => {
  return useQuery<Comment[]>({
    queryKey: ["useGetComments", postId],
    queryFn: async () => {
      return await getCommentsByPostId(postId);
    },
    // refetchInterval: 5000,
  });
};

export default useGetComments;
