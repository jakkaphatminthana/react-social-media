import { useState, type FormEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCreateComment } from "../services/comment/useCase/useCreateComment";

interface Props {
  postId: number;
}

const CommentSection = ({ postId }: Props) => {
  const [newCommentText, setNewCommentText] = useState<string>("");

  const { user } = useAuthStore();
  const { createComment, isLoading, isError } = useCreateComment();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newCommentText) return;

    const userId = user?.id;
    const author = user?.user_metadata?.user_name;

    if (!userId || !author)
      throw new Error("You must be logged in to comment.");

    createComment({
      postId: Number(postId),
      content: newCommentText,
      parentCommentId: null,
      userId: userId,
      author: author,
    });

    setNewCommentText("");
  };

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      {user ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            rows={3}
            placeholder="Write a comment..."
            className="w-full border border-white/10 bg-transparent p-2 rounded"
          />
          <button
            type="submit"
            className="mt-2 bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
            disabled={!newCommentText}
          >
            {isLoading ? "Posting..." : "Post Comment"}
          </button>

          {isError && (
            <p className="text-red-500 mt-2">Error posting comment.</p>
          )}
        </form>
      ) : (
        <p className="mb-4 text-gray-600">
          You must be logged in to post a comment
        </p>
      )}
    </div>
  );
};

export default CommentSection;
