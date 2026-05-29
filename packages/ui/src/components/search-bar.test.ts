import { describe, expect, it } from "vitest"

import { SearchBar } from "./search-bar"

describe("SearchBar", () => {
  it("uses a token wrapper and exposes clear state", () => {
    const element = SearchBar({ value: "abc", onClear: () => undefined })
    const clear = element.props.children[2]

    expect(element.props["data-empty"]).toBeUndefined()
    expect(element.props.className).toContain("border-input")
    expect(clear.props.className).toContain("flex")
    expect(clear.props.className).toContain("shrink-0")
    expect(clear.props.className).toContain("items-center")
    expect(clear.props.className).toContain("justify-center")
    expect(clear.props.className).toContain("px-2")
  })

  it("marks empty values for styling hooks", () => {
    const element = SearchBar({ value: "" })

    expect(element.props["data-empty"]).toBe("")
  })
})
