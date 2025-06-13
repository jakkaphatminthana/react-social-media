import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import type { MutationOptions } from "../types";

export interface CreatePostReq {
  title: string;
  content: string;
}

async function createPost(post: CreatePostReq, imageFile: File) {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

  // upload image
  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);
  if (uploadError) throw new Error(uploadError.message);

  const { data: publicURLData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  // create row data
  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicURLData.publicUrl });
  if (error) throw new Error(error.message);

  return data;
}

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
