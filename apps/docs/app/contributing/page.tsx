const contributionFlow = [
  {
    label: "01",
    title: "更新 registry manifest",
    body: "先在 packages/registry/src/manifest.ts 声明组件条目、依赖和文件来源。"
  },
  {
    label: "02",
    title: "实现组件源码",
    body: "组件放在 packages/ui/src/components，保持 Taro-safe，不引入 DOM/Radix。"
  },
  {
    label: "03",
    title: "补测试和 playground",
    body: "补 API、状态属性、token class、兼容性测试，并在 apps/miniprogram 增加示例。"
  },
  {
    label: "04",
    title: "更新文档并跑完整验证",
    body: "组件页、CLI/registry 文档和 AI Coding 规则需要同步更新。"
  }
]

export default function ContributingPage() {
  return (
    <main className="vekui-doc-page">
      <section className="vekui-doc-hero">
        <div className="vekui-shell vekui-doc-hero__grid">
          <div>
            <p className="vekui-kicker">Contributing</p>
            <h1>贡献流程围绕 registry、组件源码和小程序验证展开。</h1>
            <p>
              VekUI WeApp 的主仓库不是只放 demo。任何新增组件都要同时进入 registry、
              packages/ui、playground、文档和 CI 门禁。
            </p>
          </div>
          <aside className="vekui-doc-command" aria-label="验证命令">
            <div className="vekui-doc-command__label">required checks</div>
            <pre>
              <code>{`pnpm typecheck
pnpm test
pnpm check:ui
pnpm build:miniprogram
pnpm build:docs`}</code>
            </pre>
          </aside>
        </div>
      </section>

      <section className="vekui-doc-section vekui-doc-section--white">
        <div className="vekui-shell">
          <div className="vekui-doc-heading">
            <p className="vekui-kicker">Flow</p>
            <h2>不要只改组件文件，要让整条分发链路闭环。</h2>
          </div>
          <ol className="vekui-step-list">
            {contributionFlow.map((step) => (
              <li key={step.label}>
                <span>{step.label}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
