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
  siteCss,
  "--vk-code-surface",
  "Code blocks should use a dedicated lighter code surface token."
)
assertIncludes(
  siteCss,
  ".vekui-source-token--keyword",
  "Code block syntax token classes should be styled."
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

console.log("Code block rendering checks passed.")
