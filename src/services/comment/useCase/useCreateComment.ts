import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "../../../types";
import { createComment, type CommentCreateRequest } from "../commentService";

export const useCreateComment = (options?: MutationOptions<void>) => {
  const mutation = useMutation<void, Error, CommentCreateRequest>({
    mutationFn: (params) => createComment(params),
    retry: false,
    onSuccess: () => {
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
    isError: mutation.isError,
    createComment: (variable: CommentCreateRequest) =>
      mutation.mutate(variable),
  };
};
