type Session = string | null;
let session: Session = null;

export async function getSession(): Promise<Session> {
  if (session) {
    return session;
  }

  session = sessionStorage.getItem("session");
  return session;
}

export async function setSession(s: Session) {
  if (s) {
    session = sessionStorage.getItem("session");
    await sessionStorage.setItem("session", s);
  } else {
    await sessionStorage.removeItem("session");
  }

  session = s;
}