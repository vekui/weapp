<p align="center">
  <img src="assets/brand/vekui-logo.png" alt="VekUI logo" width="520" />
</p>

<p align="center">
  面向 Taro React 微信小程序的源码分发型 UI registry。
</p>

<p align="center">
  <a href="https://github.com/vekui/weapp/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/vekui/weapp?style=flat-square&logo=github" /></a>
  <a href="https://github.com/vekui/weapp/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/vekui/weapp?style=flat-square&logo=github" /></a>
  <a href="https://github.com/vekui/weapp/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/vekui/weapp/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/github/license/vekui/weapp?style=flat-square" /></a>
  <a href="https://vekui.github.io/weapp"><img alt="Documentation" src="https://img.shields.io/badge/docs-vekui.github.io%2Fweapp-111827?style=flat-square" /></a>
  <a href="https://vekui.github.io/weapp/r/index.json"><img alt="Registry items" src="https://img.shields.io/badge/registry-101%20items-16a34a?style=flat-square" /></a>
  <a href="https://vekui.github.io/weapp/components"><img alt="Public components" src="https://img.shields.io/badge/components-95%20public-0f766e?style=flat-square" /></a>
  <a href="https://taro.zone"><img alt="Taro" src="https://img.shields.io/badge/Taro-4.2.0-1677ff?style=flat-square" /></a>
  <a href="https://pnpm.io"><img alt="pnpm" src="https://img.shields.io/badge/pnpm-10.0.0-f69220?style=flat-square&logo=pnpm" /></a>
</p>

<p align="center">
  <a href="README.md">English</a>
  ·
  <a href="https://vekui.github.io/weapp">文档站</a>
  ·
  <a href="CHANGELOG.md">更新日志</a>
</p>

# VekUI WeApp

VekUI WeApp 是为 Taro React 微信小程序准备的 shadcn 风格源码 registry 和
第一方 UI 基础设施。它不会要求应用长期依赖一个黑盒组件包，而是通过
`vekui` CLI 把组件源码、设计 token、primitive 和工具函数安装到你的项目里。

这让小程序团队既能获得类似 shadcn/ui 的开发体验，也能保留微信小程序链路需要的
约束：Taro primitive、WXSS 安全 utility、语义 token、树内弹层渲染，以及不依赖
浏览器 DOM 的组件实现。

## 为什么选择 VekUI

- **源码归属项目**：组件会复制进应用仓库，业务团队可以审查、修改和版本化这些代码。
- **小程序原生约束**：共享 UI 基于 `@tarojs/components`，不使用浏览器 DOM、portal、
  Radix primitive 或 ReactDOM。
- **语义化样式**：组件使用 `bg-background`、`text-foreground`、`bg-primary`、
  `border-border` 等 token utility，而不是写死颜色值。
- **registry 驱动分发**：公开 registry 描述组件文件、npm 依赖、registry 依赖和样式资源。
- **真实运行验证**：`apps/miniprogram` 是 Taro playground，用于在微信小程序工具链中验证组件。
- **贡献门禁完整**：仓库脚本会检查 UI 边界、组件契约、Tailwind utility 安全性、
  registry 输出、文档和构建结果。

## 当前状态

VekUI WeApp 仍处于 `0.x` 初始阶段。当前 registry 暴露 95 个公开 UI 组件，
并提供 styles、primitives、layer、state、variants 和 `cn` 等共享 registry item。

v0 推荐的分发方式是源码 registry，而不是传统的黑盒 npm 组件包。

## 项目信息

