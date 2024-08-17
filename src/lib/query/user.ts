import { useMutation, useQuery } from "@tanstack/react-query";
import { get, post } from "@/lib/utils/request";
import { User, UserCreatePayload } from "@/lib/schema/user";

export function useAuthenticatedUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await get("/user/get");
      console.log(user);
      return User.parse(user);
    },
    retry: false,
  });
}

export function useUserCreate() {
  return useMutation({
    mutationFn: async (body: UserCreatePayload) => {
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
