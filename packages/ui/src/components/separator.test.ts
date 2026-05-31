import { describe, expect, it } from "vitest"

import source from "./separator.tsx?raw"
import { Separator } from "./separator"
import { expectMiniProgramSafeSource, getClassName } from "../test/component-test-utils"

describe("Separator", () => {
  it("maps orientation API to stable token classes", () => {
    expect(getClassName(Separator({}))).toContain("bg-border")
    expect(getClassName(Separator({}))).toContain("h-px")
    expect(getClassName(Separator({ orientation: "vertical" }))).toContain("h-full")
    expect(getClassName(Separator({ orientation: "vertical" }))).toContain("w-px")
  })

  it("keeps source free of unsafe spacing utilities", () => {
    expectMiniProgramSafeSource(source)
  })
})
