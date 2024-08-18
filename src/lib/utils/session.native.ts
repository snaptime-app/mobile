import * as SecureStore from "expo-secure-store";
import type { UserCreatePayload } from "@/lib/schema/user";
import { choose, randomString } from "./random";

type Session = string | null;
let session: Session = null;

export async function getSession(): Promise<Session> {
  if (session) {
    return session;
  }

  session = await SecureStore.getItemAsync("session");
  return session;
}

export async function setSession(s: Session) {
  if (s) {
    await SecureStore.setItemAsync("session", s);
  } else {
    await SecureStore.deleteItemAsync("session");
  }

  session = s;
}