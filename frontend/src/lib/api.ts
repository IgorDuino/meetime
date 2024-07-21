// app/lib/api.ts
import { getToken } from './token';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getToken();

  const headers = {
    ...options.headers,
    Authorization: `Token ${token}`,
  };

  const res = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    window.location.href = '/login';
  }

  return res;
}
