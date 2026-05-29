import { describe, expect, it } from "vitest"

import source from "./list.tsx?raw"
import { getListItemState, List, ListItem } from "./list"

const forbiddenPatterns = ["win" + "dow", "docu" + "ment", "createPortal", "hover:", "translate-x-"]

describe("List", () => {
  it("maps selected and disabled row states", () => {
    expect(getListItemState({})).toBe("default")
    expect(getListItemState({ selected: true })).toBe("selected")
    expect(getListItemState({ disabled: true, selected: true })).toBe("disabled")
  })

  it("exposes tokenized mobile list rows", () => {
    expect(List).toBeTypeOf("function")
    expect(ListItem).toBeTypeOf("function")

    expect(source).toContain("min-h-[88rpx]")
    expect(source).toContain("border-border")
    expect(source).toContain("bg-card")
    expect(source).toContain("bg-secondary")
    expect(source).toContain("text-foreground")
    expect(source).toContain("data-state")
    expect(source).toContain("data-disabled")
    expect(source).not.toContain("bg-accent text-accent-foreground")

    for (const pattern of forbiddenPatterns) {
      expect(source).not.toContain(pattern)
    }
    expect(source).not.toContain(`React${"DOM"}`)
  })
})
