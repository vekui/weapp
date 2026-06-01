# Complete Roadmap Components Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the remaining shadcn-aligned roadmap items into the public VekUI WeApp registry with tests, docs catalog coverage, playground demos, and full verification.

**Architecture:** Add small Taro-safe first versions that follow existing VekUI patterns rather than porting browser/Radix behavior. Components must live in `packages/ui`, be exported through the component barrel, registered in `packages/registry/src/manifest.ts`, and appear in `apps/miniprogram` demos when user-visible. Docs catalog availability is registry-driven.

**Tech Stack:** Taro React primitives from `@tarojs/components`, existing `Box`/`Text`/`Pressable` primitives, `Layer` for app-tree overlays, `useControllableState`, Vitest/react-test-renderer, Taro Vite mini-program build, Next docs build.

---

## File Structure

- Create component source files under `packages/ui/src/components/<slug>.tsx`.
- Create one focused test per component under `packages/ui/src/components/<slug>.test.ts` or `.test.tsx`.
- Modify `packages/ui/src/components/index.ts` for exports.
- Modify `packages/registry/src/manifest.ts` for registry names, title overrides where needed, and local registry dependencies.
- Modify `apps/miniprogram/src/demo/catalog.ts` and `apps/miniprogram/src/demo/demo-page.tsx` for playground entries.
- Create tiny route files under `apps/miniprogram/src/pages/<category>/<slug>/index.tsx`.
- Modify `CHANGELOG.md` once per batch.

## Shared Acceptance Criteria

- Every component uses `@tarojs/components` directly or existing VekUI primitives only.
- No `@radix-ui/*`, third-party UI libraries, `lucide-react`, `ReactDOM`, `window`, `document`, `HTMLElement`, `createPortal`.
- Component class strings use semantic tokens and mini-program-safe Tailwind utilities only.
- Tests cover public API shape, state attributes, token classes, and mini-program compatibility evidence.
- Registry build resolves all local source imports.
- Required final checks pass: `pnpm typecheck`, `pnpm test`, `pnpm check:ui`, `pnpm registry:build`, `pnpm build:miniprogram`, `pnpm build:docs`.

---

## Chunk 1: Overlay And Navigation Roadmap Components

### Task 1: Tooltip, Hover Card, Dropdown Menu, Context Menu, Menubar, Navigation Menu

**Goal:** Add Taro-safe first versions of the six interaction/navigation components using controlled local app-tree rendering and touch/click triggers.

**Files:**
- Create: `packages/ui/src/components/tooltip.tsx`
- Create: `packages/ui/src/components/tooltip.test.ts`
- Create: `packages/ui/src/components/hover-card.tsx`
- Create: `packages/ui/src/components/hover-card.test.ts`
- Create: `packages/ui/src/components/dropdown-menu.tsx`
- Create: `packages/ui/src/components/dropdown-menu.test.ts`
- Create: `packages/ui/src/components/context-menu.tsx`
- Create: `packages/ui/src/components/context-menu.test.ts`
- Create: `packages/ui/src/components/menubar.tsx`
- Create: `packages/ui/src/components/menubar.test.ts`
- Create: `packages/ui/src/components/navigation-menu.tsx`
- Create: `packages/ui/src/components/navigation-menu.test.ts`
- Modify: `packages/ui/src/components/index.ts`
- Modify: `packages/registry/src/manifest.ts`
- Modify: `apps/miniprogram/src/demo/catalog.ts`
- Modify: `apps/miniprogram/src/demo/demo-page.tsx`
- Create route files under `apps/miniprogram/src/pages/navigation/` and `apps/miniprogram/src/pages/action/` as appropriate.
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Write failing tests**

Each test must import raw source and public component exports. Tests must assert:
- `get<Thing>State(true) === "open"` and false maps to `"closed"` for overlay-like components.
- Compound parts exist (`Root`, `Trigger`, `Content`, `Item` where relevant).
- Source contains `Pressable` or existing primitives and avoids browser-only APIs.
- Rendered output exposes `data-state`, `text-foreground`, `text-muted-foreground` or `bg-background`, `border-border`, and `min-h-[88rpx]` for touch targets.

- [ ] **Step 2: Run tests to verify RED**

Run: `pnpm --filter @vekui/weapp test -- tooltip.test.ts hover-card.test.ts dropdown-menu.test.ts context-menu.test.ts menubar.test.ts navigation-menu.test.ts`

Expected: FAIL because files/exports do not exist yet.

- [ ] **Step 3: Implement minimal components**

