# Kbd Roadmap Component Design

## Goal

Move `kbd` from the docs roadmap into the first-party VekUI WeApp component surface.

## Scope

This chunk implements only `Kbd`. It is a low-risk shadcn-aligned static component and a good first step for validating the planned-to-available path before taking on stateful or overlay components such as `select`, `tooltip`, or `dropdown-menu`.

## Design

`Kbd` renders through the existing Taro-safe `Text` primitive. It accepts normal `TextProps`, an optional `disabled` flag, and forwards children and extra props. Styling uses semantic tokens only: `border-border`, `bg-muted`, `text-muted-foreground`, plus small inline sizing and `font-mono`.

`disabled` is represented as `data-disabled=""` so tests and consumers can inspect state without browser APIs. The component does not use DOM APIs, Radix, ReactDOM, `window`, `document`, transforms, or third-party UI components.

## Registry And Docs

The component becomes a public registry item named `kbd`, exported from `packages/ui`, and shown as available in the docs component catalog with source and install command metadata.

## Verification

Add a focused component test for API, token classes, and `data-disabled`, then run the repository verification chain required by `AGENTS.md`.
