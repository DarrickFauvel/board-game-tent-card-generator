# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test framework is configured yet.

## Architecture

This is a **Next.js 16 App Router** project using React 19, TypeScript, and Tailwind CSS v4.

- `app/` — App Router directory. `layout.tsx` is the root layout; `page.tsx` is the home route (`/`).
- `app/globals.css` — Global styles imported by the root layout.
- `public/` — Static assets served at the root URL.
- Path alias `@/*` maps to the project root (e.g., `@/app/...`, `@/components/...`).

The project is a blank scaffold — the tent card generator UI has not been built yet. `app/page.tsx` is the entry point for building the main feature.