Use existing `Popover`/`Tabs` patterns:
- `Tooltip`: `Root`, `Trigger`, `Content`, controlled/uncontrolled open state.
- `HoverCard`: same mobile-safe click/touch model, with `Title`/`Description`.
- `DropdownMenu` and `ContextMenu`: `Root`, `Trigger`, `Content`, `Item`, optional `disabled`/`destructive`, closes on select.
- `Menubar`: horizontal `Root`, `Menu`, `Trigger`, `Content`, `Item`, one active menu value.
- `NavigationMenu`: `Root`, `List`, `Item`, `Trigger`, `Content`, one active value.

- [ ] **Step 4: Publish through registry and playground**

Add names to `registryComponentNames`, title overrides, dependency overrides as needed, component barrel exports, demo catalog entries, route files, and compact demo branches in `demo-page.tsx`.

- [ ] **Step 5: Verify targeted GREEN**

Run:
- `pnpm --filter @vekui/weapp test -- tooltip.test.ts hover-card.test.ts dropdown-menu.test.ts context-menu.test.ts menubar.test.ts navigation-menu.test.ts`
- `pnpm check:ui`
- `pnpm registry:build`

Expected: all pass, registry item count increases by 6.

- [ ] **Step 6: Commit**

Commit message: `feat: add overlay navigation roadmap components`

---

## Chunk 2: Command And Selection Components

### Task 2: Command And Combobox

**Goal:** Add small searchable command and combobox components suitable for mini-program forms and action search surfaces.

**Files:**
- Create: `packages/ui/src/components/command.tsx`
- Create: `packages/ui/src/components/command.test.ts`
- Create: `packages/ui/src/components/combobox.tsx`
- Create: `packages/ui/src/components/combobox.test.tsx`
- Modify: `packages/ui/src/components/index.ts`
- Modify: `packages/registry/src/manifest.ts`
- Modify: `apps/miniprogram/src/demo/catalog.ts`
- Modify: `apps/miniprogram/src/demo/demo-page.tsx`
- Create: `apps/miniprogram/src/pages/form/combobox/index.tsx`
- Create: `apps/miniprogram/src/pages/action/command/index.tsx`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Write failing tests**

Tests must assert:
- `Command` exposes `Root`, `Input`, `List`, `Item`, `Empty`.
- `Command.Item` exposes `data-state` selected/default and `data-disabled`.
- `Combobox` supports `value`/`defaultValue`/`onValueChange`, options, placeholder, disabled, invalid.
- Rendered output uses `InputBase` or Taro-safe inputs, `Picker` only if appropriate, semantic token classes, no browser APIs.

- [ ] **Step 2: Run tests to verify RED**

Run: `pnpm --filter @vekui/weapp test -- command.test.ts combobox.test.tsx`

Expected: FAIL because files/exports do not exist yet.

- [ ] **Step 3: Implement minimal components**

Use existing `InputGroup`, `Select`, `Popover`, and `useControllableState` patterns. Keep behavior simple: command items are tappable rows; combobox renders a trigger with selected label and an app-tree list of options when open.

- [ ] **Step 4: Publish through registry and playground**

Add registry names, exports, demo entries/routes, and changelog entry.

- [ ] **Step 5: Verify targeted GREEN**

Run:
- `pnpm --filter @vekui/weapp test -- command.test.ts combobox.test.tsx`
- `pnpm check:ui`
- `pnpm registry:build`

Expected: all pass, registry item count increases by 2.

- [ ] **Step 6: Commit**

Commit message: `feat: add command and combobox components`

---

## Chunk 3: Data And Utility Roadmap Components

### Task 3: Chart, Data Table, Direction, Resizable

**Goal:** Add first-party Taro-safe structural versions of data/utility roadmap items without relying on canvas/charting libraries or DOM resize APIs.

**Files:**
- Create: `packages/ui/src/components/chart.tsx`
- Create: `packages/ui/src/components/chart.test.ts`
- Create: `packages/ui/src/components/data-table.tsx`
- Create: `packages/ui/src/components/data-table.test.ts`
- Create: `packages/ui/src/components/direction.tsx`
- Create: `packages/ui/src/components/direction.test.ts`
- Create: `packages/ui/src/components/resizable.tsx`
- Create: `packages/ui/src/components/resizable.test.ts`
- Modify: `packages/ui/src/components/index.ts`
- Modify: `packages/registry/src/manifest.ts`
- Modify: `apps/miniprogram/src/demo/catalog.ts`
- Modify: `apps/miniprogram/src/demo/demo-page.tsx`
- Create route files under `apps/miniprogram/src/pages/view/chart/`, `apps/miniprogram/src/pages/view/data-table/`, and `apps/miniprogram/src/pages/layout/`.
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Write failing tests**

