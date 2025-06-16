import { useVoteAction } from "../services/vote/useCase/useVoteAction";
import { useAuthStore } from "../store/useAuthStore";
import { VoteAction } from "../types/enums";
import useGetVotes from "../services/vote/useCase/useGetVotes";

interface Props {
  postId: number;
}

const LikeButton = ({ postId }: Props) => {
  const { user } = useAuthStore();
  const { vote } = useVoteAction();
  const { data: voteData, isLoading, error } = useGetVotes(postId);

  const handleVote = async (action: VoteAction) => {
    if (!user) return;
    await vote({ postId, action, userId: user.id });
  };

  const likeTotal =
    voteData?.filter((v) => v.vote === VoteAction.LIKE).length || 0;

  const dislikeTotal =
    voteData?.filter((v) => v.vote === VoteAction.DISLIKE).length || 0;

  const userVote = voteData?.find((v) => v.user_id === user?.id)?.vote;

  if (isLoading) {
    return <div>Loading votes...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
