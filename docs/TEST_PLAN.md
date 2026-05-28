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
- Verify component cards open `pages/component/index?name=<component>`.
- Verify Button, Card, Badge, Field, Input, Textarea, Checkbox, RadioGroup, Switch, Tabs, Dialog, and Toast render under the default theme.
- Verify overlay demos open and close without console errors.
- Verify generated registry files under `apps/docs/public/r`.
