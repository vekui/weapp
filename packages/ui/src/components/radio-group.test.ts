import { describe, expect, it } from "vitest"

import source from "./radio-group.tsx?raw"
import { getRadioState, RadioGroup } from "./radio-group"

describe("RadioGroup", () => {
  it("marks matching values as checked", () => {
    expect(getRadioState("a", "a")).toBe("checked")
    expect(getRadioState("b", "a")).toBe("unchecked")
  })

  it("uses tokenized root and item classes", () => {
    expect(source).toContain("flex flex-col gap-2")
    expect(source).toContain("border-border")
    expect(source).toContain("data-state={state}")
    expect(RadioGroup.Root).toBeTypeOf("function")
    expect(RadioGroup.Item).toBeTypeOf("function")
  })
})
