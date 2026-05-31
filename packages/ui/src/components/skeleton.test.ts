import { describe, expect, it } from "vitest"

import source from "./skeleton.tsx?raw"
import { Skeleton } from "./skeleton"
import { expectMiniProgramSafeSource, getClassName } from "../test/component-test-utils"

describe("Skeleton", () => {
  it("renders a tokenized loading placeholder shell", () => {
    expect(getClassName(Skeleton({}))).toContain("rounded-md")
    expect(getClassName(Skeleton({}))).toContain("bg-muted")
    expect(getClassName(Skeleton({}))).toContain("opacity-70")
  })

  it("keeps placeholder source mini-program safe", () => {
    expectMiniProgramSafeSource(source)
  })
})
