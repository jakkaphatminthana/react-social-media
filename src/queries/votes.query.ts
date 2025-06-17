import { useMutation, useQueries } from "@tanstack/react-query";
import { QUERY_VOTES_KEY } from "../constants/query.constant";
import { getVotes, voteAction } from "../repositories/votes/votesRepository";
import type { VoteRequest } from "../repositories/votes/votesRepository.types";

export const useGetVotesQueries = (postId: number) => {
  return useQueries({
    queries: [
      {
        queryKey: [QUERY_VOTES_KEY, postId],
        queryFn: () => getVotes(postId),
        staleTime: 20000,
      },
    ],
  });
};

export const useVoteMutation = () =>
  useMutation<void, Error, VoteRequest>({ mutationFn: voteAction });