Tests must assert:
- `Chart` renders bar/line-ish data without canvas or DOM APIs; supports `data`, `type`, `tone`.
- `DataTable` exposes `Root`, `Header`, `Row`, `Cell`, accepts columns/rows for compat use.
- `Direction` exposes root/provider-ish component that sets `data-dir` and layout direction classes safely.
- `Resizable` exposes `PanelGroup`, `Panel`, `Handle`, uses fixed percentage/flex basis props rather than DOM pointer resize.

- [ ] **Step 2: Run tests to verify RED**

Run: `pnpm --filter @vekui/weapp test -- chart.test.ts data-table.test.ts direction.test.ts resizable.test.ts`

Expected: FAIL because files/exports do not exist yet.

- [ ] **Step 3: Implement minimal components**

Prefer static, deterministic mini-program-safe primitives:
- `Chart`: simple token-colored bars/points from numeric values.
- `DataTable`: wraps existing `Table` style with column/row convenience API.
- `Direction`: `DirectionProvider`/`Direction` root with `dir="ltr" | "rtl"` and `data-dir`.
- `Resizable`: static panel group with configurable `defaultSize`, `minSize`, `maxSize`, and visual handle.

- [ ] **Step 4: Publish through registry and playground**

Add registry names, exports, demo entries/routes, and changelog entry.

- [ ] **Step 5: Verify targeted GREEN**

Run:
- `pnpm --filter @vekui/weapp test -- chart.test.ts data-table.test.ts direction.test.ts resizable.test.ts`
- `pnpm check:ui`
- `pnpm registry:build`

Expected: all pass, registry item count increases by 4.

- [ ] **Step 6: Commit**

Commit message: `feat: add data utility roadmap components`

---

## Chunk 4: App Shell And Feedback Components

### Task 4: Sidebar And Sonner

**Goal:** Add app shell sidebar and Sonner-style toast stack components using existing sheet/toast primitives.

**Files:**
- Create: `packages/ui/src/components/sidebar.tsx`
- Create: `packages/ui/src/components/sidebar.test.ts`
- Create: `packages/ui/src/components/sonner.tsx`
- Create: `packages/ui/src/components/sonner.test.ts`
- Modify: `packages/ui/src/components/index.ts`
- Modify: `packages/registry/src/manifest.ts`
- Modify: `apps/miniprogram/src/demo/catalog.ts`
- Modify: `apps/miniprogram/src/demo/demo-page.tsx`
- Create: `apps/miniprogram/src/pages/navigation/sidebar/index.tsx`
- Create: `apps/miniprogram/src/pages/action/sonner/index.tsx`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Write failing tests**

Tests must assert:
- `Sidebar` exposes `Root`, `Trigger`, `Content`, `Header`, `Footer`, `Item`, `Close`.
- Sidebar uses `Layer`/`Sheet`-style app-tree rendering, `data-state`, `data-active`, `data-disabled`, token classes.
- `Sonner` exposes `Toaster`, `Toast`, `Title`, `Description`, uses fixed stack container and tone variants.
- No browser APIs or portal usage.

- [ ] **Step 2: Run tests to verify RED**

Run: `pnpm --filter @vekui/weapp test -- sidebar.test.ts sonner.test.ts`

Expected: FAIL because files/exports do not exist yet.

- [ ] **Step 3: Implement minimal components**

Use existing `Sheet`, `Layer`, `Button`, and `Toast` patterns. Keep Sonner as controlled/static render components, not a global imperative API.

- [ ] **Step 4: Publish through registry and playground**

Add registry names, exports, demo entries/routes, and changelog entry.

- [ ] **Step 5: Verify targeted GREEN**

Run:
- `pnpm --filter @vekui/weapp test -- sidebar.test.ts sonner.test.ts`
- `pnpm check:ui`
- `pnpm registry:build`

Expected: all pass, registry item count increases by 2.

- [ ] **Step 6: Commit**

Commit message: `feat: add sidebar and sonner components`

---

## Final Verification

- [ ] Run `pnpm typecheck`
- [ ] Run `pnpm test`
- [ ] Run `pnpm check:ui`
- [ ] Run `pnpm registry:build`
- [ ] Run `pnpm build:miniprogram`
- [ ] Run `pnpm build:docs`
- [ ] Confirm docs catalog reports 95 available components and 0 planned roadmap items.
- [ ] Run final code review over the branch.
