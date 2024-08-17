import { useMutation } from "@tanstack/react-query";
import { post } from "../utils/request";

interface CreateUserMutation {
  username: string;
  session: string;
}

export function useUserCreateMutation() {
  return useMutation({
    mutationFn: async (body: CreateUserMutation) => {
      try {
        await post("/user/create", body);
      } catch (e) {
        console.log("hoomge");
        console.error(e);
        throw e;
      }
    },
    retry: false,
  });
}
