import { useQuery } from "@tanstack/react-query";
import { getVotesByPost, type Vote } from "../voteService";

const useGetVotes = (postId: number) => {
  return useQuery<Vote[]>({
    queryKey: ["useGetVotes", postId],
    queryFn: async () => {
      return await getVotesByPost(postId);
    },
    // refetchInterval: 5000,
  });
};

export default useGetVotes;
