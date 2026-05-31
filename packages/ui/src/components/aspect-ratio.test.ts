import * as React from "react"
import { describe, expect, it } from "vitest"

import source from "./aspect-ratio.tsx?raw"
import { AspectRatio, getAspectRatioPadding } from "./aspect-ratio"

describe("AspectRatio", () => {
  it("computes ratio labels and padding without transform utilities", () => {
    expect(getAspectRatioPadding(16, 9)).toBe("56.25%")

    const element = AspectRatio({ ratio: 4 / 3, children: "media" })
    const children = React.Children.toArray(element.props.children) as React.ReactElement[]

    expect(element.props["data-ratio"]).toBe("4:3")
    expect(element.props.style).toEqual({ paddingBottom: "75%" })
    expect(element.props.className).toContain("bg-muted")
    expect(children[0]?.props.className).toContain("absolute")
    expect(source).not.toContain("translate-")
  })
})
