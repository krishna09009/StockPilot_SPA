import axios from 'axios';

import { env } from '@/config/env';
import { authSession } from '@/lib/auth';

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = authSession.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
