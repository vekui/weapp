const setupCommand = `pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .`

const requirements = [
  "Taro React 微信小程序项目",
  "pnpm workspace 或普通 pnpm 项目",
  "项目样式入口可 import CSS",
  "小程序构建走 Taro Vite compiler"
]

const steps = [
  {
    label: "01",
    title: "初始化 VekUI 约定",
    body: "生成 vekui.json、cn 工具函数、token CSS 和默认目录别名。",
    command: "pnpm dlx vekui init --cwd . --yes"
  },
  {
    label: "02",
    title: "添加需要的组件",
    body: "从 registry 读取组件条目，把源码复制到配置中的 components 目录。",
    command: "pnpm dlx vekui add button input --cwd ."
  },
  {
    label: "03",
    title: "接入样式入口",
    body: "在应用全局样式里导入 VekUI token，让组件 class 能映射到小程序安全样式。",
    command: '@import "./styles/vekui.css";'
  },
  {
    label: "04",
    title: "运行 doctor",
    body: "检查 Taro 依赖、CSS 入口、危险 DOM/Radix 引用和基础项目约定。",
    command: "pnpm dlx vekui doctor --cwd ."
  }
]

const generatedFiles = [
  "vekui.json",
  "src/lib/cn.ts",
  "src/styles/vekui.css",
  "src/components/ui/button.tsx",
  "src/components/ui/input.tsx"
]

export default function QuickStartPage() {
  return (
    <main className="vekui-doc-page">
      <section className="vekui-doc-hero">
        <div className="vekui-shell vekui-doc-hero__grid">
          <div>
            <p className="vekui-kicker">Quick Start</p>
            <h1>从一个 Taro React 小程序项目开始接入 VekUI。</h1>
            <p>
              v0 的目标是先让开发者稳定拿到组件源码，并能在微信小程序构建链路里验证。
              下面流程只覆盖最小可用路径。
            </p>
          </div>
          <aside className="vekui-doc-command" aria-label="快速开始命令">
            <div className="vekui-doc-command__label">run in project root</div>
            <pre>
              <code>{setupCommand}</code>
            </pre>
          </aside>
        </div>
      </section>

      <section className="vekui-doc-section">
        <div className="vekui-shell vekui-requirements">
          <div>
            <p className="vekui-kicker">Before you start</p>
            <h2>先确认项目满足这些条件。</h2>
          </div>
          <ul>
            {requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vekui-doc-section vekui-doc-section--white">
        <div className="vekui-shell">
          <div className="vekui-doc-heading">
            <p className="vekui-kicker">Install flow</p>
            <h2>四步完成源码接入。</h2>
          </div>
          <ol className="vekui-step-list">
            {steps.map((step) => (
              <li key={step.label}>
                <span>{step.label}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <pre>
                    <code>{step.command}</code>
                  </pre>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="vekui-doc-section">
        <div className="vekui-shell vekui-output-grid">
          <div>
            <p className="vekui-kicker">Generated output</p>
            <h2>执行后应该能看到这些文件。</h2>
            <p>
              如果路径不同，优先检查 vekui.json 里的 aliases 配置。CLI 会按你的配置解析目标目录。
            </p>
          </div>
          <div className="vekui-file-list" aria-label="生成文件">
            {generatedFiles.map((file) => (
              <code key={file}>{file}</code>
            ))}
          </div>
        </div>
      </section>

      <section className="vekui-doc-section vekui-doc-section--ink">
        <div className="vekui-shell vekui-next-grid">
          <div>
            <p className="vekui-kicker">Verify</p>
            <h2>最后用真实小程序构建兜底。</h2>
          </div>
          <div>
            <pre>
              <code>{`pnpm dlx vekui doctor --cwd .
pnpm build:miniprogram`}</code>
            </pre>
            <p>
              doctor 只负责项目规则检查；小程序运行时问题仍然要用 Taro 构建和微信开发者工具验证。
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
