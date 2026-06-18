import axios from 'axios';

import { env } from '@/config/env';
import { authStorage } from '@/lib/auth';

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
});

api.interceptors.request.use((config) => {
  const accessToken = authStorage.getToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
