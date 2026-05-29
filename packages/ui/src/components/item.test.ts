import { describe, expect, it } from "vitest"

import source from "./item.tsx?raw"
import {
  getItemState,
  Item,
  ItemActions,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from "./item"

const forbiddenPatterns = ["win" + "dow", "docu" + "ment", "createPortal", "hover:", "translate-x-"]

describe("Item", () => {
  it("maps selected and disabled item states", () => {
    expect(getItemState({})).toBe("default")
    expect(getItemState({ selected: true })).toBe("selected")
    expect(getItemState({ disabled: true, selected: true })).toBe("disabled")
  })

  it("exposes dense tokenized item slots", () => {
    expect(Item).toBeTypeOf("function")
    expect(ItemGroup).toBeTypeOf("function")
    expect(ItemTitle).toBeTypeOf("function")
    expect(ItemDescription).toBeTypeOf("function")
    expect(ItemMedia).toBeTypeOf("function")
    expect(ItemActions).toBeTypeOf("function")

    expect(source).toContain("data-state")
    expect(source).toContain("data-disabled")
    expect(source).toContain("bg-card")
    expect(source).toContain("border-border")
    expect(source).toContain("border-primary")
    expect(source).toContain("bg-secondary")
    expect(source).toContain("text-foreground")
    expect(source).toContain("text-muted-foreground")
    expect(source).not.toContain("bg-accent text-accent-foreground")

    for (const pattern of forbiddenPatterns) {
      expect(source).not.toContain(pattern)
    }
    expect(source).not.toContain(`React${"DOM"}`)
  })
})
