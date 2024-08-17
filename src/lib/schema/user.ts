import { z } from "zod";

export const User = z.object({
  id: z.number(),
  username: z.string(),
  session: z.string(),
});
export type User = z.infer<typeof User>;

export const UserCreatePayload = User.omit({ id: true });
export type UserCreatePayload = z.infer<typeof UserCreatePayload>;