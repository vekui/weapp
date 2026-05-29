import { describe, expect, it } from "vitest"

import source from "./toggle.tsx?raw"
import { getToggleState, Toggle } from "./toggle"

describe("Toggle", () => {
  it("reflects pressed and disabled states", () => {
    expect(getToggleState(true)).toBe("on")
    expect(getToggleState(false)).toBe("off")
    expect(source).toContain('data-disabled={disabled ? "" : undefined}')
    expect(source).toContain("bg-primary")
    expect(Toggle).toBeTypeOf("function")
  })
})
