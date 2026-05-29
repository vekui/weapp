"use client"

import { Check, Copy } from "lucide-react"
import { useMemo, useState } from "react"
import {
  componentCatalog,
  componentStats,
  sectionItems,
  type ComponentCatalogItem,
  type SectionId,
  type SectionItem
} from "./catalog"

type ActiveTarget =
  | {
      id: SectionId
      type: "section"
    }
  | {
      slug: string
      type: "component"
    }

type ComponentSources = Record<string, string>
type InstallMode = "command" | "manual"
type SourceTokenKind =
  | "comment"
  | "function"
  | "jsx-attribute"
  | "jsx-tag"
  | "keyword"
  | "number"
  | "operator"
  | "property"
  | "string"
  | "type"

type SourceToken = {
  kind?: SourceTokenKind
  text: string
}

const pageUrl = "https://vekui.github.io/weapp/components/"
const sourceKeywords = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "class",
  "const",
  "default",
  "else",
  "export",
  "extends",
  "false",
  "from",
  "function",
  "if",
  "import",
  "interface",
  "let",
  "new",
  "null",
  "readonly",
  "return",
  "switch",
  "true",
  "type",
  "undefined",
  "var"
])
const sourceTypes = new Set([
  "Array",
  "ComponentProps",
  "Omit",
  "Promise",
  "React",
  "ReactNode",
  "Record",
  "boolean",
  "number",
  "string",
  "void"
])
const sourceTokenPattern =
  /\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Z][A-Za-z0-9_.:-]*(?=[\s>/])|\b[A-Za-z_$][\w$]*\b|\b\d+(?:\.\d+)?\b|[{}()[\].,;:?<>/=+\-*|&!]+/g

function isSectionActive(active: ActiveTarget, section: SectionItem) {
  return active.type === "section" && active.id === section.id
}

function isComponentActive(active: ActiveTarget, component: ComponentCatalogItem) {
  return active.type === "component" && active.slug === component.slug
}

function statusLabel(component: ComponentCatalogItem) {
  return component.status === "available" ? "v0" : "planned"
}

function classifySourceToken(line: string, text: string, index: number): SourceTokenKind | undefined {
  if (text.startsWith("//")) {
    return "comment"
  }

  if (/^["'`]/.test(text)) {
    return "string"
  }

  if (/^\d/.test(text)) {
    return "number"
  }

  if (text.startsWith("<") && /[A-Za-z]/.test(text.replace("/", "")[1] ?? "")) {
    return "jsx-tag"
  }

  if (/^[{}()[\].,;:?<>/=+\-*|&!]+$/.test(text)) {
    return "operator"
  }

  if (sourceKeywords.has(text)) {
    return "keyword"
  }

  if (sourceTypes.has(text)) {
    return "type"
  }

  const next = line.slice(index + text.length)

  if (/^\s*=/.test(next)) {
    return "jsx-attribute"
  }

  if (/^\??\s*:/.test(next)) {
    return "property"
  }

  if (/^\s*\(/.test(next)) {
    return "function"
  }

  if (/^[A-Z][A-Za-z0-9_]*$/.test(text)) {
    return "type"
  }

  return undefined
}

function tokenizeTsxLine(line: string): SourceToken[] {
  if (!line) {
    return [{ text: " " }]
  }

  const tokens: SourceToken[] = []
  let lastIndex = 0

  sourceTokenPattern.lastIndex = 0

  for (const match of line.matchAll(sourceTokenPattern)) {
    const text = match[0]
    const index = match.index

    if (index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, index) })
    }

    tokens.push({
      kind: classifySourceToken(line, text, index),
      text
    })
    lastIndex = index + text.length
  }

  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex) })
  }

  return tokens
}

