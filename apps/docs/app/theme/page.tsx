export default function ThemePage() {
  return (
    <main>
      <h1>主题</h1>
      <p>VekUI 使用 Tailwind v4 的 @theme 和 CSS 变量声明语义 token。</p>
      <pre>
        <code>{`@import "tailwindcss";

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
}`}</code>
      </pre>
      <p>组件只使用 bg-background、text-foreground、bg-primary、border-border 这类语义 token。</p>
    </main>
  )
}
