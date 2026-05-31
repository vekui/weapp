import { describe, expect, it } from "vitest"

import source from "./flex.tsx?raw"
import { Flex, FlexItem } from "./flex"

describe("Flex", () => {
  it("maps layout props to mini-program-safe classes and state", () => {
    const element = Flex({ align: "center", direction: "column", justify: "between", wrap: true })

    expect(element.props["data-direction"]).toBe("column")
    expect(element.props["data-state"]).toBe("default")
    expect(element.props.className).toContain("flex-col")
    expect(element.props.className).toContain("items-center")
    expect(element.props.className).toContain("justify-between")
    expect(element.props.className).toContain("flex-wrap")
    expect(FlexItem({ grow: true }).props.className).toContain("flex-1")
    expect(source).not.toContain("space-")
  })
})
