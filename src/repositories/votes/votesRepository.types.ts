import type { VoteAction } from "../../types/enums";

export interface VoteRequest {
  postId: number;
  userId: string;
  action: VoteAction;
}

export interface Vote {
  id: number;
  post_id: number;
  user_id: string;
  vote: number;
}
