import { describe, expect, it } from "vitest"

import { Kbd } from "./kbd"

describe("Kbd", () => {
  it("renders a tokenized keyboard hint with disabled state", () => {
    const element = Kbd({ disabled: true, children: "Ctrl+K" })

    expect(element.type).toBeDefined()
    expect(element.props.children).toBe("Ctrl+K")
    expect(element.props["data-disabled"]).toBe("")
    expect(element.props.className).toContain("border-border")
    expect(element.props.className).toContain("bg-muted")
    expect(element.props.className).toContain("text-muted-foreground")
    expect(element.props.className).toContain("font-mono")
  })
})
