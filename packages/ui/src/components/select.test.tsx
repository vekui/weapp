import * as React from "react"
import { create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./select.tsx?raw"
import { Select, SelectTrigger, getSelectLabel, type SelectOption } from "./select"
import { expectMiniProgramSafeSource, findByHostType, getClassName } from "../test/component-test-utils"

describe("Select", () => {
  const options: SelectOption[] = [
    { label: "Alpha", value: "a" },
    { label: "Beta", value: "b" },
    { label: "Gamma", value: "g" }
  ]

  it("maps value API to native selector state and selected label", () => {
    const onValueChange = vi.fn()
    const tree = create(<Select onValueChange={onValueChange} options={options} value="b" />)
    const element = findByHostType(tree.root, "Picker")

    expect(getSelectLabel(options, "b")).toBe("Beta")
    expect(getSelectLabel(options, undefined, "Choose one")).toBe("Choose one")
    expect(element.props["data-state"]).toBe("selected")
    expect(element.props.mode).toBe("selector")
    expect(element.props.range).toEqual(["Alpha", "Beta", "Gamma"])
    expect(element.props.value).toBe(1)

    element.props.onChange?.({ detail: { value: 2 } })
    expect(onValueChange).toHaveBeenCalledWith("g")
  })

  it("reflects placeholder, disabled, invalid, and tokenized trigger state", () => {
    const tree = create(<Select disabled invalid options={options} placeholder="Pick an option" />)
    const element = findByHostType(tree.root, "Picker")

    expect(element.props["data-state"]).toBe("placeholder")
    expect(element.props["data-disabled"]).toBe("true")
    expect(element.props["data-invalid"]).toBe("true")
    expect(element.props.disabled).toBe(true)
    expect(String(element.props.className)).toContain("opacity-50")
    expect(getClassName(SelectTrigger({ invalid: true }))).toContain("border-destructive")
    expect(getClassName(SelectTrigger({}))).toContain("border-input")
    expect(source).toContain("@tarojs/components")
    expectMiniProgramSafeSource(source)
  })
})
