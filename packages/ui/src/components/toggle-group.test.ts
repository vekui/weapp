import { describe, expect, it } from "vitest"

import source from "./toggle-group.tsx?raw"
import { getToggleGroupState, ToggleGroup } from "./toggle-group"

describe("ToggleGroup", () => {
  it("marks selected values as on", () => {
    expect(getToggleGroupState("a", "a")).toBe("on")
    expect(getToggleGroupState("b", "a")).toBe("off")
  })

  it("uses a mini-program-safe grouped layout", () => {
    expect(source).toContain("flex-row")
    expect(source).toContain("border-border")
    expect(source).toContain("data-state={state}")
    expect(ToggleGroup.Root).toBeTypeOf("function")
    expect(ToggleGroup.Item).toBeTypeOf("function")
  })
})
