import * as SecureStore from 'expo-secure-store';

type Session = string | null;

let session: Session = null;

export async function getSession(): Promise<Session> {
  if (session) {
    return session;
  }

  session = await SecureStore.getItemAsync("session")
  return session;
}

export async function setSession(s: string) {
  if (session) {
    return session;
  }

  await SecureStore.setItemAsync("session", s)
  session = s;
}