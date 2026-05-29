import { mkdtemp, readFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { buildRegistry } from "../build"
import { buildRegistryIndex, resolveRegistryDependencies } from "../index"
import { registryItems } from "../manifest"

const repoRoot = path.resolve(fileURLToPath(new URL("../../../../", import.meta.url)))

function buildSourceOwnerMap() {
  const owners = new Map<string, string>()

  for (const item of registryItems) {
    for (const file of item.files) {
      owners.set(path.normalize(file.source), item.name)
    }
  }

  return owners
}

function resolveLocalSourceImport(
  owners: Map<string, string>,
  sourcePath: string,
  specifier: string
) {
  if (!specifier.startsWith(".")) {
    return undefined
  }

  const normalized = path.normalize(path.join(path.dirname(sourcePath), specifier))
  const candidates = [
    normalized,
    `${normalized}.ts`,
    `${normalized}.tsx`,
    `${normalized}.css`,
    path.join(normalized, "index.ts"),
    path.join(normalized, "index.tsx")
  ]

  return candidates.find((candidate) => owners.has(candidate))
}

function getLocalImportSpecifiers(source: string) {
  return [
    ...source.matchAll(/\bfrom\s+["']([^"']+)["']/g),
    ...source.matchAll(/\bimport\s+["']([^"']+)["']/g)
  ].flatMap((match) => (match[1] ? [match[1]] : []))
}

describe("registry builder", () => {
  it("builds an index with v0 public components", () => {
    const index = buildRegistryIndex()

    expect(index.homepage).toBe("https://vekui.github.io/weapp")
    expect(index.items.map((item) => item.name)).toContain("button")
    expect(index.items.map((item) => item.name)).toContain("toast")
  })

  it("resolves registry dependencies before requested items", () => {
    const names = resolveRegistryDependencies(["dialog"]).map((item) => item.name)

    expect(names).toEqual(["styles", "utils", "button", "primitives", "layer", "state", "dialog"])
  })

  it("resolves sibling component dependencies for source installs", () => {
    expect(resolveRegistryDependencies(["checkbox"]).map((item) => item.name)).toContain("icon")
    expect(resolveRegistryDependencies(["activity-indicator"]).map((item) => item.name)).toContain(
      "spinner"
    )
    expect(resolveRegistryDependencies(["curtain"]).map((item) => item.name)).toContain("layer")
    expect(resolveRegistryDependencies(["drawer"]).map((item) => item.name)).toContain("sheet")
    expect(resolveRegistryDependencies(["pagination"]).map((item) => item.name)).toContain(
      "button"
    )
  })

  it("keeps registry dependencies aligned with local source imports", async () => {
    const owners = buildSourceOwnerMap()
    const problems: string[] = []

    for (const item of registryItems) {
      const resolved = new Set(resolveRegistryDependencies([item.name]).map((entry) => entry.name))

      for (const file of item.files) {
        const source = await readFile(path.join(repoRoot, file.source), "utf8")
        const importOwners = getLocalImportSpecifiers(source)
          .map((specifier) => resolveLocalSourceImport(owners, file.source, specifier))
          .filter((sourcePath): sourcePath is string => Boolean(sourcePath))
          .map((sourcePath) => owners.get(sourcePath))

        for (const owner of importOwners) {
          if (owner && owner !== item.name && !resolved.has(owner)) {
            problems.push(`${item.name} imports ${owner} through ${file.source}`)
          }
        }
      }
    }

    expect(problems).toEqual([])
  })

  it("writes shadcn-compatible item json", async () => {
    const output = await mkdtemp(path.join(os.tmpdir(), "vekui-registry-"))

    await buildRegistry(output)
    const item = JSON.parse(await readFile(path.join(output, "button.json"), "utf8"))

    expect(item.type).toBe("registry:ui")
    expect(item.files[0].path).toBe("components/ui/button.tsx")
    expect(item.files[0].content).toContain("./button-variants")
    expect(item.files.map((file: { path: string }) => file.path)).toContain(
      "components/ui/button-variants.ts"
    )
  })
})
