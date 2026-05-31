import { describe, expect, it } from "vitest"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

describe("Card", () => {
  it("exposes tokenized layout slots", () => {
    expect(Card({}).props.className).toContain("bg-card")
    expect(Card({}).props.className).toContain("border-border")
    expect(CardHeader({}).props.className).toContain("p-4")
    expect(CardTitle({}).props.className).toContain("text-foreground")
    expect(CardDescription({}).props.className).toContain("text-muted-foreground")
    expect(CardContent({}).props.className).toContain("pt-0")
    expect(CardFooter({}).props.className).toContain("flex-row")
  })
})
