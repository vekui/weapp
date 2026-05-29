const endpoints = [
  "https://vekui.github.io/weapp/r/index.json",
  "https://vekui.github.io/weapp/r/button.json"
]

const fields = [
  "name",
  "type",
  "title",
  "description",
  "dependencies",
  "registryDependencies",
  "files"
]

export default function RegistryPage() {
  return (
    <main className="vekui-doc-page">
      <section className="vekui-doc-hero">
        <div className="vekui-shell vekui-doc-hero__grid">
          <div>
            <p className="vekui-kicker">Registry</p>
            <h1>GitHub Pages 是 CLI 消费 registry 的公开入口。</h1>
            <p>
              registry item 保持 shadcn-compatible 结构，CLI 通过它解析组件文件、
              npm 依赖和 registryDependencies。
            </p>
          </div>
          <aside className="vekui-doc-command" aria-label="构建 registry 命令">
            <div className="vekui-doc-command__label">build registry</div>
            <pre>
              <code>pnpm registry:build</code>
            </pre>
          </aside>
        </div>
      </section>

      <section className="vekui-doc-section">
        <div className="vekui-shell vekui-output-grid">
          <div>
            <p className="vekui-kicker">Public endpoints</p>
            <h2>Pages 会暴露 index 和每个 item 的 JSON。</h2>
          </div>
          <div className="vekui-file-list" aria-label="Registry URL">
            {endpoints.map((endpoint) => (
              <code key={endpoint}>{endpoint}</code>
            ))}
          </div>
        </div>
      </section>

      <section className="vekui-doc-section vekui-doc-section--white">
        <div className="vekui-shell vekui-requirements">
          <div>
            <p className="vekui-kicker">Schema surface</p>
            <h2>CLI 依赖这些字段完成源码写入。</h2>
          </div>
          <ul>
            {fields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
