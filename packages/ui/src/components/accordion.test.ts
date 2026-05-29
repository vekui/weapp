import { describe, expect, it } from "vitest"

import source from "./accordion.tsx?raw"
import { Accordion, getAccordionItemState } from "./accordion"

const forbiddenPatterns = ["win" + "dow", "docu" + "ment", "createPortal", "hover:", "translate-x-"]

describe("Accordion", () => {
  it("maps matching item values to open state", () => {
    expect(getAccordionItemState("a", "a")).toBe("open")
    expect(getAccordionItemState("b", "a")).toBe("closed")
    expect(getAccordionItemState("a", undefined)).toBe("closed")
  })

  it("exposes a tokenized touch accordion API", () => {
    expect(Accordion.Root).toBeTypeOf("function")
    expect(Accordion.Item).toBeTypeOf("function")
    expect(Accordion.Trigger).toBeTypeOf("function")
    expect(Accordion.Content).toBeTypeOf("function")

    expect(source).toContain("data-state={state}")
    expect(source).toContain("border-border")
    expect(source).toContain("text-foreground")
    expect(source).toContain("text-muted-foreground")

    for (const pattern of forbiddenPatterns) {
      expect(source).not.toContain(pattern)
    }
    expect(source).not.toContain(`React${"DOM"}`)
  })
})
