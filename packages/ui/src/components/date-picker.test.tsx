import * as React from "react"
import { create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./date-picker.tsx?raw"
import { DatePicker, DatePickerTrigger, getDatePickerLabel } from "./date-picker"
import { expectMiniProgramSafeSource, findByHostType, getClassName } from "../test/component-test-utils"

describe("DatePicker", () => {
  it("maps value API to native date picker state and label", () => {
    const onValueChange = vi.fn()
    const tree = create(
      <DatePicker
        max="2026-12-31"
        min="2026-01-01"
        onValueChange={onValueChange}
        value="2026-05-31"
      />
    )
    const element = findByHostType(tree.root, "Picker")

    expect(getDatePickerLabel("2026-05-31")).toBe("2026-05-31")
    expect(getDatePickerLabel(undefined, "Choose date")).toBe("Choose date")
    expect(element.props["data-state"]).toBe("selected")
    expect(element.props.mode).toBe("date")
    expect(element.props.value).toBe("2026-05-31")
    expect(element.props.start).toBe("2026-01-01")
    expect(element.props.end).toBe("2026-12-31")

    element.props.onChange?.({ detail: { value: "2026-06-01" } })
    expect(onValueChange).toHaveBeenCalledWith("2026-06-01")
  })

  it("reflects placeholder, disabled, invalid, and tokenized trigger state", () => {
    const tree = create(<DatePicker disabled invalid placeholder="Pick a day" />)
    const element = findByHostType(tree.root, "Picker")

    expect(element.props["data-state"]).toBe("placeholder")
    expect(element.props["data-disabled"]).toBe("true")
    expect(element.props["data-invalid"]).toBe("true")
    expect(element.props.disabled).toBe(true)
    expect(element.props["aria-disabled"]).toBe("true")
    expect(String(element.props.className)).toContain("opacity-70")
    expect(getClassName(DatePickerTrigger({ disabled: true, invalid: true }))).toContain("bg-muted")
    expect(DatePickerTrigger({ disabled: true }).props["data-disabled"]).toBe("true")
    expect(getClassName(DatePickerTrigger({}))).toContain("border-input")
    expect(source).toContain("@tarojs/components")
    expectMiniProgramSafeSource(source)
  })
})
