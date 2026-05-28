export default function HomePage() {
  return (
    <main>
      <h1>VekUI WeApp</h1>
      <p>
        VekUI WeApp 是面向 Taro React 微信小程序的源码分发组件库。它参考
        shadcn/ui 的使用方式，但默认遵守微信小程序运行时约束。
      </p>
      <pre>
        <code>{`pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .`}</code>
      </pre>
      <h2>v0 包含什么</h2>
      <ul>
        <li>vekui CLI：初始化项目、添加组件、列出 registry、检查项目。</li>
        <li>packages/ui：12 个 v0 组件的 canonical source。</li>
        <li>packages/registry：生成 /r/index.json 和 /r/&lt;item&gt;.json。</li>
        <li>apps/miniprogram：真实 Taro WeChat playground。</li>
      </ul>
    </main>
  )
}
