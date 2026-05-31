import * as React from "react"
import { describe, expect, it } from "vitest"

import inputOtpSource from "./input-otp.tsx?raw"
import { InputOTP, getOtpSlotState } from "./input-otp"

describe("InputOTP", () => {
  it("reports filled and empty slot state", () => {
    expect(getOtpSlotState("12", 0)).toBe("filled")
    expect(getOtpSlotState("12", 2)).toBe("empty")
    expect(getOtpSlotState(undefined, 0)).toBe("empty")
  })

  it("renders a fixed-length tokenized slot row", () => {
    const element = InputOTP({ value: "2026", length: 6 })
    const slots = React.Children.toArray(element.props.children) as React.ReactElement[]

    expect(element.props["data-length"]).toBe(6)
    expect(element.props.className).toContain("flex-row")
    expect(element.props.className).toContain("gap-1")
    expect(slots).toHaveLength(6)
    expect(slots[0]?.props["data-state"]).toBe("filled")
    expect(slots[4]?.props["data-state"]).toBe("empty")
    expect(slots[0]?.props.className).toContain("border-primary")
    expect(slots[4]?.props.className).toContain("border-input")
    expect(inputOtpSource).not.toContain("window")
    expect(inputOtpSource).not.toContain("document")
  })
})
