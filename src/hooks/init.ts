import { useUserCreate } from "@/lib/query/user";
import { generateUser, getSession, setSession } from "@/lib/utils/session";
import { useEffect, useState } from "react";

export function useInitSession() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { mutate, isSuccess } = useUserCreate();

  useEffect(() => {
    console.log("useInitSession");
    getSession().then((s) => {
      if (s) {
        setIsInitialized(true);
        return;
      }
      const newUser = generateUser();
      console.log("payload", newUser);
      mutate(newUser, {
        onSettled(data, error) {
          if (error) {
            console.log("Error creating user", error);
            console.error(error);
          } else {
            console.log("User created", data);
          }
        },
        onSuccess: async () => {
          await setSession(newUser.session);
          setIsInitialized(true);
        },
      });
    });
  }, []);

  return isInitialized;
}
