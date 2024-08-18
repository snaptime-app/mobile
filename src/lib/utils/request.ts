import { getSession } from "./session";

type Json = object | string;

interface RequestArgs {
  method: string;
  path: string;
  json?: Json;
  fetchOptions?: RequestInit;
  form?: FormData;
}

interface RequestMethodOptions {
  json?: Json;
  form?: FormData;
  fetchOptions?: RequestInit;
}

export async function request(args: RequestArgs) {
  const session = await getSession();
  const url = `${process.env.EXPO_PUBLIC_SERVER_URL}${args.path}`;
  let body: FormData | string | undefined = undefined;
  if (args.form) {
    body = args.form;
  } else if (args.json) {
    body = JSON.stringify(args.json);
  }

  const options: RequestInit = {
    method: args.method,
    headers: {
      ...(session ? { Authorization: session } : {}),
      ...(args.json ? { "Content-Type": "application/json" } : {}),
    },
    body,
    ...args.fetchOptions,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Fetch Error: ${url}, ${response.status}, ${response.statusText}`,
    );
  }

  if (response.status === 204) {
    return {};
  } else {
    return response.json();
  }
}

export async function get(path: string, options?: RequestMethodOptions) {
  return request({
    path,
    method: "GET",
    ...options,
  });
}

export async function post(path: string, options?: RequestMethodOptions) {
  return request({
    method: "POST",
    path,
    ...options,
  });
}

export async function put(path: string, options?: RequestMethodOptions) {
  return request({
    method: "PUT",
    path,
    ...options,
  });
}

export async function del(path: string, options?: RequestMethodOptions) {
  return request({
    method: "DELETE",
    path,
    ...options,
  });
}
