import { describe, expect, it } from "vitest"

import source from "./grid.tsx?raw"
import { getGridColumnClass, Grid, GridItem } from "./grid"

const forbiddenPatterns = ["win" + "dow", "docu" + "ment", "createPortal", "hover:", "translate-x-"]

describe("Grid", () => {
  it("uses fixed column classes for Tailwind extraction", () => {
    expect(getGridColumnClass(2)).toBe("grid-cols-2")
    expect(getGridColumnClass(3)).toBe("grid-cols-3")
    expect(getGridColumnClass(4)).toBe("grid-cols-4")
  })

  it("exposes tokenized mobile grid items", () => {
    expect(Grid).toBeTypeOf("function")
    expect(GridItem).toBeTypeOf("function")

    expect(source).toContain("grid")
    expect(source).toContain("gap-2")
    expect(source).toContain("bg-card")
    expect(source).toContain("border-border")
    expect(source).toContain("border-primary")
    expect(source).toContain("bg-secondary")
    expect(source).toContain("data-disabled")
    expect(source).toContain("min-h-[88rpx]")
    expect(source).not.toContain("bg-accent text-accent-foreground")

    for (const pattern of forbiddenPatterns) {
      expect(source).not.toContain(pattern)
    }
    expect(source).not.toContain(`React${"DOM"}`)
  })
})
