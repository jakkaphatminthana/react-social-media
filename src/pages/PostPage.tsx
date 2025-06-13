import { useParams } from "react-router";
import PageDetail from "../components/PageDetail";

const PostPage = () => {
  const { id } = useParams();

  return (
    <div className="pt-10">
      <PageDetail postId={Number(id)} />
    </div>
  );
};

export default PostPage;
