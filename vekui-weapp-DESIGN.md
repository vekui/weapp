# VekUI WeApp Design Guide

This guide is the visual governance layer for VekUI WeApp. It keeps component
work consistent across `packages/ui`, the registry, docs, and the mini-program
playground.

## Design Posture

VekUI WeApp should feel like a professional mobile component foundation:
quiet, touch-first, token-driven, and easy to customize after source install.
The visual style follows shadcn/ui's semantic-token model, adapted for Taro
React WeChat mini programs.

Avoid decorative styling that is hard to maintain in copied source components.
Prefer clear hierarchy, predictable spacing, accessible contrast, and stable
interaction states.

## Token Model

Use a compact shadcn-style color vocabulary:

```text
background / foreground
card / card-foreground
popover / popover-foreground
primary / primary-foreground
secondary / secondary-foreground
muted / muted-foreground
accent / accent-foreground
destructive / destructive-foreground
border / input / ring
```

Do not add broad status color families such as `success`, `warning`, or `info`
without a concrete component requirement that cannot be expressed through the
existing semantic set. Most component quality improvements should come from
spacing, density, sizing, state attributes, and composition rather than more
color names.

`--radius` remains the source radius. Components may use the derived scale:

```text
radius-sm / radius-md / radius-lg / radius-xl
```

Touch and rhythm tokens should describe reusable behavior, not brand meaning:

```text
control-sm / control-md / control-lg
spacing-vekui-1..4
duration-fast / duration-default / duration-slow
opacity-disabled / opacity-pressed
```

## Component Anatomy

Components should expose predictable slots where users expect them. Titles,
descriptions, content, and action areas must keep consistent spacing and text
hierarchy.

Use these defaults unless a component has a stronger native mini-program reason:

```text
content padding: 32rpx to 40rpx
section gap: 16rpx to 24rpx
action gap: 24rpx
touch target: 88rpx
compact touch target: 72rpx
large touch target: 104rpx
```

## Dialogs And Actions

Dialog-like components must use app-tree `Layer` rendering, not DOM portals.
Centered overlays use `popover` colors because they are floating surfaces.

For two-action decisions on mobile:

- Use a two-column action area when both actions are similarly important.
- Make both buttons fill their column to avoid ragged, cramped footer layouts.
- Use `outline` or `secondary` for cancel.
- Use `primary` for the main confirmation.
- Use `destructive` only when the action is irreversible or dangerous.
- Keep destructive actions visually distinct, but do not invent a new color
  family.

Single-action dialogs may right-align or full-width the action depending on
content density, but the tap target still needs to be at least `88rpx`.

## Mini-Program Constraints

All shared UI must remain Taro-safe:

- Use `@tarojs/components` and local primitives.
- Do not use browser DOM APIs, `ReactDOM`, portals, Radix primitives, or
  third-party UI component libraries.
- Avoid `space-x-*`, `space-y-*`, and `translate-*` utilities in shared UI.
- Reflect state with `data-state`, `data-disabled`, `data-invalid`, or
  `data-loading` where relevant.
- Use semantic token classes instead of raw colors in component class strings.

## Review Checklist

Before adding or changing a public component, verify:

- The component uses the compact semantic token vocabulary.
- The component has an obvious anatomy: root, content, header/footer, or action
  slots where appropriate.
- Touch targets are normally at least `88rpx`.
- Adjacent actions have at least `16rpx` to `24rpx` visual separation.
- Disabled, loading, invalid, selected, and open states are reflected through
  data attributes.
- Overlay components use `Layer` and `popover` surfaces.
- Tests cover API behavior, state attributes, token classes, and
  mini-program compatibility rules.
