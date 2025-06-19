import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  QUERY_POST_KEY,
  QUERY_POSTS_KEY,
  QUERY_POSTS_WITH_COMMUNITY_KEY,
  QUERY_POSTS_WITH_COUNT_KEY,
} from "../constants/query.constant";
import {
  createPost,
  getPost,
  getPosts,
  getPostsWithCommunity,
  getPostsWithCount,
} from "../repositories/posts/postsRepository";
import type { PostCreateRequest } from "../repositories/posts/postsRepository.types";

// example useQueries
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
        enabled: !!postId,
      },
    ],
  });
};

export const useGetPostsWithCountQuery = () => {
  return useQuery({
    queryKey: [QUERY_POSTS_WITH_COUNT_KEY],
    queryFn: () => getPostsWithCount(),
    staleTime: 20000,
  });
};

export const useGetPostsWithCommunityQuery = (communityId: number) => {
  return useQuery({
    queryKey: [QUERY_POSTS_WITH_COMMUNITY_KEY, communityId],
    queryFn: () => getPostsWithCommunity(communityId),
    staleTime: 20000,
  });
};

export const useCreatePostMutation = () =>
  useMutation<void, Error, PostCreateRequest>({ mutationFn: createPost });
