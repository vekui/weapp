import * as React from "react"
import { describe, expect, it } from "vitest"

import source from "./activity-indicator.tsx?raw"
import { ActivityIndicator } from "./activity-indicator"

describe("ActivityIndicator", () => {
  it("exposes loading state and tokenized text", () => {
    const element = ActivityIndicator({ text: "Loading" })
    const children = React.Children.toArray(element.props.children) as React.ReactElement[]

    expect(element.props["data-state"]).toBe("loading")
    expect(element.props.className).toContain("text-muted-foreground")
    expect(children).toHaveLength(2)
    expect(children[1]?.props.children).toBe("Loading")
    expect(source).not.toContain("window")
    expect(source).not.toContain("document")
  })
})
