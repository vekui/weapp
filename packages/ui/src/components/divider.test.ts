import { describe, expect, it } from "vitest"

import source from "./divider.tsx?raw"
import { Divider } from "./divider"

describe("Divider", () => {
  it("exposes horizontal and vertical orientation states", () => {
    expect(Divider({ children: "or" }).props["data-orientation"]).toBe("horizontal")
    expect(Divider({ children: "or" }).props.className).toContain("border-border")
    expect(Divider({ orientation: "vertical" }).props["data-orientation"]).toBe("vertical")
    expect(Divider({ orientation: "vertical" }).props.className).toContain("h-full")
    expect(Divider({ orientation: "vertical" }).props.className).toContain("w-px")
    expect(source).not.toContain("space-x-")
  })
})
