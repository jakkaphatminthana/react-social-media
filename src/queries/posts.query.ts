import { useMutation, useQueries } from "@tanstack/react-query";
import { QUERY_POST_KEY, QUERY_POSTS_KEY } from "../constants/query.constant";
import {
  createPost,
  getPost,
  getPosts,
} from "../repositories/posts/postsRepository";
import type { PostCreateRequest } from "../repositories/posts/postsRepository.types";

export const useGetPostsQueries = () => {
  return useQueries({
    queries: [
      {
        queryKey: [QUERY_POSTS_KEY],
        queryFn: () => getPosts(),
        staleTime: 20000,
      },
    ],
  });
};

export const useGetPostQueries = (postId: number) => {
  return useQueries({
    queries: [
      {
        queryKey: [QUERY_POST_KEY, postId],
        queryFn: () => getPost(postId),
        staleTime: 20000,
      },
    ],
  });
};

export const useCreatePostMutation = () =>
  useMutation<void, Error, PostCreateRequest>({ mutationFn: createPost });
