# Registry Catalog and Date Picker Design

## Goal

First make the docs component catalog use the registry as the source of truth for public VekUI WeApp UI components, then add the next planned component: Date Picker.

## Phase 1: Registry-Driven Components Catalog

The docs component catalog should distinguish three counts:

- 78 public UI registry components from `packages/registry/src/manifest.ts` after Date Picker is added.
- 84 total registry items, including libraries, primitives, layer, and styles.
- Remaining shadcn-aligned planned items that are not yet VekUI registry components.

The implementation should keep shadcn roadmap ordering for the shadcn component section, but it should derive VekUI available component metadata from the registry component list instead of maintaining a separate hand-written availability set. Any stale v0 copy such as "12 components" must be replaced with registry-driven counts.

The docs UI should still show useful details for manually curated high-signal components, but generic registry components should be generated with sensible metadata: install command, registry path, source path, export name, state hint, and Taro compatibility note.

## Phase 2: Date Picker

`date-picker` becomes a public registry UI component. It should live in `packages/ui/src/components/date-picker.tsx`, be exported from `packages/ui/src/components/index.ts`, and be listed in the registry manifest.

The component should use Taro's native `Picker` with `mode="date"`, not browser date inputs. It should expose:

- `DatePicker`
- `DatePickerTrigger`
- `getDatePickerLabel`

Core props:

- `value`
- `defaultValue`
- `onValueChange`
- `min`
- `max`
- `placeholder`
- `disabled`
- `invalid`

State should be reflected with `data-state="selected|placeholder"`, plus `data-disabled` and `data-invalid` where relevant. Styling must use semantic token utilities and mini-program-safe Tailwind classes.

Date Picker needs the full public component chain: unit tests, registry item, docs catalog availability, miniprogram demo page, changelog entry, and full verification.
