import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const docsRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)))
const componentPage = await readFile(
  path.join(docsRoot, "app/components/components-page-client.tsx"),
  "utf8"
)
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

console.log("Code block rendering checks passed.")
