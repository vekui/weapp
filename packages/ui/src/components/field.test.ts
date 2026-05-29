import { describe, expect, it } from "vitest"

import { Field } from "./field"

describe("Field", () => {
  it("reflects invalid and disabled state on the root", () => {
    const root = Field.Root({ invalid: true, disabled: true })

    expect(root.props["data-invalid"]).toBe("true")
    expect(root.props["data-disabled"]).toBe("true")
    expect(root.props.className).toContain("gap-2")
  })

  it("uses token classes for description and error text", () => {
    expect(Field.Description({}).props.className).toContain("text-muted-foreground")
    expect(Field.Error({}).props.className).toContain("text-destructive")
  })
})
