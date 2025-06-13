import React, { useRef } from "react";
import { useCreatePost } from "../services/useCase/useCreatePost";

const CreatePostForm = () => {
  //   const [title, setTitle] = useState<string>("");
  //   const [content, setContent] = useState<string>("");
  //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { createPost, isLoading, isError } = useCreatePost({
    onSuccess: (res) => {
      console.log(res);
      formRef.current?.reset();
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File;

    if (!file) return;
    createPost({ post: { title, content }, imageFile: file });
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

      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        {isLoading ? "Creating..." : "Create Post"}
      </button>

      {isError && <p className="text-red-500">Error creating post.</p>}
    </form>
  );
};

export default CreatePostForm;
