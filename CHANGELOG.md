# Changelog

VekUI WeApp 的重要版本变更会记录在这里，方便跟进 registry、CLI、组件源码、Taro playground 和文档站的发布节奏。

本文件遵循 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) 结构，版本号遵循 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)。当前仓库仍处于 0.x 初始阶段，未发布的改动先进入 `Unreleased`。

## [Unreleased]

### Added

- 将 README 刷新为英文优先的开源项目入口，补充 stars、CI、license、docs、registry 和组件数量等项目元信息，并新增 `README.zh-CN.md` 作为中文切换版本。
- 新增项目级 changelog，用于集中跟踪后续版本更新。
- 在 README、开发者指南、文档站和 LLM 入口中补充 changelog 入口。
- 为 Rate 增加 `defaultValue` 非受控用法，并保留 `value`/`onValueChange` 受控模式。
- 新增 Alert Dialog 组件，并将 `alert-dialog` 从文档 roadmap 发布到 registry 和小程序 playground。
- 新增 Kbd 组件，并将 `kbd` 从文档 roadmap 发布到 registry。
- 新增 Date Picker 组件，并将 `date-picker` 从文档 roadmap 发布到 registry 和小程序 playground。
- 新增 Select 组件，并将 `select` 从文档 roadmap 发布到 registry 和小程序 playground。
- 新增 Native Select 组件，并将 `native-select` 从文档 roadmap 发布到 registry 和小程序 playground。
- 新增 Tooltip 和 Hover Card 组件，并发布到 registry 和小程序 playground。
- 新增 Dropdown Menu 和 Context Menu 组件，并发布到 registry 和小程序 playground。
- 新增 Menubar 和 Navigation Menu 组件，并发布到 registry 和小程序 playground。
- 新增 Command 和 Combobox 组件，并发布到 registry 和小程序 playground。
- 新增 Chart、Data Table、Direction 和 Resizable 组件，并发布到 registry 和小程序 playground。
- 新增 Sidebar 和 Sonner 组件，并发布到 registry 和小程序 playground。
- 更新官网首页、组件页和 changelog 页口径，明确 roadmap planned 已清零并同步 action playground 状态。
- 为小程序 playground 补齐 Alert、Dialog、Fab、Loading、Button Group、Field、Input Group、Input OTP、Collapsible 和 Image demo 页面。
- 为小程序 playground 补齐 Aspect Ratio、Breadcrumb、Data List、Empty、Item、Kbd、Label、Popover、Safe Area、Scroll Area、Separator、Sheet、Skeleton、Spinner、Table、Toggle 和 Toggle Group demo 页面，并新增 registry 覆盖测试避免遗漏公开组件。
- 为 Image、Fab 和 Input OTP 增加独立组件契约测试，覆盖状态属性、token class 和小程序兼容规则。
- 为全部 95 个公开 registry UI 组件补齐独立单元测试覆盖，校验 API、状态属性、语义 token class 和小程序兼容规则。
- 组件文档目录改为 registry-driven 统计，明确区分公开 UI 组件数、registry item 总数和 shadcn planned 项。
- 在 README 和 GitHub Pages 页脚加入公众号二维码入口。
- 为小程序 playground 增加主题切换，便于在不同 token 主题下验证 demo 页面。

### Changed

- 打磨组件文档页的按钮、安装步骤和源码代码块视觉层级，使字重、边框和交互状态更接近 shadcn 风格。
- 更新 CI 和 GitHub Pages workflow 到 Node 24 兼容的 action 版本，并让 Pages 发布复用 `pnpm build:docs`。
- 小程序 playground 的 Taro 构建脚本改为 `--no-check`，避免在已独立执行 `pnpm typecheck` 后重复类型检查。
- 将通用控制按钮变体明确命名为 `controlButtonVariants`，避免和 Button 组件专属 `buttonVariants` 混淆。
- 更新测试计划中的小程序手动验证路径，使其匹配当前分类页和 demo catalog 导航结构。

### Fixed

- 修复 Switch 和 Checkbox 在传入外部 `onClick` 时丢失内部 checked 状态更新的问题。
- 修复 Curtain registry item 漏装 Layer primitive，以及 primitives barrel 引用未随 item 分发的 Layer 文件的问题。
- 增强 `vekui doctor`，现在会报告组件、工具函数和样式目录中的断裂本地 import。

## [0.0.0] - 2026-05-29

### Added

- 初始化 VekUI WeApp monorepo，包含 `packages/ui`、`packages/cli`、`packages/registry`、`apps/miniprogram` 和 `apps/docs`。
- 建立 shadcn-style source registry，支持通过公开 registry item 分发组件源码、样式 token 和工具函数。
- 提供 `vekui` CLI 的 `init`、`add`、`list` 和 `doctor` 命令，用于初始化项目、安装源码组件、查看 registry 和检查小程序兼容性。
- 建立 Taro React 微信小程序共享 UI 基础，包括 primitives、语义 token、组件变体工具和首批 registry 组件条目。
- 搭建 `apps/miniprogram` playground，用于真实小程序运行验证。
- 搭建 `apps/docs` 文档站，覆盖快速开始、CLI、组件目录、主题、registry 和 AI Coding 规则。
- 增加 `AGENTS.md`、`docs/UI_RULES.md` 和 `docs/TEST_PLAN.md`，明确 Agent 开发边界和完整验证命令。
