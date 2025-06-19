export interface PostCreateRequest {
  title: string;
  content: string;
  avatar_url: string | null;
  imageFile: File;
  community_id?: number | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  avatar_url?: string;
  like_count?: number;
  comment_count?: number;
}

export interface PostWithCommunity extends Post {
  communities: {
    name: string;
  };
}
