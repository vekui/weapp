import { describe, expect, it } from "vitest"

import source from "./nav-bar.tsx?raw"
import { NavBar, NavBarTitle } from "./nav-bar"
import { expectMiniProgramSafeSource, getClassName } from "../test/component-test-utils"

describe("NavBar", () => {
  it("renders tokenized navigation shell and title slot", () => {
    const element = NavBar({ title: "Home" })

    expect(getClassName(element)).toContain("min-h-[88rpx]")
    expect(getClassName(element)).toContain("border-border")
    expect(getClassName(element)).toContain("bg-card")
    expect(String(NavBarTitle({}).props.className)).toContain("text-foreground")
  })

  it("keeps source mini-program safe", () => {
    expect(source).toContain("min-w-[88rpx]")
    expectMiniProgramSafeSource(source)
  })
})
