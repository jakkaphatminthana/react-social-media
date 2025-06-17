import { supabase } from "../../supabase-client";
import type { CommentCreateRequest } from "./commentsRepository.types";

async function createComment({
  postId,
  content,
  parentCommentId,
  userId,
  author,
}: CommentCreateRequest): Promise<void> {
  try {
    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      content: content,
      parent_comment_id: parentCommentId,
      user_id: userId,
      author: author,
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.log("Error: createComment(): ", error);
    throw error;
  }
}

async function getComments(postId: number): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);

    return data as Comment[];
  } catch (error) {
    console.log("Error: getComments(): ", error);
    throw error;
  }
}

export { createComment, getComments };
