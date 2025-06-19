import { supabase } from "../../supabase-client";
import { uploadImage } from "../upload/imagesRepository";
import type {
  Post,
  PostCreateRequest,
  PostWithCommunity,
} from "./postsRepository.types";

async function createPost(post: PostCreateRequest): Promise<void> {
  try {
    // upload image
    const imageUrl = await uploadImage({
      imageFile: post.imageFile,
      fileName: post.title,
      group: "post-images",
    });

    // create row data
    const { error } = await supabase.from("posts").insert({
      title: post.title,
      content: post.content,
      avatar_url: post.avatar_url,
      image_url: imageUrl,
      community_id: post.community_id,
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Error createPost():", error);
    throw error;
  }
}

async function getPosts(): Promise<Post[]> {
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

async function getPost(id: number): Promise<Post> {
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

async function getPostsWithCount(): Promise<Post[]> {
  try {
    const { data, error } = await supabase.rpc("get_posts_with_counts");
    if (error) throw new Error(error.message);

    return data as Post[];
  } catch (error) {
    console.error("Error getPostsWithCount():", error);
    throw error;
  }
}

async function getPostsWithCommunity(
  communityId: number
): Promise<PostWithCommunity[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, communities(name)")
      .eq("community_id", communityId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);

    return data as PostWithCommunity[];
  } catch (error) {
    console.error("Error getCommunityPosts(): ", error);
    throw error;
  }
}

export {
  createPost,
  getPosts,
  getPost,
  getPostsWithCount,
  getPostsWithCommunity,
};
