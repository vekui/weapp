# Kbd Roadmap Component Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the planned `kbd` roadmap item into the public VekUI WeApp UI, registry, and docs surfaces.

**Architecture:** Keep `packages/ui` canonical by implementing `Kbd` as a small Taro `Text` primitive wrapper. Publish it through `packages/registry` and mark it available in the docs catalog without adding new runtime dependencies.

**Tech Stack:** Taro React, TypeScript, Vitest, shadcn-compatible registry JSON, pnpm workspaces.

---

## Chunk 1: Kbd Component

### Task 1: Add Component Contract

**Files:**
- Create: `packages/ui/src/components/kbd.test.ts`
- Create: `packages/ui/src/components/kbd.tsx`
- Modify: `packages/ui/src/components/index.ts`

- [x] **Step 1: Write the failing test**

Assert that `Kbd({ disabled: true })` renders a `Text` element with children, `data-disabled=""`, `border-border`, `bg-muted`, `text-muted-foreground`, and `font-mono`.

- [x] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @vekui/weapp test -- kbd.test.ts`
Expected: FAIL because `./kbd` does not exist.

- [x] **Step 3: Implement the minimal component**

Create `Kbd` using `Text`, `TextProps`, and `cn`. Export it from the component barrel.

- [x] **Step 4: Run test to verify it passes**

Run: `pnpm --filter @vekui/weapp test -- kbd.test.ts`
Expected: PASS.

## Chunk 2: Registry And Docs

### Task 2: Publish Kbd

**Files:**
- Modify: `packages/registry/src/manifest.ts`
- Modify: `apps/docs/app/components/catalog.ts`
- Modify: `CHANGELOG.md`

- [x] **Step 1: Add registry item**

Add `"kbd"` to the registry component list with a minimal `primitives` dependency override.

- [x] **Step 2: Mark docs item available**

Add `kbd` metadata to `availableBySlug` with install command, source path, registry path, state, and Taro note.

- [x] **Step 3: Update changelog**

Add an `Unreleased > Added` entry for the Kbd component.

## Chunk 3: Verification

### Task 3: Run Required Checks

**Files:**
- Generated registry JSON may update after `pnpm registry:build`.

- [x] **Step 1: Run full verification**

Run:

```bash
pnpm typecheck
pnpm test
pnpm check:ui
pnpm registry:build
pnpm build:miniprogram
pnpm build:docs
```

Expected: all commands exit 0.
