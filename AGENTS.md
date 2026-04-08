# AGENTS.md

- Package manager is `pnpm`.
- The app lives in `src/app`; Storybook config lives in `.storybook`.
- Use `pnpm lint`, `pnpm typecheck`, `pnpm test:run`, `pnpm build`, `pnpm build-storybook`, and `pnpm isEverythingOk`.
- `pnpm isEverythingOk` is the full check: typecheck, tests, build, then Storybook build.
- `next build` rewrites `tsconfig.json`; keep `jsx: "react-jsx"` and `.next/dev/types/**/*.ts` in place.
- Treat `.next/`, `storybook-static/`, `coverage/`, and `*.tsbuildinfo` as generated artifacts.
