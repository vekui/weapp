# UI Rules

## Required

- All shared UI components live in `packages/ui`.
- Components consume Taro primitives from `@tarojs/components`.
- Components use semantic tokens such as `bg-background`, `text-foreground`, `bg-primary`, and `border-border`.
- Color tokens follow the compact shadcn-style vocabulary documented in `../vekui-weapp-DESIGN.md`.
- Component variants use `class-variance-authority`.
- Conditional classes use `cn()`.
- State is reflected through `data-state`, `data-disabled`, `data-invalid`, or `data-loading` where relevant.
- Touch targets should normally be at least `88rpx`.
- Dialog-like overlays should use `popover` surface tokens and balanced touch-safe action areas.

## Forbidden

- No `@radix-ui/*`.
- No `@nutui/*`, `antd-mobile`, `vant`, or `taro-ui`.
- No `lucide-react`.
- No `window`, `document`, `ReactDOM`, `HTMLElement`, or browser portal.
- No raw hex colors in component class strings.
- No broad status color families such as `success`, `warning`, or `info` unless the design guide is updated with a concrete component requirement.
- No `space-x-*` or `space-y-*`; use `gap-*`.
- No `translate-*` utilities in shared components.
- No hover-only, right-click-only, or desktop menu-bar interactions.
