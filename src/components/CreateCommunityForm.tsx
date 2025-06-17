import { useState, type FormEvent } from "react";
import { useCreateCommunityMutation } from "../queries/communities.query";
import { useNavigate } from "react-router";
import { ROUTE_COMMUNITY } from "../constants/router.constant";
import { queryClient } from "../queries/queryClient";
import { QUERY_COMMUNITIES_KEY } from "../constants/query.constant";

const CreateCommunityForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const createCommunity = useCreateCommunityMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createCommunity.mutate(
      { name, description },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERY_COMMUNITIES_KEY] });
          navigate(ROUTE_COMMUNITY);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-page-header">Create New Community</h2>
      <div>
        <label htmlFor="name" className="block mb-2 font-medium">
          Community Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-2 font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          rows={3}
          required
        />
      </div>
      <button type="submit" className="button-primary">
        {createCommunity.isPending ? "Creating..." : "Create Community"}
      </button>

      {createCommunity.isError && (
        <p className="text-red-500">Error creating community</p>
      )}
    </form>
  );
};

export default CreateCommunityForm;
