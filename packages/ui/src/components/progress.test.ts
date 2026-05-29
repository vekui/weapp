import { describe, expect, it } from "vitest"

import { Progress } from "./progress"

describe("Progress", () => {
  it("clamps values and exposes progress state", () => {
    const element = Progress({ value: 140 })
    const indicator = element.props.children

    expect(element.props["data-value"]).toBe(100)
    expect(element.props.className).toContain("bg-muted")
    expect(indicator.props.style.width).toBe("100%")
  })
})
