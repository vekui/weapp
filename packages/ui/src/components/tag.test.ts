import { describe, expect, it } from "vitest"

import { Tag } from "./tag"

describe("Tag", () => {
  it("supports selected and disabled states", () => {
    const element = Tag({ selected: true, disabled: true, children: "A" })

    expect(element.props["data-state"]).toBe("selected")
    expect(element.props["data-disabled"]).toBe("true")
    expect(element.props.className).toContain("bg-primary")
  })
})
