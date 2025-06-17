import { useMutation, useQuery } from "@tanstack/react-query";
import type { CommunityCreateRequest } from "../repositories/communities/communitiesRepository.types";
import {
  createCommunity,
  getCommunities,
} from "../repositories/communities/communitiesRepository";
import { QUERY_COMMUNITIES_KEY } from "../constants/query.constant";

export const useGetCommunitiesQuery = () => {
  return useQuery({
    queryKey: [QUERY_COMMUNITIES_KEY],
    queryFn: getCommunities,
  });
};

export const useCreateCommunityMutation = () =>
  useMutation<void, Error, CommunityCreateRequest>({
    mutationFn: createCommunity,
  });
