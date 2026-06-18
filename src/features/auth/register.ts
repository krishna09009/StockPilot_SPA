import { isAxiosError } from 'axios';

import { api } from '@/lib/api';

export interface RegisterRequest {
  fullName: string;
  organizationName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  accessToken: string;
}

interface ApiErrorResponse {
  message?: string;
}

export class RegistrationError extends Error {
  public constructor(
    message: string,
    public readonly code: 'duplicate_email' | 'unknown',
  ) {
    super(message);
    this.name = 'RegistrationError';
  }
}

export async function registerOrganization(
  input: RegisterRequest,
): Promise<RegisterResponse> {
  try {
    const response = await api.post<RegisterResponse>(
      '/api/v1/auth/register',
      input,
    );

    return response.data;
  } catch (error: unknown) {
    if (
      isAxiosError<ApiErrorResponse>(error) &&
      error.response?.status === 409
    ) {
      throw new RegistrationError(
        error.response.data?.message ??
          'An account with this email already exists.',
        'duplicate_email',
      );
    }

    throw new RegistrationError(
      'We could not create your organization. Please try again.',
      'unknown',
    );
  }
}
