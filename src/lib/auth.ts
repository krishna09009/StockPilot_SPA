const ACCESS_TOKEN_KEY = 'stockpilot.accessToken';

export const authStorage = {
  getToken: (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY),
  setToken: (token: string): void =>
    localStorage.setItem(ACCESS_TOKEN_KEY, token),
  clearToken: (): void => localStorage.removeItem(ACCESS_TOKEN_KEY),
  isAuthenticated: (): boolean =>
    Boolean(localStorage.getItem(ACCESS_TOKEN_KEY)),
};
