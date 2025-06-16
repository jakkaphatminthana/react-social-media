import { supabase } from "../../supabase-client";
import type { VoteAction } from "../../types/enums";

export interface VoteRequest {
  postId: number;
  userId: string;
  action: VoteAction;
}

export async function voteAction({
  postId,
  userId,
  action,
}: VoteRequest): Promise<void> {
  try {
    const { data: existingVote } = await supabase
      .from("votes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle();

    if (existingVote) {
      // delete it. (Liked -> UnLike)
      if (existingVote.vote === action) {
        const { error } = await supabase
          .from("votes")
          .delete()
          .eq("id", existingVote.id);
        if (error) throw new Error(error.message);
      } else {
        // update it. (Liked -> DisLike)
        const { error } = await supabase
          .from("votes")
          .update({ vote: action })
          .eq("id", existingVote.id);
        if (error) throw new Error(error.message);
      }
    } else {
      const { error } = await supabase.from("votes").insert({
        post_id: postId,
        user_id: userId,
        vote: action,
      });
      if (error) throw new Error(error.message);
    }
  } catch (error) {
    console.log("Error voteAction(): ", error);
    throw error;
  }
}

export interface Vote {
  id: number;
  post_id: number;
  user_id: string;
  vote: number;
}

export async function getVotesByPost(postId: number): Promise<Vote[]> {
  try {
    const { data, error } = await supabase
      .from("votes")
      .select("*")
      .eq("post_id", postId);
    if (error) throw new Error(error.message);

    return data as Vote[];
  } catch (error) {
    console.log("Error getVotesByPost(): ", error);
    throw error;
  }
}
