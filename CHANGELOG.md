# Changelog

VekUI WeApp 的重要版本变更会记录在这里，方便跟进 registry、CLI、组件源码、Taro playground 和文档站的发布节奏。

本文件遵循 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) 结构，版本号遵循 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)。当前仓库仍处于 0.x 初始阶段，未发布的改动先进入 `Unreleased`。

## [Unreleased]

### Added

- 新增项目级 changelog，用于集中跟踪后续版本更新。
- 在 README、开发者指南、文档站和 LLM 入口中补充 changelog 入口。
- 为 Rate 增加 `defaultValue` 非受控用法，并保留 `value`/`onValueChange` 受控模式。

### Changed

- 打磨组件文档页的按钮、安装步骤和源码代码块视觉层级，使字重、边框和交互状态更接近 shadcn 风格。
- 将通用控制按钮变体明确命名为 `controlButtonVariants`，避免和 Button 组件专属 `buttonVariants` 混淆。

### Fixed

- 修复 Switch 和 Checkbox 在传入外部 `onClick` 时丢失内部 checked 状态更新的问题。
- 修复 Curtain registry item 漏装 Layer primitive，以及 primitives barrel 引用未随 item 分发的 Layer 文件的问题。

## [0.0.0] - 2026-05-29

### Added

- 初始化 VekUI WeApp monorepo，包含 `packages/ui`、`packages/cli`、`packages/registry`、`apps/miniprogram` 和 `apps/docs`。
- 建立 shadcn-style source registry，支持通过公开 registry item 分发组件源码、样式 token 和工具函数。
- 提供 `vekui` CLI 的 `init`、`add`、`list` 和 `doctor` 命令，用于初始化项目、安装源码组件、查看 registry 和检查小程序兼容性。
- 建立 Taro React 微信小程序共享 UI 基础，包括 primitives、语义 token、组件变体工具和首批 registry 组件条目。
- 搭建 `apps/miniprogram` playground，用于真实小程序运行验证。
- 搭建 `apps/docs` 文档站，覆盖快速开始、CLI、组件目录、主题、registry 和 AI Coding 规则。
- 增加 `AGENTS.md`、`docs/UI_RULES.md` 和 `docs/TEST_PLAN.md`，明确 Agent 开发边界和完整验证命令。
