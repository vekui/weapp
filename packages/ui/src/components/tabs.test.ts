import { describe, expect, it } from "vitest"

import source from "./tabs.tsx?raw"
import { Tabs } from "./tabs"
import { getTabsState } from "./tabs-state"

describe("getTabsState", () => {
  it("marks matching values as active and others as inactive", () => {
    expect(getTabsState("overview", "overview")).toBe("active")
    expect(getTabsState("details", "overview")).toBe("inactive")
  })
})

describe("Tabs", () => {
  it("uses a stable mini-program segmented-control layout for the tab list", () => {
    const element = Tabs.List({})

    expect(element.props.className).toContain("min-h-[80rpx]")
    expect(element.props.className).toContain("items-center")
    expect(element.props.className).toContain("overflow-hidden")
  })

  it("insets trigger corners from the list radius so the muted background is even", () => {
    expect(source).toContain("rounded-[var(--radius)] bg-muted p-[6rpx]")
    expect(source).toContain("rounded-[calc(var(--radius)-6rpx)]")
  })
})
