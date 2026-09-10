# digidigi

A minimal, modern starter web app used to bootstrap and validate the Cloud Agent
development environment for this repository. It is a small task board built with
**React + TypeScript + Vite**, with unit and component tests via **Vitest**.

> This starter was scaffolded to give the repository something real to install,
> build, run, and test. Replace it with the actual application when ready — the
> environment configuration in `.cursor/environment.json` will continue to work
> for any npm-based project.

## Requirements

- Node.js 22+
- npm 10+

## Getting started

```bash
npm ci        # install exact dependencies from package-lock.json
npm run dev   # start the Vite dev server on http://localhost:5173
```

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the Vite dev server (port 5173)        |
| `npm run build`     | Type-check and build a production bundle      |
| `npm run preview`   | Preview the production build                  |
| `npm run lint`      | Run ESLint                                    |
| `npm run typecheck` | Type-check without emitting                   |
| `npm test`          | Run the Vitest suite once                     |

## Cloud Agent environment

`.cursor/environment.json` configures the Cloud Agent environment:

- `install`: `npm ci` — restores dependencies from the committed lockfile.
- `terminals.dev`: `npm run dev` — runs the dev server so its logs are visible.