function PanelShell({
  activeKey,
  children,
  description,
  title
}: {
  activeKey: string
  children: React.ReactNode
  description: string
  title: string
}) {
  return (
    <section
      key={activeKey}
      aria-labelledby="vekui-components-panel-title"
      className="vekui-components-panel"
      id="vekui-components-panel"
      role="tabpanel"
      tabIndex={-1}
    >
      <div className="vekui-components-panel__heading">
        <h1 id="vekui-components-panel-title">{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </section>
  )
}

function CommandBlock({ children }: { children: string }) {
  return (
    <pre className="vekui-components-command">
      <code>{children}</code>
    </pre>
  )
}

function SourceCodeBlock({ code, filename }: { code: string; filename: string }) {
  const [copyLabel, setCopyLabel] = useState("Copy")
  const [collapsed, setCollapsed] = useState(false)
  const lines = code.split("\n")

  function copyCode() {
    setCopyLabel("Copied")

    const copyPromise = navigator.clipboard?.writeText(code)

    if (copyPromise) {
      copyPromise.catch(() => {
        setCopyLabel("Copy failed")
      })
    } else {
      setCopyLabel("Copy failed")
    }

    setTimeout(() => setCopyLabel("Copy"), 1600)
  }

  return (
    <div className="vekui-source-card" data-collapsed={collapsed ? "true" : "false"}>
      <div className="vekui-source-card__header">
        <div className="vekui-source-card__meta">
          <span>TS</span>
          <code>{filename}</code>
        </div>
        <div className="vekui-source-card__actions">
          <button
            className="vekui-source-card__text-button"
            onClick={() => setCollapsed((value) => !value)}
            type="button"
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>
          <button
            aria-label={copyLabel === "Copy" ? "Copy source code" : copyLabel}
            className="vekui-source-card__icon-button"
            data-state={copyLabel === "Copied" ? "success" : "idle"}
            onClick={copyCode}
            title={copyLabel === "Copy" ? "Copy source code" : copyLabel}
            type="button"
          >
            {copyLabel === "Copied" ? (
              <Check aria-hidden="true" className="vekui-source-card__copy-icon" size={16} strokeWidth={1.75} />
            ) : (
              <Copy aria-hidden="true" className="vekui-source-card__copy-icon" size={16} strokeWidth={1.75} />
            )}
            <span className="vekui-sr-only">{copyLabel}</span>
          </button>
        </div>
      </div>
      <pre className="vekui-source-card__body">
        <code>
          {lines.map((line, index) => (
            <span className="vekui-source-line" key={`${index}-${line}`}>
              <span aria-hidden="true">{index + 1}</span>
              <span>
                {tokenizeTsxLine(line).map((token, tokenIndex) =>
                  token.kind ? (
                    <span
                      className={`vekui-source-token vekui-source-token--${token.kind}`}
                      key={`${tokenIndex}-${token.text}`}
                    >
                      {token.text}
                    </span>
                  ) : (
                    <span key={`${tokenIndex}-${token.text}`}>{token.text}</span>
                  )
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

function InfoGrid({ items }: { items: Array<{ label: string; value: React.ReactNode }> }) {
  return (
    <dl className="vekui-components-info-grid">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function sourceDependencyCommand(component: ComponentCatalogItem) {
  if (component.dependency === "variants" || component.dependency?.includes("button")) {
    return "pnpm add class-variance-authority clsx tailwind-merge"
  }

  return "pnpm add clsx tailwind-merge"
}

function usageSnippet(component: ComponentCatalogItem) {
  const snippets: Record<string, string> = {
    badge: `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <Badge>v0</Badge>
}`,
    button: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Button</Button>
}`,
    card: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>VekUI</CardTitle>
      </CardHeader>
      <CardContent>Source registry component.</CardContent>
    </Card>
  )
}`,
    checkbox: `import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDemo() {
  return <Checkbox label="Accept terms" />
}`,
    dialog: `import { Dialog } from "@/components/ui/dialog"

export function DialogDemo() {
  return <Dialog title="Dialog" description="Tree-rendered overlay">Content</Dialog>
}`,
    field: `import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

export function FieldDemo() {
  return (
    <Field>
      <FieldLabel>Name</FieldLabel>
      <FieldDescription>Use a visible label for mini-program forms.</FieldDescription>
    </Field>
  )
}`,
    input: `import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input placeholder="Name" />
}`,
    "radio-group": `import { RadioGroup } from "@/components/ui/radio-group"

export function RadioGroupDemo() {
  return (
    <RadioGroup
      options={[
        { label: "Default", value: "default" },
        { label: "Compact", value: "compact" }
      ]}
    />
  )
}`,
    switch: `import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return <Switch defaultChecked />
}`,
    tabs: `import { Tabs } from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs
      items={[
        { label: "Preview", value: "preview", content: "Preview panel" },
        { label: "Code", value: "code", content: "Code panel" }
      ]}
    />
  )
}`,
    textarea: `import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return <Textarea placeholder="Notes" />
}`,
    toast: `import { Toast, ToastViewport } from "@/components/ui/toast"

export function ToastDemo() {
  return (
    <ToastViewport>
      <Toast title="Saved" description="Changes are ready." />
    </ToastViewport>
  )
}`
  }

  return snippets[component.slug] ?? `import { ${component.exportName} } from "@/components/ui/${component.slug}"`
}

function ComponentGrid({
  active,
  onSelect
}: {
  active: ActiveTarget
  onSelect: (target: ActiveTarget) => void
}) {
  return (
    <div className="vekui-components-index" role="list">
      {componentCatalog.map((component) => {
        const selected = isComponentActive(active, component)
        return (
          <button
            aria-controls="vekui-components-panel"
            aria-selected={selected}
            className="vekui-components-index__item"
            data-state={selected ? "active" : "inactive"}
            data-status={component.status}
            key={component.slug}
            onClick={() => onSelect({ type: "component", slug: component.slug })}
            role="tab"
            type="button"
          >
            <span>{component.name}</span>
          </button>
        )
      })}
    </div>
  )
}

function SectionPanel({
  active,
  onSelect,
  section
}: {
  active: ActiveTarget
  onSelect: (target: ActiveTarget) => void
  section: SectionItem
}) {
  if (section.id === "components") {
    return (
      <PanelShell
        activeKey="section-components"
        description="Here you can find all the components available in VekUI and the shadcn-aligned roadmap we are working through."
        title="Components"
      >
        <ComponentGrid active={active} onSelect={onSelect} />
        <p className="vekui-components-footnote">
          当前 v0 已发布 {componentStats.available} 个基础组件；其余组件先按 shadcn 顺序作为路线图入口保留。
        </p>
      </PanelShell>
    )
  }

  if (section.id === "installation") {
    return (
      <PanelShell
        activeKey="section-installation"
        description="Like shadcn/ui, VekUI copies component source into your project. The source stays yours to review and change."
        title="Installation"
      >
        <CommandBlock>{`pnpm dlx vekui init --cwd . --yes
pnpm dlx vekui add button input --cwd .`}</CommandBlock>
        <InfoGrid
          items={[
            { label: "creates", value: "vekui.json, src/lib/cn.ts, src/styles/vekui.css" },
            { label: "writes", value: "src/components/ui/<component>.tsx" },
            { label: "verifies", value: "pnpm dlx vekui doctor --cwd ." }
          ]}
        />
      </PanelShell>
    )
  }

  if (section.id === "theming") {
    return (
      <PanelShell
        activeKey="section-theming"
        description="VekUI styles are token-first so copied components keep working across light, dark and custom themes."
        title="Theming"
      >
        <div className="vekui-components-prose-grid">
          <article>
            <h2>Semantic tokens</h2>
            <p>组件使用 bg-background、text-foreground、border-border、bg-primary 等语义 token。</p>
          </article>
          <article>
            <h2>Mini-program CSS</h2>
            <p>共享组件禁止 space-x、space-y、translate utility，避免 Taro/WXSS 输出风险。</p>
          </article>
        </div>
        <a className="vekui-components-link-card" href="/weapp/theme/">
          <span>Theme docs</span>
          <strong>查看 token 和 CSS 入口</strong>
        </a>
      </PanelShell>
    )
  }

  if (section.id === "cli") {
    return (
      <PanelShell
        activeKey="section-cli"
        description="The CLI mirrors shadcn's init/add flow while checking Taro-specific project constraints."
        title="CLI"
      >
        <div className="vekui-components-command-list">
          {["init", "add", "list", "doctor"].map((command) => (
            <code key={command}>pnpm dlx vekui {command} --cwd .</code>
          ))}
        </div>
        <a className="vekui-components-link-card" href="/weapp/cli/">
          <span>CLI docs</span>
          <strong>查看命令参数与输出约定</strong>
        </a>
      </PanelShell>
    )
  }

  if (section.id === "registry") {
    return (
      <PanelShell
        activeKey="section-registry"
        description="The registry is the public contract for source distribution and agent-readable component metadata."
        title="Registry"
      >
        <InfoGrid
          items={[
            { label: "index", value: <a href="/weapp/r/index.json">/r/index.json</a> },
            { label: "schema", value: <a href="/weapp/r/schema.json">/r/schema.json</a> },
            { label: "contract", value: "registry:ui, registry:lib, registry:style" }
          ]}
        />
        <a className="vekui-components-link-card" href="/weapp/registry/">
          <span>Registry docs</span>
          <strong>查看构建输出和依赖解析规则</strong>
        </a>
      </PanelShell>
    )
  }

  if (section.id === "forms") {
    const formComponents = componentCatalog.filter((component) =>
      ["field", "input", "textarea", "checkbox", "radio-group", "switch"].includes(component.slug)
    )
    return (
      <PanelShell
        activeKey="section-forms"
        description="VekUI starts forms with small, composable primitives instead of a monolithic form abstraction."
        title="Forms"
      >
        <div className="vekui-components-mini-list">
          {formComponents.map((component) => (
            <button
              key={component.slug}
              onClick={() => onSelect({ type: "component", slug: component.slug })}
              type="button"
            >
              <span>{component.name}</span>
              <small>{component.state}</small>
            </button>
          ))}
        </div>
      </PanelShell>
    )
  }

  if (section.id === "changelog") {
    return (
      <PanelShell
        activeKey="section-changelog"
        description="The current docs surface is intentionally honest: v0 ships a foundation batch and shows the broader shadcn parity backlog."
        title="Changelog"
      >
        <ol className="vekui-components-timeline">
          <li>
            <span>v0</span>
            <p>12 个基础组件、CLI、registry builder、Taro playground 和文档站已串通。</p>
          </li>
          <li>
            <span>next</span>
            <p>优先补 Label、Separator、Skeleton、Progress、Sheet、Popover 等低运行时风险组件。</p>
          </li>
          <li>
            <span>later</span>
            <p>再进入复杂组合组件，如 Calendar、Command、Data Table、Date Picker 和 Navigation Menu。</p>
          </li>
        </ol>
      </PanelShell>
    )
  }

  if (section.id === "rtl" || section.id === "mcp-server") {
    const isRtl = section.id === "rtl"
    return (
      <PanelShell
        activeKey={`section-${section.id}`}
        description={section.description}
        title={section.title}
      >
        <div className="vekui-components-empty-state">
          <span>{isRtl ? "Platform note" : "Integration note"}</span>
          <p>
            {isRtl
              ? "RTL 会在小程序真实布局能力确认后再进入公共 contract；当前组件先保持方向无关的 token 和 gap 规则。"
              : "MCP Server 会以 registry 和 llms.txt 为基础，让 agent 可以查询可用组件、依赖和安装命令。"}
          </p>
        </div>
      </PanelShell>
    )
  }

  if (section.id === "skills") {
    return (
      <PanelShell
        activeKey="section-skills"
        description="Agent-facing rules are part of the product surface, because copied source needs reliable extension boundaries."
        title="Skills"
      >
        <InfoGrid
          items={[
            { label: "rules", value: "AGENTS.md, docs/UI_RULES.md" },
            { label: "tests", value: "API, state attributes, token classes, mini-program compatibility" },
            { label: "docs", value: <a href="/weapp/ai-coding/">AI Coding</a> }
          ]}
        />
      </PanelShell>
    )
  }

  return (
    <PanelShell
      activeKey="section-introduction"
      description="VekUI WeApp is a shadcn-style source registry and first-party UI foundation for Taro React WeChat mini programs."
      title="Introduction"
    >
      <div className="vekui-components-prose-grid">
        <article>
          <h2>Registry-first</h2>
          <p>组件源码、工具函数和 token 通过 registry 复制到业务项目，不作为黑盒 UI 包消费。</p>
        </article>
        <article>
          <h2>Taro-safe</h2>
          <p>packages/ui 使用 @tarojs/components，不引入 Radix、ReactDOM、window、document 或 portal。</p>
        </article>
        <article>
          <h2>Agent-ready</h2>
          <p>组件扩展必须同步 registry、文档、测试和小程序构建验证。</p>
        </article>
      </div>
    </PanelShell>
  )
}

function ComponentPanel({
  component,
  sourceCode
}: {
  component: ComponentCatalogItem
  sourceCode?: string
}) {
  const available = component.status === "available"
  const [installMode, setInstallMode] = useState<InstallMode>(sourceCode ? "manual" : "command")

  return (
    <PanelShell
      activeKey={`component-${component.slug}`}
      description={component.description}
      title={component.name}
    >
      <div className="vekui-components-component-meta">
        <span data-status={component.status}>{statusLabel(component)}</span>
        <code>{component.slug}</code>
        <code>{component.exportName}</code>
      </div>

      {available && component.command ? (
        <section className="vekui-component-detail-section" aria-labelledby={`${component.slug}-installation`}>
          <div className="vekui-component-section-heading">
            <h2 id={`${component.slug}-installation`}>Installation</h2>
            <div className="vekui-install-tabs" role="tablist" aria-label={`${component.name} installation mode`}>
              {(["command", "manual"] as const).map((mode) => (
                <button
                  aria-selected={installMode === mode}
                  data-state={installMode === mode ? "active" : "inactive"}
                  disabled={mode === "manual" && !sourceCode}
                  key={mode}
                  onClick={() => setInstallMode(mode)}
                  role="tab"
                  type="button"
                >
                  {mode === "command" ? "Command" : "Manual"}
                </button>
              ))}
            </div>
          </div>

          {installMode === "command" ? (
            <CommandBlock>{component.command}</CommandBlock>
          ) : (
            <ol className="vekui-install-steps">
              <li>
                <span>1</span>
                <div>
                  <p>Install the following dependencies:</p>
                  <CommandBlock>{sourceDependencyCommand(component)}</CommandBlock>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <p>Copy and paste the following code into your project.</p>
                  {sourceCode ? (
                    <SourceCodeBlock code={sourceCode} filename={`components/ui/${component.slug}.tsx`} />
                  ) : (
                    <div className="vekui-components-empty-state">
                      <span>source</span>
                      <p>Source code will appear here after this registry item is implemented.</p>
                    </div>
                  )}
                </div>
              </li>
            </ol>
          )}
        </section>
      ) : null}

      {available ? (
        <section className="vekui-component-detail-section" aria-labelledby={`${component.slug}-usage`}>
          <h2 id={`${component.slug}-usage`}>Usage</h2>
          <CommandBlock>{usageSnippet(component)}</CommandBlock>
        </section>
      ) : null}

      <section className="vekui-component-detail-section" aria-labelledby={`${component.slug}-api`}>
        <h2 id={`${component.slug}-api`}>API Reference</h2>
        <InfoGrid
          items={[
            { label: "status", value: available ? "Available in v0 registry" : "Roadmap item" },
            { label: "dependency", value: component.dependency ?? "to be designed" },
            { label: "state", value: component.state ?? "to be specified" },
            {
              label: "registry",
              value: component.registryPath ? <a href={component.registryPath}>{component.registryPath}</a> : "not published yet"
            }
          ]}
        />
      </section>

      <div className="vekui-components-note">
        <h2>Taro note</h2>
        <p>{component.taroNote}</p>
      </div>

      {component.source ? (
        <div className="vekui-components-source">
          <span>source</span>
          <code>{component.source}</code>
        </div>
      ) : (
        <div className="vekui-components-empty-state">
          <span>roadmap</span>
          <p>{component.roadmap}</p>
        </div>
      )}
    </PanelShell>
  )
}

export function ComponentsPageClient({ componentSources }: { componentSources: ComponentSources }) {
  const [active, setActive] = useState<ActiveTarget>({ type: "section", id: "components" })
  const [copyLabel, setCopyLabel] = useState("Copy Page")

  const activeSection = useMemo(() => {
    if (active.type !== "section") {
      return undefined
    }
    return sectionItems.find((section) => section.id === active.id)
  }, [active])

  const activeComponent = useMemo(() => {
    if (active.type !== "component") {
      return undefined
    }
    return componentCatalog.find((component) => component.slug === active.slug)
  }, [active])

  async function copyPage() {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopyLabel("Copied")
    } catch {
      setCopyLabel("Copy failed")
    }

    setTimeout(() => setCopyLabel("Copy Page"), 1600)
  }

  return (
    <main className="vekui-doc-page vekui-components-page">
      <div className="vekui-shell vekui-components-layout">
        <aside className="vekui-components-sidebar" aria-label="组件文档导航">
          <div className="vekui-components-nav-group" role="tablist" aria-label="Sections">
            <p>Sections</p>
            {sectionItems.map((section) => {
              const selected = isSectionActive(active, section)
              return (
                <button
                  aria-controls="vekui-components-panel"
                  aria-selected={selected}
                  className="vekui-components-nav-item"
                  data-state={selected ? "active" : "inactive"}
                  key={section.id}
                  onClick={() => setActive({ type: "section", id: section.id })}
                  role="tab"
                  type="button"
                >
                  <span>{section.title}</span>
                  {section.id === "registry" || section.id === "changelog" ? <small /> : null}
                </button>
              )
            })}
          </div>

          <div className="vekui-components-nav-group" role="tablist" aria-label="Components">
            <p>Components</p>
            {componentCatalog.map((component) => {
              const selected = isComponentActive(active, component)
              return (
                <button
                  aria-controls="vekui-components-panel"
                  aria-selected={selected}
                  className="vekui-components-nav-item"
                  data-state={selected ? "active" : "inactive"}
                  data-status={component.status}
                  key={component.slug}
                  onClick={() => setActive({ type: "component", slug: component.slug })}
                  role="tab"
                  type="button"
                >
                  <span>{component.name}</span>
                </button>
              )
            })}
          </div>
        </aside>

        <article className="vekui-components-content">
          <div className="vekui-components-toolbar">
            <p className="vekui-kicker">Docs / Components</p>
            <div className="vekui-components-actions" aria-label="页面操作">
              <button onClick={copyPage} type="button">
                {copyLabel}
              </button>
              <a aria-label="下一篇 Registry" href="/weapp/registry/">
                →
              </a>
            </div>
          </div>

          <div className="vekui-components-mobile-switcher" role="tablist" aria-label="Sections">
            {sectionItems.map((section) => {
              const selected = isSectionActive(active, section)
              return (
                <button
                  aria-controls="vekui-components-panel"
                  aria-selected={selected}
                  data-state={selected ? "active" : "inactive"}
                  key={section.id}
                  onClick={() => setActive({ type: "section", id: section.id })}
                  role="tab"
                  type="button"
                >
                  {section.title}
                </button>
              )
            })}
          </div>

          {activeComponent ? (
            <ComponentPanel component={activeComponent} sourceCode={componentSources[activeComponent.slug]} />
          ) : (
            <SectionPanel
              active={active}
              onSelect={setActive}
              section={activeSection ?? sectionItems.find((section) => section.id === "components")!}
            />
          )}
        </article>
      </div>
    </main>
  )
}
