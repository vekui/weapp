import { describe, expect, it } from "vitest"

import source from "./steps.tsx?raw"
import { getStepState, Steps } from "./steps"

const forbiddenPatterns = ["win" + "dow", "docu" + "ment", "createPortal", "hover:", "translate-x-"]

describe("Steps", () => {
  it("maps step index and explicit status to visual state", () => {
    expect(getStepState(0, 1)).toBe("finish")
    expect(getStepState(1, 1)).toBe("process")
    expect(getStepState(2, 1)).toBe("wait")
    expect(getStepState(2, 1, "error")).toBe("error")
  })

  it("exposes a tokenized process indicator API", () => {
    expect(Steps.Root).toBeTypeOf("function")
    expect(Steps.Item).toBeTypeOf("function")

    expect(source).toContain("data-state={state}")
    expect(source).toContain("border-border")
    expect(source).toContain("bg-primary")
    expect(source).toContain("bg-border")
    expect(source).toContain("data-slot=\"steps-rail\"")
    expect(source).toContain("data-slot=\"steps-dot\"")
    expect(source).toContain("data-slot=\"steps-line\"")
    expect(source).toContain("data-last")
    expect(source).toContain("text-muted-foreground")
    expect(source).toContain("min-h-[88rpx]")
    expect(source).not.toContain("flex flex-col gap-3")

    for (const pattern of forbiddenPatterns) {
      expect(source).not.toContain(pattern)
    }
    expect(source).not.toContain(`React${"DOM"}`)
  })
})
