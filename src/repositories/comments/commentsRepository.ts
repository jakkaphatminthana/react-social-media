import { supabase } from "../../supabase-client";
import type {
  Comment,
  CommentCreateRequest,
  CommentParent,
} from "./commentsRepository.types";

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

async function getCommentsWithChildren(
  postId: number
): Promise<CommentParent[]> {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);

    const comments = data as Comment[];
    return buildCommentTree(comments);
  } catch (error) {
    console.log("Error: getCommentsWithChildren(): ", error);
    throw error;
  }
}

function buildCommentTree(comments: Comment[]): CommentParent[] {
  const map = new Map<number, CommentParent>();
  const roots: CommentParent[] = [];

  // Init map
  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, children: [] });
  });

  // Build tree
  comments.forEach((comment) => {
    const node = map.get(comment.id)!;
    if (comment.parent_comment_id) {
      const parent = map.get(comment.parent_comment_id);
      if (parent) {
        parent.children?.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export { createComment, getComments, getCommentsWithChildren };
