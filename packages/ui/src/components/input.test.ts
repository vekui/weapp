import { describe, expect, it } from "vitest"

import source from "./input.tsx?raw"
import { Input } from "./input"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("Input", () => {
  it("maps disabled and invalid API to data attributes and token classes", () => {
    const element = Input({ disabled: true, invalid: true, value: "Ada" })

    expect(getProps(element)["data-disabled"]).toBe("true")
    expect(getProps(element)["data-invalid"]).toBe("true")
    expect(getProps(element).disabled).toBe(true)
    expect(getClassName(element)).toContain("border-destructive")
    expect(getClassName(element)).toContain("bg-background")
    expect(getClassName(Input({}))).toContain("border-input")
  })

  it("uses the Taro input primitive without browser APIs", () => {
    expect(source).toContain("InputBase")
    expect(source).toContain("data-invalid")
    expectMiniProgramSafeSource(source)
  })
})
