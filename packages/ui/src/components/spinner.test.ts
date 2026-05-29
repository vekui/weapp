import { describe, expect, it } from "vitest"

import { Spinner } from "./spinner"

describe("Spinner", () => {
  it("uses token colors and loading state attributes", () => {
    const element = Spinner({})

    expect(element.props["data-loading"]).toBe("")
    expect(element.props.className).toContain("border-muted")
    expect(element.props.className).toContain("border-t-primary")
  })
})
