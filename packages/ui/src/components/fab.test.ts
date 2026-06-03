import { describe, expect, it } from "vitest"

import fabSource from "./fab.tsx?raw"
import { Fab } from "./fab"

describe("Fab", () => {
  it("exposes placement and disabled state with token classes", () => {
    const element = Fab({ disabled: true, placement: "bottom-left" })

    expect(element.props["data-disabled"]).toBe("true")
    expect(element.props["aria-disabled"]).toBe("true")
    expect(element.props["data-placement"]).toBe("bottom-left")
    expect(element.props.disabled).toBe(true)
    expect(element.props.className).toContain("fixed")
    expect(element.props.className).toContain("left-4")
    expect(element.props.className).toContain("bg-primary")
    expect(element.props.className).toContain("text-primary-foreground")
  })

  it("keeps the default placement touch-friendly and mini-program safe", () => {
    const element = Fab({})

    expect(element.props["data-placement"]).toBe("bottom-right")
    expect(element.props.className).toContain("right-4")
    expect(element.props.className).toContain("h-[104rpx]")
    expect(element.props.className).toContain("w-[104rpx]")
    expect(fabSource).not.toContain("hover:")
    expect(fabSource).not.toContain("translate-")
  })
})
