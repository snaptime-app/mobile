import { useMutation, useQuery } from "@tanstack/react-query";
import { get, post } from "@/lib/utils/request";
import { User, UserCreatePayload } from "@/lib/schema/user";

export function useAuthenticatedUser() {
  return useQuery({
    queryKey: ["authenticatedUser"],
    queryFn: async () => {
      const user = await get("/user/get");
      return User.parse(user);
    },
    retry: false,
  });
}

export function useUserCreate() {
  return useMutation({
    mutationFn: async (payload: UserCreatePayload) => {
      await post("/user/create", {json: payload});
    },
    retry: false,
  });
}
