import { describe, expect, it } from "vitest"

import source from "./popover.tsx?raw"
import { getPopoverState, Popover } from "./popover"

describe("Popover", () => {
  it("uses tap-driven inline content without hover or portal", () => {
    expect(getPopoverState(true)).toBe("open")
    expect(source).toContain("Pressable")
    expect(source).toContain("data-state")
    expect(source).not.toContain("hover:")
    expect(source).not.toContain("createPortal")
    expect(Popover.Root).toBeTypeOf("function")
  })

  it("uses a flex trigger so trigger text is vertically centered", () => {
    expect(source).toContain("flex min-h-[88rpx] flex-row items-center")
  })
})
