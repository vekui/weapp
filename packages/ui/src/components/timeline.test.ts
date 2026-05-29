import { describe, expect, it } from "vitest"

import source from "./timeline.tsx?raw"
import { getTimelineItemState, Timeline } from "./timeline"

const forbiddenPatterns = ["win" + "dow", "docu" + "ment", "createPortal", "hover:", "translate-x-"]

describe("Timeline", () => {
  it("maps timeline status to item state", () => {
    expect(getTimelineItemState()).toBe("default")
    expect(getTimelineItemState("success")).toBe("success")
    expect(getTimelineItemState("warning")).toBe("warning")
    expect(getTimelineItemState("error")).toBe("error")
  })

  it("exposes a tokenized vertical event API", () => {
    expect(Timeline.Root).toBeTypeOf("function")
    expect(Timeline.Item).toBeTypeOf("function")

    expect(source).toContain("data-state")
    expect(source).toContain("border-border")
    expect(source).toContain("text-foreground")
    expect(source).toContain("text-muted-foreground")
    expect(source).toContain("bg-destructive")
    expect(source).toContain("bg-primary")
    expect(source).toContain("bg-accent")
    expect(source).toContain("data-slot=\"timeline-rail\"")
    expect(source).toContain("data-slot=\"timeline-dot\"")
    expect(source).toContain("data-slot=\"timeline-line\"")
    expect(source).toContain("data-last")
    expect(source).toContain("last ? \"hidden\"")
    expect(source).not.toContain("flex flex-col gap-3")

    for (const pattern of forbiddenPatterns) {
      expect(source).not.toContain(pattern)
    }
    expect(source).not.toContain(`React${"DOM"}`)
  })
})
