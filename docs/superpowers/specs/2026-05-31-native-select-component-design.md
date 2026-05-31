# Native Select Component Design

## Goal

Add `native-select` as the next public VekUI WeApp registry UI component after `select`.

## Approach

`NativeSelect` should provide a small, form-oriented wrapper around the WeChat mini-program native selector surface. It should not attempt to emulate a browser `<select>` element or a Radix menu, because `packages/ui` must stay Taro-safe and must not depend on DOM APIs, portals, `@radix-ui/*`, or third-party UI libraries.

The first version should wrap Taro's native `Picker` with `mode="selector"`. It intentionally mirrors the stable `Select` behavior while keeping a separate public component name and registry slug for shadcn's `Native Select` roadmap item:

- `NativeSelect`
- `NativeSelectTrigger`
- `getNativeSelectLabel`
- `NativeSelectOption`

## API

`NativeSelect` accepts:

- `options?: NativeSelectOption[]`
- `value?: string`
- `defaultValue?: string`
- `onValueChange?: (value: string) => void`
- `onChange?: (event: { detail: { value: number | string } }) => void`
- `placeholder?: string`
- `disabled?: boolean`
- `invalid?: boolean`

`NativeSelectOption` is `{ label: string; value: string }`.

## Behavior

The component maps the selected option value to Taro Picker's numeric selected index. When the native selector changes, it resolves the index back to the option value, forwards the original change event shape through `onChange`, and updates controlled/uncontrolled state through `onValueChange`.

State is reflected with:

- `data-state="selected|placeholder"`
- `data-disabled="true"` when disabled
- `data-invalid="true"` when invalid

The default trigger should use semantic token classes and show muted placeholder text when no value is selected. `NativeSelectTrigger` should expose invalid styling with `border-destructive`.

## Distribution

Publishing `native-select` requires the full public component chain:

- component source in `packages/ui`
- component tests covering API, state attributes, token classes, and mini-program compatibility
- export from `packages/ui/src/components/index.ts`
- registry manifest entry
- docs catalog availability through the registry-driven catalog
- miniprogram demo route
- migration coverage test update
- changelog entry

After the registry entry lands, docs catalog checks should report 80 public UI components, 86 registry items, and 15 planned shadcn items.

## Verification

Run:

```bash
pnpm typecheck
pnpm test
pnpm check:ui
pnpm registry:build
pnpm build:miniprogram
pnpm build:docs
```
