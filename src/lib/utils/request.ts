import { getSession } from './session';

type Body = object | string;

interface RequestArgs {
  method: string;
  path: string;
  body?: Body;
  options?: RequestInit;
}

export async function request(args: RequestArgs) {
  const session = await getSession();
  const url = `${process.env.EXPO_PUBLIC_SERVER_URL}${args.path}`;
  const options: RequestInit = {
    method: args.method,
    headers: session
      ? {
          Authorization: `Bearer ${session}`,
        }
      : {},
    body: args.body ? JSON.stringify(args.body) : undefined,
    ...args.options,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  if (response.status === 204) {
    return {};
  } else {
    return response.json();
  }
}

export async function get(path: string, options?: RequestInit) {
  return request({
    path,
    method: 'GET',
    options,
  });
}

export async function post(path: string, body: Body, options?: RequestInit) {
  return request({
    method: 'POST',
    path,
    body,
    options,
  });
}

export async function put(path: string, body: Body, options: RequestInit = {}) {
  return request({
    method: 'PUT',
    path,
    body,
    options,
  });
}

export async function del(path: string, body: Body, options?: RequestInit) {
  return request({
    method: 'DELETE',
    path,
    body,
    options,
  });
}
