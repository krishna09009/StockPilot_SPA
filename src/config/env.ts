const apiUrl = import.meta.env.VITE_API_URL?.trim();

if (!apiUrl) {
  throw new Error('VITE_API_URL is required. Add it to your .env file.');
}

export const env = {
  apiUrl,
} as const;
