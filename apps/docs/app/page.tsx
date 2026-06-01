import { componentStats } from "./components/catalog"

type CommandToken = {
  kind: "command" | "package" | "action" | "target" | "flag" | "plain"
  text: string
}

type CommandLine = {
  description: string
  tokens: CommandToken[]
}

const installCommandLines: CommandLine[] = [
  {
    description: "初始化 vekui.json、token CSS 和默认目录别名。",
    tokens: [
      { kind: "command", text: "pnpm" },
      { kind: "action", text: "dlx" },
      { kind: "package", text: "vekui" },
      { kind: "action", text: "init" },
      { kind: "flag", text: "--cwd" },
      { kind: "target", text: "." },
      { kind: "flag", text: "--yes" }
    ]
  },
  {
    description: "从 registry 把 button 和 input 源码复制进项目。",
    tokens: [
      { kind: "command", text: "pnpm" },
      { kind: "action", text: "dlx" },
      { kind: "package", text: "vekui" },
      { kind: "action", text: "add" },
      { kind: "target", text: "button" },
      { kind: "target", text: "input" },
      { kind: "flag", text: "--cwd" },
      { kind: "target", text: "." }
    ]
  }
]

const qualityGates: CommandLine[] = [
  {
    description: "检查 TypeScript 项目类型边界。",
    tokens: [
      { kind: "command", text: "pnpm" },
      { kind: "action", text: "typecheck" }
    ]
  },
  {
    description: "运行 workspace 内所有自动化测试。",
    tokens: [
      { kind: "command", text: "pnpm" },
      { kind: "action", text: "test" }
    ]
  },
  {
    description: "扫描 UI 边界、组件契约和 Tailwind 安全规则。",
    tokens: [
      { kind: "command", text: "pnpm" },
      { kind: "action", text: "check:ui" }
    ]
  },
  {
    description: "生成 shadcn-compatible registry JSON。",
    tokens: [
      { kind: "command", text: "pnpm" },
      { kind: "action", text: "registry:build" }
    ]
  },
  {
    description: "用 Taro Vite compiler 构建微信小程序。",
    tokens: [
      { kind: "command", text: "pnpm" },
      { kind: "action", text: "build:miniprogram" }
    ]
  },
  {
    description: "构建文档站并验证 public registry 输出。",
    tokens: [
      { kind: "command", text: "pnpm" },
      { kind: "action", text: "build:docs" }
    ]
  }
]

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

function commandText(command: CommandLine) {
  return command.tokens.map((token) => token.text).join(" ")
}

function CommandCode({ command }: { command: CommandLine }) {
  return (
    <>
      {command.tokens.map((token, index) => (
        <span className={`vekui-code-token vekui-code-token--${token.kind}`} key={`${token.text}-${index}`}>
          {token.text}
          {index < command.tokens.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  )
}

function commandLineFromText(command: string, description: string): CommandLine {
  return {
    description,
    tokens: command.split(" ").map((part) => {
      if (part === "pnpm") {
        return { kind: "command", text: part }
      }
      if (part === "vekui") {
        return { kind: "package", text: part }
      }
      if (part.startsWith("--")) {
        return { kind: "flag", text: part }
      }
      if (part === "." || part === "button" || part === "input") {
        return { kind: "target", text: part }
      }
      return { kind: "action", text: part }
    })
  }
}

const roadmap = [
  `让 ${componentStats.registryUiComponents} 个 UI 组件和 ${componentStats.registryItems} 个 registry items 的文档口径持续同源。`,
  "把 CLI 的 dry-run、覆盖确认、registryDependencies 解析做成可预期体验。",
  "把 action、navigation、form、view 和 layout playground 保持为真实组件验收台。",
  "把 GitHub Pages 上的 registry、文档、Changelog 和 AI 入口保持同步发布。"
]

const pageLinks = [
  {
    label: "Quick Start",
    title: "从空 Taro 项目接入 VekUI",
    body: "最短路径完成 init、add 和 doctor。",
    href: "/weapp/quick-start/"
  },
  {
    label: "Components",
    title: "浏览可安装组件",
    body: `查看 ${componentStats.registryUiComponents} 个已发布组件，roadmap planned 已清零。`,
    href: "/weapp/components/"
  },
  {
    label: "CLI",
    title: "init / add / list / doctor",
    body: "理解命令输入、输出和项目检查边界。",
    href: "/weapp/cli/"
  },
  {
    label: "Registry",
    title: "/r/index.json 与组件条目",
    body: "确认 CLI 消费的 public contract。",
    href: "/weapp/registry/"
  },
  {
    label: "Theme",
    title: "语义 token 与 Tailwind 入口",
    body: "保持小程序安全的样式和主题约束。",
    href: "/weapp/theme/"
  },
  {
    label: "AI Coding",
    title: "Agent 规则和实现边界",
    body: "同步可执行规则，减少实现偏差。",
    href: "/weapp/ai-coding/"
  },
  {
    label: "Contributing",
    title: "组件贡献闭环",
    body: "从 API、测试、文档到 registry 的验收路径。",
    href: "/weapp/contributing/"
  },
  {
    label: "Changelog",
    title: "发布记录和 v0 基线",
    body: "追踪已发布能力和版本变化。",
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
            <pre className="vekui-code-block">
              <code>
                {installCommandLines.map((command) => (
                  <span className="vekui-code-line" key={commandText(command)}>
                    <span className="vekui-code-line__command" aria-label={commandText(command)}>
                      <CommandCode command={command} />
                    </span>
                    <span className="vekui-code-line__description">{command.description}</span>
                  </span>
                ))}
              </code>
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
                  <code aria-label={step.command}>
                    <CommandCode command={commandLineFromText(step.command, step.title)} />
                  </code>
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
              <div className="vekui-gate-item" key={commandText(gate)}>
                <code aria-label={commandText(gate)}>
                  <CommandCode command={gate} />
                </code>
                <p className="vekui-gate-item__description">{gate.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vekui-section vekui-section--white">
        <div className="vekui-shell vekui-roadmap">
          <div>
            <p className="vekui-kicker">Development plan</p>
            <h2>Roadmap 已清零，下一阶段只做会提高开发者信任感的事情。</h2>
          </div>
          <ul>
            {roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vekui-section vekui-section--links">
        <div className="vekui-shell vekui-docs-map">
          <div className="vekui-docs-map__intro">
            <p className="vekui-kicker">Docs map</p>
            <h2>按任务进入文档。</h2>
            <p>
              安装组件、理解 registry、配置主题、同步 AI 规则和小程序验证，都保持在同一条源码分发链路里。
            </p>
          </div>
          <div className="vekui-link-list" aria-label="文档页面入口">
            {pageLinks.map((link) => (
              <a href={link.href} key={link.href}>
                <span>{link.label}</span>
                <strong>{link.title}</strong>
                <p>{link.body}</p>
                <small aria-hidden="true">→</small>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
