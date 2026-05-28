import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { exists } from "./fs.js"

export type RegistryFile = {
  content: string
  path: string
  type: "registry:component" | "registry:lib" | "registry:style"
}

export type RegistryItem = {
  dependencies?: Record<string, string>
  description: string
  files: RegistryFile[]
  name: string
  registryDependencies?: string[]
  title: string
  type: "registry:ui" | "registry:lib" | "registry:style"
}

type RegistryIndex = {
  items: Array<{
    description: string
    name: string
    registryDependencies?: string[]
    title: string
    type: "registry:ui" | "registry:lib" | "registry:style"
  }>
}

const repoRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)))
const defaultLocalRegistry = path.join(repoRoot, "apps/docs/public/r")
const defaultRegistryUrl = "https://vekui.github.io/weapp/r"

async function readJson<T>(name: string): Promise<T> {
  const localDir = process.env.VEKUI_REGISTRY_DIR ?? defaultLocalRegistry
  const localFile = path.join(localDir, `${name}.json`)

  if (await exists(localFile)) {
    return JSON.parse(await readFile(localFile, "utf8")) as T
  }

  const baseUrl = process.env.VEKUI_REGISTRY_URL ?? defaultRegistryUrl
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/${name}.json`)
  if (!response.ok) {
    throw new Error(`Failed to fetch registry item ${name}: ${response.status}`)
  }

  return (await response.json()) as T
}

export async function listRegistryItems() {
  const index = await readJson<RegistryIndex>("index")
  return index.items.map((item) => item.name)
}

export async function resolveRegistryItems(names: string[]) {
  const resolved = new Map<string, RegistryItem>()

  async function visit(name: string) {
    if (resolved.has(name)) {
      return
    }

    const item = await readJson<RegistryItem>(name)
    for (const dependency of item.registryDependencies ?? []) {
      await visit(dependency)
    }
    resolved.set(name, item)
  }

  for (const name of names) {
    await visit(name)
  }

  return [...resolved.values()]
}
