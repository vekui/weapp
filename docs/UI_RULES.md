# UI Rules

## Required

- All shared UI components live in `packages/ui`.
- Components consume Taro primitives from `@tarojs/components`.
- Components use semantic tokens such as `bg-background`, `text-foreground`, `bg-primary`, and `border-border`.
- Component variants use `class-variance-authority`.
- Conditional classes use `cn()`.
- State is reflected through `data-state`, `data-disabled`, `data-invalid`, or `data-loading` where relevant.
- Touch targets should normally be at least `88rpx`.

## Forbidden

- No `@radix-ui/*`.
- No `@nutui/*`, `antd-mobile`, `vant`, or `taro-ui`.
- No `lucide-react`.
- No `window`, `document`, `ReactDOM`, `HTMLElement`, or browser portal.
- No raw hex colors in component class strings.
- No `space-x-*` or `space-y-*`; use `gap-*`.
- No `translate-*` utilities in shared components.
- No hover-only, right-click-only, or desktop menu-bar interactions.
