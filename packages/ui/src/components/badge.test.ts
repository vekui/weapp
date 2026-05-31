import { describe, expect, it } from "vitest"

import { Badge } from "./badge"

describe("Badge", () => {
  it("uses semantic token variants", () => {
    expect(Badge({ children: "Default" }).props.className).toContain("bg-primary")
    expect(Badge({ variant: "secondary" }).props.className).toContain("bg-secondary")
    expect(Badge({ variant: "outline" }).props.className).toContain("border-border")
    expect(Badge({ variant: "destructive" }).props.className).toContain("bg-destructive")
  })
})
