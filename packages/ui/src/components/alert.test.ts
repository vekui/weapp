import { describe, expect, it } from "vitest"

import { Alert } from "./alert"

describe("Alert", () => {
  it("uses semantic token classes for destructive alerts", () => {
    const element = Alert.Root({ variant: "destructive" })

    expect(element.props.className).toContain("border-destructive")
    expect(Alert.Title({}).props.className).toContain("text-foreground")
    expect(Alert.Description({}).props.className).toContain("text-muted-foreground")
  })
})
