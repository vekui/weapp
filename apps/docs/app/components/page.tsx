const componentGroups = [
  {
    id: "forms",
    title: "表单输入",
    description: "收集用户输入、校验状态和可访问的表单上下文。",
    items: [
      {
        name: "Field",
        slug: "field",
        description: "表单字段容器，统一 label、description、message 和 invalid 状态。",
        dependency: "utils",
        state: "data-invalid"
      },
      {
        name: "Input",
        slug: "input",
        description: "基于 Taro Input 的文本输入，包含 disabled、invalid 和 token class。",
        dependency: "variants",
        state: "data-invalid"
      },
      {
        name: "Textarea",
        slug: "textarea",
        description: "基于 Taro Textarea 的多行输入，保留小程序安全 className 合并。",
        dependency: "variants",
        state: "data-disabled"
      },
      {
        name: "Checkbox",
        slug: "checkbox",
        description: "触摸优先的勾选控件，支持受控和非受控状态。",
        dependency: "utils",
        state: "data-state"
      },
      {
        name: "RadioGroup",
        slug: "radio-group",
        description: "单选组和选项组件，状态通过 data-state 暴露。",
        dependency: "utils",
        state: "data-state"
      },
      {
        name: "Switch",
        slug: "switch",
        description: "小程序安全的开关控件，thumb 位移不依赖危险 Tailwind transform。",
        dependency: "utils",
        state: "data-state"
      }
    ]
  },
  {
    id: "display",
    title: "内容展示",
    description: "用于页面结构、状态标签和内容承载的基础组件。",
    items: [
      {
        name: "Button",
        slug: "button",
        description: "Taro Button wrapper，提供 token variants、size 和 loading 状态。",
        dependency: "variants",
        state: "data-loading"
      },
      {
        name: "Card",
        slug: "card",
        description: "Card、Header、Content、Footer 等组合式内容容器。",
        dependency: "utils",
        state: "composition"
      },
      {
        name: "Badge",
        slug: "badge",
        description: "轻量状态标签，使用语义 variant 表达 tone。",
        dependency: "utils",
        state: "variant"
      }
    ]
  },
  {
    id: "navigation",
    title: "导航反馈",
    description: "页面内切换、临时层和系统反馈。",
    items: [
      {
        name: "Tabs",
        slug: "tabs",
        description: "页内内容切换，trigger 和 panel 通过 data-state 关联。",
        dependency: "utils",
        state: "data-state"
      },
      {
        name: "Dialog",
        slug: "dialog",
        description: "不使用 portal 的弹层组件，通过内部 Layer primitive 渲染。",
        dependency: "button, layer",
        state: "data-state"
      },
      {
        name: "Toast",
        slug: "toast",
        description: "挂在小程序 app tree 内的 toast provider、viewport 和 item。",
        dependency: "utils",
        state: "data-state"
      }
    ]
  }
]

const components = componentGroups.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    groupTitle: group.title
  }))
)

const contracts = [
  "源码基于 @tarojs/components，不把 Web-only primitive 带进 packages/ui。",
  "每个公共组件支持 className，并保留调用方的语义 token class。",
  "状态统一通过 data-state、data-disabled、data-invalid 或 data-loading 暴露。",
  "Dialog 和 Toast 不使用 portal，不访问 document、window 或 ReactDOM。",
  "新增组件必须通过 typecheck、test、check:ui 和 miniprogram build。"
]

export default function ComponentsPage() {
  return (
    <main className="vekui-doc-page vekui-components-page">
      <div className="vekui-shell vekui-components-layout">
        <aside className="vekui-components-sidebar" aria-label="组件文档导航">
          <nav>
            <div>
              <p>Get Started</p>
              <a href="#overview">Overview</a>
              <a href="#install">Installation</a>
            </div>
            <div>
              <p>Components</p>
              {components.map((component) => (
                <a key={component.slug} href={`#${component.slug}`}>
                  {component.name}
                </a>
              ))}
            </div>
            <div>
              <p>Reference</p>
              <a href="#rules">Component Contract</a>
              <a href="/weapp/registry/">Registry</a>
            </div>
          </nav>
        </aside>

        <article className="vekui-components-content">
          <header id="overview" className="vekui-components-header">
            <p className="vekui-kicker">Docs / Components</p>
            <h1>Components</h1>
            <p>
              VekUI v0 先提供 12 个 Taro React 微信小程序高频基础组件。这里参考 shadcn
              的组件索引方式：先快速找到组件，再进入安装命令、依赖和运行时边界。
            </p>
          </header>

          <nav className="vekui-components-mobile-nav" aria-label="移动端组件索引">
            {components.map((component) => (
              <a key={component.slug} href={`#${component.slug}`}>
                {component.name}
              </a>
            ))}
          </nav>

          <section id="install" className="vekui-components-install" aria-labelledby="install-title">
            <div>
              <h2 id="install-title">Installation</h2>
              <p>和 shadcn 一样，组件通过 CLI 复制源码到你的项目，而不是作为黑盒 UI 包消费。</p>
            </div>
            <pre>
              <code>{`pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .`}</code>
            </pre>
          </section>

          <section className="vekui-components-section" aria-labelledby="component-index-title">
            <h2 id="component-index-title">组件索引</h2>
            <p>点击组件名称可以跳到本页对应条目；后续组件详情页会沿用同一套入口。</p>
            <div className="vekui-components-index">
              {components.map((component) => (
                <a key={component.slug} href={`#${component.slug}`}>
                  {component.name}
                </a>
              ))}
            </div>
          </section>

          {componentGroups.map((group) => (
            <section key={group.id} className="vekui-components-section" aria-labelledby={`${group.id}-title`}>
              <div className="vekui-components-group-heading">
                <h2 id={`${group.id}-title`}>{group.title}</h2>
                <p>{group.description}</p>
              </div>

              <div className="vekui-component-reference-list">
                {group.items.map((component) => (
                  <section key={component.slug} id={component.slug} className="vekui-component-reference">
                    <div className="vekui-component-reference__header">
                      <div>
                        <span>{component.slug}</span>
                        <h3>{component.name}</h3>
                      </div>
                      <a href={`/weapp/r/${component.slug}.json`}>registry json</a>
                    </div>
                    <p>{component.description}</p>
                    <pre>
                      <code>{`pnpm dlx vekui add ${component.slug} --cwd .`}</code>
                    </pre>
                    <dl>
                      <div>
                        <dt>depends</dt>
                        <dd>{component.dependency}</dd>
                      </div>
                      <div>
                        <dt>state</dt>
                        <dd>{component.state}</dd>
                      </div>
                    </dl>
                  </section>
                ))}
              </div>
            </section>
          ))}

          <section id="rules" className="vekui-components-section" aria-labelledby="rules-title">
            <h2 id="rules-title">Component Contract</h2>
            <ul className="vekui-components-contract">
              {contracts.map((contract) => (
                <li key={contract}>{contract}</li>
              ))}
            </ul>
          </section>

          <nav className="vekui-components-pager" aria-label="下一篇文档">
            <a href="/weapp/registry/">
              <span>Next</span>
              <strong>Registry</strong>
            </a>
          </nav>
        </article>
      </div>
    </main>
  )
}
