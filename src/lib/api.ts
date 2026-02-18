/**
 * Base URL for API requests.
 * In development, uses the Vite proxy to avoid CORS issues.
 */
export const API_URL = import.meta.env.DEV
  ? "https://technova.indiesoft.cloud"
  : "https://technova.indiesoft.cloud";

/**
 * Gets the auth token from the cookie.
 */
export function getAuthToken(): string | null {
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Fetches from the API with the auth token automatically added to the Authorization header.
 * Use this for all API requests that may require authentication.
 */
export async function apiFetch(
  url: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();
  const headers = new Headers(init.headers);

  if (token) {
    headers.set("Authorization", `${token}`);
  }
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(url, {
    ...init,
    headers,
  });
}
