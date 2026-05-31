import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const docsRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)))
const repoRoot = path.resolve(docsRoot, "../..")
const manifest = await readFile(path.join(repoRoot, "packages/registry/src/manifest.ts"), "utf8")
const catalog = await readFile(path.join(docsRoot, "app/components/catalog.ts"), "utf8")
const homePage = await readFile(path.join(docsRoot, "app/page.tsx"), "utf8")
const componentsPage = await readFile(
  path.join(docsRoot, "app/components/components-page-client.tsx"),
  "utf8"
)

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function parseRegistryComponentNames(source) {
  const block = source.match(/const registryComponentNames = \[([\s\S]*?)\] as const/)?.[1] ?? ""
  return [...block.matchAll(/"([^"]+)"/g)].map((match) => match[1])
}

function parseManualRegistryItemNames(source) {
  const block = source.match(/export const registryItems: RegistryItem\[] = \[([\s\S]*?)\n  \.\.\.registryComponentNames/)?.[1] ?? ""
  return [...block.matchAll(/\n\s+name: "([^"]+)"/g)].map((match) => match[1])
}

function parseShadcnSlugs(source) {
  const block = source.match(/const shadcnComponentOrder = \[([\s\S]*?)\] as const/)?.[1] ?? ""
  return [...block.matchAll(/\["[^"]+", "([^"]+)"\]/g)].map((match) => match[1])
}

const registryComponents = parseRegistryComponentNames(manifest)
const manualRegistryItems = parseManualRegistryItemNames(manifest)
const shadcnSlugs = parseShadcnSlugs(catalog)
const registryComponentSet = new Set(registryComponents)
const planned = shadcnSlugs.filter((slug) => !registryComponentSet.has(slug))
const registryItems = registryComponents.length + manualRegistryItems.length

assert(registryComponents.length > 0, "Could not parse registry component names.")
assert(manualRegistryItems.length > 0, "Could not parse manual registry items.")
assert(shadcnSlugs.length > 0, "Could not parse shadcn component order.")
assert(
  catalog.includes("registryUiComponents: publicComponentNames.length"),
  "Docs catalog stats must derive UI component count from publicComponentNames."
)
assert(
  catalog.includes("registryItems: registryItems.length"),
  "Docs catalog stats must derive registry item count from registryItems."
)
assert(
  catalog.includes("const registryOnlyComponentItems = publicComponentNames"),
  "Docs catalog must append registry-only components outside the shadcn order."
)
assert(
  catalog.includes("publicComponentNameSet.has(slug)"),
  "Docs catalog must mark shadcn entries available from registry component names."
)

for (const source of [catalog, homePage, componentsPage]) {
  assert(!source.includes("12 个基础组件"), "Docs must not contain stale 12-component copy.")
  assert(!source.includes("12 个 v0 组件"), "Docs must not contain stale 12-component roadmap copy.")
}

assert(
  registryComponentSet.has("date-picker"),
  "Date Picker must be published through the registry component list."
)
assert(
  planned.includes("date-picker") === false,
  "Date Picker must not remain a planned docs catalog item."
)

console.log(
  `Catalog checks passed for ${registryComponents.length} UI components, ${registryItems} registry items, and ${planned.length} planned items.`
)
