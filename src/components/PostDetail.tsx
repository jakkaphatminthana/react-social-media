import { useMemo } from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { useGetPostQueries } from "../queries/posts.query";

interface Props {
  postId: number;
}

const PostDetail = ({ postId }: Props) => {
  const [postInfo] = useGetPostQueries(postId);

  const dateDisplay = useMemo(() => {
    return postInfo.data?.created_at
      ? new Date(postInfo.data.created_at).toLocaleDateString()
      : "-";
  }, [postInfo.data]);

  if (postInfo.isLoading) {
    return <div>Loading post...</div>;
  }

  if (postInfo.error) {
    return <div>Error: {postInfo.error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-page-header">{postInfo.data?.title}</h2>

      {/* Image Banner */}
      {postInfo.data?.image_url && (
        <img
          src={postInfo.data?.image_url}
          alt={postInfo.data?.title}
          className="mt-4 rounded object-cover w-full h-64"
        />
      )}
      <p className="text-gray-400">{postInfo.data?.content}</p>
      <p className="text-gray-500 text-sm">Posted on: {dateDisplay}</p>

      <LikeButton postId={postId} />
      <CommentSection postId={postId} />
    </div>
  );
};

export default PostDetail;
