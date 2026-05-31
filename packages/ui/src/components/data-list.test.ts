import { describe, expect, it } from "vitest"

import { DataList } from "./data-list"

describe("DataList", () => {
  it("exposes tokenized root and item states", () => {
    expect(DataList.Root({}).props.className).toContain("bg-card")
    expect(DataList.Root({}).props.className).toContain("border-border")
    expect(DataList.Item({ state: "muted", label: "Name", value: "Ada" }).props["data-state"]).toBe("muted")
    expect(DataList.Item({ state: "muted" }).props.className).toContain("bg-muted")
    expect(DataList.Label({}).props.className).toContain("text-muted-foreground")
    expect(DataList.Value({}).props.className).toContain("text-foreground")
  })
})
