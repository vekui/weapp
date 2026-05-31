# Select Component Design

## Goal

Add `select` as the next public VekUI WeApp registry UI component after Date Picker.

## Approach

Select should be a Taro-safe, shadcn-aligned single-value form control. It should not implement a browser/Radix-style portal menu because mini programs do not have DOM portals and the repository forbids `@radix-ui/*`, `window`, and `document` inside `packages/ui`.

The first version should wrap Taro's native `Picker` with `mode="selector"`, similar to `Picker`, but expose a more form-oriented API:

- `Select`
- `SelectTrigger`
- `getSelectLabel`
- `SelectOption`

## API

`Select` accepts:

- `options?: SelectOption[]`
- `value?: string`
- `defaultValue?: string`
- `onValueChange?: (value: string) => void`
- `onChange?: (event: { detail: { value: number | string } }) => void`
- `placeholder?: string`
- `disabled?: boolean`
- `invalid?: boolean`

`SelectOption` is `{ label: string; value: string }`.

## Behavior

The component maps the selected value to Taro Picker's numeric selected index. When the native picker changes, it resolves the index back to the option value, calls the original `onChange`, and updates the controlled/uncontrolled value through `onValueChange`.

State is reflected with:

- `data-state="selected|placeholder"`
- `data-disabled="true"` when disabled
- `data-invalid="true"` when invalid

The default trigger should use semantic token classes and show muted placeholder text when no value is selected. `SelectTrigger` should support invalid styling with `border-destructive`.

## Distribution

Publishing `select` requires the full public component chain:

- component source in `packages/ui`
- component tests covering API, state attributes, token classes, and mini-program compatibility
- export from `packages/ui/src/components/index.ts`
- registry manifest entry
- docs catalog availability through the registry-driven catalog
- miniprogram demo route
- migration coverage test update
- changelog entry

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
