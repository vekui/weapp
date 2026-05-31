# Select Component Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `select` as a public VekUI WeApp registry UI component.

**Architecture:** `Select` is a focused Taro-native wrapper around `Picker mode="selector"` with controlled/uncontrolled value support. The registry remains the public source of truth, and docs consume registry-derived availability.

**Tech Stack:** Taro React, TypeScript, Vitest, react-test-renderer, pnpm workspace scripts.

---

## Chunk 1: Component API

### Task 1: Add Select Tests And Implementation

**Files:**
- Create: `packages/ui/src/components/select.test.tsx`
- Create: `packages/ui/src/components/select.tsx`
- Modify: `packages/ui/src/components/index.ts`

- [ ] **Step 1: Write failing tests**

Test:

- `getSelectLabel` returns selected labels and placeholders.
- `Select` maps string value to native picker selected index and range labels.
- `onValueChange` receives the selected option value after native change.
- placeholder, disabled, invalid, and default trigger state are reflected with data attributes and token classes.
- source passes mini-program compatibility rules.

- [ ] **Step 2: Run test to verify RED**

Run:

```bash
pnpm --filter @vekui/weapp test -- select.test.tsx
```

Expected: FAIL because `select.tsx` does not exist.

- [ ] **Step 3: Implement minimal Select**

Create a Taro `Picker` wrapper with `Select`, `SelectTrigger`, `SelectOption`, and `getSelectLabel`. Use `useControllableState` for `value/defaultValue/onValueChange`.

- [ ] **Step 4: Export and verify GREEN**

Update the component barrel and rerun the target test until it passes.

## Chunk 2: Public Chain

### Task 2: Publish Select Through Registry, Docs, And Playground

**Files:**
- Modify: `packages/registry/src/manifest.ts`
- Modify: `packages/ui/src/components/migration-coverage.test.ts`
- Modify: `apps/miniprogram/src/demo/catalog.ts`
- Modify: `apps/miniprogram/src/demo/demo-page.tsx`
- Create: `apps/miniprogram/src/pages/form/select/index.tsx`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Add registry and coverage assertions**

Update migration coverage so `select` must have a source file, registry entry, and manual playground route.

- [ ] **Step 2: Add registry item**

Add `"select"` to `registryComponentNames`. The registry-driven docs catalog should automatically move Select from planned to available.

- [ ] **Step 3: Add miniprogram demo**

Add a form demo with controlled selected value, placeholder, disabled, and invalid examples.

- [ ] **Step 4: Update changelog**

Record `Select` in `Unreleased` and update public UI component count from 78 to 79.

- [ ] **Step 5: Verify targeted checks**

Run:

```bash
pnpm --filter @vekui/weapp test -- select.test.tsx migration-coverage.test.ts
pnpm --filter @vekui/docs test
```

Expected: PASS with catalog checks reporting 79 UI components and 85 registry items.

## Chunk 3: Final Verification

### Task 3: Full Verification And PR

**Files:**
- No new files beyond previous tasks.

- [ ] **Step 1: Run full verification**

Run:

```bash
pnpm typecheck
pnpm test
pnpm check:ui
pnpm registry:build
pnpm build:miniprogram
pnpm build:docs
```

Expected: all PASS.

- [ ] **Step 2: Commit, push, and create PR**

Commit the verified changes, push `codex/select-component`, create a PR, wait for CI, and merge only after CI passes.
