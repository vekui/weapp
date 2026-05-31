# Registry Catalog and Date Picker Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the docs catalog registry-driven, then add Date Picker as the next public VekUI WeApp component.

**Architecture:** `packages/registry/src/manifest.ts` remains the registry contract. Docs consume exported public component names and derive generated catalog metadata from them. Date Picker is a Taro-native wrapper in `packages/ui`, distributed through registry and demonstrated in `apps/miniprogram`.

**Tech Stack:** Taro React, TypeScript, Vitest, shadcn-compatible registry JSON, pnpm workspace scripts.

---

## Chunk 1: Registry-Driven Docs Catalog

### Task 1: Add Catalog Coverage Tests

**Files:**
- Modify: `apps/docs/app/components/catalog.ts`
- Test: `apps/docs/app/components/catalog.test.ts`

- [ ] **Step 1: Write failing tests**

Add tests that assert:

- `componentStats.registryUiComponents` equals the registry public component count.
- `componentStats.registryItems` equals all registry items.
- every registry UI component slug is available in `componentCatalog`.
- planned shadcn items exclude all registry UI component slugs.

- [ ] **Step 2: Run tests to verify failure**

Run: `pnpm --filter @vekui/docs test`

Expected: FAIL because the docs package currently only runs code block checks or because catalog exports do not expose the new stats yet.

- [ ] **Step 3: Implement registry-derived catalog data**

Modify `apps/docs/app/components/catalog.ts` to import registry metadata from `@vekui/registry` or a direct workspace source path already supported by the docs build. Generate available component metadata for all public registry UI components, while preserving curated overrides for existing high-signal entries.

- [ ] **Step 4: Update stale docs copy**

Modify `apps/docs/app/components/components-page-client.tsx` and `apps/docs/app/page.tsx` so visible counts use `componentStats` rather than hard-coded old v0 numbers.

- [ ] **Step 5: Run tests and docs build**

Run:

```bash
pnpm --filter @vekui/docs test
pnpm build:docs
```

Expected: PASS.

## Chunk 2: Date Picker Component

### Task 2: Add Component Tests

**Files:**
- Create: `packages/ui/src/components/date-picker.test.ts`
- Create: `packages/ui/src/components/date-picker.tsx`
- Modify: `packages/ui/src/components/index.ts`

- [ ] **Step 1: Write failing tests**

Test `getDatePickerLabel`, selected and placeholder states, disabled/invalid attributes, native date picker mode, token classes, and mini-program compatibility source rules.

- [ ] **Step 2: Run failing test**

Run: `pnpm --filter @vekui/weapp test -- date-picker.test.ts`

Expected: FAIL because `date-picker.tsx` does not exist yet.

- [ ] **Step 3: Implement Date Picker**

Create a Taro `Picker mode="date"` wrapper with `DatePicker`, `DatePickerTrigger`, and `getDatePickerLabel`. Use `useControllableState` for `value/defaultValue/onValueChange`.

- [ ] **Step 4: Export and verify**

Update component barrel exports. Run the targeted test until it passes.

### Task 3: Publish Date Picker Through Registry, Docs, and Playground

**Files:**
- Modify: `packages/registry/src/manifest.ts`
- Modify: `apps/docs/app/components/catalog.ts`
- Modify: `apps/miniprogram/src/demo/catalog.ts`
- Create: `apps/miniprogram/src/pages/form/date-picker/index.tsx`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Add failing registry/docs coverage**

Extend tests so `date-picker` must appear in registry public components, docs available catalog, and playground demo catalog.

- [ ] **Step 2: Add registry item**

Add `"date-picker"` to `registryComponentNames` with suitable dependencies.

- [ ] **Step 3: Add playground page**

Add a form demo using `DatePicker` with placeholder, selected, constrained, and invalid examples.

- [ ] **Step 4: Update changelog**

Record Date Picker and registry-driven docs catalog in `Unreleased`.

- [ ] **Step 5: Run full verification**

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
