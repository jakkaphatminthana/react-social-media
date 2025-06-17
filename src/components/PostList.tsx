import { useGetPostsWithCountQuery } from "../queries/posts.query";
import PostItem from "./PostItem";

const PostList = () => {
  const { data, isLoading, error } = useGetPostsWithCountQuery();

  if (isLoading) <div>Loading post...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {data?.map((post, index) => (
        <PostItem post={post} key={index} />
      ))}
    </div>
  );
};

export default PostList;
