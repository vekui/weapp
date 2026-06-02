import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const docsRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)))
const componentPage = await readFile(
  path.join(docsRoot, "app/components/components-page-client.tsx"),
  "utf8"
)
const homePage = await readFile(path.join(docsRoot, "app/page.tsx"), "utf8")
const siteCss = await readFile(path.join(docsRoot, "app/site.css"), "utf8")

function assertIncludes(source, expected, message) {
  if (!source.includes(expected)) {
    throw new Error(message)
  }
}

function assertRuleIncludes(source, selector, expected, message) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const blocks = [...source.matchAll(new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\n\\}`, "g"))].map(
    (match) => match[1]
  )

  if (!blocks.some((block) => block.includes(expected))) {
    throw new Error(message)
  }
}

function assertRuleExcludes(source, selector, forbidden, message) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const blocks = [...source.matchAll(new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\n\\}`, "g"))].map(
    (match) => match[1]
  )

  if (blocks.some((block) => block.includes(forbidden))) {
    throw new Error(message)
  }
}

assertIncludes(
  componentPage,
  "tokenizeTsxLine",
  "Component source blocks should tokenize TSX instead of rendering unstyled plain text."
)
assertIncludes(
  componentPage,
  'className={`vekui-source-token vekui-source-token--${token.kind}`}',
  "Component source blocks should render semantic syntax token classes."
)
assertIncludes(
  componentPage,
  'function HighlightedTsxBlock({ code, filename, variant = "source" }',
  "Component docs should share one highlighted TSX block for source and usage snippets."
)
assertIncludes(
  componentPage,
  '<HighlightedTsxBlock code={usageSnippet(component)} filename={`${component.slug}.usage.tsx`} variant="usage" />',
  "Component usage snippets should render through syntax-highlighted TSX blocks."
)
assertIncludes(
  siteCss,
  '.vekui-source-card__body[data-variant="usage"]',
  "Usage code blocks should have a dedicated visual treatment when rendered outside source cards."
)
assertIncludes(
  siteCss,
  "--vk-code-surface",
  "Code blocks should use a dedicated lighter code surface token."
)
assertIncludes(
  siteCss,
  ".vekui-source-token--keyword",
  "Code block syntax token classes should be styled."
)
assertRuleIncludes(
  siteCss,
  ".vekui-components-sidebar",
  "overflow-y: auto;",
  "Components sidebar should own scrolling instead of clipping an inner floating section."
)
assertRuleIncludes(
  siteCss,
  '.vekui-components-nav-group[aria-label="Components"]',
  "overflow: visible;",
  "Components nav group should not create a nested scroll area that masks list items."
)
assertRuleIncludes(
  siteCss,
  '.vekui-components-nav-group[aria-label="Components"] p',
  "position: static;",
  "Components nav heading should not float over the component list."
)
assertIncludes(
  siteCss,
  ".vekui-components-command {\n  background: var(--vk-code-surface);",
  "Command code blocks should use the lighter code surface."
)
assertIncludes(
  homePage,
  "installCommandLines",
  "Home install panel should render each command with metadata instead of an unstyled plain string."
)
assertIncludes(
  homePage,
  'className={`vekui-code-token vekui-code-token--${token.kind}`}',
  "Home command panels should highlight command names with semantic token classes."
)
assertIncludes(
  homePage,
  '{ kind: "command", text: "pnpm" }',
  "Home command panels should classify pnpm as a command token."
)
assertIncludes(
  homePage,
  'className="vekui-code-line__description"',
  "Home command panels should include short descriptions for each command."
)
assertIncludes(
  siteCss,
  ".vekui-code-token--command",
  "Home command token classes should be styled."
)
assertIncludes(
  siteCss,
  "column-gap: 0.45ch;",
  "Command token groups should keep visible spacing between command parts."
)
assertIncludes(
  siteCss,
  ".vekui-code-token + .vekui-code-token",
  "Command tokens should keep direct visual spacing even when syntax-highlighted."
)
assertIncludes(
  siteCss,
  ".vekui-gate-item__description",
  "Quality gate command descriptions should be styled."
)
assertIncludes(
  siteCss,
  "grid-template-columns: repeat(2, minmax(280px, 1fr));",
  "Quality gate commands should avoid squeezed three-column layouts."
)
assertIncludes(
  siteCss,
  "--vk-radius-control: 8px;",
  "Docs controls should use a shared non-zero rounded radius."
)
assertIncludes(
  siteCss,
  "--vk-radius-content: 8px;",
  "Docs content surfaces should not use 0px corners."
)
assertRuleIncludes(
  siteCss,
  '.vekui-source-card__body[data-variant="usage"]',
  "border-radius: var(--vk-radius-content);",
  "Usage code blocks should share the rounded content radius."
)
assertIncludes(
  siteCss,
  ".vekui-components-component-meta span,\n.vekui-components-component-meta code {\n  align-items: center;",
  "Component meta chips should use the shared control radius treatment instead of pill or underline styling."
)
assertRuleIncludes(
  siteCss,
  ".vekui-components-component-meta span,\n.vekui-components-component-meta code",
  "border-radius: var(--vk-radius-control);",
  "Component meta chips should use the shared control radius."
)
assertRuleIncludes(
  siteCss,
  ".vekui-components-status-tabs button",
  "position: relative;",
  "Status tab buttons should anchor an independent active indicator."
)
assertRuleIncludes(
  siteCss,
  ".vekui-components-status-tabs button",
  "border-radius: var(--vk-radius-content);",
  "Status tab buttons should keep the shared non-zero radius while using an independent indicator."
)
assertRuleIncludes(
  siteCss,
  ".vekui-components-status-tabs button::after",
  "background: var(--vk-ink);",
  "Status tab active indicators should render as a straight pseudo-element instead of a curved button border."
)
assertRuleIncludes(
  siteCss,
  '.vekui-components-status-tabs button[data-state="active"]::after',
  "opacity: 1;",
  "Active status tabs should reveal the independent indicator."
)
assertRuleIncludes(
  siteCss,
  ".vekui-components-nav-item",
  "position: relative;",
  "Components nav items should anchor an independent active indicator."
)
assertRuleIncludes(
  siteCss,
  ".vekui-components-nav-item::before",
  "background: var(--vk-ink);",
  "Components nav active indicators should render as a straight pseudo-element instead of a curved item border."
)
assertRuleIncludes(
  siteCss,
  '.vekui-components-nav-item[data-state="active"]::before',
  "opacity: 1;",
  "Active components nav items should reveal the independent indicator."
)
assertRuleExcludes(
  siteCss,
  '.vekui-components-nav-item[data-state="active"]',
  "border-left:",
  "Active components nav items should not draw the indicator with a curved border-left."
)
assertRuleExcludes(
  siteCss,
  '.vekui-components-nav-item[data-state="active"]',
  "box-shadow: inset",
  "Active components nav items should not draw the indicator with a curved inset shadow."
)

console.log("Code block rendering checks passed.")
