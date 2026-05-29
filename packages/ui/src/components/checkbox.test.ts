import { describe, expect, it } from "vitest"

import source from "./checkbox.tsx?raw"
import { Checkbox } from "./checkbox"

const forbiddenPatterns = ["win" + "dow", "docu" + "ment", "React" + "DOM", "hover:"]

describe("Checkbox", () => {
  it("keeps checked state tokenized and icon based", () => {
    expect(Checkbox).toBeTypeOf("function")

    expect(source).toContain("data-state")
    expect(source).toContain("border-primary")
    expect(source).toContain("bg-primary")
    expect(source).toContain('name="check"')
    expect(source).not.toContain("✓")

    for (const pattern of forbiddenPatterns) {
      expect(source).not.toContain(pattern)
    }
  })
})
