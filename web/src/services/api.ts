import { env } from "@/env/env";

async function get(url: string, init?: RequestInit) {
  const response = await fetch(`${env.NEXT_API_URL}${url}`, init);

  const data = await response.json();

  return { data };
}

async function post(url: string, init?: RequestInit) {
  return await fetch(`${env.NEXT_API_URL}${url}`, {
    method: 'POST',
    ...init
  });
}

async function patch(url: string, init?: RequestInit) {
  return await fetch(`${env.NEXT_API_URL}${url}`, {
    method: 'PATCH',
    ...init
  });
}

export const api = {
  get,
  post,
  patch
};