export const ROUTE_HOME = "/";
export const ROUTE_POST_CREATE = "/create";
export const ROUTE_POST_DETAIL = "/post/:id";
export const ROUTE_COMMUNITY_CREATE = "/community/create";
export const ROUTE_COMMUNITY = "/communities";
export const ROUTE_COMMUNITY_DETAIL = "/community/:id";

export const generatePostDetailPath = (id: number) => `/post/${id}`;
export const generateCommunityDetailPath = (id: number) => `/community/${id}`;
