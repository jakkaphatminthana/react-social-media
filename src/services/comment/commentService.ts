import { supabase } from "../../supabase-client";

export interface CommentCreateRequest {
  postId: number;
  content: string;
  parentCommentId?: number | null;
  userId: string;
  author: string;
}

export async function createComment({
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

export interface Comment {
  id: number;
  post_id: number;
  parent_comment_id: number | null;
  content: string;
  user_id: string;
  created_at: string;
  author: string;
}

export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);

    return data as Comment[];
  } catch (error) {
    console.log("Error: getCommentsByPostId(): ", error);
    throw error;
  }
}
