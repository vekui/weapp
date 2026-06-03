import { describe, expect, it } from "vitest"

import { Textarea } from "./textarea"

describe("Textarea", () => {
  it("fills its container with stable mini-program sizing", () => {
    const element = Textarea({})

    expect(element.props.className).toContain("w-full")
    expect(element.props.className).toContain("box-border")
    expect(element.props.className).toContain("leading-[40rpx]")
  })

  it("keeps disabled textareas readable through muted tokens", () => {
    const element = Textarea({ disabled: true })

    expect(element.props["aria-disabled"]).toBe("true")
    expect(element.props["data-disabled"]).toBe("true")
    expect(element.props.className).toContain("bg-muted")
    expect(element.props.className).toContain("text-muted-foreground")
    expect(element.props.className).toContain("opacity-70")
  })
})
