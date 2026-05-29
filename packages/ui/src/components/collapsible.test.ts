import { describe, expect, it } from "vitest"

import source from "./collapsible.tsx?raw"
import { Collapsible, getCollapsibleState } from "./collapsible"

const forbiddenPatterns = ["win" + "dow", "docu" + "ment", "createPortal", "hover:", "translate-x-"]

describe("Collapsible", () => {
  it("maps open state to data-state values", () => {
    expect(getCollapsibleState(true)).toBe("open")
    expect(getCollapsibleState(false)).toBe("closed")
  })

  it("exposes a mini-program-safe disclosure API", () => {
    expect(Collapsible.Root).toBeTypeOf("function")
    expect(Collapsible.Trigger).toBeTypeOf("function")
    expect(Collapsible.Content).toBeTypeOf("function")

    expect(source).toContain("data-state")
    expect(source).toContain("min-h-[88rpx]")
    expect(source).toContain("text-foreground")
    expect(source).toContain("text-muted-foreground")

    for (const pattern of forbiddenPatterns) {
      expect(source).not.toContain(pattern)
    }
    expect(source).not.toContain(`React${"DOM"}`)
  })
})
