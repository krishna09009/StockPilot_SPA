# StockPilot SPA

Typed React application foundation built with Vite.

## Getting started

1. Copy `.env.example` to `.env` and set the API URL.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.

## Commands

- `npm run dev` — start the Vite development server
- `npm run build` — type-check and create a production build
- `npm run lint` — run ESLint
- `npm run format` — format the project with Prettier
- `npm run format:check` — verify formatting
- `npm run typecheck` — run TypeScript without emitting files

## Environment

`VITE_API_URL` is required and should contain the API server origin, for
example `http://localhost:3000`. Authentication requests include credentials
so the server can issue the refresh token as an HttpOnly cookie.
