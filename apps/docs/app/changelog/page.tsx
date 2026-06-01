import { componentStats } from "../components/catalog"

const releaseRules = [
  "影响 CLI、registry、packages/ui、apps/miniprogram、文档站或开发规则的改动，都先写入 Unreleased。",
  "发布时把 Unreleased 下沉到对应版本号，并记录发布日期。",
  "每个条目优先说明开发者会感知到的行为变化，而不是只复述提交标题。"
]

const baselineGroups = [
  {
    label: "Registry",
    title: "源码分发链路已经建立。",
    body: "registry item 覆盖组件源码、样式 token、工具函数和依赖关系，CLI 可以基于公开 JSON 写入业务项目。"
  },
  {
    label: "CLI",
    title: "init / add / list / doctor 形成基础工作流。",
    body: "开发者可以初始化 VekUI 配置、复制组件源码、查看 registry，并检查小程序兼容性问题。"
  },
  {
    label: "Docs",
    title: "文档站和 Agent 规则成为项目入口。",
    body: "快速开始、组件目录、主题、registry、AI Coding 和测试计划共同描述后续迭代边界。"
  },
  {
    label: "Roadmap",
    title: "shadcn-aligned roadmap 已清零。",
    body: `当前组件目录展示 ${componentStats.registryUiComponents} 个 UI 组件、${componentStats.registryItems} 个 registry items，planned 计数为 ${componentStats.planned}。`
  }
]

export default function ChangelogPage() {
  return (
    <main className="vekui-doc-page">
      <section className="vekui-doc-hero">
        <div className="vekui-shell vekui-doc-hero__grid">
          <div>
            <p className="vekui-kicker">Changelog</p>
            <h1>版本变更应该能被追踪，而不是散落在提交历史里。</h1>
            <p>
              VekUI WeApp 使用根目录 CHANGELOG.md 记录 release 级别的变化。未发布内容先进入
              Unreleased，正式发布时再归档到对应版本。
            </p>
          </div>
          <aside className="vekui-doc-command" aria-label="changelog 文件">
            <div className="vekui-doc-command__label">source of truth</div>
            <pre>
              <code>{`CHANGELOG.md
Unreleased -> versioned release
current baseline: 0.0.0`}</code>
            </pre>
          </aside>
        </div>
      </section>

      <section className="vekui-doc-section">
        <div className="vekui-shell vekui-requirements">
          <div>
            <p className="vekui-kicker">Release tracking</p>
            <h2>每次合并前，把用户能感知的变化写进待发布区。</h2>
          </div>
          <ul>
            {releaseRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vekui-doc-section vekui-doc-section--white">
        <div className="vekui-shell">
          <div className="vekui-doc-heading">
            <p className="vekui-kicker">0.0.0 baseline</p>
            <h2>当前基线覆盖 registry、CLI、共享 UI、playground 和文档站。</h2>
          </div>
          <ol className="vekui-step-list">
            {baselineGroups.map((group, index) => (
              <li key={group.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
