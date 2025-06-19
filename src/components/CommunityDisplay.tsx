import { useGetPostsWithCommunityQuery } from "../queries/posts.query";
import PostItem from "./PostItem";

interface Props {
  communityId: number;
}

const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading } = useGetPostsWithCommunityQuery(communityId);

  if (isLoading) {
    return <div className="text-center py-4">Loading communities...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-page-header">
        {data?.length ? data[0].communities?.name : ""} Community Posts
      </h2>

      {data && data.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {data.map((post, index) => (
            <PostItem key={index} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No posts in this community yet.
        </p>
      )}
    </div>
  );
};

export default CommunityDisplay;
