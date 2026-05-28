export default function AiCodingPage() {
  return (
    <main>
      <h1>AI Coding</h1>
      <p>把 AGENTS.md 放进 Agent 上下文，并要求它先读文档再改代码。</p>
      <ul>
        <li>不在 packages/ui 使用 Radix、DOM API、第三方 UI fallback。</li>
        <li>所有组件样式使用语义 token。</li>
        <li>所有公共组件都要有测试和 registry item。</li>
        <li>小程序运行验证由 apps/miniprogram 承担。</li>
      </ul>
      <pre>
        <code>{`pnpm typecheck
pnpm test
pnpm check:ui
pnpm registry:build`}</code>
      </pre>
    </main>
  )
}
