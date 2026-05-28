export default function CliPage() {
  return (
    <main>
      <h1>CLI</h1>
      <p>CLI 包名和命令名都是 vekui。</p>
      <h2>init</h2>
      <pre>
        <code>pnpm dlx vekui init --cwd . --yes</code>
      </pre>
      <h2>add</h2>
      <pre>
        <code>pnpm dlx vekui add button input --cwd .</code>
      </pre>
      <h2>list</h2>
      <pre>
        <code>pnpm dlx vekui list</code>
      </pre>
      <h2>doctor</h2>
      <pre>
        <code>pnpm dlx vekui doctor --cwd .</code>
      </pre>
    </main>
  )
}
