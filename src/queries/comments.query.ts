import { useMutation, useQueries } from "@tanstack/react-query";
import { QUERY_COMMENTS_KEY } from "../constants/query.constant";
import {
  createComment,
  getComments,
} from "../repositories/comments/commentsRepository";
import type { CommentCreateRequest } from "../repositories/comments/commentsRepository.types";

export const useGetCommentsQueries = (postId: number) => {
  return useQueries({
    queries: [
      {
        queryKey: [QUERY_COMMENTS_KEY],
        queryFn: () => getComments(postId),
        staleTime: 20000,
      },
    ],
  });
};

export const useCreateCommentMutation = () =>
  useMutation<void, Error, CommentCreateRequest>({ mutationFn: createComment });
