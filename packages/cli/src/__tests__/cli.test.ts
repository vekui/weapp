import { mkdir, mkdtemp, readdir, readFile, stat, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { buildRegistry } from "../../../registry/src/build"
import { runCli } from "../index"

async function fixture() {
  const cwd = await mkdtemp(path.join(os.tmpdir(), "vekui-cli-"))
  const registryDir = await mkdtemp(path.join(os.tmpdir(), "vekui-registry-"))
  await buildRegistry(registryDir)
  process.env.VEKUI_REGISTRY_DIR = registryDir
  await writeFile(
    path.join(cwd, "package.json"),
    `${JSON.stringify(
      {
        name: "fixture",
        dependencies: {
          "@tarojs/components": "4.2.0",
          "@tarojs/taro": "4.2.0",
          react: "18.3.1"
        }
      },
      null,
      2
    )}\n`
  )
  return cwd
}

async function exists(filePath: string) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

async function collectSourceFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return collectSourceFiles(entryPath)
      }
      if (/\.(ts|tsx|css)$/.test(entry.name)) {
        return [entryPath]
      }
      return []
    })
  )

  return files.flat()
}

function getLocalImportSpecifiers(source: string) {
  return [
    ...source.matchAll(/\bfrom\s+["']([^"']+)["']/g),
    ...source.matchAll(/\bimport\s+["']([^"']+)["']/g)
  ].flatMap((match) => (match[1]?.startsWith(".") ? [match[1]] : []))
}

async function resolvesLocalImport(sourceFile: string, specifier: string) {
  const normalized = path.join(path.dirname(sourceFile), specifier)
  const candidates = [
    normalized,
    `${normalized}.ts`,
    `${normalized}.tsx`,
    `${normalized}.css`,
    path.join(normalized, "index.ts"),
    path.join(normalized, "index.tsx")
  ]

  for (const candidate of candidates) {
    if (await exists(candidate)) {
      return true
    }
  }

  return false
}

describe("vekui CLI", () => {
  it("initializes config, utility, styles, and dependencies", async () => {
    const cwd = await fixture()
    const output: string[] = []

    const code = await runCli(["init", "--cwd", cwd, "--yes"], { stdout: (line) => output.push(line) })

    expect(code).toBe(0)
    expect(output.join("\n")).toContain("Initialized")
    expect(await readFile(path.join(cwd, "vekui.json"), "utf8")).toContain("aliases")
    expect(await readFile(path.join(cwd, "src/lib/cn.ts"), "utf8")).toContain("twMerge")
    expect(await readFile(path.join(cwd, "src/styles/vekui.css"), "utf8")).toContain("--color-primary")
  })

  it("adds components and resolves registry dependencies", async () => {
    const cwd = await fixture()

    await runCli(["init", "--cwd", cwd, "--yes"], { stdout: () => undefined })
    const code = await runCli(["add", "button", "input", "--cwd", cwd, "--yes"], {
      stdout: () => undefined
    })

    expect(code).toBe(0)
    expect(await readFile(path.join(cwd, "src/components/ui/button.tsx"), "utf8")).toContain(
      "./button-variants"
    )
    expect(await readFile(path.join(cwd, "src/components/ui/input.tsx"), "utf8")).toContain(
      "./primitives"
    )
    expect(await readFile(path.join(cwd, "src/components/ui/button-variants.ts"), "utf8")).toContain(
      "buttonVariants"
    )
    expect(await readFile(path.join(cwd, "src/components/ui/primitives/input-base.tsx"), "utf8")).toContain(
      "InputBase"
    )
  })

  it("adds every registry item without dangling local imports", async () => {
    const cwd = await fixture()
    const output: string[] = []

    await runCli(["init", "--cwd", cwd, "--yes"], { stdout: () => undefined })
    await runCli(["list"], { stdout: (line) => output.push(line) })

    const names = output.map((line) => line.replace(/^- /, ""))
    const code = await runCli(["add", ...names, "--cwd", cwd, "--yes"], {
      stdout: () => undefined
    })
    const sourceFiles = await collectSourceFiles(path.join(cwd, "src"))
    const danglingImports: string[] = []

    for (const file of sourceFiles) {
      const source = await readFile(file, "utf8")
      for (const specifier of getLocalImportSpecifiers(source)) {
        if (!(await resolvesLocalImport(file, specifier))) {
          danglingImports.push(`${path.relative(cwd, file)} -> ${specifier}`)
        }
      }
    }

    expect(code).toBe(0)
    expect(danglingImports).toEqual([])
  })

  it("lists registry items", async () => {
    const output: string[] = []

    const code = await runCli(["list"], { stdout: (line) => output.push(line) })

    expect(code).toBe(0)
    expect(output.join("\n")).toContain("- button")
    expect(output.join("\n")).toContain("- toast")
  })

  it("doctor catches forbidden tokens", async () => {
    const cwd = await fixture()
    const errors: string[] = []

    await runCli(["init", "--cwd", cwd, "--yes"], { stdout: () => undefined })
    await mkdir(path.join(cwd, "src/components/ui"), { recursive: true })
    await writeFile(path.join(cwd, "src/components/ui/bad.tsx"), "window.document\n")

    const code = await runCli(["doctor", "--cwd", cwd], { stderr: (line) => errors.push(line) })

    expect(code).toBe(1)
    expect(errors.join("\n")).toContain("Forbidden token")
  })
})
