import { mkdtemp, readFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { buildRegistry } from "../build"
import { buildRegistryIndex, resolveRegistryDependencies } from "../index"

describe("registry builder", () => {
  it("builds an index with v0 public components", () => {
    const index = buildRegistryIndex()

    expect(index.homepage).toBe("https://vekui.github.io/weapp")
    expect(index.items.map((item) => item.name)).toContain("button")
    expect(index.items.map((item) => item.name)).toContain("toast")
  })

  it("resolves registry dependencies before requested items", () => {
    const names = resolveRegistryDependencies(["dialog"]).map((item) => item.name)

    expect(names).toEqual(["styles", "utils", "variants", "button", "layer", "dialog"])
  })

  it("writes shadcn-compatible item json", async () => {
    const output = await mkdtemp(path.join(os.tmpdir(), "vekui-registry-"))

    await buildRegistry(output)
    const item = JSON.parse(await readFile(path.join(output, "button.json"), "utf8"))

    expect(item.type).toBe("registry:ui")
    expect(item.files[0].path).toBe("components/ui/button.tsx")
    expect(item.files[0].content).toContain("../../lib/variants")
  })
})
