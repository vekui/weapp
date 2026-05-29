# VekUI Follow-up Audit Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the actionable gaps found after the component chunk migration audit.

**Architecture:** Keep `packages/ui` as the canonical component source and make `packages/registry` prove that source-registry installs include every local dependency. Update generated registry artifacts and changelog after the manifest change, then run the repository verification chain.

**Tech Stack:** Taro React, TypeScript, Vitest, pnpm workspaces, shadcn-compatible registry JSON.

---

## Chunk 1: Registry Dependency Safety Net

### Task 1: Prove Curtain Installs With Layer

**Files:**
- Modify: `packages/registry/src/__tests__/build.test.ts`
- Modify: `packages/registry/src/manifest.ts`

- [x] **Step 1: Write the failing test**

Add a registry dependency assertion showing that `resolveRegistryDependencies(["curtain"])` must include `layer`.

- [x] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @vekui/registry test`
Expected: FAIL because `curtain` does not include `layer` in its dependency graph.

- [x] **Step 3: Write minimal implementation**

Add `curtain: ["layer", "state", "primitives"]` to `dependencyOverrides`.

- [x] **Step 4: Run test to verify it passes**

Run: `pnpm --filter @vekui/registry test`
Expected: PASS.

### Task 2: Generalize Registry Local Import Coverage

**Files:**
- Modify: `packages/registry/src/__tests__/build.test.ts`
- Modify: `packages/ui/src/primitives/index.ts`
- Modify: `packages/ui/src/index.ts`

- [x] **Step 1: Add an import graph coverage test**

Read every registry file source, resolve local imports, and assert that any imported file owned by another registry item appears in the transitive dependency graph.

- [x] **Step 2: Fix uncovered primitive barrel dependency**

Remove `./layer` from the `primitives` barrel because `layer.tsx` is distributed by the separate `layer` registry item. Add an explicit root package export for `./primitives/layer`.

- [x] **Step 3: Run registry tests**

Run: `pnpm --filter @vekui/registry test`
Expected: PASS.

## Chunk 2: Public Artifacts And Documentation

### Task 3: Regenerate Registry JSON

**Files:**
- Modify: `apps/docs/public/r/curtain.json`

- [x] **Step 1: Build registry artifacts**

Run: `pnpm registry:build`
Expected: `curtain.json` includes `layer` in `registryDependencies`.

### Task 4: Update Changelog

**Files:**
- Modify: `CHANGELOG.md`

- [x] **Step 1: Record the registry fix**

Add an `Unreleased > Fixed` entry for the Curtain registry dependency.

## Chunk 3: Verification

### Task 5: Run Required Checks

**Files:**
- No source changes expected.

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
