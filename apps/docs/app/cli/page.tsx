const commands = [
  {
    name: "init",
    title: "初始化项目约定",
    body: "生成 vekui.json、工具函数、token CSS 和默认目录配置。",
    command: "pnpm dlx vekui init --cwd . --yes"
  },
  {
    name: "add",
    title: "添加组件源码",
    body: "从 registry 拉取条目，解析 registryDependencies，然后写入目标项目。",
    command: "pnpm dlx vekui add button input --cwd ."
  },
  {
    name: "list",
    title: "查看 registry",
    body: "列出当前公开可安装的 registry item。",
    command: "pnpm dlx vekui list"
  },
  {
    name: "doctor",
    title: "检查项目风险",
    body: "检查 Taro 依赖、CSS 入口、危险 DOM/Radix 引用和基础配置。",
    command: "pnpm dlx vekui doctor --cwd ."
  }
]

export default function CliPage() {
  return (
    <main className="vekui-doc-page">
      <section className="vekui-doc-hero">
        <div className="vekui-shell vekui-doc-hero__grid">
          <div>
            <p className="vekui-kicker">CLI</p>
            <h1>一个命令名，覆盖初始化、添加、发现和检查。</h1>
            <p>
              CLI 包名和命令名都是 vekui。v0 先保证源码分发路径可用，
              不把组件封装成开发者无法维护的黑盒包。
            </p>
          </div>
          <aside className="vekui-doc-command" aria-label="CLI 示例">
            <div className="vekui-doc-command__label">package</div>
            <pre>
              <code>pnpm dlx vekui --help</code>
            </pre>
          </aside>
        </div>
      </section>

      <section className="vekui-doc-section">
        <div className="vekui-shell vekui-doc-heading">
          <p className="vekui-kicker">Commands</p>
          <h2>v0 命令应该可预测、可复制、可诊断。</h2>
        </div>
        <div className="vekui-shell vekui-command-grid">
          {commands.map((command) => (
            <article key={command.name}>
              <span>{command.name}</span>
              <h3>{command.title}</h3>
              <p>{command.body}</p>
              <pre>
                <code>{command.command}</code>
              </pre>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
