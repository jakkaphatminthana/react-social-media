import { useMutation, useQuery } from "@tanstack/react-query";
import {
  QUERY_COMMENTS_KEY,
  QUERY_COMMENTS_TREES_KEY,
} from "../constants/query.constant";
import {
  createComment,
  getComments,
  getCommentsWithChildren,
} from "../repositories/comments/commentsRepository";
import type { CommentCreateRequest } from "../repositories/comments/commentsRepository.types";

export const useGetCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_COMMENTS_KEY, postId],
    queryFn: () => getComments(postId),
    staleTime: 20000,
    enabled: !!postId,
  });
};

export const useGetCommentsTreeQuery = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_COMMENTS_TREES_KEY, postId],
    queryFn: () => getCommentsWithChildren(postId),
    staleTime: 20000,
    enabled: !!postId,
  });
};

export const useCreateCommentMutation = () =>
  useMutation<void, Error, CommentCreateRequest>({ mutationFn: createComment });
