import React, { useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCreatePostMutation } from "../queries/posts.query";
import { useGetCommunitiesQuery } from "../queries/communities.query";

const CreatePostForm = () => {
  //   const [title, setTitle] = useState<string>("");
  //   const [content, setContent] = useState<string>("");
  //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useAuthStore();

  const { data: communities } = useGetCommunitiesQuery();

  const createPostMutation = useCreatePostMutation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File;
    const communityValue = formData.get("community");
    const communityId =
      communityValue &&
      typeof communityValue === "string" &&
      communityValue !== ""
        ? Number(communityValue)
        : null;

    if (!file) return;
    createPostMutation.mutate(
      {
        title,
        content,
        avatar_url: user?.user_metadata?.avatar_url || null,
        imageFile: file,
        community_id: communityId,
      },
      {
        onSuccess: () => {
          formRef.current?.reset();
        },
      }
    );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-4"
    >
      <div>
        <label htmlFor="title" className="block mb-2 font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full border border-white/10 bg-transparent rounded"
        />
      </div>
      <div>
        <label htmlFor="content" className="block mb-2 font-medium">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          className="w-full border border-white/10 bg-transparent rounded"
          required
          rows={5}
        />
      </div>

      <div>
        <label>Select Community</label>
        <select id="community" name="community">
          <option value={""}> -- Choose a Community -- </option>
          {communities?.map((community, index) => (
            <option key={index} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="image" className="block mb-2 font-medium">
          Upload Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required
          className="w-full text-gray-200"
        />
      </div>

      <button type="submit" className="button-primary">
        {createPostMutation.isPending ? "Creating..." : "Create Post"}
      </button>

      {createPostMutation.isError && (
        <p className="text-red-500">Error creating post.</p>
      )}
    </form>
  );
};

export default CreatePostForm;