| 项目 | 内容 |
| --- | --- |
| 仓库 | [`vekui/weapp`](https://github.com/vekui/weapp) |
| 协议 | [MIT](LICENSE) |
| 文档 | <https://vekui.github.io/weapp> |
| Registry | 101 个 item，入口为 <https://vekui.github.io/weapp/r/index.json> |
| 公开 UI 组件 | 95 个 registry 组件 |
| 运行目标 | Taro React 微信小程序 |
| Taro 版本 | `4.2.0` |
| React 版本 | `18.3.1` |
| 包管理器 | `pnpm@10.0.0` |
| CI | [`CI`](https://github.com/vekui/weapp/actions/workflows/ci.yml) |

## 快速开始

在已有 Taro React 微信小程序项目根目录中运行：

```bash
pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .
```

`init` 会创建本地 VekUI 项目约定：

- `vekui.json`
- `src/lib/cn.ts`
- `src/styles/vekui.css`

`add` 会读取 registry，解析 `registryDependencies`，并把组件源码写入
`aliases.components` 配置的目录。

安装组件后，在应用全局样式入口中导入生成的 token CSS：

```css
@import "./styles/vekui.css";
```

然后运行项目检查：

```bash
pnpm dlx vekui doctor --cwd .
```

## 使用要求

- Taro React 微信小程序项目
- 小程序构建使用 Taro Vite compiler
- React 18
- `pnpm` 或兼容的包管理流程
- 应用全局 CSS 入口可以导入 VekUI 生成的 token 文件

## CLI

CLI 包名和命令名都是 `vekui`。

```bash
pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .
pnpm dlx vekui list
pnpm dlx vekui doctor --cwd .
```

| 命令 | 用途 |
| --- | --- |
| `init` | 创建 `vekui.json`、token CSS、`cn` 工具函数和默认别名。 |
| `add` | 从 registry 安装组件源码到目标项目。 |
| `list` | 输出当前公开可安装的 registry item。 |
| `doctor` | 检查项目配置、CSS 入口、导入关系和小程序兼容风险。 |

## 生成后的项目结构

默认配置面向以下目录：

```text
src/
  components/ui/
  lib/
  styles/
```

默认 `vekui.json`：

```json
{
  "schema": "https://vekui.github.io/weapp/r/schema.json",
  "style": "default",
  "tsx": true,
  "tailwind": {
    "css": "src/styles/vekui.css"
  },
  "aliases": {
    "components": "src/components/ui",
    "lib": "src/lib",
    "styles": "src/styles"
  }
}
```

## Registry

Registry 由 [`packages/registry/src/manifest.ts`](packages/registry/src/manifest.ts)
生成。公开 JSON 会发布到文档站路径下：

- `https://vekui.github.io/weapp/r/index.json`
- `https://vekui.github.io/weapp/r/button.json`

每个 item 保持 shadcn-compatible 结构，包含：

- `name`
- `type`
- `title`
- `description`
- `dependencies`
- `registryDependencies`
- `files`

本地构建 registry：

```bash
pnpm registry:build
```

## 组件

所有共享 UI 源码都放在 [`packages/ui`](packages/ui)。组件基于 Taro primitive、
语义 token class、本地状态工具和小型共享 primitive 实现。

Registry 组件示例：

- 动作与弹层：`action-sheet`、`alert-dialog`、`dialog`、`drawer`、
  `dropdown-menu`、`popover`、`sheet`、`toast`、`tooltip`
- 表单控件：`button`、`checkbox`、`combobox`、`date-picker`、`input`、
  `input-number`、`native-select`、`radio-group`、`select`、`slider`、`switch`、
  `textarea`
- 数据与布局：`accordion`、`card`、`data-list`、`data-table`、`flex`、`grid`、
  `list`、`pagination`、`table`、`tabs`
- 反馈与展示：`alert`、`avatar`、`badge`、`empty`、`loading`、`progress`、
  `skeleton`、`spinner`、`steps`、`tag`、`typography`

查看完整列表：

```bash
pnpm dlx vekui list
```

## 仓库结构

```text
apps/
  docs/          Next/Nextra 文档站和公开 registry 输出
  miniprogram/   Taro React 微信小程序 playground
packages/
  cli/           vekui CLI: init, add, list, doctor
  registry/      shadcn-compatible registry 构建器和 manifest
  ui/            canonical 共享 UI 源码、token、primitive 和测试
docs/
  DEVELOPER_GUIDE.md
  TEST_PLAN.md
  UI_RULES.md
```

重要边界：

- `packages/ui` 是共享 UI 的 canonical source。
- `apps/miniprogram` 只作为 playground 和运行时验证 app。
- `packages/registry` 是公开 registry contract。
- 新增或修改公开组件时，docs、registry metadata、playground demo 和测试要同步更新。

## 本地开发

安装依赖：

```bash
pnpm install
```

常用命令：

```bash
pnpm dev:docs
pnpm dev:miniprogram
pnpm typecheck
pnpm test
pnpm check:ui
pnpm registry:build
pnpm build:miniprogram
pnpm build:docs
```

`check:ui` 会运行项目特有的 UI 门禁：

- `check:ui:boundaries`
- `check:ui:components`
- `check:ui:tailwind`

## 小程序兼容规则

共享 UI 必须保持 Taro 微信小程序运行时兼容。

允许的模式：

- 使用 `@tarojs/components` primitive。
- 使用语义 token utility 和小程序安全 Tailwind utility。
- 在合适的组件上通过 `data-state`、`data-disabled`、`data-invalid` 或
  `data-loading` 反映状态。
- 触控目标通常至少为 `88rpx`。

`packages/ui` 中禁止：

- `@radix-ui/*`
- `@nutui/*`、`antd-mobile`、`vant`、`taro-ui` 或其他第三方 UI 组件库 fallback
- `lucide-react`
- `window`、`document`、`ReactDOM`、`HTMLElement`、浏览器 portal 或浏览器 DOM API
- 组件 class 字符串中的原始 hex 颜色
- 共享组件中的 `space-x-*`、`space-y-*` 或 `translate-*`
- hover-only、right-click-only 或桌面菜单栏式交互

完整规则见 [`docs/UI_RULES.md`](docs/UI_RULES.md)。

## 测试与验证

报告完成前请运行完整验证：

```bash
pnpm typecheck
pnpm test
pnpm check:ui
pnpm registry:build
pnpm build:miniprogram
pnpm build:docs
```

组件测试应覆盖公开 API、状态属性、语义 token class 和小程序兼容规则。手动验证应在
微信开发者工具中使用 Taro playground。

详细清单见 [`docs/TEST_PLAN.md`](docs/TEST_PLAN.md)。

## 贡献

公开 UI 变更需要让整条分发链路闭环：

1. 更新 `packages/registry/src/manifest.ts`。
2. 在 `packages/ui` 中实现组件源码。
3. 补充 API、状态属性、token class 和兼容性测试。
4. 在 `apps/miniprogram` 中新增或更新 playground demo。
5. 更新文档和 changelog。
6. 运行完整验证命令。

大型变更前建议先阅读：

- [`docs/DEVELOPER_GUIDE.md`](docs/DEVELOPER_GUIDE.md)
- [`docs/UI_RULES.md`](docs/UI_RULES.md)
- [`docs/TEST_PLAN.md`](docs/TEST_PLAN.md)
- [`AGENTS.md`](AGENTS.md)

## 文档

- 文档站：<https://vekui.github.io/weapp>
- Registry index：<https://vekui.github.io/weapp/r/index.json>
- 更新日志：[`CHANGELOG.md`](CHANGELOG.md)

## 许可证

MIT。见 [`LICENSE`](LICENSE)。

## 公众号

<p align="center">
  <strong>关注公众号，获取 VekUI WeApp 和小程序 UI 实践更新。</strong>
</p>

<p align="center">
  <img src="apps/docs/public/wechat-official-account-qr.jpg" alt="微信公众号二维码" width="180" />
</p>
