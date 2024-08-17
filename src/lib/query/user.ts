import { useMutation } from "@tanstack/react-query";
import { put } from "../utils/request";

interface CreateUserMutation {
  username: string;
  session: string;
}

export function useCreateUserMutation() {
  return useMutation({
    mutationFn: async (body: CreateUserMutation) => {
      return put("/user", body);
    },
  });
}
