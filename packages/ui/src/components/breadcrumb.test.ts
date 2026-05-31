import { describe, expect, it } from "vitest"

import source from "./breadcrumb.tsx?raw"
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "./breadcrumb"

describe("Breadcrumb", () => {
  it("renders mini-program-safe row layout and current state", () => {
    expect(Breadcrumb({}).props.className).toContain("flex-row")
    expect(Breadcrumb({}).props.className).toContain("gap-1")
    expect(BreadcrumbItem({ current: true }).props["data-state"]).toBe("current")
    expect(BreadcrumbItem({}).props["data-state"]).toBe("link")
    expect(BreadcrumbSeparator({}).props.className).toContain("text-muted-foreground")
    expect(source).not.toContain("space-x-")
  })
})
