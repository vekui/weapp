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
- Verify category cards open `pages/panel/index?id=<category>`.
- Verify panel list items open their registered demo pages from `apps/miniprogram/src/demo/catalog.ts`.
- Verify Button, Card, Badge, Alert, Loading, Field, Input, Textarea, Checkbox, RadioGroup, Switch, Tabs, Dialog, and Toast render under the default theme.
- Verify overlay demos open and close without console errors.
- Verify generated registry files under `apps/docs/public/r`.
