import { useState, type FormEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  useCreateCommentMutation,
  useGetCommentsTreeQuery,
} from "../queries/comments.query";
import { queryClient } from "../queries/queryClient";
import { QUERY_COMMENTS_TREES_KEY } from "../constants/query.constant";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

interface Props {
  postId: number;
}

const CommentSection = ({ postId }: Props) => {
  const [newCommentText, setNewCommentText] = useState<string>("");

  const { user } = useAuthStore();
  const { data, isError, isLoading, error } = useGetCommentsTreeQuery(postId);

  const createCommentMutation = useCreateCommentMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newCommentText) return;

    const userId = user?.id;
    const author = user?.user_metadata?.user_name;

    if (!userId || !author)
      throw new Error("You must be logged in to comment.");

    createCommentMutation.mutate(
      {
        postId: Number(postId),
        content: newCommentText,
        parentCommentId: null,
        userId: userId,
        author: author,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_COMMENTS_TREES_KEY],
          });
        },
      }
    );

    setNewCommentText("");
  };

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>

      {/* Create Comment Section */}
      {user ? (
        <CommentForm
          handleSubmit={handleSubmit}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          isLoading={createCommentMutation.isPending}
          isError={createCommentMutation.isError}
        />
      ) : (
        <p className="mb-4 text-gray-600">
          You must be logged in to post a comment
        </p>
      )}

      {/* Comment display */}
      <div className="space-y-4 mt-4">
        {data?.map((comment, index) => (
          <CommentItem key={index} comment={comment} postId={postId} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
