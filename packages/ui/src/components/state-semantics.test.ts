import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

const sourceRoots = ["components", "lib", "primitives"].map((directory) =>
  path.join(process.cwd(), "src", directory)
)

type SourceFile = {
  filePath: string
  source: string
}

function collectSourceFiles(directory: string): SourceFile[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name)

    if (entry.isDirectory()) return collectSourceFiles(filePath)
    if (!/\.(ts|tsx)$/.test(entry.name)) return []
    if (/\.(test|spec)\.(ts|tsx)$/.test(entry.name)) return []

    return [{ filePath, source: readFileSync(filePath, "utf8") }]
  })
}

const sourceFiles = sourceRoots.flatMap(collectSourceFiles)
const lowContrastOpacityClass = "opacity-" + "50"

function relativeFileList(files: SourceFile[]) {
  return files.map((file) => path.relative(process.cwd(), file.filePath))
}

describe("state semantics", () => {
  it("uses true-valued disabled state hooks so Tailwind data selectors match", () => {
    const offenders = sourceFiles.filter((file) =>
      /data-disabled=\{[^\n}]+\?\s*""/.test(file.source)
    )

    expect(relativeFileList(offenders)).toEqual([])
  })

  it("keeps disabled and loading states readable across themes", () => {
    const offenders = sourceFiles.filter((file) => file.source.includes(lowContrastOpacityClass))

    expect(relativeFileList(offenders)).toEqual([])
  })

  it("keeps shared control loading state more visible than disabled state", () => {
    const variantsSource = sourceFiles.find((file) => file.filePath.endsWith("lib/variants.ts"))?.source ?? ""

    expect(variantsSource).toContain("data-[disabled=true]:opacity-70")
    expect(variantsSource).toContain("data-[loading=true]:opacity-90")
  })
})
