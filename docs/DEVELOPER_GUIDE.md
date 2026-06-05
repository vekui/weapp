# VekUI WeApp 开发者指南

VekUI WeApp 面向 Taro React 微信小程序。它不是让你长期依赖一个黑盒组件包，而是把组件源码安装到你的项目中，让你可以按业务继续修改。

## 安装

```bash
pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .
```

`init` 会创建：

- `vekui.json`
- `src/lib/cn.ts`
- `src/styles/vekui.css`

`add` 会把组件源码写入 `vekui.json` 中配置的 `aliases.components` 目录。

## 推荐目录

```text
src/
  components/ui/
  lib/
  styles/
```

默认配置：

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

## Taro 注意事项

- 组件源码使用 `@tarojs/components`，不要替换为浏览器 DOM 元素。
- 小程序构建使用 Taro Vite compiler。
- 避免 `translate-*`、`space-x-*`、`space-y-*` 等容易产生不兼容 WXSS 的 utility。
- 弹层组件不使用浏览器 portal，统一通过小程序树内渲染。
- 视觉规范以根目录 `vekui-weapp-DESIGN.md` 为准：参考 shadcn/ui 的紧凑语义 token 模型，同时用小程序触摸尺寸、动作区和密度规则补齐移动端体验。

## 小程序上传

上传 demo 小程序时使用自动化脚本，不需要在微信开发者工具里手动填写并点击上传：

```bash
pnpm upload:miniprogram -- --version 1.0.1
pnpm upload:miniprogram -- --version 1.0.1 --desc "release smoke"
```

脚本会先运行 `pnpm build:miniprogram`，再调用微信开发者工具 CLI 的 `upload` 命令。
如需使用已有 `dist`，可以传入 `--no-build`；如需先核对命令，可以传入 `--dry-run`。
当微信开发者工具安装在非默认位置时，设置 `WECHAT_DEVTOOLS_CLI` 指向实际 CLI 路径。

## AI Coding

如果你用 Codex、Claude Code 或其他 Agent 扩展组件，请先把 `AGENTS.md` 和 `vekui-weapp-DESIGN.md` 放进上下文。核心原则是：先更新 registry 和文档，再实现组件和测试，最后运行完整验证。

## 版本更新

- 影响 CLI、registry、`packages/ui`、`apps/miniprogram`、文档站或开发规则的改动，都要同步更新根目录 `CHANGELOG.md` 的 `Unreleased`。
- 正式发布时，把 `Unreleased` 下沉到对应版本号并记录发布日期。
- 版本记录采用 Keep a Changelog 分类，优先使用 `Added`、`Changed`、`Fixed`、`Deprecated`、`Removed`、`Security`。
