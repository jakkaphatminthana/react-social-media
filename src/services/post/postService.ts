import { supabase } from "../../supabase-client";
import { uploadImage } from "../image/imageService";

export interface CreatePostReq {
  title: string;
  content: string;
  avatar_url: string | null;
}

async function createPost(post: CreatePostReq, imageFile: File) {
  try {
    // upload image
    const imageUrl = await uploadImage({
      imageFile: imageFile,
      fileName: post.title,
      group: "post-images",
    });

    // create row data
    const { data, error } = await supabase
      .from("posts")
      .insert({ ...post, image_url: imageUrl });
    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error("Error createPost():", error);
    throw error;
  }
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  avatar_url: string;
}

async function fetchPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false }); //desc

    if (error) throw new Error(error.message);
    return data as Post[];
  } catch (error) {
    console.error("Error fetchPosts():", error);
    throw error;
  }
}

async function fetchPost(id: number): Promise<Post> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data as Post;
  } catch (error) {
    console.error("Error fetchPosts():", error);
    throw error;
  }
}

export { createPost, fetchPosts, fetchPost };
