import { describe, expect, it } from "vitest"
import type { ReactElement } from "react"

import source from "./layer.tsx?raw"
import { getLayerSideClass, getLayerState, Layer } from "./layer"

function getProps(element: ReactElement) {
  return element.props as Record<string, unknown>
}

describe("Layer primitive", () => {
  it("maps open state and side placement", () => {
    expect(getLayerState(true)).toBe("open")
    expect(getLayerState(false)).toBe("closed")
    expect(getLayerSideClass("bottom")).toContain("bottom-0")
    expect(getLayerSideClass("center")).toContain("items-center")
  })

  it("owns overlay z-index classes inside primitives only", () => {
    expect(source).toContain("z-[900]")
    expect(source).toContain("z-[910]")
    expect(source).toContain("bg-popover")
    expect(source).toContain("text-popover-foreground")
    expect(Layer.Root).toBeTypeOf("function")
    expect(Layer.Backdrop).toBeTypeOf("function")
    expect(Layer.Content).toBeTypeOf("function")
  })

  it("prevents mini-program scroll-through while the overlay is mounted", () => {
    const root = Layer.Root({ children: null }) as ReactElement
    const backdrop = Layer.Backdrop({}) as ReactElement

    expect(getProps(root).catchMove).toBe(true)
    expect(getProps(backdrop).catchMove).toBe(true)
    expect(Layer.Root({ open: false })).toBeNull()
  })
})
