import { describe, expect, it } from "vitest"

import { Countdown, formatCountdown } from "./countdown"

describe("Countdown", () => {
  it("formats non-negative time and exposes data seconds", () => {
    expect(formatCountdown(3661)).toBe("01:01:01")
    expect(formatCountdown(-1)).toBe("00:00:00")

    const element = Countdown({ seconds: 90 })

    expect(element.props["data-seconds"]).toBe(90)
    expect(element.props.children).toBe("00:01:30")
    expect(element.props.className).toContain("tabular-nums")
    expect(element.props.className).toContain("text-foreground")
  })
})
