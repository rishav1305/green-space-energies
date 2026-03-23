# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Green Space Energies — a single-page marketing website for a solar energy company based in Delhi, India. Built with Next.js 13 (Pages Router), React 18, TypeScript, and Tailwind CSS 3.

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run start` — Serve production build

No test runner or linter is configured.

## Architecture

This is a simple single-page site. Nearly all UI lives in one component:

- `components/App.tsx` — The entire page (header, hero carousel, about, products, why-us, contact form, WhatsApp button). Uses `'use client'` directive. All icons from `lucide-react`.
- `pages/index.tsx` — Next.js entry point, renders `<App />`.
- `pages/_app.tsx` — Standard Next.js app wrapper, imports global styles.
- `styles/globals.css` — Tailwind directives only.

The contact form uses client-side validation but has no backend — submission is simulated with `setTimeout` + `alert`.

## Notes

- The root `index.html` is a leftover from a Vite/React setup and is **not used** by Next.js.
- Styling is entirely Tailwind utility classes — no custom CSS or theme extensions.
- Images are external Unsplash URLs (no local assets).
