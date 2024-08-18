import { z } from "zod";

export const User = z.object({
  id: z.number(),
  username: z.string(),
  session: z.string(),
});
export type User = z.infer<typeof User>;

export const UserCreatePayload = User.omit({ id: true });
export type UserCreatePayload = z.infer<typeof UserCreatePayload>;

export const newUserName = z.object({
  newUsername: z.string(),
})

export const UserUpdatePayload = newUserName;
export type UserUpdatePayload = z.infer<typeof UserUpdatePayload>;

export const GroupMembership = z.object({
  userId: z.number(),
  points: z.number(),
  groupId: z.number(),
});

export const UserWithMembership = z.object({
  username: z.string(),
  GroupMembership: z.array(GroupMembership),
});

export type UserWithMembership = z.infer<typeof UserWithMembership>;

export const UserAllResponse = z.array(UserWithMembership);
export type UserAllResponse = z.infer<typeof UserWithMembership>;