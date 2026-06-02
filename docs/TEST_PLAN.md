# Test Plan

## Automated

```bash
pnpm typecheck
pnpm test
pnpm check:ui
pnpm registry:build
pnpm build:miniprogram
pnpm build:docs
pnpm --filter vekui test
```

## Manual

- Open `apps/miniprogram` in WeChat Developer Tools.
- Verify `pages/index/index` renders the component catalog.
- Verify category badge counts match `getCategoryComponents(category.id).length`.
- Verify category cards open `pages/panel/index?id=<category>`.
- Verify panel list items open their registered demo pages from `apps/miniprogram/src/demo/catalog.ts`.
- Verify the miniprogram demo catalog covers all `publicComponentNames` from `packages/registry/src/manifest.ts`; the extra Color page is a token showcase, not a registry component.
- Verify overlay demos open and close without console errors.
- Verify generated registry files under `apps/docs/public/r`.
