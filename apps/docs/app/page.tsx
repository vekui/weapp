export default function HomePage() {
  const installCommands = `pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .`

  const foundations = [
    {
      label: "Registry-first",
      title: "像 shadcn 一样分发源码",
      body: "组件、样式 token、工具函数通过 registry 安装到业务项目，开发者拥有代码。"
    },
    {
      label: "Taro-safe",
      title: "为微信小程序约束重写",
      body: "不使用 Radix、DOM API 或浏览器 portal，组件基于 @tarojs/components。"
    },
    {
      label: "Agent-ready",
      title: "给 AI Coding 明确边界",
      body: "AGENTS.md、UI rules、测试门禁和 registry manifest 共同约束生成质量。"
    }
  ]

  const workflow = [
    "pnpm dlx vekui init --cwd . --yes",
    "pnpm dlx vekui add button input --cwd .",
    "pnpm dlx vekui doctor --cwd .",
    "pnpm build:miniprogram"
  ]

  const roadmap = [
    {
      phase: "01",
      title: "组件质量",
      body: "每个组件补齐 API、状态属性、token class、交互边界和小程序兼容性测试。"
    },
    {
      phase: "02",
      title: "文档体验",
      body: "组件页给出真实 Taro 用法、源码落点、主题变量和常见问题，不做空泛展示。"
    },
    {
      phase: "03",
      title: "CLI / Registry",
      body: "完善依赖解析、覆盖确认、dry-run、doctor 规则和 GitHub Pages registry 输出。"
    },
    {
      phase: "04",
      title: "Playground 验证",
      body: "用微信开发者工具持续验证 demo、样式输出和运行时约束，避免只在 Web 里看起来能跑。"
    }
  ]

  return (
    <main className="vekui-home">
      <section className="vekui-hero">
        <div className="vekui-hero__inner">
          <div className="vekui-hero__copy">
            <p className="vekui-eyebrow">AI Coding UI Component Library for WeApp</p>
            <h1>VekUI WeApp</h1>
            <p className="vekui-hero__lead">
              面向 Taro React 微信小程序的源码分发组件库。用 shadcn/ui 的开发体验，
              但遵守小程序运行时、样式和交互约束。
            </p>
            <div className="vekui-hero__actions">
              <a href="/weapp/quick-start/">快速开始</a>
              <a href="/weapp/registry/" data-variant="secondary">
                查看 Registry
              </a>
            </div>
          </div>
          <div className="vekui-command-panel" aria-label="Install commands">
            <div className="vekui-command-panel__bar">
              <span />
              <span />
              <span />
              <strong>terminal</strong>
            </div>
            <pre>
              <code>{installCommands}</code>
            </pre>
            <p>安装源码，而不是接入黑盒组件包。</p>
          </div>
        </div>
      </section>

      <section className="vekui-section vekui-section--intro">
        <p className="vekui-section__kicker">What it ships</p>
        <h2>一个给开发者和 Agent 都能稳定使用的主仓库。</h2>
        <div className="vekui-foundations">
          {foundations.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vekui-section vekui-workflow">
        <div>
          <p className="vekui-section__kicker">Developer path</p>
          <h2>从 registry 到微信开发者工具，有一条完整验证链路。</h2>
          <p>
            v0 已包含 CLI、registry builder、12 个基础组件、Taro playground、GitHub
            Pages 文档和 CI 门禁。后续每个组件都沿着这条链路扩展。
          </p>
        </div>
        <ol>
          {workflow.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <code>{step}</code>
            </li>
          ))}
        </ol>
      </section>

      <section className="vekui-section vekui-roadmap">
        <div className="vekui-roadmap__header">
          <p className="vekui-section__kicker">Development plan</p>
          <h2>后续开发按四条主线推进，先把基础体验做扎实。</h2>
        </div>
        <div className="vekui-roadmap__grid">
          {roadmap.map((item) => (
            <article key={item.phase}>
              <span>{item.phase}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vekui-section vekui-links">
        <a href="/weapp/cli/">
          <span>CLI</span>
          <strong>init / add / list / doctor</strong>
        </a>
        <a href="/weapp/components/">
          <span>Components</span>
          <strong>12 个 Taro-safe v0 组件</strong>
        </a>
        <a href="/weapp/ai-coding/">
          <span>AI Coding</span>
          <strong>让 Agent 按 UI 边界工作</strong>
        </a>
      </section>
    </main>
  )
}
