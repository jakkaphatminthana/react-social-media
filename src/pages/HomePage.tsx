import PostList from "../components/PostList";

export default function HomePage() {
  return (
    <div className="pt-10">
      <h2 className="text-page-header">Recent Posts</h2>
      <div>
        <PostList />
      </div>
    </div>
  );
}
