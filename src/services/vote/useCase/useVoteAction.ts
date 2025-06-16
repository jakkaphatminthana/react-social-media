import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationOptions } from "../../../types";
import { voteAction, type VoteRequest } from "../voteService";

export const useVoteAction = (options?: MutationOptions<void>) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, VoteRequest>({
    mutationFn: ({ postId, userId, action }) =>
      voteAction({ postId, userId, action }),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetVotes"] });
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error) => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  return {
    isLoading: mutation.isPending,
    error: mutation.error,
    vote: (variable: VoteRequest) => mutation.mutate(variable),
  };
};
