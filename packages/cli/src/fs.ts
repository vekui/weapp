import { mkdir, readFile, stat, writeFile } from "node:fs/promises"
import path from "node:path"

export async function exists(filePath: string) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

export async function writeTextFile(filePath: string, content: string, force = false) {
  if (!force && (await exists(filePath))) {
    throw new Error(`Refusing to overwrite existing file: ${filePath}`)
  }

  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, content)
}

export async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  if (!(await exists(filePath))) {
    return fallback
  }

  return JSON.parse(await readFile(filePath, "utf8")) as T
}

export async function writeJsonFile(filePath: string, value: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`)
}
