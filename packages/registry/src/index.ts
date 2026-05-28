import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { registryItems, type RegistryItem } from "./manifest.js"
import {
  registryIndexSchema,
  registryItemSchema,
  type BuiltRegistryIndex,
  type BuiltRegistryItem
} from "./schema.js"

const registrySchemaUrl = "https://vekui.github.io/weapp/r/schema.json"
const repoRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)))

function transformContent(filePath: string, content: string) {
  if (filePath.startsWith("components/ui/")) {
    return content
      .replaceAll("../lib/cn", "../../lib/cn")
      .replaceAll("../lib/variants", "../../lib/variants")
      .replaceAll("../primitives/layer", "./layer")
  }

  return content
}

export function getRegistryItem(name: string): RegistryItem | undefined {
  return registryItems.find((item) => item.name === name)
}

export function getRegistryItemNames(): string[] {
  return registryItems.map((item) => item.name)
}

export function resolveRegistryDependencies(names: string[]): RegistryItem[] {
  const resolved = new Map<string, RegistryItem>()

  function visit(name: string) {
    if (resolved.has(name)) {
      return
    }

    const item = getRegistryItem(name)
    if (!item) {
      throw new Error(`Unknown registry item: ${name}`)
    }

    for (const dependency of item.registryDependencies ?? []) {
      visit(dependency)
    }

    resolved.set(name, item)
  }

  for (const name of names) {
    visit(name)
  }

  return [...resolved.values()]
}

export async function buildRegistryItem(item: RegistryItem): Promise<BuiltRegistryItem> {
  const files = await Promise.all(
    item.files.map(async (file) => {
      const content = await readFile(path.join(repoRoot, file.source), "utf8")
      return {
        content: transformContent(file.path, content),
        path: file.path,
        type: file.type
      }
    })
  )

  return registryItemSchema.parse({
    $schema: registrySchemaUrl,
    dependencies: item.dependencies,
    description: item.description,
    files,
    name: item.name,
    registryDependencies: item.registryDependencies,
    title: item.title,
    type: item.type
  })
}

export function buildRegistryIndex(): BuiltRegistryIndex {
  return registryIndexSchema.parse({
    $schema: registrySchemaUrl,
    homepage: "https://vekui.github.io/weapp",
    name: "vekui-weapp",
    items: registryItems.map((item) => ({
      description: item.description,
      name: item.name,
      registryDependencies: item.registryDependencies,
      title: item.title,
      type: item.type
    }))
  })
}
