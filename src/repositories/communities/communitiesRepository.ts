import { supabase } from "../../supabase-client";
import type {
  Community,
  CommunityCreateRequest,
} from "./communitiesRepository.types";

async function createCommunity(params: CommunityCreateRequest): Promise<void> {
  try {
    const { error } = await supabase.from("communities").insert(params);
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Error createCommunity(): ", error);
    throw error;
  }
}

async function getCommunities(): Promise<Community[]> {
  try {
    const { data, error } = await supabase
      .from("communities")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);

    return data as Community[];
  } catch (error) {
    console.error("Error getCommunities(): ", error);
    throw error;
  }
}

export { createCommunity, getCommunities };
