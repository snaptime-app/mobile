import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "@/lib/utils/request";
import { User, UserCreatePayload, UserAllResponse, UserUpdatePayload } from "@/lib/schema/user";

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
      await post("/user/create", { json: payload });
    },
    retry: false,
  });
}

export function useUserUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UserUpdatePayload) => {
      await post("/user/update", { json: payload });
    },
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authenticatedUser"] });
    },
  });
}

export function useUserAll() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await get("/user/all");
      return UserAllResponse.parse(users);
    },
    retry: false,
  });
}