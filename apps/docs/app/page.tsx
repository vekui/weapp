import { componentStats } from "./components/catalog"

const installCommands = `pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .`

const qualityGates = ["typecheck", "test", "check:ui", "registry:build", "build:miniprogram", "build:docs"]

const foundations = [
  {
    label: "01",
    title: "Registry-first",
    body: "组件、样式 token、工具函数和规则通过 registry 复制到业务项目，开发者拿到的是源码。"
  },
  {
    label: "02",
    title: "Taro-safe",
    body: "组件基于 @tarojs/components，不依赖 Radix、ReactDOM、浏览器 DOM API 或 portal。"
  },
  {
    label: "03",
    title: "Agent-ready",
    body: "AGENTS.md、UI rules、doctor 检查和测试门禁，让 AI Coding 有明确边界。"
  }
]

const workflow = [
  {
    label: "Init",
    title: "生成项目约定",
    command: "pnpm dlx vekui init --cwd . --yes"
  },
  {
    label: "Add",
    title: "复制组件源码",
    command: "pnpm dlx vekui add button input --cwd ."
  },
  {
    label: "Doctor",
    title: "检查 Taro / CSS / 禁用依赖",
    command: "pnpm dlx vekui doctor --cwd ."
  },
  {
    label: "Verify",
    title: "进入微信小程序构建链路",
    command: "pnpm build:miniprogram"
  }
]

const roadmap = [
  `让 ${componentStats.registryUiComponents} 个 UI 组件和 ${componentStats.registryItems} 个 registry items 的文档口径持续同源。`,
  "把 CLI 的 dry-run、覆盖确认、registryDependencies 解析做成可预期体验。",
  "把 playground 变成真实组件验收台，而不是截图式 demo。",
  "把 GitHub Pages 上的 registry、文档和 AI 入口保持同步发布。"
]

const pageLinks = [
  {
    label: "Quick Start",
    title: "从空 Taro 项目接入 VekUI",
    href: "/weapp/quick-start/"
  },
  {
    label: "Components",
    title: "浏览可安装组件和 roadmap",
    href: "/weapp/components/"
  },
  {
    label: "CLI",
    title: "init / add / list / doctor",
    href: "/weapp/cli/"
  },
  {
    label: "Registry",
    title: "/r/index.json 与组件条目",
    href: "/weapp/registry/"
  },
  {
    label: "Theme",
    title: "语义 token 与 Tailwind 入口",
    href: "/weapp/theme/"
  },
  {
    label: "AI Coding",
    title: "Agent 规则和实现边界",
    href: "/weapp/ai-coding/"
  },
  {
    label: "Contributing",
    title: "组件贡献闭环",
    href: "/weapp/contributing/"
  },
  {
    label: "Changelog",
    title: "发布记录和 v0 基线",
    href: "/weapp/changelog/"
  }
]

export default function HomePage() {
  return (
    <main className="vekui-home">
      <section className="vekui-home-hero">
        <div className="vekui-shell vekui-home-hero__grid">
          <div className="vekui-home-hero__copy">
            <img className="vekui-home-hero__wordmark" src="/weapp/vekui-wordmark.png" alt="VekUI" />
            <p className="vekui-kicker">Taro React / WeChat Mini Program / Source Registry</p>
            <h1>
              <span>shadcn 风格</span>
              <span>源码分发</span>
              <span>Taro 小程序可用</span>
            </h1>
            <p className="vekui-home-hero__lead">
              VekUI WeApp 参考 shadcn/ui 的开发体验，但默认遵守 Taro React
              和微信小程序运行时约束。开发者通过 CLI 获取组件源码、样式 token 和项目规则。
            </p>
            <div className="vekui-actions" aria-label="主要入口">
              <a className="vekui-button vekui-button--primary" href="/weapp/quick-start/">
                快速开始
              </a>
              <a className="vekui-button" href="/weapp/components/">
                查看组件
              </a>
            </div>
          </div>

          <aside className="vekui-install-panel" aria-label="安装命令">
            <div className="vekui-install-panel__header">
              <span>install</span>
              <strong>vekui</strong>
            </div>
            <pre>
              <code>{installCommands}</code>
            </pre>
            <div className="vekui-install-panel__footer">
              <span>output</span>
              <strong>组件源码落到你的项目里</strong>
            </div>
          </aside>
        </div>

        <div className="vekui-shell vekui-hero-proof">
          <div>
            <span>v0 scope</span>
            <strong>{componentStats.registryUiComponents} 个 UI 组件</strong>
          </div>
          <div>
            <span>registry</span>
            <strong>{componentStats.registryItems} 个 items</strong>
          </div>
          <div>
            <span>distribution</span>
            <strong>GitHub Pages registry</strong>
          </div>
          <div>
            <span>runtime</span>
            <strong>Taro React + Vite</strong>
          </div>
          <div>
            <span>rule</span>
            <strong>No Radix / No DOM API</strong>
          </div>
        </div>
      </section>

      <section className="vekui-section vekui-section--white">
        <div className="vekui-shell vekui-section__split">
          <div>
            <p className="vekui-kicker">Repository contract</p>
            <h2>不是 npm 黑盒组件包，是可审计、可改造、可让 Agent 消费的源码系统。</h2>
          </div>
          <p>
            主仓库同时承载组件源码、CLI、registry builder、Taro playground、文档站和 AI
            编码规则。每个功能都必须能从 registry 到小程序构建链路被验证。
          </p>
        </div>

        <div className="vekui-shell vekui-foundation-grid">
          {foundations.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vekui-section">
        <div className="vekui-shell vekui-system-grid">
          <div className="vekui-system-grid__intro">
            <p className="vekui-kicker">Developer path</p>
            <h2>开发链路应该像命令行一样清楚。</h2>
            <p>
              首页只保留开发者真正需要的路径：初始化、添加组件、检查项目、进入小程序构建。
              其它细节放到对应文档页里继续展开。
            </p>
          </div>
          <ol className="vekui-workflow-list">
            {workflow.map((step, index) => (
              <li key={step.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{step.title}</strong>
                  <code>{step.command}</code>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="vekui-section vekui-section--ink">
        <div className="vekui-shell vekui-quality-grid">
          <div>
            <p className="vekui-kicker">Quality gates</p>
            <h2>每次合并都跑完整门禁，不靠感觉判断能不能用。</h2>
          </div>
          <div className="vekui-gate-list" aria-label="验证命令">
            {qualityGates.map((gate) => (
              <code key={gate}>pnpm {gate}</code>
            ))}
          </div>
        </div>
      </section>

      <section className="vekui-section vekui-section--white">
        <div className="vekui-shell vekui-roadmap">
          <div>
            <p className="vekui-kicker">Development plan</p>
            <h2>下一阶段只做会提高开发者信任感的事情。</h2>
          </div>
          <ul>
            {roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vekui-section vekui-section--links">
        <div className="vekui-shell vekui-doc-heading">
          <p className="vekui-kicker">Docs map</p>
          <h2>所有 GitHub Pages 页面都指向同一条源码分发链路。</h2>
        </div>
        <div className="vekui-shell vekui-link-grid">
          {pageLinks.map((link) => (
            <a href={link.href} key={link.href}>
              <span>{link.label}</span>
              <strong>{link.title}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
