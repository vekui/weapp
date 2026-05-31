import { describe, expect, it } from "vitest"

import source from "./typography.tsx?raw"
import { Typography } from "./typography"
import { expectMiniProgramSafeSource, getClassName } from "../test/component-test-utils"

describe("Typography", () => {
  it("exposes semantic text scale slots", () => {
    expect(getClassName(Typography.H1({}))).toContain("text-2xl")
    expect(getClassName(Typography.H1({}))).toContain("text-foreground")
    expect(getClassName(Typography.H2({}))).toContain("leading-[56rpx]")
    expect(getClassName(Typography.H3({}))).toContain("font-medium")
    expect(getClassName(Typography.P({}))).toContain("text-base")
    expect(getClassName(Typography.Muted({}))).toContain("text-muted-foreground")
  })

  it("keeps text source mini-program safe", () => {
    expectMiniProgramSafeSource(source)
  })
})
