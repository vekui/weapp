import { describe, expect, it } from "vitest"

import { InputGroup } from "./input-group"

describe("InputGroup", () => {
  it("exposes root and slot components with token classes", () => {
    expect(InputGroup.Root({}).props.className).toContain("border-input")
    expect(InputGroup.Addon({}).props.className).toContain("text-muted-foreground")
    expect(InputGroup.Control({}).props.className).toContain("flex-1")
    expect(InputGroup.Input).toBeTypeOf("function")
    expect(InputGroup.Input({}).props.className).toContain("border-0")
    expect(InputGroup.Input({}).props.className).toContain("bg-transparent")
  })
})
