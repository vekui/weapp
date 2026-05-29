import { readFile, stat } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const publicComponents = [
  "button",
  "card",
  "badge",
  "field",
  "input",
  "textarea",
  "checkbox",
  "radio-group",
  "switch",
  "tabs",
  "dialog",
  "toast"
]

async function exists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

const problems = []
const index = await readFile(path.join(root, "packages/ui/src/components/index.ts"), "utf8")
const manifest = await readFile(path.join(root, "packages/registry/src/manifest.ts"), "utf8")
const tests = await readFile(path.join(root, "packages/ui/src/components/components.test.tsx"), "utf8")
const docsComponentsPage = await readFile(path.join(root, "apps/docs/app/components/page.tsx"), "utf8")
const docsComponentsClient = await readFile(
  path.join(root, "apps/docs/app/components/components-page-client.tsx"),
  "utf8"
)

for (const name of publicComponents) {
  const file = path.join(root, "packages/ui/src/components", `${name}.tsx`)
  if (!(await exists(file))) {
    problems.push(`Missing component file: packages/ui/src/components/${name}.tsx`)
  }
  if (!index.includes(`"./${name}"`)) {
    problems.push(`Missing component export: ${name}`)
  }
  if (!manifest.includes(`name: "${name}"`)) {
    problems.push(`Missing registry item: ${name}`)
  }
}

for (const contract of [
  "data-state",
  "data-disabled",
  "data-invalid",
  "data-loading",
  "bg-background",
  "text-foreground",
  "border-border"
]) {
  if (!tests.includes(contract)) {
    problems.push(`Missing contract test evidence: ${contract}`)
  }
}

for (const file of [
  "apps/docs/app/components/catalog.ts",
  "apps/docs/app/components/components-page-client.tsx"
]) {
  if (!(await exists(path.join(root, file)))) {
    problems.push(`Missing docs component page module: ${file}`)
  }
}

if (docsComponentsPage.includes("href={`#${component.slug}`}")) {
  problems.push("Components docs must use tab-like content switching instead of component hash anchors.")
}

for (const evidence of ["readFile", "componentSources", "getComponentSourceMap"]) {
  if (!docsComponentsPage.includes(evidence)) {
    problems.push(`Components docs page must load source code evidence: ${evidence}`)
  }
}

for (const evidence of ["SourceCodeBlock", "Copy and paste the following code into your project.", "Manual"]) {
  if (!docsComponentsClient.includes(evidence)) {
    problems.push(`Components detail panel must expose shadcn-like source display: ${evidence}`)
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"))
  process.exit(1)
}

console.log("UI component coverage passed.")
