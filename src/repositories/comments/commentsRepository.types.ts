export interface CommentCreateRequest {
  postId: number;
  content: string;
  parentCommentId?: number | null;
  userId: string;
  author: string;
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
