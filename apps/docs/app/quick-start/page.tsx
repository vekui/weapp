export default function QuickStartPage() {
  return (
    <main>
      <h1>快速开始</h1>
      <p>在 Taro React 微信小程序项目根目录运行：</p>
      <pre>
        <code>{`pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .`}</code>
      </pre>
      <p>init 会生成 vekui.json、src/lib/cn.ts 和 src/styles/vekui.css。</p>
      <p>add 会把组件源码复制到 src/components/ui，并自动补齐 registryDependencies。</p>
      <h2>建议入口样式</h2>
      <pre>
        <code>{`@import "./styles/vekui.css";`}</code>
      </pre>
      <h2>验证</h2>
      <pre>
        <code>pnpm dlx vekui doctor --cwd .</code>
      </pre>
    </main>
  )
}
