import { z } from "zod";
import { User } from "./user";

export const Challenge = z.object({
  authorId: z.number(),
  correctImage: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  groupId: z.number(),
  id: z.number(),
});
export type Challenge = z.infer<typeof Challenge>;

export const ChallengeCreatePayload = z.object({
  groupid: z.number(),
  imagekey: z.string(),
});

export type ChallengeCreatePayload = z.infer<typeof ChallengeCreatePayload>;

export const ChallengeCreateResponse = z.object({
  authorId: z.number(),
  correctImage: z.string(),
  createdAt: z.coerce.date(),
  groupId: z.number(),
  id: z.number(),
  updatedAt: z.coerce.date(),
});
export type ChallengeCreateResponse = z.infer<typeof ChallengeCreateResponse>;

export const ChallengeAttemptPayload = z.object({
  challengeid: z.number(),
  imagekey: z.string(),
});
export type ChallengeAttemptPayload = z.infer<typeof ChallengeAttemptPayload>;

export const ChallengeAttemptResponse = z.object({
  id: z.number(),
});
export type ChallengeAttemptResponse = z.infer<typeof ChallengeAttemptResponse>;
