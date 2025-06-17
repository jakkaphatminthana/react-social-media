import { useGetPostsQueries } from "../queries/posts.query";
import PostItem from "./PostItem";

const PostList = () => {
  const [postsInfo] = useGetPostsQueries();

  if (postsInfo.isLoading) <div>Loading post...</div>;

  if (postsInfo.error) {
    return <div>Error: {postsInfo.error.message}</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {postsInfo?.data?.map((post, index) => (
        <PostItem post={post} key={index} />
      ))}
    </div>
  );
};

export default PostList;
