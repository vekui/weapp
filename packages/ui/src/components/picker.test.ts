import { describe, expect, it } from "vitest"

import source from "./picker.tsx?raw"
import { Picker, PickerTrigger, getPickerLabel } from "./picker"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("Picker", () => {
  it("maps selected value to native selector state and range", () => {
    const options = [
      { label: "Alpha", value: "a" },
      { label: "Beta", value: "b" }
    ]
    const element = Picker({ options, value: "b" })

    expect(getPickerLabel(options, "b")).toBe("Beta")
    expect(getPickerLabel(options, undefined, "Choose")).toBe("Choose")
    expect(getProps(element)["data-state"]).toBe("selected")
    expect(getProps(element).mode).toBe("selector")
    expect(getProps(element).range).toEqual(["Alpha", "Beta"])
    expect(getProps(element).value).toBe(1)
  })

  it("uses tokenized trigger and Taro Picker safely", () => {
    expect(getClassName(PickerTrigger({}))).toContain("border-input")
    expect(getClassName(PickerTrigger({}))).toContain("bg-background")
    expect(source).toContain("@tarojs/components")
    expectMiniProgramSafeSource(source)
  })
})
