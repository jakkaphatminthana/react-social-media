export interface CommunityCreateRequest {
  name: string;
  description: string;
}

export interface Community {
  id: number;
  name: string;
  description: string;
  created_at: string;
}
