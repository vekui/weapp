import { describe, expect, it } from "vitest"

import { Loading } from "./loading"

describe("Loading", () => {
  it("uses an animated tokenized indicator", () => {
    const element = Loading({})
    const indicator = element.props.children[0]

    expect(element.props["data-loading"]).toBe("")
    expect(indicator.props.className).toContain("animate-spin")
    expect(indicator.props.className).toContain("border-muted")
    expect(indicator.props.className).toContain("border-t-primary")
  })
})
