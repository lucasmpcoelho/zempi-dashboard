# Cursor Engineering Guide

Purpose: practical best practices for building in this repo with Cursor. Keep process lightweight by default; add rigor only when risk or scope grows. Complements `design_guidelines.md`.

## Working Mode
- Plan first: write 1–3 bullet goals and acceptance criteria before edits.
- Implement small, reversible edits; keep main stable and shippable.
- Validate after each edit: types, lints, quick manual smoke.
- Communicate succinct status updates and keep todos current.

## Git Hygiene
- Branch per change: `feat/…`, `fix/…`, `chore/…`, `refactor/…`.
- Small PRs (aim <300 LOC changed); keep commits focused.
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.

## TypeScript and Code Style
- Prefer strict types; avoid `any`. Type all component props and exported functions.
- Descriptive names; early returns over deep nesting; avoid empty `catch` blocks.
- Keep modules cohesive; extract helpers/hooks when logic repeats or grows.
- Comments only for non-obvious rationale, invariants, or caveats.

## React Patterns
- Colocate state and effects with components; split UI vs data logic where helpful.
- Create custom hooks for reusable data/side-effect logic.
- Derive UI from server/cache when possible; avoid duplicate client mirrors.
- Memoization: use `useMemo`/`useCallback` when it measurably prevents re-renders.
- Lists: stable `key`s; guard heavy children with `memo` if they re-render often.

## State and Data (TanStack Query)
- Server state → React Query; ephemeral UI state → `useState`.
- Clear `queryKey`s; set `staleTime`/`gcTime` sensibly for usage patterns.
- Always handle loading, empty, and error states in UI.
- Mutations: optimistic updates with rollback when safe; invalidate precisely.

## API/Server Guidelines
- Validate all inputs with Zod at the route boundary.
- Map errors to appropriate HTTP status codes; include actionable messages.
- Keep handlers small, log context on errors, avoid logging PII.

## UI/UX and Content
- Follow `design_guidelines.md` for color, spacing, motion, tone, and PT‑BR copy.
- Motion: subtle and purposeful; avoid continuous distracting animations.
- Empty states and skeletons for async; friendly, actionable error messages.

## Accessibility
- Label all interactive controls; keyboard navigable paths; visible focus rings.
- Maintain contrast ≥ 4.5:1 for text; test with keyboard and screen reader basics.

## Testing Strategy (Right‑Sized)
- Unit: pure utils and custom hooks with logic.
- Component: interaction tests for complex stateful components only.
- Manual smoke per feature: happy path, one error case, one loading/empty case.

## Performance
- Avoid premature optimization; fix real hotspots identified via profiling or obvious re-render paths.
- Virtualize long lists; lazy‑load heavy/rare routes or charts when feasible.
- Keep effect deps minimal and stable; avoid creating new functions/objects in hot paths.

## Security and Privacy
- No secrets in client code; do not log PII; respect consent flows.
- Validate and sanitize on server; prefer server‑side decisions for sensitive logic.

## i18n and Locale
- PT‑BR copy; format dates/numbers consistently (e.g., date‑fns `ptBR`).
- Avoid hard‑coded formatting in logic; keep text out of complex functions.

## Observability
- Minimal structured logs for errors and important events; silence noisy logs in prod.
- Prefer user‑visible error UI over console logging in the client.

## Definition of Done (Lightweight)
- Types and lints pass; loading/empty/error states covered.
- A11y basics checked (labels, focus, contrast, keyboard nav).
- UX aligns with `design_guidelines.md` and PT‑BR tone.
- Tests appropriate to scope; PR small, clear, and reviewed.

## When to Increase Rigor
- Core flows (onboarding, profile save), data migrations, or performance‑critical code.
- Then add: deeper tests, brief ADR for decisions (`docs/adr/YYYY‑MM‑DD‑title.md`).


