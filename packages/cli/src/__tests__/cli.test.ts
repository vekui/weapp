import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises"
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
      "../../lib/variants"
    )
    expect(await readFile(path.join(cwd, "src/components/ui/input.tsx"), "utf8")).toContain(
      "../../lib/variants"
    )
    expect(await readFile(path.join(cwd, "src/lib/variants.ts"), "utf8")).toContain("buttonVariants")
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
