const rules = [
  "先读 AGENTS.md 和 docs，再改组件源码。",
  "不在 packages/ui 使用 Radix、DOM API、ReactDOM portal 或第三方 UI fallback。",
  "组件样式必须使用语义 token 和小程序安全 utility。",
  "所有公共组件都要有测试、registry item 和 playground 示例。",
  "小程序运行验证由 apps/miniprogram 承担，不用 Web 截图替代。"
]

export default function AiCodingPage() {
  return (
    <main className="vekui-doc-page">
      <section className="vekui-doc-hero">
        <div className="vekui-shell vekui-doc-hero__grid">
          <div>
            <p className="vekui-kicker">AI Coding</p>
            <h1>给 Agent 的边界要写在仓库里，而不是靠口头提醒。</h1>
            <p>
              VekUI WeApp 面向人类开发者，也面向 AI Coding。Agent 可以生成组件，
              但必须沿着 registry、UI rules、测试和小程序构建链路工作。
            </p>
          </div>
          <aside className="vekui-doc-command" aria-label="AI 验证命令">
            <div className="vekui-doc-command__label">agent checks</div>
            <pre>
              <code>{`pnpm typecheck
pnpm test
pnpm check:ui
pnpm registry:build`}</code>
            </pre>
          </aside>
        </div>
      </section>

      <section className="vekui-doc-section">
        <div className="vekui-shell vekui-requirements">
          <div>
            <p className="vekui-kicker">Rules</p>
            <h2>这些规则是 Agent 写代码前必须知道的上下文。</h2>
          </div>
          <ul>
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vekui-doc-section vekui-doc-section--ink">
        <div className="vekui-shell vekui-next-grid">
          <div>
            <p className="vekui-kicker">Prompt entry</p>
            <h2>推荐把仓库规则作为 Agent 的第一段上下文。</h2>
          </div>
          <div>
            <pre>
              <code>{`Read AGENTS.md first.
Then inspect docs and registry manifest.
Do not add Radix, DOM APIs, or third-party UI fallback.
Run the required checks before reporting done.`}</code>
            </pre>
            <p>这不是提示词装饰，而是防止 Agent 生成 Web-only 组件或绕过小程序约束。</p>
          </div>
        </div>
      </section>
    </main>
  )
}
