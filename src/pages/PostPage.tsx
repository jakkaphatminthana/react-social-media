import { useParams } from "react-router";
import PostDetail from "../components/PostDetail";

const PostPage = () => {
  const { id } = useParams();

  return (
    <div className="pt-10">
      <PostDetail postId={Number(id)} />
    </div>
  );
};

export default PostPage;
