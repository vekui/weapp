import * as React from "react"
import { describe, expect, it } from "vitest"

import { Empty } from "./empty"

describe("Empty", () => {
  it("renders default and optional text with token classes", () => {
    const element = Empty({ description: "Try again" })
    const children = React.Children.toArray(element.props.children) as React.ReactElement[]

    expect(element.props.className).toContain("items-center")
    expect(children[0]?.props.children).toBe("暂无内容")
    expect(children[0]?.props.className).toContain("text-foreground")
    expect(children[1]?.props.children).toBe("Try again")
    expect(children[1]?.props.className).toContain("text-muted-foreground")
  })
})
