import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import {
  registerOrganization,
  RegistrationError,
} from '@/features/auth/register';
import {
  registerSchema,
  type RegisterFormValues,
} from '@/features/auth/registerSchema';
import { authSession } from '@/lib/auth';

const inputClassName =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/20';

export function RegisterPage() {
  const navigate = useNavigate();
  const submissionLock = useRef(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      organizationName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  if (authSession.isAuthenticated()) {
    return <Navigate replace to="/app/dashboard" />;
  }

  const onSubmit = async (values: RegisterFormValues): Promise<void> => {
    if (submissionLock.current) return;

    submissionLock.current = true;

    try {
      const response = await registerOrganization({
        fullName: values.fullName,
        organizationName: values.organizationName,
        email: values.email,
        password: values.password,
      });
      authSession.setAccessToken(response.accessToken);
      await navigate('/app/dashboard', { replace: true });
    } catch (error: unknown) {
      if (
        error instanceof RegistrationError &&
        error.code === 'duplicate_email'
      ) {
        setError('email', { message: error.message }, { shouldFocus: true });
      } else {
        setError('root.server', {
          message:
            error instanceof Error
              ? error.message
              : 'Registration failed. Please try again.',
        });
      }
    } finally {
      submissionLock.current = false;
    }
  };

  return (
    <section className="mx-auto max-w-lg px-6 py-12">
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="font-semibold text-brand-600">Get started</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Create your organization
        </h1>
        <p className="mt-2 text-slate-600">
          Set up your workspace and administrator account.
        </p>

        <form
          className="mt-8 space-y-5"
          noValidate
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          <div>
            <label className="text-sm font-medium" htmlFor="fullName">
              Full name
            </label>
            <input
              {...register('fullName')}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              aria-invalid={Boolean(errors.fullName)}
              autoComplete="name"
              className={inputClassName}
              id="fullName"
              type="text"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600" id="fullName-error">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="organizationName">
              Organization name
            </label>
            <input
              {...register('organizationName')}
              aria-describedby={
                errors.organizationName ? 'organizationName-error' : undefined
              }
              aria-invalid={Boolean(errors.organizationName)}
              autoComplete="organization"
              className={inputClassName}
              id="organizationName"
              type="text"
            />
            {errors.organizationName && (
              <p
                className="mt-1 text-sm text-red-600"
                id="organizationName-error"
              >
                {errors.organizationName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              {...register('email')}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={Boolean(errors.email)}
              autoCapitalize="none"
              autoComplete="email"
              className={inputClassName}
              id="email"
              inputMode="email"
              type="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" id="email-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              {...register('password')}
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={Boolean(errors.password)}
              autoComplete="new-password"
              className={inputClassName}
              id="password"
              type="password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600" id="password-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              {...register('confirmPassword')}
              aria-describedby={
                errors.confirmPassword ? 'confirmPassword-error' : undefined
              }
              aria-invalid={Boolean(errors.confirmPassword)}
              autoComplete="new-password"
              className={inputClassName}
              id="confirmPassword"
              type="password"
            />
            {errors.confirmPassword && (
              <p
                className="mt-1 text-sm text-red-600"
                id="confirmPassword-error"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {errors.root?.server && (
            <p
              aria-live="polite"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              role="alert"
            >
              {errors.root.server.message}
            </p>
          )}

          <button
            aria-busy={isSubmitting}
            className="w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Creating organization…' : 'Create organization'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link className="font-semibold text-brand-700" to="/sign-in">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
