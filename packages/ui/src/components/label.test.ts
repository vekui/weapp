import { describe, expect, it } from "vitest"

import { Label } from "./label"

describe("Label", () => {
  it("supports required and disabled state attributes", () => {
    const element = Label({ required: true, disabled: true, children: "Name" })

    expect(element.props["data-required"]).toBe("")
    expect(element.props["data-disabled"]).toBe("")
    expect(element.props.className).toContain("text-muted-foreground")
  })

  it("uses foreground text by default", () => {
    const element = Label({ children: "Name" })

    expect(element.props.className).toContain("text-foreground")
  })
})
