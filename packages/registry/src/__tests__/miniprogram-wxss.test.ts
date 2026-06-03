import { mkdtemp, readFile, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { describe, expect, it } from "vitest"

const repoRoot = path.resolve(new URL("../../../../", import.meta.url).pathname)
const normalizerUrl = pathToFileURL(
  path.join(repoRoot, "scripts/normalize-miniprogram-wxss-imports.mjs")
).href

describe("miniprogram wxss build output", () => {
  it("normalizes app-origin imports to explicit relative wxss paths", async () => {
    const distRoot = await mkdtemp(path.join(os.tmpdir(), "vekui-miniprogram-dist-"))
    const appWxssPath = path.join(distRoot, "app.wxss")

    await writeFile(appWxssPath, '@import "app-origin.wxss";\n', "utf8")
    await writeFile(path.join(distRoot, "app-origin.wxss"), "page { color: red; }\n", "utf8")

    const { normalizeMiniprogramWxssImports } = await import(normalizerUrl)
    await normalizeMiniprogramWxssImports(distRoot)

    await expect(readFile(appWxssPath, "utf8")).resolves.toBe(
      '@import "./app-origin.wxss";\n'
    )
  })

  it("fails when app wxss imports a missing origin file", async () => {
    const distRoot = await mkdtemp(path.join(os.tmpdir(), "vekui-miniprogram-dist-"))

    await writeFile(path.join(distRoot, "app.wxss"), '@import "app-origin.wxss";\n', "utf8")

    const { normalizeMiniprogramWxssImports } = await import(normalizerUrl)

    await expect(normalizeMiniprogramWxssImports(distRoot)).rejects.toThrow(
      "app-origin.wxss"
    )
  })
})
