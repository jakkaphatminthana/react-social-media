import { useState, type FormEvent } from "react";
import type { CommentParent } from "../repositories/comments/commentsRepository.types";
import { useAuthStore } from "../store/useAuthStore";
import CommentForm from "./CommentForm";
import { useCreateCommentMutation } from "../queries/comments.query";
import { queryClient } from "../queries/queryClient";
import { QUERY_COMMENTS_TREES_KEY } from "../constants/query.constant";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface Props {
  comment: CommentParent;
  postId: number;
}

const CommentItem = ({ comment, postId }: Props) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [replytext, setReplyText] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const { user } = useAuthStore();

  const replyCommentMution = useCreateCommentMutation();

  const handleReplySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!replytext) return;

    const userId = user?.id;
    const author = user?.user_metadata?.user_name;

    if (!userId || !author) throw new Error("You must be logged in to reply.");

    replyCommentMution.mutate(
      {
        content: replytext,
        postId,
        parentCommentId: comment.id,
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
    setReplyText("");
  };

  return (
    <div className="pl-4 border-l border-white/10">
      <div className="mb-2">
        <div className="flex items-center space-x-2">
          {/* username */}
          <span className="text-sm font-bold text-blue-400">
            {comment.author}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(comment.created_at).toLocaleString()}
          </span>
        </div>

        {/* comment */}
        <p className="text-gray-300">{comment.content}</p>
        <button
          onClick={() => setShowReply((prev) => !prev)}
          className="text-blue-500 text-sm mt-1"
        >
          {showReply ? "Cancle" : "Reply"}
        </button>
      </div>

      {/* replay input */}
      {showReply && user && (
        <div className="mb-2">
          <CommentForm
            handleSubmit={handleReplySubmit}
            value={replytext}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            rows={2}
            buttonText="Post Reply"
            buttonColor="bg-blue-500"
          />
        </div>
      )}

      {/* display reply comment */}
      {comment.children && comment.children.length > 0 && (
        <div>
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            title={isCollapsed ? "Hide Replies" : "Show Replies"}
            className="flex items-center gap-1"
          >
            {isCollapsed ? (
              <IoIosArrowDown size={24} />
            ) : (
              <IoIosArrowUp size={24} />
            )}

            <span className="text-xs text-gray-400">
              {isCollapsed
                ? `Show Replies (${comment.children.length})`
                : "Hide Replies"}
            </span>
          </button>

          {!isCollapsed && (
            <div className="space-y-2">
              {comment.children.map((child, index) => (
                <CommentItem key={index} comment={child} postId={postId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
