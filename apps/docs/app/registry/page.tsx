export default function RegistryPage() {
  return (
    <main>
      <h1>Registry</h1>
      <p>GitHub Pages 会公开 registry：</p>
      <pre>
        <code>{`https://vekui.github.io/weapp/r/index.json
https://vekui.github.io/weapp/r/button.json`}</code>
      </pre>
      <p>registry item 保持 shadcn-compatible 结构，包含 name、type、dependencies、registryDependencies 和 files。</p>
      <pre>
        <code>pnpm registry:build</code>
      </pre>
    </main>
  )
}
