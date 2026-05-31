import { describe, expect, it } from "vitest"

import source from "./picker-view.tsx?raw"
import { PickerView } from "./picker-view"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("PickerView", () => {
  it("renders native picker-view slots with state and token classes", () => {
    expect(getProps(PickerView.Root({ value: [0] }))["data-state"]).toBe("default")
    expect(getClassName(PickerView.Root({ value: [0] }))).toContain("bg-card")
    expect(getClassName(PickerView.Column({}))).toContain("text-foreground")
    expect(getProps(PickerView.Option({ children: "One" }))["data-state"]).toBe("option")
    expect(getClassName(PickerView.Option({ children: "One" }))).toContain("h-[88rpx]")
  })

  it("keeps source tied to Taro picker view primitives", () => {
    expect(source).toContain("PickerViewColumn")
    expectMiniProgramSafeSource(source)
  })
})
