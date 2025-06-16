import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "../../../types";
import { createPost, type CreatePostReq } from "../postService";

interface RequestProps {
  post: CreatePostReq;
  imageFile: File;
}

export const useCreatePost = (options?: MutationOptions<any>) => {
  const mutation = useMutation<any, Error, RequestProps>({
    mutationFn: ({ post, imageFile }) => createPost(post, imageFile),
    retry: false,
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess({ message: "Create Post Success" });
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
    createPost: (variable: RequestProps) => mutation.mutate(variable),
  };
};
