import { Link } from "react-router";
import { useGetCommunitiesQuery } from "../queries/communities.query";
import { generateCommunityDetailPath } from "../constants/router.constant";

const CommunityList = () => {
  const { data, error, isLoading } = useGetCommunitiesQuery();

  if (isLoading) {
    return <div>Loading communities...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {data?.map((community) => (
        <div
          key={community.id}
          className="border border-white/10 p-4 hover:translate-y-1 transition transform"
        >
          <Link
            to={generateCommunityDetailPath(community.id)}
            className="text-2xl font-bold text-purple-500 hover:underline"
          >
            {community.name}
          </Link>
          <p className="text-gray-400 mt-2">{community.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CommunityList;
