export const VoteAction = {
  LIKE: 1,
  DISLIKE: -1,
} as const;

export type VoteAction = (typeof VoteAction)[keyof typeof VoteAction];
