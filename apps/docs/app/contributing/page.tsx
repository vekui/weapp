export default function ContributingPage() {
  return (
    <main>
      <h1>贡献指南</h1>
      <ol>
        <li>更新 packages/registry/src/manifest.ts。</li>
        <li>在 packages/ui/src/components 实现组件。</li>
        <li>补充组件测试。</li>
        <li>在 apps/miniprogram 增加 playground 示例。</li>
        <li>更新文档。</li>
        <li>运行完整验证。</li>
      </ol>
      <pre>
        <code>{`pnpm typecheck
pnpm test
pnpm check:ui
pnpm registry:build
pnpm build:miniprogram
pnpm build:docs`}</code>
      </pre>
    </main>
  )
}
