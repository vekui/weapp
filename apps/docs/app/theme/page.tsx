const tokenGroups = [
  {
    name: "Surface",
    tokens: ["background", "foreground", "card", "popover", "border"]
  },
  {
    name: "Action",
    tokens: ["primary", "primary-foreground", "secondary", "accent", "ring"]
  },
  {
    name: "Feedback",
    tokens: ["muted", "muted-foreground", "destructive", "destructive-foreground"]
  }
]

export default function ThemePage() {
  return (
    <main className="vekui-doc-page">
      <section className="vekui-doc-hero">
        <div className="vekui-shell vekui-doc-hero__grid">
          <div>
            <p className="vekui-kicker">Theme</p>
            <h1>主题只暴露语义 token，不鼓励业务直接绑颜色。</h1>
            <p>
              VekUI 使用 Tailwind v4 的 @theme 和 CSS 变量声明语义 token。
              组件只消费 token class，避免把颜色散落到组件实现里。
            </p>
          </div>
          <aside className="vekui-doc-command" aria-label="主题入口">
            <div className="vekui-doc-command__label">style entry</div>
            <pre>
              <code>{`@import "./styles/vekui.css";`}</code>
            </pre>
          </aside>
        </div>
      </section>

      <section className="vekui-doc-section vekui-doc-section--white">
        <div className="vekui-shell vekui-doc-heading">
          <p className="vekui-kicker">Token map</p>
          <h2>主题变量按用途分组，而不是按颜色名堆叠。</h2>
        </div>
        <div className="vekui-shell vekui-token-grid">
          {tokenGroups.map((group) => (
            <article key={group.name}>
              <h3>{group.name}</h3>
              <div>
                {group.tokens.map((token) => (
                  <code key={token}>--color-{token}</code>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="vekui-doc-section">
        <div className="vekui-shell vekui-next-grid">
          <div>
            <p className="vekui-kicker">Tailwind v4</p>
            <h2>组件使用的是语义 class，而不是固定色值。</h2>
          </div>
          <div>
            <pre>
              <code>{`@import "tailwindcss";

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
}`}</code>
            </pre>
            <p>推荐组件只使用 bg-background、text-foreground、bg-primary、border-border 这类语义 token。</p>
          </div>
        </div>
      </section>
    </main>
  )
}
