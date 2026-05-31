import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./curtain.tsx?raw"
import { Curtain, CurtainClose, CurtainTitle } from "./curtain"

describe("Curtain", () => {
  it("renders layer-backed open state and closes through backdrop", () => {
    const onOpenChange = vi.fn()
    const tree = create(<Curtain open onOpenChange={onOpenChange}>Content</Curtain>)
    const content = tree.root.findByProps({ "data-slot": "layer-content" })
    const backdrop = tree.root.findAll((node) => node.props["data-slot"] === "layer-backdrop")[0]

    expect(content.props.className).toContain("bg-card")
    act(() => backdrop?.props.onClick())
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(source).toContain("Layer.Root")
    expect(source).not.toContain("ReactDOM")
  })

  it("exposes title and close helper slots", () => {
    const onClose = vi.fn()
    const close = CurtainClose({ onClose })
    const closedTree = create(<Curtain open={false}>Closed</Curtain>)

    expect(closedTree.toJSON()).toBeNull()
    expect(CurtainTitle({}).props.className).toContain("text-foreground")
    act(() => close.props.onClick({ type: "tap" }))
    expect(onClose).toHaveBeenCalled()
  })
})
