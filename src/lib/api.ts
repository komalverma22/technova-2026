/**
 * Base URL for API requests.
 * In development, uses the Vite proxy to avoid CORS issues when using credentials.
 */
export const API_URL = import.meta.env.DEV
  ? 'https://technova.indiesoft.cloud'
  : 'https://technova.indiesoft.cloud';
