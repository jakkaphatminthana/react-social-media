import { QUERY_VOTES_KEY } from "../constants/query.constant";
import { queryClient } from "../queries/queryClient";
import { useVoteMutation, useGetVotesQueries } from "../queries/votes.query";
import { useAuthStore } from "../store/useAuthStore";
import { VoteAction } from "../types/enums";

interface Props {
  postId: number;
}

const LikeButton = ({ postId }: Props) => {
  const { user } = useAuthStore();
  const [votesInfo] = useGetVotesQueries(postId);

  const voteActionMutation = useVoteMutation();

  const handleVote = async (action: VoteAction) => {
    if (!user) return;
    voteActionMutation.mutate(
      { postId, action, userId: user.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERY_VOTES_KEY] });
        },
      }
    );
  };

  const likeTotal =
    votesInfo.data?.filter((v) => v.vote === VoteAction.LIKE).length || 0;

  const dislikeTotal =
    votesInfo.data?.filter((v) => v.vote === VoteAction.DISLIKE).length || 0;

  const userVote = votesInfo.data?.find((v) => v.user_id === user?.id)?.vote;

  if (votesInfo.isLoading) {
    return <div>Loading votes...</div>;
  }

  if (votesInfo.error) {
    return <div>Error: {votesInfo.error.message}</div>;
  }

  return (
    <div className="flex items-center space-x-4 my-4">
      <button
        onClick={() => handleVote(VoteAction.LIKE)}
        className={`px-3 py-1 cursor-pointer rounded transition-colors duration-150 ${
          userVote === VoteAction.LIKE
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        👍 {likeTotal}
      </button>
      <button
        onClick={() => handleVote(VoteAction.DISLIKE)}
        className={`px-3 py-1 cursor-pointer rounded transition-colors duration-150 ${
          userVote === VoteAction.DISLIKE
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        👎 {dislikeTotal}
      </button>
    </div>
  );
};

export default LikeButton;
