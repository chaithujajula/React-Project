# React + Next.js Learning Lab

A starter project that maps to the six learning outcomes: React fundamentals, CRUD/hooks, scalable component structure, Next.js App Router, API integration, and testing/performance.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The `/tasks` route reuses the same CRUD feature component. Then run:

```bash
npm test       # Vitest + React Testing Library
npm run lint   # ESLint
npm run build  # production build check
```

## What's included

- **React:** props, controlled form input, local component state, events, conditional rendering, accessible validation and error messages.
- **CRUD:** create, read, update, delete, complete tasks, and filter all/active/completed.
- **Custom hook:** `hooks/use-tasks.ts` centralizes fetch calls, loading/error state and mutations.
- **Next.js App Router:** `app/layout.tsx`, home route, `/tasks`, `loading.tsx`, `error.tsx`, and Route Handlers under `app/api`.
- **Live external data:** `app/api/weather/route.ts` calls Open-Meteo current conditions. No API key is required. Default coordinates are Hyderabad; edit the route or pass `?lat=...&lon=...` to use another location. Weather responses are cached for up to five minutes by Next.js.
- **Validation:** client and server checks for task title length, request shape, IDs and field types.
- **Tests:** component tests in `components/task-manager.test.tsx` using Vitest and React Testing Library.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create a task; JSON body `{ "title": "Read React docs" }` |
| PATCH | `/api/tasks/:id` | Update title and/or completed status |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/weather` | Fetch current weather via Open-Meteo |
| GET | `/api/weather?lat=17.385&lon=78.487` | Fetch weather for supplied coordinates |

## Architecture

```text
app/
  api/tasks/             # Task REST API handlers
  api/weather/           # External weather API proxy
  tasks/                 # Separate route reusing TaskManager
  layout.tsx             # Shared app shell + metadata
  page.tsx               # Dashboard page
components/
  task-manager.tsx       # UI, form, filters, task actions
  weather-card.tsx       # External data widget
  task-manager.test.tsx  # Component tests
hooks/
  use-tasks.ts           # Data-fetching and CRUD custom hook
lib/
  tasks-store.ts         # Demo in-memory store
  types.ts               # Shared TypeScript types
tests/
  setup.ts               # Vitest setup
```

## Important demo limitations

- **Task persistence:** the included store is in memory, intentionally keeping setup simple. It resets on server restart and is not suitable for multi-instance production deployments. For durable real-world CRUD, replace `lib/tasks-store.ts` with a database such as PostgreSQL via Prisma/Drizzle, SQLite for a local prototype, or a hosted database. Add authentication, authorization, rate limits, and audit logging before exposing writes publicly.
- **Weather freshness:** data comes from the real Open-Meteo API, but the response can be cached for five minutes. Use `cache: 'no-store'` and the appropriate provider terms/limits if every request must be fresh.
- **Server Actions:** this project uses Next.js Route Handlers for explicit REST endpoints; these are a valid server integration pattern. To practice Server Actions, add a server action for a form submission and revalidate the affected route.
- **E2E testing:** component tests are included. For browser-level coverage, add Playwright and test task creation/edit/delete plus the weather error state against a running app.

## Suggested learning exercises

1. Convert the task row into a reusable `TaskItem` with props and callbacks.
2. Add an edit form with keyboard submit/cancel and field-level errors.
3. Replace the in-memory store with a database repository.
4. Add a server-rendered `/about` page and a shared nested layout.
5. Add a Server Action and compare it with the current Route Handler approach.
6. Add Playwright E2E tests, run Lighthouse, and use React DevTools Profiler before optimizing.
