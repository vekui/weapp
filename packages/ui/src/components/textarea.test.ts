import { describe, expect, it } from "vitest"

import { Textarea } from "./textarea"

describe("Textarea", () => {
  it("fills its container with stable mini-program sizing", () => {
    const element = Textarea({})

    expect(element.props.className).toContain("w-full")
    expect(element.props.className).toContain("box-border")
    expect(element.props.className).toContain("leading-[40rpx]")
  })
})
