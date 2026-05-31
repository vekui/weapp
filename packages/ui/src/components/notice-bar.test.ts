import { describe, expect, it } from "vitest"

import source from "./notice-bar.tsx?raw"
import { NoticeBar } from "./notice-bar"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("NoticeBar", () => {
  it("maps variants to data-state and semantic token classes", () => {
    const element = NoticeBar({ variant: "warning", text: "Heads up" })

    expect(getProps(element)["data-state"]).toBe("warning")
    expect(getClassName(element)).toContain("bg-accent")
    expect(getClassName(element)).toContain("text-accent-foreground")
  })

  it("keeps notice source mini-program safe", () => {
    expect(source).toContain("min-h-[72rpx]")
    expectMiniProgramSafeSource(source)
  })
})
