export interface PostCreateRequest {
  title: string;
  content: string;
  avatar_url: string | null;
  imageFile: File;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  avatar_url: string;
}
