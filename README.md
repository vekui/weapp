<p align="center">
  <img src="assets/brand/vekui-logo.png" alt="VekUI logo" width="520" />
</p>

# VekUI WeApp

VekUI WeApp 是为 Taro React 微信小程序准备的源码分发型 UI 组件库。它参考 shadcn/ui 的开发体验：开发者通过 `vekui` CLI 把组件源码、样式 token 和工具函数安装到自己的小程序项目里，然后在本地拥有这些代码。

## 快速开始

```bash
pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .
```

## 仓库结构

- `packages/ui`: VekUI 组件、token、工具函数和内部 primitive 的 canonical source。
- `packages/cli`: `vekui` 命令行工具，提供 `init`、`add`、`list`、`doctor`。
- `packages/registry`: 生成 shadcn-compatible registry JSON。
- `apps/miniprogram`: Taro React 微信小程序 playground，用于真实运行验证。
- `apps/docs`: Next/Nextra 文档站，发布到 `https://vekui.github.io/weapp`。

## 本地开发

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm check:ui
pnpm registry:build
pnpm build:miniprogram
pnpm build:docs
```

## 设计边界

- 不在 `packages/ui` 中引入 `@radix-ui/*`、浏览器 DOM API 或第三方小程序 UI 库。
- 样式使用语义 token 和小程序安全 Tailwind utility。
- 微信小程序构建固定使用 Taro Vite compiler。
- v0 的推荐分发方式是源码 registry，不是传统 npm 组件包。

更多内容见 [开发者指南](docs/DEVELOPER_GUIDE.md) 和 [AI Coding 规范](AGENTS.md)。
