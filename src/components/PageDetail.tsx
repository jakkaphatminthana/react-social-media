import { useMemo } from "react";
import useGetPost from "../services/post/useCase/useGetPost";
import LikeButton from "./LikeButton";

interface Props {
  postId: number;
}

const PageDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useGetPost(postId);

  const dateDisplay = useMemo(() => {
    return data?.created_at
      ? new Date(data.created_at).toLocaleDateString()
      : "-";
  }, [data]);

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="page-text-header">{data?.title}</h2>

      {/* Image Banner */}
      {data?.image_url && (
        <img
          src={data?.image_url}
          alt={data?.title}
          className="mt-4 rounded object-cover w-full h-64"
        />
      )}
      <p className="text-gray-400">{data?.content}</p>
      <p className="text-gray-500 text-sm">Posted on: {dateDisplay}</p>
      <LikeButton postId={postId} />
    </div>
  );
};

export default PageDetail;
